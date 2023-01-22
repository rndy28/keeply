import * as React from "react";
import { View } from "react-native";
import clsx from "clsx"

export const withBackground = <T extends Record<string, unknown>>(Component: React.ComponentType<T>, injectedClassName?: string) => {
  const WithBackgroundComponent = (props: T) => {
    return (
      <View className={clsx("bg-white h-full", injectedClassName)}>
        <Component {...(props as T)} />
      </View>
    );
  };

  return WithBackgroundComponent;
};
