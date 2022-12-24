import * as React from "react";
import { View } from "react-native";

export const withBackground = <T extends Record<string, unknown>>(Component: React.ComponentType<T>) => {
  const WithBackgroundComponent = (props: T) => {
    return (
      <View className="bg-white h-full">
        <Component {...(props as T)} />
      </View>
    );
  };

  return WithBackgroundComponent;
};
