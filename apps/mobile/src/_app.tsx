import { NavigationContainer } from "@react-navigation/native";
import { registerRootComponent } from "expo";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Routes from "./routes";
import { Provider as UrqlProvider } from "urql";
import { client } from "./utils/createUrqlClient";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded] = useFonts({
    ManjariBold: require("./assets/fonts/Manjari-Bold.ttf"),
    ManjariRegular: require("./assets/fonts/Manjari-Regular.ttf"),
    ManjariThin: require("./assets/fonts/Manjari-Thin.ttf"),
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <UrqlProvider value={client}>
        <NavigationContainer>
          <StatusBar />
          <Routes />
        </NavigationContainer>
      </UrqlProvider>
    </SafeAreaProvider>
  );
};

registerRootComponent(App);
