import { AsyncStorage} from 'react-native'
const DECK_STORAGE_KEY = 'DECK_STORAGE_KEY:FLASHCARDS'

export function mockDB(){
  let data =
  {
    "React": {
      "title": "React",
      "questions": [
        {
          "question": "What is React?",
          "answer": "A library for managing user interfaces"
        },
        {
          "question": "Where do you make Ajax requests in React?",
          "answer": "The componentDidMount lifecycle event"
        }
      ]
    },
    "JavaScript": {
      "title": "JavaScript",
      "questions": [
        {
          "question": "What is a closure?",
          "answer": "The combination of a function and the lexical environment within which that function was declared."
        }
      ]
    }
  }
  let result= AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    .then(() => {
       return getDecks()
    })
  return result

}

export function clearData(){
  AsyncStorage.setItem(DECK_STORAGE_KEY, '')
}

export function getDecks(){
  let result = AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(JSON.parse)
    .then((result) => {
      return result
    })

  return result
}

export function getDeck(id){
  AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((data) => {
      return data.id
    })
}

export function saveDeckTitle(title, id){
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [id]: {
      "title": title,
      "questions": [],
    },
  }))



  /*
  let result = getDecks()
  console.log(result)
  if(Object.keys(result).length === 0 && result.constructor === Object){
    console.log('in the its empty section')
    let decks = {}
    decks[id] = {
      "title": title,
      "questions": [],
    }
  }else{
    console.log('in the its not sooo empty section')
    result = JSON.parse(result)

    let decks = {...result}
    console.log(decks)
    decks[id] = {
      "title": title,
      "questions": [],
    }
  }*/





  /*if(Object.keys(decks).length === 0 && decks.constructor === Object){
    let decks = {...result}
    decks[id] = {
      "title": title,
      "questions": [],
    }

    /*decks = {...decks, decks[id]:
                ...decks[id], {
                  "title": title,
                  "questions": [],
                }
              }
  }else{
    let decks[id] = {
      "title": title,
      "questions": [],
    }
  }*/




/*
  console.log(decks)
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
  .then(() => {
    let result = getDecks()
     console.log(result)
  })*/
}

export function addCardToDeck(card, deckId){
  let decks = getDecks()
  //decks = {...decks}
  console.log(decks)
  decks[deckId].questions.push(card)
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
  .then(() => {
    let result = getDecks()
     console.log(result)
  })
}






/*


export function fetchCalenderResults() {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
    .then(formatCalenderResults)
}

export function submitEntry({ entry, key }) {
  return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
    [key]: entry,
  }))
}

export function removeEntry(key) {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      console.log(data)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
    })
}
*/
