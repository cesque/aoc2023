import * as fs from 'fs'
import * as path from 'path'
import * as url from 'url'

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
    .split('\n')
    .map(x => x.trim())

let result = input.reduce((p, c) => {
    let first = +c.match(/^[^\d]*(\d)/)[1]
    let last = +c.match(/(\d)[^\d]*$/)[1]

    return p + (first * 10) + last
}, 0)

console.log(result)