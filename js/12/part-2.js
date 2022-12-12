import { promises as fs } from 'fs'

const input = (await fs.readFile('./input.txt', 'utf-8')).split('\n')

class Node {
  constructor(x, y, height, isVisited, dist) {
    this.x = x
    this.y = y
    this.height = height
    this.isVisited = isVisited
    this.distance = dist
    this.neighbours = []
  }
}

let startNode = null
let endNode = null

const nodesMap = input.map((line, xPos) => {
  return line.split('').map((c, yPos) => {
    const node = new Node(yPos, xPos, c.charCodeAt(0), false, Number.MAX_SAFE_INTEGER)

    if (c === 'S') {
      node.height = 'a'.charCodeAt(0)
      startNode = node
    }

    if (c === 'E') {
      node.height = 'z'.charCodeAt(0)
      endNode = node
    }

    return node
  })
})

const neighbours = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
]

nodesMap.forEach((line) => {
  line.forEach((node) => {
    const nodes = []
    neighbours.forEach((neighbour) => {
      if (!nodesMap[node.y + neighbour[1]]) return

      const current = nodesMap[node.y + neighbour[1]][node.x + neighbour[0]]
      if (current) {
        nodes.push(current)
      }
    })
    node.neighbours = nodes
  })
})

const resetMap = () => {
  nodesMap.forEach((line) => {
    line.map((node) => {
      return {
        ...node,
        distance: Number.MAX_SAFE_INTEGER,
        isVisited: false,
      }
    })
  })
}

const solve = (endNode) => {
  const queue = [endNode]
  while (queue.length) {
    queue.sort((a, b) => b.distance - a.distance)

    const node = queue.pop()
    for (const neighbour of node.neighbours) {
      if (neighbour.isVisited || node.height - neighbour.height > 1) {
        continue
      }

      const dist = node.distance + 1

      if (neighbour.x == startNode.x && neighbour.y == startNode.y && dist < neighbour.distance) {
        return dist
      }

      neighbour.isVisited = true
      neighbour.distance = Math.min(neighbour.distance, dist)
      queue.push(neighbour)
    }
  }

  return startNode.distance
}

let minDistance = Number.MAX_SAFE_INTEGER
nodesMap.forEach((line) => {
  line.forEach((node) => {
    if (node.height > 'a'.charCodeAt(0)) {
      return
    }

    startNode = node
    resetMap()

    const dist = solve({ ...endNode, distance: 0 })
    if (dist < minDistance) minDistance = dist
  })
})

console.log(minDistance)
