// frontend/navigation/AppNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// Import pages from the pages folder
import WelcomePage from "../screens/WelcomePage";
import SignInPage from "../screens/SignInPage";
import SignUpPage from "../screens/SignUpPage";
import ProfileSetupPage from "../screens/ProfileSetupPage";
import MainMenuPage from "../screens/MainMenuPage";



const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        {/* Welcome Screen */}
        <Stack.Screen name="Welcome" component={WelcomePage} />

        {/* Sign-In Screen */}
        <Stack.Screen name="SignIn" component={SignInPage} />

        {/* Sign-Up Screen */}
        <Stack.Screen name="SignUp" component={SignUpPage} />

        {/* Profile Setup Screen */}
        <Stack.Screen name="ProfileSetup" component={ProfileSetupPage} />

        {/* Main Menu Screen */}
        <Stack.Screen name="MainMenu" component={MainMenuPage} />

        {/* Other Screens */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
