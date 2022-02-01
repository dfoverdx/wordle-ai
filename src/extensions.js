Math.roundTo = (n, d) => Math.round(n * 10 ** d) / d
  
Math.randInt = (minOrMax, maxOrUndefined) => {
  const [min, max] = maxOrUndefined == null
    ? [0, minOrMax]
    : [minOrMax, maxOrUndefined + 1]
  const range = max - min
  return Math.floor(Math.random() * range) + min
}

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
  
Object.mapObject = (obj, fn) =>
  Object.fromEntries(Object.entries(obj).map(fn))
  
global.l = console.log.bind(console)
l.count = 0
Object.defineProperty(l, 'x', {
  get() {
    return l(++l.count)
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