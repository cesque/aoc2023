import * as fs from 'fs'
import * as path from 'path'
import * as url from 'url'

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
    .split('\n')
    .map(x => x.trim())
    .map(line => {
        const [, winningNumbersString, ourNumbersString] = line.match(/^Card\s+\d+: ([\d ]*) \| ([\d ]*)/)

        const winningNumbers = winningNumbersString.split(/\s+/)
            .filter(x => x.length > 0)
            .map(x => +x)
        const ourNumbers = ourNumbersString.split(/\s+/)
            .filter(x => x.length > 0)
            .map(x => +x)

        let matches = winningNumbers.filter(n => ourNumbers.includes(n))

        return matches.length > 0 ? 2 ** (matches.length - 1) : 0
    })
    .reduce((p, c) => p + c)

console.log(input)