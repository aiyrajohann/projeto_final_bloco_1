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

    public deletar(id: number): void {
        const property = this.buscarPorId(id);

        const comissao = property.calcularComissao();
        const corretor = this.brokerController.buscarPorId(property.brokerId);
        corretor.totalCommission -= comissao;

        const deleted = this.repository.delete(id);

        if (!deleted) {
            throw new BusinessException("Erro ao deletar imóvel!");
        }
    }
}
