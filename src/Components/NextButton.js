/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';

export default class NextButton extends Component {
  render() {
    return (
      <View style={styles.Container}>
        <Button
          title="Next"
          color="#ffc400"
          onPress={() => this.props.onNextButtonPress()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
    height: 100,
  },
});
