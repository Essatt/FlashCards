import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { Card, CardSection } from '../common'
//import Deck from './Deck'
import { mockDB, getDecks, clearData } from '../utils/api'
import { initializeDecks } from '../../actions'
import { objToArray } from '../utils/helpers'

//TODO check for todos
class DeckList extends Component {
  componentDidMount(){
    //clearData()
    getDecks()
      .then((decks) => {
        console.log(decks)
        this.props.dispatch(initializeDecks(JSON.parse(decks)))
        return
      })
      .then(() => console.log(this.props))
  }



  getDecks() {
    let { decks } = this.props
    console.log(this.props)
    console.log(decks)
    let dataArray
    if (decks !== undefined &&
        Object.keys(decks).length === 0 &&
        decks.constructor === Object){

      dataArray = objToArray(decks)
      console.log(dataArray)
      let decksUI = dataArray.map((deck) => {
        console.log(deck)
        console.log(deck.questions)
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
      //TODO make an animation while routing to Deck view
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

export default connect(mapStateToProps)(DeckList)
