export interface IRepository<T> {
   
    create(item: T): T;

    findById(id: number): T | undefined;

    findAll(): T[];

    update(item: T): T;

    delete(id: number): boolean;
}
