const fetch = require('node-fetch')
const fs = require('fs')

const fetchJS = async () => {
  const urlBase = 
    'https://www.nytimes.com/games/wordle/'
  const url = urlBase + 'index.html'
  
  try {
    const html = await (await fetch(url)).text()
    const scriptNames = [
      ...html.matchAll(
        /\<script [^>]*?src="(.+?(?<=\/)[\w.]+?\.js)"[^>]*?\>/sg
      )
    ].map(x => x[1])
    
    const list = (await Promise.all(
      scriptNames.map(async x => (await fetch(x)).text())
    ))
      .map(s => 
        s.match(/\[\s*["'](?:CIGAR|AAHED)[^\]]+\]/i)
      )
      .filter(x => !!x)
      .map(x => JSON.parse(x[0].toUpperCase()))[0]
      
    const cigarIdx = list.indexOf('CIGAR')
    return [
      list.slice(0, cigarIdx),
      list.slice(cigarIdx)
    ].map(x => x.join('\n'))

  } catch (err) {
    console.error(err)
  }
}

fetchJS().then(([allWords, puzzleWords]) => {
  fs.writeFileSync(
    './data/puzzle-words.txt',
    puzzleWords
  )
  fs.writeFileSync(
    './data/all-words.txt',
    allWords
  )
})
  .then(() => console.log('Success'))
  .catch(err => console.error(err))