import { promises as fs } from 'fs'

const input = (await fs.readFile('./input.txt', 'utf-8'))
  .split('\n')
  .map((line) => line.split(' -> ').map((coords) => coords.split(',').map((x) => Number(x))))

const sandStartPos = [500, 0]

const placeRocks = () => {
  const data = input

  const rocks = new Set()

  let maxY = 0

  for (const line of data) {
    for (let i = 0; i < line.length - 1; i++) {
      let [x1, y1] = line[i]

      let [x2, y2] = line[i + 1]

      ;[x1, x2] = [x1, x2].sort((a, b) => a - b)
      ;[y1, y2] = [y1, y2].sort((a, b) => a - b)

      for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
          rocks.add(`${x} ${y}`)

          maxY = Math.max(maxY, y)
        }
      }
    }
  }

  return { rocks, maxY }
}

const solve = (rocks, maxY) => {
  let res = 0

  const drop = ([x, y]) => {
    if (rocks.has(`${x} ${y}`)) return false

    const sandDirs = [
      [0, 1],
      [-1, 1],
      [1, 1],
    ]

    if (y < maxY + 1) {
      for (let [sandDirX, sandDirY] of sandDirs) {
        const [newX, newY] = [x + sandDirX, y + sandDirY]

        if (!rocks.has(`${newX} ${newY}`)) {
          return drop([newX, newY])
        }
      }
    }

    res++

    rocks.add(`${x} ${y}`)
    return true
  }

  let canDrop = true
  do {
    canDrop = drop(sandStartPos)
  } while (canDrop)

  return res
}

const { rocks, maxY } = placeRocks()
console.log(solve(rocks, maxY))
