import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Weather from "./src/pages/weather/Weather";
import NextDays from "./src/pages/nextDays/NextDays";
import Search from "./src/pages/search/Search";
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false }}
        />
      <Stack.Screen
          name="Weather"
          component={Weather}
          options={{ headerShown: false }}
        />
      <Stack.Screen
          name="NextDays"
          component={NextDays}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
