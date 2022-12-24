import { View, Text } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types";

const Onboarding = ({ navigation }: NativeStackScreenProps<RootStackParamList, "Signin">) => {
  return (
    <View>
      <Text>Manage your notes with ease!</Text>
    </View>
  );
};
export default Onboarding;
