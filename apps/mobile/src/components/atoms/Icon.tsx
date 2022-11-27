import { View, Text } from "react-native";
import React from "react";
import * as s from "react-native-svg";

interface Props {
  name: string;
}

const Icon = ({ name }: Props) => {
  switch (name) {
    case "dashboard":
      return (
        <s.Svg height="50%" width="50%" viewBox="0 0 100 100">
          <s.Circle
            cx="50"
            cy="50"
            r="45"
            stroke="blue"
            strokeWidth="2.5"
            fill="green"
          />
          <s.Rect
            x="15"
            y="15"
            width="70"
            height="70"
            stroke="red"
            strokeWidth="2"
            fill="yellow"
          />
        </s.Svg>
      );

    default:
      throw new Error("Cannot find icon with name of: " + name);
  }
};

export default Icon;
