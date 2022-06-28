import {View, TouchableNativeFeedback, StyleSheet} from 'react-native';
import React from 'react';

import defaultNumber from '../../Constants/defaultNumber';

const Card = (props) => {
  return (
    <TouchableNativeFeedback onPress={props.actionHandler}>
      <View style={{...styles.settingsCart, ...props.style}}>
        <View style={styles.cartFirstPart}>{props.firstPartElement}</View>
        <View style={styles.cartSecondPart}>{props.secondPartElement}</View>
        <View style={styles.cartThirdPart}>{props.thirdPartElement}</View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  settingsCart: {
    flexDirection: 'row',
    height: defaultNumber * 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  cartFirstPart: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cartSecondPart: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartThirdPart: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Card;
