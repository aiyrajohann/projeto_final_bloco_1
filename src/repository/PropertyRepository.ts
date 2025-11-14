import { Property } from "../model/Property";
import { IRepository } from "./IRepository";


export class PropertyRepository implements IRepository<Property> {
    private properties: Property[] = [];
    private nextId: number = 1;

    public create(item: Property): Property {
        item.id = this.nextId++;
        this.properties.push(item);
        return item;
    }
    public findById(id: number): Property | undefined {
        return this.properties.find(property => property.id === id);
    }

    public findAll(): Property[] {
        return [...this.properties];
    }

    public update(item: Property): Property {
        const index = this.properties.findIndex(property => property.id === item.id);
        if (index !== -1) {
            this.properties[index] = item;
        }
        return item;
    }

    public delete(id: number): boolean {
        const index = this.properties.findIndex(property => property.id === id);
        if (index !== -1) {
            this.properties.splice(index, 1);
            return true;
        }
        return false;
    }

    public findByBroker(brokerId: number): Property[] {
        return this.properties.filter(property => property.brokerId === brokerId);
    }

    public findAvailable(): Property[] {
        return this.properties.filter(property => !property.temCorretor());
    }
    public findByPriceRange(minPrice: number, maxPrice: number): Property[] {
        return this.properties.filter(property => 
            property.price >= minPrice && property.price <= maxPrice
        );
    }
    public count(): number {
        return this.properties.length;
    }
}
