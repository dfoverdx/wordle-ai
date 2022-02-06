export const getLetterCounts = w => {
  const counts = {}
  w.forEach(c => counts[c] = (counts[c] || 0) + 1)
  return counts
}

export const tryWord = (todaysWord, guess) => {
  if (guess === todaysWord) {
    return newFilledArray(
      todaysWord.length,
      () => GREEN
    )
  }
  
  const counts = getLetterCounts(todaysWord)
  
  return guess
    .map((c, i) => {
      if (c === todaysWord[i]) {
        counts[c]--
        return GREEN
      } else {
        return c
      }
    })
    .map((c, i) => {
      if (c === GREEN) {
        return c
      }
      
      if (counts[c]) {
        counts[c]--
        return YELLOW
      }
      
      return GRAY
    })
}

const noop = () => {}
noop.x = () => {}
export const printMethods = print => print
  ? { l, lj, ljs, lje, ljn }
  : Object.mapObject(
      printMethods(true), 
      ([k]) => [k, noop]
    )

export const fArr = x => Array.from(x)
export const newFilledArray = (n, cb = () => null) =>
  new Array(n).fill().map(cb)
