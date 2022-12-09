import { promises as fs } from 'fs'

const cmds = (await fs.readFile('./input.txt', 'utf-8')).split('\n').map((line) => {
  const [dir, count] = line.split(' ')
  return { dir, count: Number(count) }
})

const solve = () => {
  let head = { x: 0, y: 0 }
  let tail = { x: 0, y: 0 }
  const visitedPoints = [tail]

  const performMoves = (command) => {
    for (let i = 0; i < command.count; i++) {
      head = move(head, command.dir)
      tail = moveTail()

      if (!visitedPoints.find((p) => p.x === tail.x && p.y === tail.y)) {
        visitedPoints.push(tail)
      }
    }
  }

  const move = (prev, dir) => {
    if (dir === 'U') return { x: prev.x, y: prev.y + 1 }
    if (dir === 'D') return { x: prev.x, y: prev.y - 1 }
    if (dir === 'L') return { x: prev.x - 1, y: prev.y }
    if (dir === 'R') return { x: prev.x + 1, y: prev.y }
  }

  const moveTail = () => {
    const xDist = Math.abs(head.x - tail.x)
    const yDist = Math.abs(head.y - tail.y)
    if (xDist <= 1 && yDist <= 1) return tail

    if (xDist === 0) {
      return head.y > tail.y ? move(tail, 'U') : move(tail, 'D')
    }
    if (yDist === 0) {
      return head.x > tail.x ? move(tail, 'R') : move(tail, 'L')
    }
    const moveUp = head.y > tail.y ? move(tail, 'U') : move(tail, 'D')
    return head.x > tail.x ? move(moveUp, 'R') : move(moveUp, 'L')
  }

  cmds.forEach((cmd) => {
    performMoves(cmd)
  })

  return visitedPoints.length
}

console.log(solve())
