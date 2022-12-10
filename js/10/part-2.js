import { promises as fs } from 'fs'

const input = (await fs.readFile('./input.txt', 'utf-8')).split('\n')

const solve = () => {
  let spritePosition = 1
  let line = 0
  const screen = []

  const checkCycle = () => {
    if (screen[line].length === 40) line += 1
  }

  const draw = () => {
    if (screen.length <= line) screen.push('')

    const sprite = [spritePosition - 1, spritePosition, spritePosition + 1]
    screen[line] += sprite.includes(screen[line].length) ? '#' : '.'
  }

  input.forEach((line) => {
    draw()
    checkCycle()
    if (line !== 'noop') {
      draw()
      checkCycle()
      spritePosition += Number(line.split(' ')[1])
    }
  })

  return screen
}

console.log(solve())
