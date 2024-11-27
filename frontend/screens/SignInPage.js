import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { UserContext } from "../contexts/UserContext"; // Import UserContext
import { signInUser } from "../services/api"; // Import API function for sign in
import styles from "../styles/SignInPageStyles"; // Import separate styles

const SignInPage = ({ navigation }) => {
  const [input, setInput] = useState(""); // Can be either email or username
  const [password, setPassword] = useState("");
  const { setToken, setCurrentUser } = useContext(UserContext); // Use setToken to store the JWT

  const handleSignIn = async () => {
    try {
      // Sending the user credentials to the backend for verification
      const credentials = { input, password }; // Change 'email' to 'input'
      const response = await signInUser(credentials);

      // Extract the token from the response
      const { token, user } = response;

      if (token && user) {
        setToken(token); // Save the token in UserContext
        setCurrentUser(user); // Set the current user in context
        Alert.alert("Success", "You are signed in!");
        navigation.navigate("MainMenu");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      Alert.alert("Sign In Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder="Email or Username"
        value={input}
        onChangeText={setInput}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Sign In" onPress={handleSignIn} />

      <Text
        style={styles.signUpText}
        onPress={() => navigation.navigate("SignUp")}
      >
        Don't have an account? Sign Up
      </Text>
    </View>
  );
};

export default SignInPage;
