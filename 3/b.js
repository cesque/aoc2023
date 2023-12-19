class Grid {
    adjacencyMatrix = [
        [-1, -1],
        [-1,  0],
        [-1,  1],
        [ 0, -1],
        [ 0,  1],
        [ 1, -1],
        [ 1,  0],
        [ 1,  1],
    ]

    constructor(input, defaultValue = null) {
        this.grid = input.split('\n')
            .map(x => x.trim().split(''))
        this.defaultValue = defaultValue
    }

    height() {
        return this.grid.length
    }

    width() {
        return this.grid[0].length
    }

    get(y, x) {
        if (y < 0) return this.defaultValue
        if (y >= this.height()) return this.defaultValue
        if (x < 0) return this.defaultValue
        if (x >= this.width()) return this.defaultValue

        return this.grid[y][x]
    }

    neighbourCoords(y, x) {
        return this.adjacencyMatrix.map(item => {
            const [yA, xA] = item
            return [y + yA, x + xA]
        })
    }

    neighbours(y, x) {
        return this.neighboursEntries.map(entry => entry.value)
    }

    *neighboursEntries(y, x) {
        for (const [yA, xA] of this.neighbourCoords(y, x)) {
            yield {
                value: this.get(yA, xA),
                y: yA,
                x: xA,
            }
        }
    }

    forEach(fn) {
        for (let y = 0; y < this.height(); y++) {
            for (let x = 0; x < this.width(); x++) {
                fn(get(y, x), y, x)
            }
        }
    }

    *rows() {
        for (const row of this.grid) {
            yield row
        }
    }
    
    *entries() {
        for (let y = 0; y < this.height(); y++) {
            for (let x = 0; x < this.width(); x++) {
                yield {
                    value: this.get(y, x),
                    y,
                    x,
                }
            }
        }
    }

    select(y, x, dy, dx, n) {
        let results = []
        for(let i = 0; i < n; i++) {
            results.push(this.get(y, x))
            y += dy
            x += dx
        }
        return results
    }
}

function isNumber(c) {
    return /\d/.test(c);
}

import * as fs from 'fs'
import * as path from 'path'
import * as url from 'url'

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
const grid = new Grid(input)

let total = 0
for (const { value, y, x } of grid.entries()) {
    if(value != '*') continue
    
    let results = {}
    for (const { value: neighbourValue, y: yA, x: xA } of grid.neighboursEntries(y, x)) {
        if(!isNumber(neighbourValue)) continue;

        let xStart = xA
        let xEnd = xA
        while(isNumber(grid.get(yA, xStart - 1))) xStart -= 1

        let key = `${ yA }-${ xStart }`

        if (!results[key]) {
            while(isNumber(grid.get(yA, xEnd + 1))) xEnd += 1
            
            const difference = xEnd - xStart + 1
            const number = parseInt(grid.select(yA, xStart, 0, 1, difference).join(''))

            results[key] = number
        }
    }

    const values = Object.values(results)

    if (values.length == 2) {
        const product = values.reduce((p, c) => p * c)
        total += product
    }
}

console.log(total)