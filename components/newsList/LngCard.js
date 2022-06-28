import {Text, StyleSheet} from 'react-native';
import React from 'react';
import {Flag} from 'react-native-svg-flagkit';

import defaultNumber from '../../Constants/defaultNumber';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Card from './Card';

const dataLngs = ['az', 'en', 'ru', 'tr', 'hi', 'te', 'bn'];

const listOfFlag = ['AZ', 'GB', 'RU', 'TR', 'IN', 'IN', 'BD'];

const iconSize = defaultNumber * 6;

const LngCard = props => {
  const {item, index} = props;
  return (
    <Card
      key={index}
      actionHandler={() => props.lngHandler(dataLngs[index], item)}
      style={{
        borderWidth: defaultNumber / 8,
        borderColor: 'rgb(172, 172, 172)',
      }}
      firstPartElement={<Flag id={listOfFlag[index]} size={0.2} />}
      secondPartElement={<Text style={styles.defaultText}>{item}</Text>}
      thirdPartElement={
        dataLngs[index] === props.checkedCart ? (
          <MaterialIcons
            name="radio-button-checked"
            size={iconSize}
            color="#3366FF"
          />
        ) : (
          <MaterialIcons
            name="radio-button-unchecked"
            size={iconSize}
            color="black"
          />
        )
      }
    />
  );
};

const styles = StyleSheet.create({
  defaultText: {
    fontSize: defaultNumber * 3.5,
  },
});

export default LngCard;
