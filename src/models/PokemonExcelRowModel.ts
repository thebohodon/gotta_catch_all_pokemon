import PokemonHtmlModel from './PokemonHtmlModel.js';

export default class PokemonExcelRowModel extends PokemonHtmlModel {
    private _caught!: string;
    private _image!: string;

    constructor(idNacional: string, idPokedex: string, pokeName: string, imageURL: string, type: string, catchLocation: string) {
        super(idNacional, idPokedex, pokeName, imageURL, type, catchLocation);
        this.caught = '';
    }

    get caught(): string {
        return this._caught;
    }

    set caught(value: string) {
        this._caught = value;
    }

    get image(): string {
        return this._image;
    }

    set image(value: string) {
        this._image = value;
    }

    async updateImage(): Promise<void> {
        const model:PokemonExcelRowModel = this;
        try {
            const response = await fetch(this.imageURL);
            const arrayBuffer = await response.arrayBuffer();
            model.image = Buffer.from(arrayBuffer).toString('base64');
        } catch (e: Error | any) {
            throw new Error(`Error al descargar la imagen: ${e.message}`);
        }


    }

    getData(): Array<string> {
        const data: Array<string> = [];
        data.push(this.idNacional);
        data.push(this.idPokedex);
        data.push(this.pokeName);
        data.push(this.imageURL);
        data.push(this.type);
        data.push(this.catchLocation);
        data.push(this.caught);

        return data;
    }

};