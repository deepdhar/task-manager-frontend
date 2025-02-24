import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button, Text } from "react-native-paper";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      setLoading(true);
      await login(email, password);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#9088f1" />
      <Text variant="headlineSmall" style={styles.header}>Login</Text>
      
      <TextInput
        label='Email'
        mode="outlined"
        style={styles.inputBox}
        placeholder="name@email.com"
        placeholderTextColor={'gray'}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType='email-address'
        textColor="#1e1e1e"
        theme={{ colors: { primary: '#1e1e1e',  background: '#EDF4ED'  } }}
      />
      
      <TextInput
        label='Password'
        mode="outlined"
        style={styles.inputBox}
        placeholder="password"
        placeholderTextColor={'gray'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        textColor="#1e1e1e"
        theme={{ colors: { primary: '#1e1e1e', accent: '#EDF4ED' } }}
      />
      <Button
        mode="elevated"
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
        style={[styles.button, loading && styles.disabledButton]}
        labelStyle={{ color: '#1e1e1e', fontSize: 16 }}
      >
        {loading ? 'Logging in...' : 'Login now'}
      </Button>
      <Text
        variant="labelLarge"
        style={[styles.subtitle, { textAlign: "center" }]}
        onPress={() => navigation.navigate("Signup")}
      >
        Don't have an account? <Text style={{ color: "#fff", fontWeight: '700' }}>Sign up</Text>
      </Text>
      <Text
        variant="labelLarge"
        style={[styles.subtitle, { textAlign: "center", color: "#1e1e1e" }]}
        onPress={() => navigation.navigate("ForgotPassword")}
      >
        Forgot Password?
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: "#dcf881",
    alignItems: "center",
    marginVertical: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 18,
    backgroundColor: "#9088f1",
  },
  disabledButton: {
    backgroundColor: '#bcbfb0'
  },
  header: {
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 25,
    color: "#fefefe"
  },
  inputBox: {
    backgroundColor: "#EDF4ED",
    marginBottom: 10,
    elevation: 5
  },
  subtitle: {
    marginBottom: 5,
    color: "#fefefe",
    fontWeight: "500",
  },
});
