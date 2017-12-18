import {
  CREATE_DECK,
  INITIALIZE_DECK,
  ADD_CARD,
} from '../actions/types'

function decks (state ={}, action){
  const { deck, id, type, card, deckId } = action
  let returnValue
  console.log('in the reducer')
  console.log(action)
  switch (type) {
    case CREATE_DECK:
      console.log('in create Deck')
      console.log(id)
      console.log(deck)
      console.log(state)
      returnValue = {...state}
      /*returnValue = {...state,
            state.decks:
            { ...state.decks, id }
          }*/
      returnValue[id] = {
        title: deck,
        questions: []
      }

      console.log(returnValue)

      return returnValue
/*
      return { ...state, ...state.decks,
          state.decks[id]: {
            title: {
              deck
            },
            questions: []
          }
          */

    case INITIALIZE_DECK:
      console.log('in initialize deck reducer')
      console.log(action.decks)
      let data = action.decks
      console.log(typeof(data))
      let result = { ...state, decks: {...data}}
      console.log(result)
      return result

    case ADD_CARD:
      returnValue =  { ...state}
      console.log(returnValue)
      returnValue[deckId].questions.push(card)
      return returnValue

    default:
      return state
  }
}

export default decks
