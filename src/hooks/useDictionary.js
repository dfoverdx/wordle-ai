import React, { useState, useEffect } from 'react'
import { getLetterCounts } from '../ai/helpers'

const getList = url =>
  fetch(url)
    .then(res => res.text())
    .then(txt => txt.toUpperCase().split('\n'))

const useDictionary = () => {
  const [val, setVal] = useState([[], []])

  useEffect(() => {
    Promise.all([
      getList('./data/puzzle-words.txt'),
      getList('./data/all-words.txt'),
    ])
      .then(([p, a]) => 
        [p, Array.from(new Set([...p, ...a]))]
      )
      .then(value => setVal(value))
      .catch(e => console.error(e.message))
  }, [])
  
  useEffect(() => {
    const lowLetterWords = val[1]
      .map(w => [w, new Set(w).size])
      .sort((a, b) => a[1] - b[1])
      .filter((x, _, a) => x[1] === a[0][1])
      .map(x => x[0])
      
    l(lowLetterWords)
      
    // const letterPosCounts = newFilledArray(5, () => [])
    // val[0].forEach(w => w.forEach((c, i) =>
    //   letterPosCounts[i][c] = 
    //     (letterPosCounts[i][c] || 0) + 1
    // ))

    // const puzzleWordCounts = val[0]
    //   .map(x => [
    //     x, 
    //     getLetterCounts(x),
    //     x.map((c, i) => )
    //   ])
      
  }, [val])
  
  return val
}

export default useDictionary