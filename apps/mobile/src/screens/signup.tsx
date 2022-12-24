import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView, View } from "react-native";
import Button from "../components/atoms/Button";
import Input from "../components/atoms/Input";
import Text from "../components/atoms/Text";
import type { RootStackParamList } from "../types";

const Signup = ({ navigation }: NativeStackScreenProps<RootStackParamList, "Signup">) => {
  return (
    <SafeAreaView>
      <View className="bg-white h-full">
        <View className="min-h-screen flex justify-center w-[90%] mx-auto">
          <Text className="text-frost2 text-center p-1" variant="h1">
            Hi There!
          </Text>
          <Text className="text-center">Lets get your account setup!</Text>
          <View className="w-full my-6">
            <Input label="Username" />
            <Input label="Email" containerClassName="mt-3" />
            <Input label="Password" containerClassName="my-3" secureTextEntry />
            <Text className="text-right text-sm underline" onPress={() => navigation.navigate("ForgotPassword")}>
              forgot password?
            </Text>
            <Button className="my-4">Signup</Button>
            <Text className="text-polarNight3 text-sm text-center">
              Already have an account?{" "}
              <Text className="underline font-manjari-bold text-sm" onPress={() => navigation.navigate("Signin")}>
                Sign In
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
