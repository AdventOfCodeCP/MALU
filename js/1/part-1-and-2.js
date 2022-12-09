import { promises as fs } from 'fs'

const input = await fs.readFile('./input.txt', 'utf-8')

const calories = input
  .split('\n\n')
  .map((it) =>
    it
      .split('\n')
      .map((it) => Number(it))
      .reduce((a, b) => a + b)
  )
  .sort((a, b) => b - a)

// part 1
console.log(calories[0])
// part 2
console.log(calories.slice(0, 3).reduce((a, b) => a + b))
