import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Input, Card } from '../common'
import { createDeck } from '../actions'

default export class CreateDeck extends Component {
  state = {
    name: ''
  }


  render(){
    return(
      <Card>
        <Text>
          What is the name of your new Deck?
        </Text>
        <Input
            label="Deck Name"
            placeholder="Awesome New Deck!"
            value={this.state.name}
            onChangeText={text => this.props.createDeck(text)}
          />
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  container: {

  }
})
