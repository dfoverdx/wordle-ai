import React, { useState, useEffect } from 'react'

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
  
  return val
}

export default useDictionary