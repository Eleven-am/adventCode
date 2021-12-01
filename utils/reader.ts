import fs from 'fs';
import path from 'path';
import {promisify} from "util";

const readFile = promisify(fs.readFile);
export const log = (...args: any[]) => console.log(...args);

export default async function reader (file: string): Promise<Array<string>> {
    const filePath = path.resolve(__dirname, '../assets/' + file);
    const data = await readFile(filePath, 'utf8');
    return data.split('\n');
};

