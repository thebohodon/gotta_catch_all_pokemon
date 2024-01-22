interface PokemonApiType {
    id: number
    name: string;
    types: string[];
    sprite: string;
}

export default class PokemonApiModel implements PokemonApiType {
    private _id!: number;
    private _name!: string;
    private _types!: string[];
    private _sprite!: string;

    constructor(id: number, name: string, types: string[], sprite: string) {
        this.id = id;
        this.name = name;
        this.types = types;
        this.sprite = sprite;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get types(): string[] {
        return this._types;
    }

    set types(value: string[]) {
        this._types = value;
    }

    get sprite(): string {
        return this._sprite;
    }

    set sprite(value: string) {
        this._sprite = value;
    }

};