import * as fs from 'fs'
import * as path from 'path'
import * as url from 'url'

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
    .split('\n')
    .map(x => x.trim())

const numbers = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
]

const result = input.reduce((p, c) => {
    const firstRegex = new RegExp(`^.*?(\\d|${ numbers.join('|') })`)
    const secondRegex = new RegExp(`^.*(\\d|${ numbers.join('|') })`)
    const firstString = c.match(firstRegex)[1]
    const secondString = c.match(secondRegex)[1]

    const first = parseInt(firstString) || numbers.indexOf(firstString) + 1
    const second = parseInt(secondString) || numbers.indexOf(secondString) + 1

    return p + (first * 10) + second
}, 0)

console.log(result)