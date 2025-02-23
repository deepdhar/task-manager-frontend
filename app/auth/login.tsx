import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

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
      <Text style={styles.header}>Login</Text>
      <Text style={styles.subtitle}>Email</Text>
      <TextInput
        style={styles.inputBox}
        placeholder="name@email.com"
        placeholderTextColor={'#1e1e1e'}
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.subtitle}>Password</Text>
      <TextInput
        style={styles.inputBox}
        placeholder="password"
        placeholderTextColor={'#1e1e1e'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable 
        style={[styles.button, loading && styles.disabledButton]} 
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={{ color: "#1e1e1e", fontSize: 16, fontWeight: "600" }}>
          {loading ? 'Logging in...' : 'Login now'}
        </Text>
      </Pressable>
      <Text
        style={[styles.subtitle, { textAlign: "center" }]}
        onPress={() => navigation.navigate("Signup")}
      >
        Don't have an account? <Text style={{ color: "#fff", fontWeight: '600' }}>Sign up</Text>
      </Text>
      <Text
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
    backgroundColor: "#dcf881",
    alignItems: "center",
    padding: 15,
    borderRadius: 25,
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
    fontSize: 25,
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 25,
    color: "#fefefe"
  },
  inputBox: {
    backgroundColor: "#EDF4ED",
    marginBottom: 10,
    borderRadius: 8,
    padding: 12,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 5,
    color: "#fefefe",
    fontWeight: "500",
  },
});
