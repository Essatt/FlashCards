import {
  CREATE_DECK,
  INITIALIZE_DECK,
  ADD_CARD,
} from '../actions/types'

function decks (state ={}, action){
  const { deck, id, type, card, deckId } = action
  let returnValue
  switch (type) {
    case CREATE_DECK:
      returnValue = {...state}
      returnValue[id] = {
        title: deck,
        questions: []
      }
      return returnValue

    case INITIALIZE_DECK:
      let data = action.decks
      let result = { ...state, ...data}
      return result

    case ADD_CARD:
      returnValue =  { ...state}
      returnValue[deckId].questions.push(card)
      return returnValue

    default:
      return state
  }
}

export default decks
