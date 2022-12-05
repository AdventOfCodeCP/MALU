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

const calcScore = ([a, b]) => {
  if (mapping[a].move === mapping[b].move) {
    return 3 + mapping[b].score
  }
  if (
    (mapping[a].move === 'rock' && mapping[b].move === 'paper') ||
    (mapping[a].move === 'paper' && mapping[b].move === 'scissor') ||
    (mapping[a].move === 'scissor' && mapping[b].move === 'rock')
  ) {
    return 6 + mapping[b].score
  }
  return mapping[b].score
}

const result = input
  .split('\n')
  .map((it) => calcScore(it.split(' ')))
  .reduce((prev, it) => prev + it)

console.log(result)
