import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbFile = path.resolve(__dirname, './db.json');

// read file
export const readData = () => {
  const db = fs.readFileSync(dbFile);
  return JSON.parse(db);
};
// write file
export const writeData = (db) => {
    fs.writeFileSync(dbFile, db);
};