import { promises as fs } from 'fs'

const field = (await fs.readFile('./input.txt', 'utf-8'))
  .split('\n')
  .map((l) => l.split(''))

const checkAllDirs = (x, y, val) => {
  const checkRight = () => {
    for (let checkX = x + 1; checkX < field[y].length; checkX++) {
      if (field[y][checkX] >= val) return checkX - x
    }
    return field[y].length - 1 - x
  }
  const checkLeft = () => {
    for (let checkX = x - 1; checkX >= 0; checkX--) {
      if (field[y][checkX] >= val) return x - checkX
    }
    return x
  }
  const checkDown = () => {
    for (let checkY = y + 1; checkY < field.length; checkY++) {
      if (field[checkY][x] >= val) return checkY - y
    }
    return field.length - 1 - y
  }
  const checkUp = () => {
    for (let checkY = y - 1; checkY >= 0; checkY--) {
      if (field[checkY][x] >= val) return y - checkY
    }
    return y
  }

  return checkRight() * checkLeft() * checkDown() * checkUp()
}

let bestView = 0

for (let y = 1; y < field.length - 1; y++) {
  for (let x = 1; x < field[y].length - 1; x++) {
    const view = checkAllDirs(x, y, field[y][x])
    if (view > bestView) bestView = view
  }
}

console.log('bestView', bestView)
