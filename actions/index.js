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

export function createDeck(deck, id){
  return{
    type: CREATE_DECK,
    deck,
    id
  }
}

export function addCard(card, deckId){
  return{
    type: ADD_CARD,
    card,
    deckId
  }
}
