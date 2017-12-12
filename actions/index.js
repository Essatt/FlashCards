import {
  CREATE_DECK,
  INITIALIZE_DECK,
  ADD_CARD,
} from './types'

export function initializeDecks(decks){




  
  console.log('in initialize deck action creator')
  console.log(decks)
  return{
    type: INITIALIZE_DECK,
    decks,
  }
}

export function createDeck(deck){
  console.log('in create deck action creator')
  return{
    type: CREATE_DECK,
    deck,
  }
}

export function addCard(card){
  console.log('in add cards action creator')
  return{
    type: ADD_CARD,
    card,
  }
}
