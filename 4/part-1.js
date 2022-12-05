import { promises as fs } from 'fs'

const input = await fs.readFile('./input.txt', 'utf-8')

const res = input
  .split('\n')
  .map((line) => {
    const [part1, part2] = line
      .split(',')
      .map((it) => it.split('-').map((it) => Number(it)))
    return (
      (part1[0] <= part2[0] && part1[1] >= part2[1]) ||
      (part2[0] <= part1[0] && part2[1] >= part1[1])
    )
  })
  .reduce((a, b) => (b ? a + 1 : a))

console.log(res)
