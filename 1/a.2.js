import * as fs from 'fs'
import * as path from 'path'
import * as url from 'url'

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let i = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
    .split('\n')
    .map(x => x.trim())

let result = i.reduce((p,c,m)=>(m=[...c.matchAll(/\d/g)],p+10*+m[0]+ +m.pop()),0)

console.log(result)
