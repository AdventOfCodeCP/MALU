import { promises as fs } from 'fs'

const pairs = (await fs.readFile('./input.txt', 'utf-8'))
  .split('\n\n')
  .map((lines) => lines.split('\n').map((line) => JSON.parse(line)))

const solve = () => {
  const compare = ([part1, part2]) => {
    if ([part1, part2].every(Number.isInteger)) {
      if (part1 === part2) return null

      return part1 < part2
    }

    if ([part1, part2].every(Array.isArray)) {
      for (let i = 0; i < Math.min(part1.length, part2.length); i++) {
        const compared = compare([part1[i], part2[i]])

        if (compared !== null) return compared
      }

      return compare([part1.length, part2.length])
    }

    return compare([[part1].flat(), [part2].flat()])
  }

  const dividers = [[[2]], [[6]]]
  return [...pairs.flat(), ...dividers]
    .sort((pair1, pair2) => compare([pair2, pair1]) - compare([pair1, pair2]))
    .reduce((acc, current, index) => (dividers.includes(current) ? acc * (index + 1) : acc), 1)
}

console.log(solve())
