import { promises as fs } from 'fs'

const input = await fs.readFile('./input.txt', 'utf-8')

const rock = {
  move: 'rock',
  score: 1,
}
const paper = {
  move: 'paper',
  score: 2,
}
const scissor = {
  move: 'scissor',
  score: 3,
}
const mapping = {
  A: rock,
  B: paper,
  C: scissor,
  X: rock,
  Y: paper,
  Z: scissor,
}

const calcScore = (a, b) => {
  if (a.move === b.move) {
    return 3 + b.score
  }
  if (
    (a.move === 'rock' && b.move === 'paper') ||
    (a.move === 'paper' && b.move === 'scissor') ||
    (a.move === 'scissor' && b.move === 'rock')
  ) {
    return 6 + b.score
  }
  return b.score
}

const moveMapping = {
  A: {
    X: scissor,
    Y: rock,
    Z: paper,
  },
  B: {
    X: rock,
    Y: paper,
    Z: scissor,
  },
  C: {
    X: paper,
    Y: scissor,
    Z: rock,
  },
}

const result = input
  .split('\n')
  .map((it) => {
    const [opp, result] = it.split(' ')
    const neededMove = moveMapping[opp][result]
    return calcScore(mapping[opp], neededMove)
  })
  .reduce((prev, it) => prev + it)

console.log(result)
