import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import { Input, Card } from '../common'
import { addCard } from '../../actions'
import { addCardToDeck } from '../utils/api'

class CreateCard extends Component {
  state = {
    question: '',
    answer: '',
    deckId: ''
  }

  componentDidMount(props){
    this.setState({ deckId: this.props.deckId })
    console.log(this.props.deckId)
  }

  editText = (text, label) => {
    if (label === "Question"){
      this.setState({ question: text })
    }else{
      this.setState({ answer: text })
    }
  }

  submitCard = () => {
    const card = {
      question: this.state.question,
      answer: this.state.answer
    }
    addCardToDeck(card, this.state.deckId)
    this.props.dispatch(addCard(card, this.state.deckId))
    let goBack= NavigationActions.back()
    this.props.navigation.dispatch(goBack)
    //this.props.navigation.navigate('Deck', { deckId: this.state.deckId})
  }

  render(){
    return(
      <Card style= {{flex:1}}>
        <Text>
          What is the name of your new Deck?
        </Text>
        <Input
          label="Question"
          placeholder="Question"
          value={this.state.question}
          onChangeText={text => this.editText(text, 'Question')}
        />
        <Input
          label="Answer"
          placeholder="Answer"
          value={this.state.answer}
          onChangeText={text => this.editText(text, 'Answer')}
        />
        <TouchableOpacity onPress={this.submitCard}>
          <Text style={styles.submit}>Submit</Text>
        </TouchableOpacity>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submit: {

  }
})

function mapStateToProps ( state, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deckId,
    decks: state
  }
}


export default connect(mapStateToProps)(CreateCard)
