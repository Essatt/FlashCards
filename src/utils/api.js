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
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
}

export function getDeck(id){
  AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((data) => {
      return data.id
    })
}

export function saveDeckTitle(title, id){
  getDecks()
  .then(JSON.parse)
  .then(async (result) => {
    console.log(result)
    let decks
    if((result === null) || (Object.keys(result).length === 0 && result.constructor === Object)){
      //the deck is not initialized, so we set it to empty object
      decks = {}
      decks[id] = {
        "title": title,
        "questions": [],
      }
    }else{
      decks = {...result, id}
      decks[id] = {
        "title": title,
        "questions": [],
      }
    }

    console.log(decks)
    //we need this await, as the DeckList re-renders before this is executed
    await AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
  })
}

export function addCardToDeck(card, deckId){
  getDecks()
  .then(JSON.parse)
  .then((decks) => {
    //decks = {...decks}
    console.log(decks)
    decks[deckId].questions.push(card)
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
    .then(() => {
      let result = getDecks()
       console.log(result)
    })
  })
}
