import { Broker } from "../model/Broker";
import { IRepository } from "./IRepository";

export class BrokerRepository implements IRepository<Broker> {
    private brokers: Broker[] = [];
    private nextId: number = 1;

    public create(item: Broker): Broker {
        item.id = this.nextId++;
        this.brokers.push(item);
        return item;
    }

    public findById(id: number): Broker | undefined {
        return this.brokers.find(broker => broker.id === id);
    }

    public findAll(): Broker[] {
        return [...this.brokers];
    }

   
    public update(item: Broker): Broker {
        const index = this.brokers.findIndex(broker => broker.id === item.id);
        if (index !== -1) {
            this.brokers[index] = item;
        }
        return item;
    }

    public delete(id: number): boolean {
        const index = this.brokers.findIndex(broker => broker.id === id);
        if (index !== -1) {
            this.brokers.splice(index, 1);
            return true;
        }
        return false;
    }

    public findByName(name: string): Broker[] {
        return this.brokers.filter(broker => 
            broker.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    public count(): number {
        return this.brokers.length;
    }
}
