import clsx from "clsx";
import React from "react";
import { TextInput, TextInputProps, View } from "react-native";
import Text from "./Text";

interface Props extends TextInputProps {
  label?: string;
  containerClassName?: string;
}

const Input = ({ className, containerClassName, label, ...props }: Props) => {
  return (
    <View className={containerClassName}>
      {label && <Text variant="p">{label}</Text>}
      <TextInput
        className={clsx("bg-snowStorm0-300 px-4 py-[10px] w-full rounded-lg caret-polarNight2", className)}
        {...props}
      />
    </View>
  );
};

export default Input;
