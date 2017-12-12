import {
  CREATE_DECK,
  INITIALIZE_DECK,
  ADD_CARD,
} from '../actions/types'

function decks (state ={}, action){
  console.log('in the reducer')
  console.log(action)
  switch (action.type) {
    case CREATE_DECK:
      return state

    case INITIALIZE_DECK:
      console.log('in initialize deck reducer')
      console.log(action.decks)
      let data = action.decks
      console.log(typeof(data))
      let result = { ...state, decks: {...data}}
      console.log(result)
      return result

    case ADD_CARD:
      return state

    default:
      return state
  }
}

export default decks
