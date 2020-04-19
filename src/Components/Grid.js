/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';

export default class Grid extends React.Component {
  render() {

    return (
      <View style={styles.MainContainer}>
        <FlatList
          data={this.props.dataSource}
          renderItem={({ item, index }) => (
            <View key={index} style={[styles.GridComponent, { backgroundColor: this.props.selectedGrid === item.id ? '#c6eafd' : '#fff' }]}>
              <TouchableOpacity onPress={() => this.props.saveSelectedGridBox(item)} >
                <View
                  style={styles.GridBox}>
                  <Text style={styles.GridText}>{item.value}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          numColumns={9}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
  GridComponent: { flex: 1, flexDirection: 'column' },
  GridBox: {
    borderWidth: 1,
    borderColor: '#c6eafd',
    paddingTop: 20,
    margin: 0,
  },
  GridText: { textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
});
