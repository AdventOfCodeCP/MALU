import { promises as fs } from 'fs'

const input = (await fs.readFile('./input.txt', 'utf-8')).split('\n')

const solve = () => {
  let cycleCount = 0
  let cycleOfInterest = 20
  let addX = 1
  const signals = []

  const checkCycle = () => {
    if (cycleCount !== cycleOfInterest) return

    signals.push(cycleCount * addX)
    cycleOfInterest += 40
  }

  input.forEach((line) => {
    cycleCount += 1
    checkCycle()
    if (line !== 'noop') {
      cycleCount += 1
      checkCycle()
      addX += Number(line.split(' ')[1])
    }
  })

  return signals.reduce((a, b) => a + b)
}

console.log(solve())
