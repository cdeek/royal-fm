import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbUser = path.resolve(__dirname, './data/user.json');
const dbFile = path.resolve(__dirname, './data/db.json');

// read file
export const readData = () => {
  const user = fs.readFileSync(dbUser);
  const db = fs.readFileSync(dbFile);
  return {data: JSON.parse(db), user: JSON.parse(user)};
};
// write file
export const writeUser = (db) => {
    fs.writeFileSync(dbUser, db);
};
export const writeData = (db) => {
    fs.writeFileSync(dbFile, db);
};