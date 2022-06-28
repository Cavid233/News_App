import React from "react";
import { Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
// import defaultWidth from "../Constants/width-dimension";

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={props.IconComponent}
      iconSize={22}
      color={props.color ? props.color : "white"}
    />
  );
};

export default CustomHeaderButton;
