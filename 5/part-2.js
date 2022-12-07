import { promises as fs } from 'fs'

const input = await fs.readFile('./input.txt', 'utf-8')

const [stackInput, instructionInput] = input.split('\n\n')

// stacks
const stacks = []
stackInput
  .split('\n')
  .slice(0, -1)
  .forEach((line) => {
    let stackId = 0
    for (let i = 1; i < line.length; i += 4) {
      if (stacks.length <= stackId) {
        stacks.push([])
      }
      if (line[i] !== ' ') {
        stacks[stackId].push(line[i])
      }
      stackId++
    }
  })

stacks.forEach((stack) => {
  stack.reverse()
})

// instructions
const instructions = instructionInput.split('\n').map((line) => {
  const splitted = line.split(' ')
  const [count, start, end] = [splitted[1], splitted[3], splitted[5]].map((n) =>
    Number(n)
  )
  return {
    count,
    start,
    end,
  }
})

console.log(instructions)

instructions.forEach((inst) => {
  const startStack = stacks[inst.start - 1]
  const endStack = stacks[inst.end - 1]

  const items = startStack.splice(startStack.length - inst.count, inst.count)
  endStack.push(...items)
})

console.log(stacks)

let result = ''
stacks.forEach((stack) => (result += stack[stack.length - 1]))
console.log(result)
