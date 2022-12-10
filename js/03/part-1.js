import { promises as fs } from 'fs'

const input = await fs.readFile('./input.txt', 'utf-8')

const sum = input
  .split('\n')
  .map((line) => {
    const part1 = line.slice(0, line.length / 2)
    const part2 = line.slice(line.length / 2, line.length)
    const dupl = [...part1].find((c) => part2.includes(c))
    return dupl === dupl.toUpperCase() ? dupl.charCodeAt(0) - 38 : dupl.charCodeAt(0) - 96
  })
  .reduce((a, b) => a + b)

console.log(sum)
