import * as fs from 'fs'
import * as path from 'path'
import * as url from 'url'

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
    .split('\n\n')

const seeds = input.shift()
    .split(':')
    [1]
    .trim()
    .split(' ')
    .map(x => +x)

const maps = input.map(section => {
    const data = section.split('\n')
        .slice(1)
        .map(row => {
            let [destination, source, length] = row.trim()
                .split(' ')
                .map(x => +x)

            return { destination, source, length }
        })
    
    return data
})

function process(value, map) {
    for (let { destination, source, length } of map) {
        if (value >= source && value < (source + length)) {
            const difference = value - source
            return destination + difference
        }
    }

    return value
}

let result = maps.reduce((p, c) => {
    return p.map(value => process(value, c))
}, seeds)

console.log(Math.min(...result))