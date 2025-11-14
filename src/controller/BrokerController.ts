import { Broker } from "../model/Broker";
import { BrokerRepository } from "../repository/BrokerRepository";
import { ValidationException } from "../exceptions/ValidationException";
import { NotFoundException } from "../exceptions/NotFoundException";
import { BusinessException } from "../exceptions/BusinessException";

export class BrokerController {
    private repository: BrokerRepository;

    constructor() {
        this.repository = new BrokerRepository();
    }

    public cadastrar(name: string, email: string): Broker {
        if (!name || name.trim().length === 0) {
            throw new ValidationException("O nome do corretor não pode ser vazio!");
        }

        if (name.trim().length <= 3) {
            throw new ValidationException("O nome do corretor deve ter mais de 3 caracteres!");
        }

        if (email && !email.includes("@")) {
            throw new ValidationException("Email inválido! Deve conter '@'.");
        }

        const existentes = this.repository.findByName(name);
        if (existentes.length > 0) {
            throw new BusinessException(`Já existe um corretor cadastrado com o nome "${name}"!`);
        }

        const broker = new Broker(0, name.trim(), email.trim());
        
        // Embora os dados já tenham sido validados na controller,
       // quis adicionar uma camada extra de segurança na validação do Model
        if (!broker.validar()) {
            throw new ValidationException("Dados do corretor inválidos!");
        }

        const savedBroker = this.repository.create(broker);
        return savedBroker;
    }

    public listarTodos(): Broker[] {
        const brokers = this.repository.findAll();
        
        if (brokers.length === 0) {
            throw new NotFoundException("Nenhum corretor cadastrado!");
        }

        return brokers;
    }

    public buscarPorId(id: number): Broker {
        if (id <= 0) {
            throw new ValidationException("ID inválido! Deve ser maior que zero.");
        }

        const broker = this.repository.findById(id);
        
        if (!broker) {
            throw new NotFoundException(`Corretor com ID ${id} não encontrado!`);
        }

        return broker;
    }

    public atualizar(id: number, name: string, email: string): Broker {
        const broker = this.buscarPorId(id);

        if (!name || name.trim().length <= 3) {
            throw new ValidationException("O nome deve ter mais de 3 caracteres!");
        }

        if (email && !email.includes("@")) {
            throw new ValidationException("Email inválido!");
        }

        broker.name = name.trim();
        broker.email = email.trim();

        // Embora os dados já tenham sido validados na controller,
       // quis adicionar uma camada extra de segurança na validação do Model
        if (!broker.validar()) {
            throw new ValidationException("Dados do corretor inválidos!");
        }

        return this.repository.update(broker);
    }

    public adicionarComissao(id: number, valor: number): Broker {
        if (valor <= 0) {
            throw new ValidationException("O valor da comissão deve ser maior que zero!");
        }

        const broker = this.buscarPorId(id);
        broker.addCommission(valor);
        
        return this.repository.update(broker);
    }

    public listarPorComissao(): Broker[] {
        const brokers = this.repository.findAll();
        
        if (brokers.length === 0) {
            throw new NotFoundException("Nenhum corretor cadastrado!");
        }

        return brokers.sort((a, b) => b.totalCommission - a.totalCommission);
    }
}
