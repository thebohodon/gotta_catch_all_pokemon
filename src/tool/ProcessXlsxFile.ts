import XLSX from 'xlsx';
import path from 'path';
import {fileURLToPath} from 'url';
import {promises as fs} from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getDate(date = new Date()) {
    const day = date.getDate(), month = date.getMonth() + 1, year = date.getFullYear(), hours = date.getHours(),
        minutes = date.getMinutes(),
        second = date.getSeconds();
    return {day, month, year, hours, minutes, second};
}

function getDateFormat(date = getDate()) {
    const {day, month, year, hours, minutes, second} = date;
    return `${year}-${month}-${day}-T${hours}:${minutes}:${second}`;
}

function getGenericFileName(name: string) {
    const date = getDateFormat();
    return `${date.replace(/:/g, '_')}-${name}.xlsx`;
}

export async function exportData(name: string, data: Array<Array<string>> | undefined): Promise<void> {
    if (data) {
        const excelName: string = getGenericFileName(name),
            dirName: string = `excels`,
            excelDirPath: string = path.resolve(__dirname, '../../', dirName),
            excelPath: string = path.join(excelDirPath, excelName);

        try {
            // Verificar si la carpeta ya existe
            await fs.access(excelDirPath);
            console.log(`La carpeta '${dirName}' ya existe.`);
        } catch (error) {
            // Si no existe, crear la carpeta
            await fs.mkdir(excelDirPath);
            console.log(`Carpeta '${dirName}' creada exitosamente.`);
        }


        console.log(`El directorio donde se va a depositar el fichero es: ${excelDirPath}`);
        console.log(`El fichero donde se va a depositar las respuesta se llama: ${excelName}`);

        const file = XLSX.utils.book_new(),
            ws1 = XLSX.utils.aoa_to_sheet(data);

        XLSX.utils.book_append_sheet(file, ws1, "Resultado");

        XLSX.write(file, {type: 'binary', bookType: 'xlsx', bookSST: false});
        XLSX.writeFile(file, excelPath);
    }

}