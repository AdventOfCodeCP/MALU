import { promises as fs } from 'fs'

const input = (await fs.readFile('./input.txt', 'utf-8')).split('\n')

class Node {
  constructor(name, children, parent, size, isDir) {
    this.name = name
    this.children = children
    this.parent = parent
    this.size = size
    this.isDir = isDir
  }

  calcSize() {
    const size =
      this.children.length > 0
        ? this.children.map((c) => c.calcSize()).reduce((a, b) => a + b)
        : this.size

    return size ?? 0
  }
}

const isCommand = (line) => line.split(' ')[0] === '$'

const getCommand = (line, lineNumber) => {
  const s = line.split(' ')
  return {
    command: s[1],
    parameter: s[2],
    lineNumber: lineNumber,
  }
}

const performCommand = (command) => {
  if (command.command === 'cd' && command.parameter === '..') {
    currentNode = currentNode.parent
  } else if (command.command === 'cd') {
    const newNode = currentNode
      ? currentNode.children.find((c) => c.name === command.parameter)
      : new Node('/', [], null, null)

    if (!currentNode) root = newNode
    currentNode = newNode
  } else if (command.command === 'ls') {
    for (let i = command.lineNumber + 1; i < input.length; i++) {
      if (isCommand(input[i])) break
      const node = getNode(input[i])
      currentNode.children.push(node)
    }
  }
}

const getNode = (line) => {
  const [info, name] = line.split(' ')
  return info === 'dir'
    ? new Node(name, [], currentNode, null, true)
    : new Node(name, [], currentNode, Number(info), false)
}

const traverse = (node) => {
  const sizes = [node.calcSize()]
  const rec = (node) => {
    node.children.forEach((c) => {
      if (c.isDir) {
        // const size = c.calcSize()
        sizes.push(c.calcSize())
        return rec(c)
      }
    })
  }

  rec(node)
  return sizes
}

let currentNode = null
let root = null
for (let i = 0; i < input.length; i++) {
  if (isCommand(input[i])) {
    const cmd = getCommand(input[i], i)
    performCommand(cmd)
  }
}

const dirs = traverse(root)

const usedSpace = root.calcSize()
const spaceToFree = 30000000 - (70000000 - usedSpace)
let smallestPossible = usedSpace
dirs.forEach((dir) => {
  if (dir >= spaceToFree && dir < smallestPossible) smallestPossible = dir
})
console.log(smallestPossible)
