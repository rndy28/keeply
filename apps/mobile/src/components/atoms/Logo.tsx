import React from "react";
import { Image } from "react-native";

const Logo = () => {
  return (
    <Image
      className="w-36 h-8"
      source={require("../../../assets/logo.svg")}
    />
  );
};

export default Logo;
