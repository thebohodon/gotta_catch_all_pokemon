import path from 'path';
import {fileURLToPath} from 'url';
import {promises as fs} from "fs";
import {welcome, insertNames} from './src/menu/Menu.js';
import {exportData} from './src/tool/ProcessXlsxFile.js'
import PokemonHtmlModel from "./src/models/PokemonHtmlModel.js";
import PokemonExcelRowStore from "./src/store/PokemonExcelRowStore.js";
import PokemonExcelRowModel from "./src/models/PokemonExcelRowModel.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async (): Promise<void> => {
    welcome();
    const {HtmlName, ExcelName} = await insertNames();
    const pathDocument: string = path.resolve(__dirname + '/../mocks/' + HtmlName + '.txt');

    const pokeList: string = await fs.readFile(pathDocument, 'utf8');
    const pokeListLimpia: string = pokeList.replace(/[\r\n]/g, "");

    const expresionRegular: RegExp = /<p>(.*?)<\/p>/g;
    const pokemonRowList: RegExpMatchArray | null = pokeListLimpia.match(expresionRegular)

    const permA: Array<PokemonExcelRowModel> = [];

    if (pokemonRowList) {
        let index: string;
        for (index in pokemonRowList) {
            const phm = new PokemonHtmlModel('', '', '', '', '', '');
            phm.setHtmlData(pokemonRowList[index]);
            const per: PokemonExcelRowModel = new PokemonExcelRowModel(phm.idNacional, phm.idPokedex, phm.pokeName, phm.imageURL, phm.type, phm.catchLocation);
            await per.updateImage();
            permA.push(per);
        }
    }

    const pers = new PokemonExcelRowStore(permA);
    exportData(ExcelName, pers.getData()).then();
    /*//Configuramos las variables de entorno para ajustarnos al usuario con el cual solicitaremos el token
    configEnv.loadConfig(Environments, Reds, Domains, Brands, __dirname).then(() => {
        //Obtenemos las URL contra las que ejecutaremos las pruebas
        configPaths.loadPathsFile(Environments, Reds, Domains, Execution).then(async () => {

            proxy.proxyConfiguration(VPN, Execution);

            let apisTest;
            if (ApisTestPath) {
                const rutaAbsoluta = path.isAbsolute(ApisTestPath) ? ApisTestPath : path.join(Constants.executedPath, 'config', 'mocks', ApisTestPath);
                console.log(`El fichero sobre el que se ejecutan las pruebas se encuentra en: ${rutaAbsoluta}.`);
                apisTest = await readYaml.readYaml(rutaAbsoluta);
            }

            try {
                for (let envId in Environments) {
                    let env = Environments[envId];
                    for (let redId in Reds) {
                        let red = Reds[redId];
                        for (let domainId in Domains) {
                            let domain = Domains[domainId];
                            for (let brandId in Brands) {
                                let brand = Brands[brandId];
                                const pbSeg = TestEnvironmentConfig.getPathBaseApiGwSeg(env, red, domain),
                                    pbMw = TestEnvironmentConfig.getPathBaseApiGwMw(env, red);

                                const token = await tokenSession.getToken(pbSeg, env, red, domain, brand);

                                if (apisTest) {
                                    //Solicitar procesar YML para generar las peticiones
                                    const resultApiTests = apiTests.createApiTests(apisTest, env, red, domain, brand, token);
                                    try {
                                        await apiTests.sendTestRequests(resultApiTests, pbSeg, pbMw, env, red, domain, brand);
                                    } catch (e) {
                                        console.error(`[MAIN.Enviando peticiones -> ${e}`.red)
                                    }
                                }
                            }
                        }
                    }
                }
            } catch (e) {
                console.error(`[MAIN.Solicitud de Token] -> ${e}`.red);
            }
            responseStore.downloadXlsxFileResponses(NameFileResult);
            await closeAPP();
        }).catch(e => {
            console.error(`[MAIN:ErrorLoadPathsYML] -> ${e}`)
        });
    }).catch(e => {
        console.error(`[MAIN:ErrorLoadConfigYML] -> ${e}`)
    });*/
})().then().catch(e => console.error(`[MAIN:ErrorPrincipal] -> ${e}`));