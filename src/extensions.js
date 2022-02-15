Math.roundTo = (n, d) => Math.round(n * 10 ** d) / d
  
Math.randInt = (minOrMax, maxOrUndefined) => {
  const [min, max] = maxOrUndefined == null
    ? [0, minOrMax]
    : [minOrMax, maxOrUndefined + 1]
  const range = max - min
  return Math.floor(Math.random() * range) + min
}

Math.sum = (...vals) =>
  vals.flat().reduce((s, v) => s + v, 0)
Math.avg = (...vals) => Math.sum(...vals) / vals.length
Math.product = (...vals) =>
  vals.flat().reduce((p, v) => p * v, 1)
  
const _max = Math.max;
const _min = Math.min;

Math.max = (...vals) =>
  vals.flat().reduce((m, v) => 
    Number.isNaN(m)
      ? v
      : _max(m, v),
    NaN)
    
Math.min = (...vals) =>
  vals.flat().reduce((m, v) => 
    Number.isNaN(m)
      ? v
      : _min(m, v),
    NaN)

Array.prototype.eachAnd = function (cb) {
  this.forEach(cb)
  return this
}

Array.prototype.shuffle = function (inPlace = true) {
  const arr = inPlace ? this : [...this]
  return arr.eachAnd((_, idx) => {
    const sIdx = Math.randInt(idx, arr.length - 1);
    [arr[idx], arr[sIdx]] = [arr[sIdx], arr[idx]]
  })
}

Array.prototype.chooseRandom = function () {
  return this[Math.randInt(this.length)]
}

Array.prototype.joinNL = function () {
  return this.join('\n')
}

Object.defineProperty(
  Array.prototype, 
  'last',
  {
    get() {
      if (!this.length) {
        return undefined
      }
      
      return this[this.length - 1]
    },
    set(value) {
      if (!this.length) {
        throw new Error(
          'Array must have at least one value to set "last"'
        )
      }
      
      return this[this.length - 1] = value
    }
  }
)

Promise.sleep = (ms = 0) =>
  new Promise(res => setTimeout(res, ms))

Object.entries(
  Object.getOwnPropertyDescriptors(Array.prototype)
)
  .filter(([n, d]) =>
    !(n in String.prototype) &&
    typeof d.value === 'function'
  )
  .forEach(([n]) =>
    String.prototype[n] = String.prototype[n] ||
      function (...args) {
        return Array.from(this)[n](...args)
      }
  )

String.prototype.splitNL = function () {
  return this.split(/\r?\n/)
}
  
Object.mapObject = (obj, fn) =>
  Object.fromEntries(Object.entries(obj).map(fn))
  
global.l = (val = '', ...vals) => 
  console.log(val, ...vals)

l.count = 0
Object.defineProperty(l, 'x', {
  get() {
    l(++l.count)
    return l.count
  }
})

Object.defineProperty(global, 'dbg', {
  get() {
    return l.x
  }
})

global.lj = (sep, ...args) => l(args.join(sep))
global.ljs = lj.bind(null, ' ')
global.lje = lj.bind(null, '')
global.ljn = lj.bind(null, '\n')