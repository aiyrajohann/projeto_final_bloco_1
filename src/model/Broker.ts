import { Model } from "./Model";

export class Broker extends Model {
    private _name: string;
    private _email: string;
    private _totalCommission: number;

    constructor(id: number, name: string, email: string = "") {
        super(id); 
        this._name = name;
        this._email = email;
        this._totalCommission = 0;
    }
    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get email(): string {
        return this._email;
    }

    public set email(value: string) {
        this._email = value;
    }

    public get totalCommission(): number {
        return this._totalCommission;
    }

    public set totalCommission(value: number) {
        this._totalCommission = value;
    }
    public addCommission(value: number): void {
        if (value > 0) {
            this._totalCommission += value;
        }
    }
    public visualizar(): void {
        console.log("\n*****************************************************");
        console.log("                 DADOS DO CORRETOR                   ");
        console.log("*****************************************************");
        console.log(`ID: ${this.id}`);
        console.log(`Nome: ${this._name}`);
        console.log(`Email: ${this._email || "Não informado"}`);
        console.log(`Comissão Total: R$ ${this._totalCommission.toFixed(2)}`);
        console.log("*****************************************************");
    }
    public validar(): boolean {
        const nomeValido = !!(this._name && this._name.trim().length > 3);
        const emailValido = !this._email || this._email.includes("@");
        
        return nomeValido && emailValido;
    }
}
