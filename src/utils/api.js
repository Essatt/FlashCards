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
  console.log(result)
  return result

}

export function getDecks(){
  let result =  AsyncStorage.getItem(DECK_STORAGE_KEY)
  console.log(result)
  return result
}

export function getDeck(id){
  AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((data) => {
      return data.id
    })
}

export function saveDeckTitle(title){

}

export function addCardToDeck(title, card){

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
