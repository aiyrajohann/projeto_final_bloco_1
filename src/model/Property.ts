import { Model } from "./Model";

export class Property extends Model {
    private _description: string;
    private _price: number;
    private _brokerId: number;

    constructor(id: number, description: string, price: number, brokerId: number) {
        super(id); 
        this._description = description;
        this._price = price;
        this._brokerId = brokerId;
    }

    public get description(): string {
        return this._description;
    }

    public set description(value: string) {
        this._description = value;
    }

    public get price(): number {
        return this._price;
    }

    public set price(value: number) {
        this._price = value;
    }

    public get brokerId(): number {
        return this._brokerId;
    }

    public set brokerId(value: number) {
        this._brokerId = value;
    }

    public calcularComissao(): number {
        return this._price * 0.08;
    }

    public temCorretor(): boolean {
        return true; 
    }

    public visualizar(): void {
        console.log("\n*****************************************************");
        console.log("                 DADOS DO IMÓVEL                     ");
        console.log("*****************************************************");
        console.log(`ID: ${this.id}`);
        console.log(`Descrição: ${this._description}`);
        console.log(`Preço: R$ ${this._price.toFixed(2)}`);
        console.log(`Corretor ID: ${this._brokerId}`);
        console.log(`Comissão: R$ ${this.calcularComissao().toFixed(2)}`);
        console.log("*****************************************************");
    }

    public validar(): boolean {

        const descricaoValida = !!(this._description && this._description.trim().length > 0);
        const precoValido = this._price > 0;
        
        return descricaoValida && precoValido;
    }
}
