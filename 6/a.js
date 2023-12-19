import * as fs from 'fs'
import * as path from 'path'
import * as url from 'url'

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
    .split('\n')
    .map(line => {
        let parts = line.split(/\s+/)
        return parts.slice(1).map(x => +x)
    })

const races = input[0].map((x, i) => {
    return {
        time: x,
        distance: input[1][i]
    }
})

const winningStrategies = races.map(race => {
    let results = []
    for (let i = 0; i <= race.time; i++) {
        let remaining = race.time - i

        let distanceTravelled = i * remaining

        results.push({
            timeHeld: i,
            timeRemaining: remaining,
            distance: distanceTravelled,
            wins: distanceTravelled > race.distance,
        })
    }

    return results.filter(x => x.wins).length
})

const result = winningStrategies.reduce((p, c) => p * c)

console.log(result)