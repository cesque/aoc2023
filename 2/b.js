import * as fs from 'fs'
import * as path from 'path'
import * as url from 'url'

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

let powers = games.map(game => {
    let minCubes = game.rounds.reduce((p, c) => {
        return {
            red: Math.max(p.red ?? 0, c.red ?? 0),
            green: Math.max(p.green ?? 0, c.green ?? 0),
            blue: Math.max(p.blue ?? 0, c.blue ?? 0),
        }
    })

    return minCubes.red * minCubes.green * minCubes.blue
})

let total = powers.reduce((p, c) => p + c)

console.log(total)