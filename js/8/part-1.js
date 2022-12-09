import { promises as fs } from 'fs'

const field = (await fs.readFile('./input.txt', 'utf-8')).split('\n').map((l) => l.split(''))

const checkAllDirs = (x, y, val) => {
  const right = field[y].slice(x + 1, field[y].length).every((v) => v < val)

  const left = field[y].slice(0, x).every((v) => v < val)

  const down = field
    .map((f) => f[x])
    .slice(y + 1, field.length)
    .every((v) => v < val)

  const up = field
    .map((f) => f[x])
    .slice(0, y)
    .every((v) => v < val)

  return right || left || down || up
}

const edgeTrees = field.length * 2 + field[0].length * 2 - 4
let visibleTrees = edgeTrees

for (let y = 1; y < field.length - 1; y++) {
  for (let x = 1; x < field[y].length - 1; x++) {
    if (checkAllDirs(x, y, field[y][x])) visibleTrees++
  }
}

console.log(visibleTrees)
