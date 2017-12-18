import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { Card, CardSection } from '../common'
//import Deck from './Deck'
import { mockDB, getDecks } from '../utils/api'
import { initializeDecks } from '../../actions'
import { objToArray } from '../utils/helpers'

class DeckList extends Component {
  /*componentDidMount(){
    mockDB()
      .then(getDecks())
      .then((decks) => {
        console.log(decks)
        this.props.dispatch(initializeDecks(JSON.parse(decks)))
        return
      })
      .then(() => console.log(this.props))
  }*/



  getDecks() {
    const { decks } = this.props
    console.log(this.props)
    console.log(decks)
    let dataArray
    if (decks !== undefined){
      dataArray = objToArray(decks)
      console.log(dataArray)
      let decksUI = dataArray.map((deck) => {
        console.log(deck)
        return(
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate(
            'Deck',
            { deckId: deck.key})}
            key={deck.key}
          >
            <Card>
              <Text style={styles.deckTitle}>{deck.title}</Text>
              <Text style={styles.cardNumber}>{`${deck.questions.length} Cards`}</Text>
            </Card>
          </TouchableOpacity>
        )

      })

      return decksUI
    }


  }

  createDeckSection = () => {
    return(
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('CreateDeck')}
      >
          <Card>
            <Text style={styles.createDeckSection}>Create a New Deck!</Text>
          </Card>
      </TouchableOpacity>
    )

  }


  render(){
    const decks = this.getDecks()
    const createDeckSection = this.createDeckSection()
    console.log(this.props)
    return(
      <View style={styles.container}>
        <ScrollView>
          {createDeckSection}
          {decks}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    marginHorizontal: 20,
  },
  deckTitle: {
    fontSize: 20,
    margin: 10,
    marginBottom: 5,
  },
  cardNumber: {
    fontSize: 12,
    color: 'gray',
    margin: 10,
    marginTop: 0,
  },
  createDeckSection: {
    fontSize: 15,
    margin: 5,
  },
})

function mapStateToProps( state ){
  console.log(state)
  return {decks:state}
}

/*
function mapDispatchToProps ({ dispatch }){
  return {
    initializeDecks: (decks) => {
      dispatch(initializeDecks(decks))
    }
  }
}
*/
export default connect(mapStateToProps)(DeckList)
