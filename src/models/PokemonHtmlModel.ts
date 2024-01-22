interface PokemonHtmlType {
    idNacional: string;
    idPokedex: string
    pokeName: string;
    imageURL: string;
    type: string;
    catchLocation: string;
}

export default class PokemonHtmlModel implements PokemonHtmlType {
    private _catchLocation!: string;
    private _idNacional!: string;
    private _idPokedex!: string;
    private _imageURL!: string;
    private _pokeName!: string;
    private _type!: string;

    constructor(idNacional: string, idPokedex: string, pokeName: string, imageURL: string, type: string, catchLocation: string) {
        this.idNacional = idNacional;
        this.idPokedex = idPokedex;
        this.pokeName = pokeName;
        this.imageURL = imageURL;
        this.type = type;
        this.catchLocation = catchLocation;
    }

    get catchLocation(): string {
        return this._catchLocation;
    }

    set catchLocation(value: string) {
        this._catchLocation = value;
    }

    get idNacional(): string {
        return this._idNacional;
    }

    set idNacional(value: string) {
        this._idNacional = value;
    }

    get idPokedex(): string {
        return this._idPokedex;
    }

    set idPokedex(value: string) {
        this._idPokedex = value;
    }

    get imageURL(): string {
        return this._imageURL;
    }

    set imageURL(value: string) {
        this._imageURL = value;
    }

    get pokeName(): string {
        return this._pokeName;
    }

    set pokeName(value: string) {
        this._pokeName = value;
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    setHtmlData(html: string): void {
        const allData = html.split('<td>');
        allData.forEach((d: string, ind: number): void => {
            const value = d.split('</td>')[0];
            switch (ind) {
                case 0:
                    break;
                case 1:
                    this.idNacional = value;
                    break;
                case 2:
                    this.idPokedex = value;
                    break;
                case 3:
                    const img = value.split('data-src="')[1].split('"')[0];
                    this.imageURL = img;
                    const t = value.split('</a>');
                    if (t.length > 1) {
                        const names = t[0].split('>');
                        this.pokeName = names[names.length - 1];
                    } else {
                        this.pokeName = value.split('<b>')[1].split('</b>')[0];
                    }
                    break;
                case 4:
                    this.type = value;
                    break;
                case 5:
                    const ap = value.split('<br>');
                    this.catchLocation = ap.join(' ');
                    break;
                default:
                    break;
            }
        })
    }

};