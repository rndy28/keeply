import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Archived from "./screens/archived";
import Notes from "./screens/notes";
import Signin from "./screens/signin";
import Signup from "./screens/signup";
import Trash from "./screens/trash";
import ForgotPassword from "./screens/forgotPassword";
import Logo from "./components/atoms/Logo";

import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Routes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Signin"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#434C5E",
        animation: "slide_from_right",
        headerShadowVisible: false,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShown: false,
      }}
    >
      <Stack.Screen name="Notes" component={Notes} />
      <Stack.Screen name="Archived" component={Archived} />
      <Stack.Screen name="Trash" component={Trash} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default Routes;
