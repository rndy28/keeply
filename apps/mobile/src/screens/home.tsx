import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { SafeAreaView, Text, View } from "react-native";
import Button from "../components/atoms/Button";
import type { RootStackParamList } from "../types";
import { trpc } from "../utils/trpc";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const Home = ({ navigation }: Props) => {
  const { data } = trpc.books.all.useQuery();

  console.log(data);
  return (
    <SafeAreaView>
      <View className="h-full w-full p-4 bg-white">
        <Button onPress={() => navigation.navigate("Signup")}>Signup</Button>
        <Button onPress={() => navigation.navigate("Signin")} className="mt-4">
          Signin
        </Button>

        {data
          ? data.map(({ title, id }) => <Text key={id}>{title}</Text>)
          : null}
      </View>
    </SafeAreaView>
  );
};

export default Home;
