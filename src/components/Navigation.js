import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'

import DeckList from './DeckList'
import Deck from './Deck'
import CreateDeck from './CreateDeck'
import CreateCard from './CreateCard'
import Quiz from './Quiz'
import QuizResult from './QuizResult'

export default class Navigation extends Component {

  render(){
    const Navigation = StackNavigator({
      Home: {
        screen: DeckList,
      },
      Deck: {
        screen: Deck,
      },
      CreateDeck: {
        screen: CreateDeck,
      },
      CreateCard: {
        screen: CreateCard,
      },
      Quiz: {
        screen: Quiz,
      },
      QuizResult: {
        screen: QuizResult,
      },
    })
    return (
      Navigation
    )
  }


}
