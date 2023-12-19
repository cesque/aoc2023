export default class Range {
    // inclusive
    constructor(start, end) {
        this.start = start
        this.end = end
    }

    length() {
        return this.end - this.start + 1
    }

    split(value) {
        if (value == 0 || value < this.start) return [null, this]
        if (value > this.end) return [this, null]

        return [
            new Range(this.start, value - 1),
            new Range(value, this.end)
        ]
    }

    includes(value) {
        return value >= this.start && value <= this.end
    }

    consolidate(range) {
        if(!(this.isIntersecting(range) || this.isAdjacent(range))) return null

        const min = Math.min(this.start, range.start)
        const max = Math.max(this.end, range.end)

        return new Range(min, max)
    }

    isIntersecting(range) {
        let isEntirelyBelow = this.end < range.start
        let isEntirelyAbove = this.start > range.end
        return !(isEntirelyAbove || isEntirelyBelow)
    }

    isAdjacent(range) {
        return this.start == range.end + 1 || this.end == range.start - 1
    }

    intersect(range) {
        if(!this.isIntersecting(range)) {
            return {
                inside: null,
                outside: [this]
            }
        }

        let inside = new Range(Math.max(this.start, range.start), Math.min(this.end, range.end))

        let beforeStart = this.start >= range.start ? null : new Range(this.start, range.start - 1)
        let afterEnd = this.end <= range.end ? null : new Range(range.end + 1, this.end)

        return {
            inside,
            outside: [beforeStart, afterEnd].filter(x => x != null)
        }
    }

    add(offset) {
        if (this.start + offset < 0) throw this
        return new Range(this.start + offset, this.end + offset)
    }

    toString() {
        return `${ this.start } -> ${ this.end }`
    }
}