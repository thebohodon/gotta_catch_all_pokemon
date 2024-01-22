import pkg from 'colors';
import inquirer from 'inquirer';

const {blue, red} = pkg;

const allMessage: Record<string, string> = {
    htmlName: 'Inserte el nombre del fichero que contenga la lista de pokemon que quiere importar.',
    excelName: 'Inserte el nombre con el que desea guardar el excel resultante.'
};

function getMessage(key: string): string {
    return allMessage[key];
}

function validateFunction(input: string): void {
    const done = this.async()
    if (input === '') {
        // Pass the return value in the done callback
        done('Error en el dato insertado, vuelva a intentarlo.');
        return;
    }
    // Pass the return value in the done callback
    done(null, true);
}

export function welcome(): void {
    console.log(blue(`°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°`));
    console.log(red(`Bienvenid@ a la aplicación para exportar tu lista de pokemon a Excel`));
    console.log(blue(`°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°`));
}

const inserNameList: object[] = [{
    type: 'input',
    name: 'HtmlName',
    message: getMessage('htmlName'),
    validate: validateFunction
},{
    type: 'input',
    name: 'ExcelName',
    message: getMessage('excelName'),
    validate: validateFunction
}];

export async function insertNames(): Promise<Record<string, string>> {
    return inquirer.prompt(inserNameList);
}