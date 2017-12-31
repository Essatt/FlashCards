import uuidv4 from 'uuid/v4'
import {
  CREATE_DECK,
  INITIALIZE_DECK,
  ADD_CARD,
} from './types'

export function initializeDecks(decks){
  return{
    type: INITIALIZE_DECK,
    decks,
  }
}

export function createDeck(deck){
  return{
    type: CREATE_DECK,
    deck,
    id: uuidv4()
  }
}

export function addCard(card, deckId){
  return{
    type: ADD_CARD,
    card,
    deckId
  }
}
