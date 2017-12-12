import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { Card } from '../common'
//import Deck from './Deck'
import { mockDB, getDecks } from '../utils/api'
import { initializeDecks } from '../../actions'
import { objToArray } from '../utils/helpers'

class DeckList extends Component {
  componentDidMount(){
    mockDB()
      .then(getDecks())
      .then((decks) => {
        console.log(decks)
        this.props.dispatch(initializeDecks(JSON.parse(decks)))
        return
      })
      .then(() => console.log(this.props))
  }

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
          <View key={deck.key}>
            <Card>
              {console.log(deck.title)}
              <Text>{deck.title}</Text>

            </Card>
          </View>
        )

      })
      //console.log((decksUI.toString()))
      return decksUI
    }


  }


  render(){
    const decks = this.getDecks()
    console.log(this.props)
    /*let cards =
    {
      for (let key in decks) {
        if (decks.hasOwnProperty(key)) {
          return (
            <View key={key}>
              <Card>
                {decks[key].title}
                {console.log(decks[key].title)}
              </Card>
            </View>
          )
        }
      }
    }*/
    return(
      <View>

        {decks}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  }
})

function mapStateToProps( state ){
  console.log(state)
  return state
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
