import PokemonExcelRowModel from '../models/PokemonExcelRowModel.js';

export default class PokemonExcelRowStore {
    private _store: Array<PokemonExcelRowModel> = [];

    constructor(store: Array<PokemonExcelRowModel>| undefined ) {
        if(store){
            this.store = store;
        }
    }

    get store(): Array<PokemonExcelRowModel> {
        return this._store;
    }

    set store(value: Array<PokemonExcelRowModel>) {
        this._store = value;
    }

    getData(): Array<Array<string>> {
        const data: Array<Array<string>> = [];

        const head: Array<string> = [];
        head.push(`Número en Pokedex`);
        head.push(`Pokedex Nacional`);
        head.push(`Nombre`);
        head.push(`Imagen`);
        head.push(`Tipo`);
        head.push(`Ubicación`);
        head.push(`¿Capturado?`);

        data.push(head);

        this.store.forEach((per:PokemonExcelRowModel)=>{
            data.push(per.getData());
        })

        return data;
    }

};