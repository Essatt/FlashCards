import uuidv4 from 'uuid/v4'
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
  console.log(deck)
  console.log('in create deck action creator')
  return{
    type: CREATE_DECK,
    deck,
    id: uuidv4()
  }
}

export function addCard(card, deckId){
  console.log('in add cards action creator')
  return{
    type: ADD_CARD,
    card,
    deckId
    //id: uuidv4()
  }
}
