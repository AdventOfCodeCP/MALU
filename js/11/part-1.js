import { promises as fs } from 'fs'

const input = (await fs.readFile('./input.txt', 'utf-8')).split('\n\n')

class Monkey {
  operationCount = 0
  constructor(id, items = [], operation, test) {
    this.id = id
    this.items = items
    this.operation = operation
    this.testF = test
  }

  performOperation() {
    const newItems = this.items.map((item) => {
      this.operationCount++
      return Math.floor(eval(this.operation.replaceAll('old', item)) / 3)
    })

    this.items = newItems
  }

  performTest() {
    const itemsWithId = this.items.map((item) => {
      return { id: this.testF(item), item }
    })

    this.items = []
    return itemsWithId
  }

  addItem(item) {
    this.items.push(item)
  }
}

const monkeys = new Map(
  input.map((m) => {
    const lines = m.split('\n')
    const id = Number(lines[0].split(' ')[1].slice(0, -1))
    const items = lines[1]
      .replaceAll(' ', '')
      .split(':')[1]
      .split(',')
      .map((c) => Number(c))

    const operation = lines[2].split('=')[1].trim()
    const [divisor, idTrue, idFalse] = lines.slice(3, lines.length).map((x) => x.split(' ').at(-1))
    const testFunction = (worry) => {
      return worry % divisor === 0 ? Number(idTrue) : Number(idFalse)
    }

    return [id, new Monkey(id, items, operation, testFunction)]
  })
)

for (let i = 0; i < 20; i++) {
  monkeys.forEach((monkey) => {
    monkey.performOperation()
    const itemsWithNewMonkeyId = monkey.performTest()
    itemsWithNewMonkeyId.forEach((itemWithId) => {
      monkeys.get(itemWithId.id).addItem(itemWithId.item)
    })
  })
}

const [monka1, monka2] = Array.from(monkeys.values())
  .map((m) => m.operationCount)
  .sort((a, b) => b - a)
  .slice(0, 2)

console.log(monka1 * monka2)
