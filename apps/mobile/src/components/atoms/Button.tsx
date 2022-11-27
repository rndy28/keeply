import clsx from "clsx";
import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
  textClassName?: string;
}

const Button = ({ children, textClassName, className, ...props }: Props) => {
  return (
    <TouchableOpacity
      className={clsx(
        "rounded-md h-[52px] flex items-center justify-center border-2 border-solid border-transparent transition-all ease-linear bg-polarNight2 text-snowStorm2 active:border-polarNight2-200 active:bg-polarNight",
        className
      )}
      {...props}
    >
      <Text className={clsx("text-snowStorm2 text-lg", textClassName)}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
