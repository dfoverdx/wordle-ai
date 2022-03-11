import { newFilledArray } from './helpers';

const digits = Number.rangeArray(10)
const firstDigits = digits.slice(1)

const templates = ['+', '-', '*', '/'].flatMap(op => [
  `_${op}___`,
  `__${op}__`,
  `___${op}_`,
])

export default class EasyProcessor {
  constructor(val) {
    const valLen = String(val).length
    this.temps = templates
      .filter(t =>
        (valLen !== 1 || !t.includes('+')) &&
        !t.includes(valLen > 2 ? '/' : '*') &&
        (valLen <= 3 || !t.includes('-'))
      )
      .shuffle()
  }
}