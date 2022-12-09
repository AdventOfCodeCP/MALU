import { promises as fs } from 'fs'

const input = (await fs.readFile('./input.txt', 'utf-8')).split('\n')

class Directory {
  constructor(name, parent) {
    this.name = name
    this.parent = parent
    this.subDirs = []
    this.size = 0
  }

  recSize() {
    return this.subDirs.length > 0
      ? this.size + this.subDirs.map((d) => d.recSize()).reduce((a, b) => a + b)
      : this.size
  }

  runCd(name) {
    const subDir = this.subDirs.find((d) => d.name === name)
    if (subDir) return subDir

    const newSubDir = new Directory(name, this)
    this.subDirs.push(newSubDir)
    return newSubDir
  }
}

const buildTree = (root) => {
  let currentDir = root

  for (let i = 1; i < input.length; i++) {
    const [p1, p2, dir] = input[i].split(' ')

    if (p1 === '$' && p2 === 'cd') {
      currentDir = dir === '..' ? currentDir.parent : currentDir.runCd(dir)
    }

    if (p1 !== '$' && p1 !== 'dir') {
      currentDir.size += Number(p1)
    }
  }
}

const traverse = (root) => {
  let totalSize = 0
  const rec = (dir) => {
    dir.subDirs.forEach((subDir) => {
      const size = subDir.recSize()
      if (size <= 100000) totalSize += size

      rec(subDir)
    })
  }
  rec(root)
  return totalSize
}

const root = new Directory('/', null)
buildTree(root)
console.log(traverse(root))
