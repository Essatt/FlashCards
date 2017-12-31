import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class Quiz extends Component {
  state = {
    side:'q',
    index: 0,
    correct: 0,
  }

  initializeState = () => {
    this.setState({
      side:'q',
      index: 0,
      correct: 0,
    })
  }
  nextQuestion = (ans) => {
    if (this.props.decks[this.props.deckId].questions.length > this.state.index+1){
      //did this because the asycronous stuff messed up
      if (ans === true){
        console.log('ahanda')
        this.setState(previousState => {
          return { correct: previousState.correct+1 }
        })
      }
      if(this.state.side !== 'q'){
        this.setState({ side: 'q'})
      }
      this.setState(previousState => {
        return { index: previousState.index+1 }
      })
    }else{
      //did this because the asycronous stuff messed up
      const correct = this.state.correct
      const index = this.state.index
      this.initializeState()
      if (ans === true){
        correct += 1
      }
      this.props.navigation.navigate(
        'QuizResult',
        {
          deckId: this.props.deckId,
          correct,
          index,
          //bu line, stackdeki bu screenden onceki screen'in key ini verio
          deckNavKey: this.props.navigation.state.key,
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
    const { decks, deckId } = this.props
    const side = this.pickSide()
    const flip = this.pickFlip()
    return(
    <View style={styles.container}>
      <Text style={styles.progress}>
        {`${this.state.correct}/${decks[deckId].questions.length}`}
      </Text>
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
        <TouchableOpacity onPress={this.nextQuestion.bind(this,true)}>
          <View style={styles.correctButton} >
            <Text style={styles.correct} >
              Correct
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.nextQuestion.bind(this,false)}>
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
      flex: 3,
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
      flex: 3,
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
    progress: {
      fontSize: 18,
      margin: 15,
      textAlign: 'left'
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
