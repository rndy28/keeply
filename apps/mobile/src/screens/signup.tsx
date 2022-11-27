import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import type {} from "@react-navigation/native";
import Button from "../components/atoms/Button";
import Input from "../components/atoms/Input";
import Logo from "../components/atoms/Logo";

interface Props {
  navigation: any;
}

const Signup = ({ navigation }: Props) => {
  return (
    <SafeAreaView>
      <View className="bg-white h-full">
        <View className="min-h-screen flex justify-center text-start w-[90%] mx-auto">
          <Text className="text-2xl text-polarNight1">
            signup to <Logo />
          </Text>
          <View className="w-full my-6">
            <Input label="Email" />
            <Input label="Username" containerClassName="mt-3" />
            <Input label="Password" containerClassName="mt-3" secureTextEntry />
            <Button className="my-4">Signup</Button>
            <Text className="text-polarNight3 text-sm">
              By signing in, you agree to goodiebook&apos;s Terms of Service and
              Privacy Policy
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
