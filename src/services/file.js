import Promise from 'bluebird';
import fs from 'fs';

const readFileAsync = Promise.promisify(fs.readFile);
const writeFileAsync = Promise.promisify(fs.writeFile);
const unlinkAsync = Promise.promisify(fs.unlink);
const fstat = Promise.promisify(fs.stat);

export { readFileAsync, writeFileAsync, unlinkAsync, fstat }