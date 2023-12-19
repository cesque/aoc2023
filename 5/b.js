import * as fs from 'fs'
import * as path from 'path'
import * as url from 'url'
import Range from './Range.js'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

let input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
    .split('\n\n')

const seedRanges = input.shift()
    .split(':')
    [1]
    .trim()
    .split(' ')
    .map(x => +x)

let seeds = []
for (let i = 0; i < seedRanges.length; i += 2) {
    const [start, length] = seedRanges.slice(i, i + 2)

    seeds.push(new Range(start, start + length - 1))
}

const maps = input.map(section => {
    const data = section.split('\n')
        .slice(1)
        .map(row => {
            let [destination, start, length] = row.trim()
                .split(' ')
                .map(x => +x)

            let range = new Range(start, start + length - 1)

            return { 
                destination,
                range,
                offset: destination - range.start,
            }
        })
    
    return data
})

function split(array, fn) {
    return array.reduce(([t, f], x) => {
        return fn(x) ? [[...t, x], f] : [t, [...f, x]]
    }, [[], []])
}

function process(seedRanges, map) {
    let results = []

    let seeds = seedRanges.slice()

    for (let row of map) {
        let [applicableSeedRanges, nonApplicableSeedRanges] = split(seeds, item => item.isIntersecting(row.range))

        seeds = nonApplicableSeedRanges

        for (let range of applicableSeedRanges) {
            let { inside, outside } = range.intersect(row.range)

            results.push(inside.add(row.offset))
            seeds.push(...outside)
        }
    }

    return results.concat(seeds)
}

function consolidate(ranges) {
    let current = ranges.slice()
    let next = []

    let didConsolidation = true

    while (didConsolidation) {
        didConsolidation = false

        outer: for (let i = 0; i < current.length - 1; i++) {
            for (let j = i + 1; j < current.length; j++) {

                let a = current[i]
                let b = current[j]

                let result = a.consolidate(b)

                if (result) {
                    next.push(result)
                    didConsolidation = true
                    continue outer
                }
            }
        }

        let remaining = current.filter(range => {
            return next.every(other => !other.isIntersecting(range))
        })

        current = next.slice().concat(remaining)
        next = []
    }

    return current
}

function minValue(ranges) {
    let start = ranges.map(x => x.start)
    return Math.min(...start)
}

console.time('process')
for (let map of maps) {
    seeds = process(seeds, map)
    seeds = consolidate(seeds)
}
console.timeEnd('process')

console.log(minValue(seeds))
