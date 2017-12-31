import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'

class QuizResult extends Component {

  restartQuiz = () => {
    let goBack= NavigationActions.back({
      //bu line, stackdeki bu screenden onceki screen'in key ini verio
      key: this.props.navigation.state.key,
    })
    this.props.navigation.dispatch(goBack)
  }

  backToDeck = () => {
    let goBack= NavigationActions.back({
      key: this.props.deckNavKey,
    })
    this.props.navigation.dispatch(goBack)
  }


  render(){
    console.log(this.props)
    const { correct, total } = this.props
    return(
      <View style={styles.container}>
        <View style={styles.textGroup}>
          <Text style={styles.mainScore}>
            {`Your Score is ${correct/total*100}%`}
          </Text>
          <Text  style={styles.subScore}>
            {`You got ${correct}/${total} answers correct`}
          </Text>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity onPress={this.restartQuiz}>
            <View style={styles.restartQuizButton} >
              <Text style={styles.restartQuiz} >
                Restart Quiz
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.backToDeck}>
            <View style={styles.backToDeckButton} >
              <Text style={styles.backToDeck} >
                Back to Deck
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'space-around',
  },
  textGroup: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGroup: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backToDeck: {
    color: 'white',
    fontSize: 20,
    margin: 5,
    textAlign: 'center',
  },
  backToDeckButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'purple',
    margin: 5,
    width: 150,
    shadowColor: '#000',
    shadowOffset: { width:0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  restartQuiz: {
    color: 'white',
    fontSize: 20,
    margin: 5,
    textAlign: 'center',
  },
  restartQuizButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'blue',
    margin: 5,
    width: 150,
    shadowColor: '#000',
    shadowOffset: { width:0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  mainScore: {
    fontSize: 30,
    margin: 5,
    textAlign: 'center',
  },
  subScore: {
    fontSize: 20,
    margin: 5,
    textAlign: 'center',
  },
})

function mapStateToProps ( state, { navigation }) {
  const { deckId, correct, index, deckNavKey } = navigation.state.params

  return {
    deckId,
    correct,
    deckNavKey,
    total: index+1,
    decks: state,
  }
}

export default connect(mapStateToProps)(QuizResult)
