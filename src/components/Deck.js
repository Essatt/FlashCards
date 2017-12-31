import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class Deck extends Component {
  state = {
    title: '',
    cards: 0,
  }

  componentDidMount(){
    console.log(this.props.deckId)
    this.initializeState()

  }

  componentWillReceiveProps(newProps){
    this.initializeState()
  }

  initializeState = () => {
    console.log(this.props.deckId)
    console.log(this.props.decks)
    if (this.props.deckId !== undefined){
      console.log(this.props.deckId)
      if(this.props.decks[this.props.deckId] !== undefined){
        const deck = this.props.decks[this.props.deckId]
        const title = deck.title
        const cards = deck.questions.length
        this.setState({ title, cards })
      }

    }
  }

  addCard = () => {
    this.props.navigation.navigate(
      'CreateCard',
      { deckId: this.props.deckId }
    )
  }

  startQuiz = () => {
    if (this.state.cards === 0){
      return
    }
    this.props.navigation.navigate(
      'Quiz',
      {
        deckId: this.props.deckId,
        deckNavKey: this.props.navigation.state.key,
      }
    )
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.textGroup}>
          <Text style={styles.deckTitle}>{this.state.title}</Text>
          <Text style={styles.cardNumber}>{`${this.state.cards} cards`}</Text>
        </View>
        <View style={styles.buttonGroup}>
          <Button
            onPress={this.addCard}
            title="Create New Question"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <Button
            onPress={this.startQuiz}
            title="Start a Quiz"
            color="black"
            accessibilityLabel="Learn more about this purple button"
          />


        </View>

      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonGroup: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textGroup: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deckTitle: {
    fontSize: 40,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  cardNumber: {
    fontSize: 25,
    color: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    marginTop: 0,
  }
})

function mapStateToProps ( state, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deckId,
    decks: state
  }
}

export default connect(mapStateToProps)(Deck)
