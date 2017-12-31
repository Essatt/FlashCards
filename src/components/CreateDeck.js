import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import { Input, Card } from '../common'
import { createDeck } from '../../actions'

class CreateDeck extends Component {
  state = {
    name: ''
  }

   editText = (text) => {
    this.setState({ name: text })
  }

  submitDeck = () => {
    this.props.dispatch(createDeck(this.state.name))
    let goBack= NavigationActions.back()
    this.props.navigation.dispatch(goBack)
  }

  render(){
    console.log(styles.cardStyle)
    return(
      <View style={styles.container}>
        <Card style={styles.cardStyle}>
          <Text style={styles.title}>
            What is the name of your new Deck?
          </Text>
          <TextInput
            placeholder="Deck's Name"
            style={styles.input}
            value={this.state.name}
            onChangeText={this.editText}
          />
          <TouchableOpacity onPress={this.submitDeck}>
            <Text style={styles.submit} >
              Create Deck
            </Text>
          </TouchableOpacity>
        </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'space-around'
  },
  title: {
    marginTop: 40,
    fontSize: 30,
    marginHorizontal: 10,
  },
  input: {
    marginTop: 40,
    fontSize: 20,
    marginBottom: 40
  },
  cardStyle: {
    flex: 1,
    margin: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  submit: {

  }
})

export default connect()(CreateDeck)
