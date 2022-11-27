import clsx from "clsx";
import React from "react";
import { TextInput, Text, TextInputProps, View } from "react-native";

interface Props extends TextInputProps {
  label?: string;
  containerClassName?: string;
}

const Input = ({ className, containerClassName, label, ...props }: Props) => {
  return (
    <View className={containerClassName}>
      {label && (
        <Text className="font-semibold text-base text-polarNight2 mb-[1px]">
          {label}
        </Text>
      )}
      <TextInput
        className={clsx(
          "bg-snowStorm0-300 px-4 py-[10px] w-full rounded-md caret-polarNight2",
          className
        )}
        {...props}
      />
    </View>
  );
};

export default Input;
