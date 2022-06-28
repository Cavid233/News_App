import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback, 
} from "react-native";

import defaultNumber from "../../Constants/defaultNumber";

const SettingsCartItem = (props) => {
  return (
    <TouchableNativeFeedback onPress={props.actionHandler}>
      <View style={styles.settingsCart}>
        <View style={styles.cartFirstPart}>{props.firstPartElement}</View>
        <View style={styles.cartSecondPart}>
          <Text style={styles.defaultText}>{props.secondPartElement}</Text>
        </View>
        <View style={styles.cartThirdPart}>{props.thirdPartElement}</View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  settingsCart: {
    flexDirection: "row",
    height: defaultNumber * 22.5,
    alignItems: "center",
    backgroundColor: "white",
    marginTop: defaultNumber * 4,
  },
  cartFirstPart: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  cartSecondPart: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  cartThirdPart: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  defaultText: {
    color: "black"
  }
});

export default SettingsCartItem;
