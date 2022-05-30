const fetch = require('node-fetch')
const fs = require('fs')

const fetchJS = async () => {
  const urlBase = 
    'https://www.nytimes.com/games/wordle/'
  const url = urlBase + 'index.html'
  
  try {
    const html = await (await fetch(url)).text()
    
    const scriptName =
      html.match(/\<script src="(main\.[^"]+)"/)[1]
    const script = 
      await (await fetch(urlBase + scriptName)).text()
      
    const puzzleList = JSON.parse(
      script.match(/\[\s*["']CIGAR[^\]]+\]/i)[0]
        .toUpperCase()
    )
      
    return puzzleList.join('\n')
  } catch (err) {
    console.error(err)
  }
}

fetchJS().then(list =>
  fs.writeFileSync(
    './data/puzzle-words.txt',
    list
  )
)
  .then(() => console.log('Success'))
  .catch(err => console.error(err))