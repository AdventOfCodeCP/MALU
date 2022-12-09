import { promises as fs } from 'fs'

const input = await fs.readFile('./input.txt', 'utf-8')

const sum = input
  .match(/(?=[\s\S])(?:.*\n?){3}/g)
  .map((group) => {
    const [elf1, elf2, elf3] = group.split('\n')
    const common = [...elf1].find((c) => elf2.includes(c) && elf3.includes(c))
    return common === common.toUpperCase() ? common.charCodeAt(0) - 38 : common.charCodeAt(0) - 96
  })
  .reduce((a, b) => a + b)

console.log(sum)
