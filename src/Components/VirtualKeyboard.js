/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableHighlight,
} from 'react-native';
import { keys } from '../Constants/constants';

export default class VirtualKeyboard extends React.PureComponent {
  render() {
    return (
      <View style={styles.MainContainer}>
        <FlatList
          data={keys}
          renderItem={({ item, index }) => (
            <View
              key={index}
              style={styles.KeyBoardView}>
              <TouchableHighlight
                style={styles.KeyBox}
                onPress={() => this.props.onPressKey(item)}>
                <Text
                  style={styles.KeyText}>
                  {item.text}
                </Text>
              </TouchableHighlight>
            </View>
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
  KeyBoardView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#5d5d5d',
  },
  KeyText: {
    color: '#5d5d5d',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    lineHeight: 17,
  },
  KeyBox: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingTop: 20,
    margin: 5,
    width: 40,
    flex: 0.6,
    height: 50,
  },
});
