import { promises as fs } from 'fs'

const input = await fs.readFile('./input.txt', 'utf-8')

let result
const mLength = 4
for (let i = 0; i <= input.length - mLength; i++) {
  let marker = []
  for (let j = 0; j < mLength; j++) {
    if (!marker.includes(input[i + j])) {
      marker.push(input[i + j])
    }
  }
  if (marker.length === mLength) {
    result = i + mLength
    break
  }
  marker = []
}

console.log(result)
