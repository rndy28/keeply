import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { SafeAreaView, Text, View } from "react-native";
import Button from "../components/atoms/Button";
import type { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const Home = ({ navigation }: Props) => {
  return (
    <SafeAreaView>
      <View className="h-full w-full p-4 bg-white">
        <Button onPress={() => navigation.navigate("Signup")}>Signup</Button>
        <Button onPress={() => navigation.navigate("Signin")} className="mt-4">
          Signin
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Home;
