import {
    Dimensions,
  } from "react-native";
let defaultNumber = Math.round(Dimensions.get("window").width / 100) ;

export default defaultNumber;