import * as fs from 'fs'
import * as path from 'path'
import * as url from 'url'

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const [time, distance] = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
    .split('\n')
    .map(line => {
        let parts = line.split(/\s+/)
        return +parts.slice(1).join('')
    })

let total = 0
for (let i = 0; i <= time; i++) {
    let remaining = time - i
    let distanceTravelled = i * remaining

    if(distanceTravelled > distance) {
        total++
    }

}

console.log(total)