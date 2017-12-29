/*
The Quiz view starts with a question from the selected deck.
The question is display, along with a button to show the answer.
Pressing the 'Show Answer' button displays the answer.
Buttons are included to allow the student to mark their guess as 'Correct' or 'Incorrect'
The view displays the number of questions remaining.
When the last question is answered, a score is displayed. This can be displayed as a percentage of correct answers or just the number of questions answered correctly.
When the score is displayed, buttons are displayed to either start the quiz over or go back to the Individual Deck view.
Both the 'Restart Quiz' and 'Back to Deck' buttons route correctly to their respective views

*/

import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class Quiz extends Component {
  state = {
    side:'q',
    index: 0,
    correct: 0,
  }

  componentDidMount(){
    console.log(this.props.deckId)
    console.log(this.props)
    //this.initializeState()

  }

  componentWillReceiveProps(newProps){
    //this.initializeState()
  }

  nextQuestion = (ans) => {
    console.log(ans)
    if (ans === true){
      this.setState(previousState => {
        return { correct: previousState.correct+1 }
      })
    }
    if (this.props.decks[this.props.deckId].questions.length > this.state.index+1){
      this.setState(previousState => {
        return { index: previousState.index+1 }
      })
    }else{
      this.props.navigation.navigate(
        'QuizResult',
        {
          deckId: this.props.deckId,
          correct: this.state.correct,
          index: this.state.index,
        }
      )
    }
  }

  pickSide = () => {
    if (this.state.side === 'q') {
      return this.props.decks[this.props.deckId].questions[this.state.index].question
    }else{
      return this.props.decks[this.props.deckId].questions[this.state.index].answer
    }
  }

  pickFlip = () => {
    if (this.state.side === 'q') {
      return 'Show Answer'
    }else{
      return 'Show Question'
    }
  }

  flipCard = () => {
    if (this.state.side === 'q') {
      this.setState({side:'a'})
    }else{
      this.setState({side:'q'})
    }
  }


  render(){
    const side = this.pickSide()
    const flip = this.pickFlip()
    return(
    <View style={styles.container}>
      <View style={styles.textSection}>
        <Text style={styles.text}>
          {side}
        </Text>
        <TouchableOpacity onPress={this.flipCard}>
          <Text style={styles.flip}>
            {flip}
          </Text>
      </TouchableOpacity>
      </View>
      <View style={styles.buttonSection}>
        <TouchableOpacity onPress={this.nextQuestion.bind(true)}>
          <View style={styles.correctButton} >
            <Text style={styles.correct} >
              Correct
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.nextQuestion.bind(false)}>
          <View style={styles.incorrectButton} >
            <Text style={styles.incorrect} >
              Incorrect
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
    textSection: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize:32,
    },
    flip: {
      color: 'red',
      fontSize: 15,
      margin: 5,
    },
    buttonSection: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    correct: {
      color: 'white',
      fontSize: 20,
      margin: 5,
      textAlign: 'center',
    },
    correctButton: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      //borderWidth: 1,
      backgroundColor: 'green',
      margin: 5,
      width: 150,
      shadowColor: '#000',
      shadowOffset: { width:0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
    },
    incorrectButton: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      //borderWidth: 1,
      backgroundColor: 'red',
      margin: 5,
      width: 150,
      shadowColor: '#000',
      shadowOffset: { width:0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,

    },
    incorrect: {
      color: 'white',
      fontSize: 20,
      margin: 5,
      textAlign: 'center',
    },
  })

  function mapStateToProps ( state, { navigation }) {
    const { deckId } = navigation.state.params

    return {
      deckId,
      decks: state
    }
  }

  export default connect(mapStateToProps)(Quiz)
