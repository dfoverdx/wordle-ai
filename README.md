# Wordle AI

Counterintuitively, this project is an AI that solves [Wordle games](https://www.powerlanguage.co.uk/wordle/).  If the word inputted is one of the 2,315 that Wordle has or will use in its puzzles, the AI will choose words from the same list, otherwise it uses the list of the ~13,000 words that Wordle recognizes.

This project is a [WIP](https://lmgtfy.app/?q=WIP+meaning).  [YMMV](https://lmgtfy.app/?q=ymmv+meaning).

### Spoiler warning

If you do not wish to be spoiled, do not read the file `/data/puzzle-words`.  Unless, of course, you want to cheat to impress your friends with a bunch of first-guess wins.  I'm sure they'll never catch on.

## Install and run

### Windows

```sh
git clone git@github.com:dfoverdx/wordle-ai.git
cd wordle-ai
npm install
npm start
```

After that, open your browser to [http://localhost:3001/](http://localhost:3001/).

### Play.js

This project, against my better judgment, was written on my iPhone in [play.js](https://apps.apple.com/us/app/play-js-javascript-ide/id1423330822).  That's why the code files have line-lengths of 57, rather than the more standard 120 or 180.

To install and run, 

1. Open the app
2. Tap *New Sandbox*
3. Tap *Clone from git directory*
4. In *Repository address*, type `git@github.com:dfoverdx/wordle-ai.git`
5. I'm too lazy to determine the next steps
6. You're smart; you'll figure it out
   - Alternatively, you're not smart; you won't figure it out.  You may skip the next steps!  🥳
7. Tap the ▶️ button
8. Tap the 🌐 button
