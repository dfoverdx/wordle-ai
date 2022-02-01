import React, { useState, useEffect } from 'react'

export const useDictionary = () => {
  const [val, setVal] = useState([])

  useEffect(() => {
    fetch('./data/5-letter-words.txt')
      .then(res => res.text())
      .then(body => {
        
        setVal(body.toUpperCase().split('\n'))
      })
      .catch(e => console.error(e.message))
  }, [])
  
  return val
}