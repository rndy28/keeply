import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { useSigninMutation, useSigninFromGoogleMutation } from "@keeply/api";
import { SafeAreaView, View } from "react-native";
import Button from "../components/atoms/Button";
import Input from "../components/atoms/Input";
import Text from "../components/atoms/Text";
import type { RootStackParamList } from "../types";

const Signin = ({ navigation }: NativeStackScreenProps<RootStackParamList, "Signin">) => {
  const [{ fetching: signinFetching }, signin] = useSigninMutation();
  const [{}, signinFromGoogle] = useSigninFromGoogleMutation();

  return (
    <SafeAreaView>
      <View className="bg-white h-full">
        <View className="min-h-screen flex justify-center w-[90%] mx-auto">
          <Text className="text-frost2 text-center" variant="h1">
            Hello Again!
          </Text>
          <Text className="text-center">Welcome back you've been missed!</Text>
          <View className="w-full my-6">
            <Input label="Email or Username" />
            <Input label="Password" containerClassName="my-3" secureTextEntry />
            <Text className="text-right text-sm underline" onPress={() => navigation.navigate("ForgotPassword")}>
              forgot password?
            </Text>
            <Button className="my-4">Signin</Button>
            <Text className="text-polarNight3 text-sm text-center">
              Don't have an account?{" "}
              <Text className="underline font-manjari-bold text-sm" onPress={() => navigation.navigate("Signup")}>
                Sign Up
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signin;
