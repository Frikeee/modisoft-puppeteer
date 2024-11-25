import * as fs from "node:fs";
import {createEssenceDB} from "./database.js";
import {parseJsonFileTimesheet} from "./path-crawler/ebpayroll-timesheet.js";


export const createToJSON = (fileName) => {
    fs.writeFileSync(`json/${fileName}.json`, '[');
}

export const saveToJSON = async (dataProduct, fileName, foreignKey) => {
    let parseFile = await parseJsonFile(dataProduct, fileName)
    for(let row of parseFile) {
        await createEssenceDB(fileName, row, foreignKey);
        await fs.appendFile(`json/${fileName}.json`, JSON.stringify(row, null, 2) + ',', (err) => {
            if (err) throw err;
        });
    }
}

export const parseJsonFile = async (dataProduct, fileName) => {
    switch (fileName){
        case 'ebpayroll_timesheet':
            return parseJsonFileTimesheet(dataProduct);
        default:
            return dataProduct;
    }
}

export const closeJsonFile = async (fileName) => {
    await fs.appendFile(`json/${fileName}.json`, ']', (err) => {
        if (err) throw err;
    });
}
