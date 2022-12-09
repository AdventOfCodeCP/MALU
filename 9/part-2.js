import { promises as fs } from 'fs'

const cmds = (await fs.readFile('./input.txt', 'utf-8')).split('\n').map((line) => {
  const [dir, count] = line.split(' ')
  return { dir, count: Number(count) }
})

const solve = () => {
  let head = { x: 0, y: 0 }
  let tails = Array(9).fill({ x: 0, y: 0 })
  const visitedPoints = [head]

  const performMoves = (command) => {
    for (let i = 0; i < command.count; i++) {
      head = move(head, command.dir)
      for (let j = 0; j < tails.length; j++) {
        const next = j > 0 ? tails[j - 1] : head
        tails[j] = moveTail(next, tails[j])

        if (j === tails.length - 1 && !visitedPoints.find((p) => p.x === tails[j].x && p.y === tails[j].y)) {
          visitedPoints.push(tails[j])
        }
      }
      // console.log('newStep', [head].concat(tails))
    }
  }

  const move = (prev, dir) => {
    if (dir === 'U') {
      return { x: prev.x, y: prev.y + 1 }
    } else if (dir === 'D') {
      return { x: prev.x, y: prev.y - 1 }
    } else if (dir === 'L') {
      return { x: prev.x - 1, y: prev.y }
    } else if (dir === 'R') {
      return { x: prev.x + 1, y: prev.y }
    }
  }

  const moveTail = (next, self) => {
    const xDist = Math.abs(next.x - self.x)
    const yDist = Math.abs(next.y - self.y)
    if (xDist <= 1 && yDist <= 1) return self

    if (xDist === 0) {
      return next.y > self.y ? move(self, 'U') : move(self, 'D')
    }
    if (yDist === 0) {
      return next.x > self.x ? move(self, 'R') : move(self, 'L')
    }
    const moveUp = next.y > self.y ? move(self, 'U') : move(self, 'D')
    return next.x > self.x ? move(moveUp, 'R') : move(moveUp, 'L')
  }

  cmds.forEach((cmd) => {
    performMoves(cmd)
  })

  console.log(visitedPoints.length)
}

solve()
