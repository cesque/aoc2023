import * as fs from 'fs'
import * as path from 'path'
import * as url from 'url'

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let maxCubes = {
    red: 12,
    green: 13,
    blue: 14,
}

let games = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
    .split('\n')
    .map(x => x.trim())
    .map(x => {
        const [, id, game] = x.match(/^Game (\d+): (.*)$/)

        let rounds = game.split(';')
            .map(x => x.trim())
            .map(round => {
                let matches2 = [...round.matchAll(/((\d+) (red|green|blue))/g)]
                    .reduce((p, match) => {
                        let [,, amount, color] = match
                        return {
                            ...p,
                            [color]: +amount,
                        }
                    }, {})

                return matches2
            })

        return {
            id: +id,
            rounds,
        }
    })

let validGames = games.filter(game => {
    return game.rounds.every(round => {
        return (round.red ?? 0) <= maxCubes.red
            && (round.green ?? 0) <= maxCubes.green
            && (round.blue ?? 0) <= maxCubes.blue
    })
})

let result = validGames.reduce((p, c) => p + c.id, 0)

console.log(result)