import { promises as fs } from 'fs'

const field = (await fs.readFile('./input.txt', 'utf-8'))
  .split('\n')
  .map((l) => l.split(''))

const checkAllDirs = (x, y, val) => {
  const checkRight = () => {
    for (let checkX = x + 1; checkX < field[y].length; checkX++) {
      if (field[y][checkX] >= val) return false
    }
    return true
  }
  const checkLeft = () => {
    for (let checkX = 0; checkX < x; checkX++) {
      if (field[y][checkX] >= val) return false
    }
    return true
  }
  const checkDown = () => {
    for (let checkY = y + 1; checkY < field.length; checkY++) {
      if (field[checkY][x] >= val) return false
    }
    return true
  }
  const checkUp = () => {
    for (let checkY = 0; checkY < y; checkY++) {
      if (field[checkY][x] >= val) return false
    }
    return true
  }

  return checkRight() || checkLeft() || checkDown() || checkUp()
}

const edgeTrees = field.length * 2 + field[0].length * 2 - 4
let visibleTrees = edgeTrees

for (let y = 1; y < field.length - 1; y++) {
  for (let x = 1; x < field[y].length - 1; x++) {
    if (checkAllDirs(x, y, field[y][x])) visibleTrees++
  }
}

console.log(visibleTrees)
