import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'

class QuizResult extends Component {

  restartQuiz = () => {
    let goBack= NavigationActions.back({
      key: 'Quiz',
      deckId: this.props.deckId,
    })
    this.props.navigation.dispatch(goBack)
  }

  backToDeck = () => {
    let goBack= NavigationActions.back({
      key: 'Deck',
      deckId: this.props.deckId,
    })
    this.props.navigation.dispatch(goBack)
  }


  render(){
    const { correct, total } = this.props
    return(
      <View style={styles.container}>
        <View style={{flex:1}}>
          <Text>
            {`Your Score is ${correct/total*100}%`}
          </Text>
          <Text>
            {`You got ${correct}/${total} answers correct`}
          </Text>
        </View>


        <View style={{flex:1}}>
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
  backToDeck: {

  },
  backToDeckButton: {

  },
  restartQuiz: {

  },
  restartQuizButton: {

  }
})



function mapStateToProps ( state, { navigation }) {
  const { deckId, correct, index } = navigation.state.params

  return {
    deckId,
    correct,
    total: index+1,
    decks: state,
  }
}

export default connect(mapStateToProps)(QuizResult)
