interface PokemonExcelRowType {
    idNacional: number;
    idPokedex: number
    name: string;
    imageURL: string;
    type: string;
    catchLocation: string;
    caught?: string;
}

export default class PokemonExcelRowModel implements PokemonExcelRowType {
    private _catchLocation: string;
    private _caught: string;
    private _idNacional: number;
    private _idPokedex: number;
    private _imageURL: string;
    private _name: string;
    private _type: string;

    get catchLocation(): string {
        return this._catchLocation;
    }

    set catchLocation(value: string) {
        this._catchLocation = value;
    }

    get caught(): string {
        return this._caught;
    }

    set caught(value: string) {
        this._caught = value;
    }

    get idNacional(): number {
        return this._idNacional;
    }

    set idNacional(value: number) {
        this._idNacional = value;
    }

    get idPokedex(): number {
        return this._idPokedex;
    }

    set idPokedex(value: number) {
        this._idPokedex = value;
    }

    get imageURL(): string {
        return this._imageURL;
    }

    set imageURL(value: string) {
        this._imageURL = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

};