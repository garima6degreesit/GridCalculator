/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { questions } from '../Constants/constants';
import VirtualKeyboard from '../Components/VirtualKeyboard';
import NextButton from '../Components/NextButton';
import Grid from '../Components/Grid';


export default class GridCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: {},
      questionOutput: null,
    };
  }
  componentDidMount() {
    var that = this;
    let items = Array.apply(null, Array(81)).map((v, i) => {
      let dataObj = { id: i + 1, value: '' };
      if (questions && questions.questionInput) {
        questions.questionInput.find(function (element) {
          if ((element.row - 1) * 9 + element.column === i + 1) {
            return (dataObj = { id: i + 1, value: element.value, role: 'question' });
          } else {
            dataObj = { id: i + 1, value: null, role: null };
          }
        });
      }
      return dataObj;
    });
    that.setState({
      dataSource: items,
    });
  }

  saveSelectedGridBox = (item) => {
    if (item.role === 'answer' || item.role === null) {
      this.setState({
        selectedGrid: item.id,
        selectedGridColor: 'pink',
      });
    } else {
      this.setState({
        selectedGrid: null,
        selectedGridColor: 'pink',
      });
    }
  }

  onPressKey = (key) => {
    var that = this.state;

    if (key.value && key.value == 'left') {
      this.setState({
        selectedGrid: that.selectedGrid - 1,
      });

    } else if (key.value && key.value == 'right') {
      this.setState({
        selectedGrid: that.selectedGrid + 1,
      });

    } else if (key.value && key.value == 'up') {
      this.setState({
        selectedGrid: that.selectedGrid - 9,
      });

    } else if (key.value && key.value == 'down') {
      this.setState({
        selectedGrid: that.selectedGrid + 9,
      });

    } else if (key.value && key.value == 'delete') {
      if (that.dataSource && that.selectedGrid) {
        that.dataSource.find(function (element) {
          if (element.id == that.selectedGrid) {
            element.value = null;
            element.role = null;
            return element;
          }
        });
        this.setState({
          dataSource: that.dataSource,
        });
      }
    } else {
      if (that.dataSource && that.selectedGrid) {

        that.dataSource.find(function (element) {
          if (element.id == that.selectedGrid) {
            element.value = key.text;
            element.role = 'answer';
            return element;
          }
        });
        this.setState({
          dataSource: that.dataSource,
        });
      }
    }
  }

  onNextButtonPress = () => {
    let questionOutput = [];
    if (this.state.dataSource && questionOutput) {
      this.state.dataSource.map((element) => {
        if (element.value && element.role == 'answer') {
          questionOutput.push({ 'row': Math.trunc((element.id / 9)) + 1, 'column': element.id % 9, 'value': Math.trunc(element.value) });
          this.setState({
            questionOutput: questionOutput,
          });
        }
      });
    }
  }


  render() {
    return (
      <>
        <View style={styles.MainContainer}>
          <Grid dataSource={this.state.dataSource} saveSelectedGridBox={this.saveSelectedGridBox} selectedGrid={this.state.selectedGrid} />

        </View>
        <NextButton onNextButtonPress={this.onNextButtonPress} />
        <Text>{this.state.questionOutput && JSON.stringify(this.state.questionOutput)}</Text>
        <VirtualKeyboard onPressKey={this.onPressKey} />
      </>
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
