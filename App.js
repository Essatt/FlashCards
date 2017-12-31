import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation'
import { Constants } from 'expo'

import reducer from './reducers'
import { setLocalNotification } from './src/utils/helpers'
import { white, purple } from './src/utils/colors'
import DeckList from './src/components/DeckList'
import Deck from './src/components/Deck'
import CreateDeck from './src/components/CreateDeck'
import CreateCard from './src/components/CreateCard'
import Quiz from './src/components/Quiz'
import QuizResult from './src/components/QuizResult'

function TinyStatusBar ({ backgroundColor, ...props}){
  return(
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const MainNavigator = StackNavigator({
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


export default class App extends React.Component {
  componentDidMount () {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex:1}}>
          <TinyStatusBar backgroundColor={purple} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
