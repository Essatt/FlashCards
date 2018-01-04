import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity, Animated } from 'react-native'
import { connect } from 'react-redux'

class Deck extends Component {
  state = {
    title: '',
    cards: 0,
    opacity: new Animated.Value(0),
  }

  componentDidMount(){
    const { opacity } = this.state
    this.initializeState()

    Animated.timing(opacity: { toValue: 1, duration: 1000}).start()
  }

  componentWillReceiveProps(newProps){
    this.initializeState()
  }

  initializeState = () => {
    if (this.props.deckId !== undefined){
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
    const { opacity } = this.state
    return(
      <Animated.View style={[styles.container, { opacity } ]}>
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
      </Animated.View>
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
  console.log(navigation)
  const { deckId } = navigation.state.params
  console.log(deckId)

  return {
    deckId,
    decks: state
  }
}

export default connect(mapStateToProps)(Deck)
