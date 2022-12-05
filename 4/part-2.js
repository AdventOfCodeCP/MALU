import { promises as fs } from 'fs'

const input = await fs.readFile('./input.txt', 'utf-8')

const res = input
  .split('\n')
  .map((line) => {
    const [part1, part2] = line
      .split(',')
      .map((it) => it.split('-').map((it) => Number(it)))

    const arr1 = [...Array(part1[1] - part1[0] + 1).keys()].map(
      (it) => it + part1[0]
    )
    const arr2 = [...Array(part2[1] - part2[0] + 1).keys()].map(
      (it) => it + part2[0]
    )

    let overlap = false
    for (let i = 0; i < arr1.length; i++) {
      if (arr2.includes(arr1[i])) {
        overlap = true
        break
      }
    }
    return overlap
  })
  .reduce((a, b) => (b ? a + 1 : a))

console.log(res)
