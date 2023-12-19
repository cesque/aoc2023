import * as fs from 'fs'
import * as path from 'path'
import * as url from 'url'

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cardSymbols = 'J23456789TJQKA'

function getCardCounts(hand) {
    let results = []
    let jokers = 0

    for (let card of hand) {
        if (card == 'J') {
            jokers++
            continue
        }

        let entry = results.find(x => x.card == card)

        if (entry) {
            entry.total += 1
        } else {
            results.push({
                card,
                total: 1,
            })
        }
    }

    let sorted = results.sort((a, b) => {
        return b.total - a.total
    })

    if (sorted.length) sorted[0].total += jokers

    return sorted
}

function getHandType(hand) {
    const counts = getCardCounts(hand)

    const hash = counts.map(card => card.total.toString()).join('')
    
    switch (hash) {
        case '5': case '': return 'five of a kind'
        case '41': return 'four of a kind'
        case '32': return 'full house'
        case '311': return 'three of a kind'
        case '221': return 'two pair'
        case '2111': return 'one pair'
        case '11111': return 'high card'
        default: throw `unknown hand type ${ counts }`
    }
}

function getHandScoreOfType(hand) {
    const handType = getHandType(hand)

    return [
        'high card',
        'one pair',
        'two pair',
        'three of a kind',
        'full house',
        'four of a kind',
        'five of a kind',
    ].indexOf(handType)
}

function compare(a, b) {
    const aScore = getHandScoreOfType(a.cards)
    const bScore = getHandScoreOfType(b.cards)

    if(aScore == bScore){ 
        for (let i = 0; i < a.cards.length; i++) {
            if (a.cards[i] != b.cards[i]) {
                return cardSymbols.indexOf(a.cards[i]) - cardSymbols.indexOf(b.cards[i])
            }
        }
    }

    return aScore - bScore
}

const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
    .split('\n')
    .map(line => {
        const [cardsString, bidString] = line.split(' ')
        const bid = +bidString

        const cards = cardsString.split('')

        return {
            cardsString,
            cards,
            bid,
            type: getHandType(cards)
        }
    })
    .sort(compare)
    .map((item, i) => {
        return item.bid * (i + 1)
    })
    .reduce((p, c) => p + c)

console.log(input)