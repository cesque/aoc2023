import * as fs from 'fs'
import * as path from 'path'
import * as url from 'url'

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')

console.time('a')
let cards = input.split('\n')
    .map(x => x.trim())
    .map((line, i) => {
        const [, winningNumbersString, ourNumbersString] = line.match(/^Card\s+\d+: ([\d ]*) \| ([\d ]*)/)

        const winningNumbers = winningNumbersString.split(/\s+/)
            .filter(x => x.length > 0)
            .map(x => +x)
        const ourNumbers = ourNumbersString.split(/\s+/)
            .filter(x => x.length > 0)
            .map(x => +x)

        let matches = winningNumbers.filter(n => ourNumbers.includes(n))

        return {
            id: i,
            wins: new Array(matches.length).fill(0).map((_, ia) => i + ia + 1),
            copies: 1,
        }
    })

for (let i = 0; i < cards.length; i++) {
    let { wins, copies } = cards[i]

    for (let otherIndex of wins) {
        cards[otherIndex].copies += copies
    }
}

console.timeEnd('a')

console.log(cards.reduce((p, c) => p + c.copies, 0))
