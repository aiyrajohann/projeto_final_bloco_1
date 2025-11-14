import { Property } from "../model/Property";
import { PropertyRepository } from "../repository/PropertyRepository";
import { BrokerController } from "./BrokerController";
import { ValidationException } from "../exceptions/ValidationException";
import { NotFoundException } from "../exceptions/NotFoundException";
import { BusinessException } from "../exceptions/BusinessException";

export class PropertyController {
    private repository: PropertyRepository;
    private brokerController: BrokerController;

    constructor(brokerController: BrokerController) {
        this.repository = new PropertyRepository();
        this.brokerController = brokerController;
    }

    public cadastrar(description: string, price: number, brokerId: number): Property {
        if (!description || description.trim().length === 0) {
            throw new ValidationException("A descrição do imóvel não pode ser vazia!");
        }

        if (price <= 0) {
            throw new ValidationException("O preço deve ser maior que zero!");
        }

        if (brokerId <= 0) {
            throw new ValidationException("ID do corretor inválido!");
        }

        this.brokerController.buscarPorId(brokerId);

        const property = new Property(0, description.trim(), price, brokerId);

        // Embora os dados já tenham sido validados na controller,
       // quis adicionar uma camada extra de segurança na validação do Model
        if (!property.validar()) {
            throw new ValidationException("Dados do imóvel inválidos!");
        }

        const savedProperty = this.repository.create(property);

        const comissao = savedProperty.calcularComissao();
        this.brokerController.adicionarComissao(brokerId, comissao);

        return savedProperty;
    }

    public listarTodos(): Property[] {
        const properties = this.repository.findAll();

        if (properties.length === 0) {
            throw new NotFoundException("Nenhum imóvel cadastrado!");
        }

        return properties;
    }

    public buscarPorId(id: number): Property {
        if (id <= 0) {
            throw new ValidationException("ID inválido! Deve ser maior que zero.");
        }

        const property = this.repository.findById(id);

        if (!property) {
            throw new NotFoundException(`Imóvel com ID ${id} não encontrado!`);
        }

        return property;
    }

    public atualizar(id: number, description: string, price: number): Property {
        const property = this.buscarPorId(id);

        if (!description || description.trim().length === 0) {
            throw new ValidationException("A descrição não pode ser vazia!");
        }

        if (price <= 0) {
            throw new ValidationException("O preço deve ser maior que zero!");
        }

        // Guarda a comissão antiga antes de atualizar o preço
        const comissaoAntiga = property.calcularComissao();

        property.description = description.trim();
        property.price = price;

        // Embora os dados já tenham sido validados na controller,
       // quis adicionar uma camada extra de segurança na validação do Model
        if (!property.validar()) {
            throw new ValidationException("Dados do imóvel inválidos!");
        }

        // Calcula a nova comissão e ajusta a diferença no corretor
        const comissaoNova = property.calcularComissao();
        const diferenca = comissaoNova - comissaoAntiga;

        if (diferenca !== 0) {
            this.brokerController.atualizarComissao(property.brokerId, diferenca);
        }

        return this.repository.update(property);
    }

    public deletar(id: number): void {
        const property = this.buscarPorId(id);

        const comissao = property.calcularComissao();
        this.brokerController.atualizarComissao(property.brokerId, -comissao);

        const deleted = this.repository.delete(id);

        if (!deleted) {
            throw new BusinessException("Erro ao deletar imóvel!");
        }
    }

    public listarPorPreco(ordem: 'crescente' | 'decrescente' = 'crescente'): Property[] {
        const properties = this.repository.findAll();

        if (properties.length === 0) {
            throw new NotFoundException("Nenhum imóvel cadastrado!");
        }

        if (ordem === 'crescente') {
            return properties.sort((a, b) => a.price - b.price);
        } else {
            return properties.sort((a, b) => b.price - a.price);
        }
    }
}
