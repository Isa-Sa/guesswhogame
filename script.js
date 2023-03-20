const board = document.getElementById('board')
const questions = document.getElementById('questions')
const restartButton = document.getElementById('restart')
const filter = document.getElementById('filter')
const winOrLose = document.getElementById('winOrLose')
const playAgain = document.getElementById('playAgain')

// Character Objects
const CHARACTERS = [
  {
    name: 'Jabala',
    img: 'images/jabala.svg',
    hair: 'hidden',
    eyes: 'hidden',
    accessories: ['glasses', 'a hat'],
    other: []
  },
  {
    name: 'Jack',
    img: 'images/jack.svg',
    hair: 'hidden',
    eyes: 'blue',
    accessories: ['a hat'],
    other: []
  },
  {
    name: 'Jacques',
    img: 'images/jacques.svg',
    hair: 'grey',
    eyes: 'blue',
    accessories: ['a hat'],
    other: ['smoke']
  },
  {
    name: 'Jai',
    img: 'images/jai.svg',
    hair: 'black',
    eyes: 'brown',
    accessories: ['a tie'],
    other: []
  },
  {
    name: 'Jake',
    img: 'images/jake.svg',
    hair: 'blonde',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'James',
    img: 'images/james.svg',
    hair: 'brown',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jade',
    img: 'images/jade.svg',
    hair: 'black',
    eyes: 'hidden',
    accessories: ['glasses', 'jewellry'],
    other: []
  },
  {
    name: 'Jane',
    img: 'images/jane.svg',
    hair: 'blonde',
    eyes: 'hidden',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jacqueline',
    img: 'images/jacqueline.svg',
    hair: 'orange',
    eyes: 'green',
    accessories: ['glasses', 'jewellry'],
    other: []
  },

  {
    name: 'Jazebelle',
    img: 'images/jazebelle.svg',
    hair: 'purple',
    eyes: 'hidden',
    accessories: ['glasses'],
    other: ['smoke']
  },
  {
    name: 'Jasper',
    img: 'images/jasper.svg',
    hair: 'brown',
    eyes: 'blue',
    accessories: ['glasses', 'a hat'],
    other: ['smoke']
  },
  {
    name: 'Jeane',
    img: 'images/jeane.svg',
    hair: 'brown',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jed',
    img: 'images/jed.svg',
    hair: 'orange',
    eyes: 'green',
    accessories: ['glasses', 'a hat'],
    other: ['smoke']
  },
  {
    name: 'Jenni',
    img: 'images/jenni.svg',
    hair: 'hidden',
    eyes: 'hidden',
    accessories: ['a hat'],
    other: []
  },
  {
    name: 'Juliette',
    img: 'images/juliette.svg',
    hair: 'orange',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jerry',
    img: 'images/jerry.svg',
    hair: 'hidden',
    eyes: 'blue',
    accessories: ['a hat'],
    other: []
  },
  {
    name: 'Jess',
    img: 'images/jess.svg',
    hair: 'black',
    eyes: 'blue',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jocelyn',
    img: 'images/jocelyn.svg',
    hair: 'black',
    eyes: 'brown',
    accessories: ['glasses', 'jewellry'],
    other: []
  },
  {
    name: 'Jon',
    img: 'images/jon.svg',
    hair: 'brown',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jordan',
    img: 'images/jordan.svg',
    hair: 'blonde',
    eyes: 'hidden',
    accessories: ['glasses', 'a hat', 'jewellry'],
    other: []
  },
  {
    name: 'Josephine',
    img: 'images/josephine.svg',
    hair: 'grey',
    eyes: 'brown',
    accessories: ['jewellry'],
    other: []
  },
  {
    name: 'Josh',
    img: 'images/josh.svg',
    hair: 'blonde',
    eyes: 'green',
    accessories: [],
    other: []
  },
  {
    name: 'Jude',
    img: 'images/jude.svg',
    hair: 'black',
    eyes: 'green',
    accessories: ['a tie'],
    other: []
  },
  {
    name: 'Julie',
    img: 'images/julie.svg',
    hair: 'black',
    eyes: 'brown',
    accessories: ['glasses', 'a hat'],
    other: []
  },
]

let secretPlayer
let currentQuestion
let charactersInPlay 
let personToCheck

// Game board draw
const generateBoard = () => {
  CHARACTERS.map(charactersInPlay => {
  });
    board.innerHTML = ''
    charactersInPlay.forEach((person) => {
        board.innerHTML += `
          <div class="card">
            <p>${person.name}</p>
            <img src=${person.img} alt=${person.name}>
            <div class="guess">
              <span>Guess on ${person.name}?</span>
              <button class="filled-button small" onclick="guess('${person.name}')">Guess</button>
            </div>
          </div>
        `
  })
};

const setSecretPlayer = () => {
  
  secretPlayer = charactersInPlay[Math.floor(Math.random() * charactersInPlay.length)]
}

// Start & Restart function
const start = () => {
  charactersInPlay = CHARACTERS;

  generateBoard(); 
  setSecretPlayer();
  selectQuestion();
}

// Setting currentQuestion object when something is selected in dropdown
const selectQuestion = () => {
  const category = questions.options[questions.selectedIndex].parentNode.label


  const value = questions.value

  currentQuestion = {
    category: category,
    value: value,
  }

}
const checkQuestion = () => {
  const { category, value } = currentQuestion
  
  if (category === 'hair' || category === 'eyes' ) {

    if(secretPlayer[category] === value) {
      filterCharacters(true)
      console.log('if true', value)

    } else  {
      filterCharacters(false)
      console.log('false', value)
    }

 } else if (category === 'accessories' || category === 'other') {
    if (secretPlayer[category].includes(value)) {
      filterCharacters(true)
    } else {
      filterCharacters(false)
    }
  }
}

// Filter characters array and redraw game board
const filterCharacters = (keep) => {
  console.log('hello', keep);
 
  const { category, value } = currentQuestion
 
  if (category === 'accessories') {
    if (keep) {
      alert(
        `Yes, the person wears ${value}! Keep all people that wear ${value}.`
      )
      charactersInPlay = charactersInPlay.filter((person) => person[category].includes(value));
    
    } else {
      
      alert(
        `No, the person doesn't wear ${value}! Remove all people that wear ${value}.`
      )
        charactersInPlay = charactersInPlay.filter((person) => !person[category].includes(value))
    }
  } else if (category === 'other') {
    if (keep) {
      alert(
        `Yes, the person does ${value}! Keep all people that smoke.`
      )
      charactersInPlay = charactersInPlay.filter((person) => person[category].includes(value))
    } else {
      alert(
        `No, the person doesn't ${value}! Remove all people that ${value}.`
      )
      charactersInPlay = charactersInPlay.filter((person) => !person[category].includes(value))
    }
  } else if(category === 'hair') {
      if (keep) {
      alert(
        `Yes, the person has ${value} hair! Keep all people with ${value} hair.`
      );
      charactersInPlay = charactersInPlay.filter((person) => person[category] === value)
      } else {
      alert(`No, the person doesnt have ${value} hair! Remove all people with ${value} hair.`)
      charactersInPlay = charactersInPlay.filter((person) => person[category] !== value)
    }
  }
 
  else if(category === "eyes") {
    if (keep) {
      alert(
        `Yes, the person has ${value} eyes! Keep all people with ${value} eyes.`
      )
      charactersInPlay = charactersInPlay.filter((person) => person[category] === value)
    } else {
      alert(`No, the person doesnt have ${value} eyes! Remove all people with ${value} eyes.`)
      charactersInPlay = charactersInPlay.filter((person) => person[category] !== value)
    }
    
  }
  
  generateBoard()
}

// Confirm guess
const guess = (personToConfirm) => {
  const playerGuess = confirm('Are you sure you want to make a guess?') 

  if (playerGuess) {
    checkMyGuess(personToConfirm)
  }
}

const checkMyGuess = (personToCheck) => {

  if (personToCheck === secretPlayer.name) {
    console.log('check my guess', winOrLose)
    winOrLose.style.display = 'flex',
    winOrLose.innerHTML = `Congratulation! You won!`
    board.style.display = 'none'
  } else {
    winOrLose.style.display = 'flex',
    winOrLose.innerHTML = `Oh no! It was not ${personToCheck}. <br> The secret player is ${secretPlayer.name}.`
    board.style.display = 'none'
  }
   console.log('secret ', secretPlayer.name)

}
reload = () => {
  window.location.reload()
  
}

start()

// Event listeners
restartButton.addEventListener('click', start)
filter.addEventListener("click", checkQuestion);
questions.onchange = selectQuestion;