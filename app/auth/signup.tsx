import React, { useState } from 'react';
import { View, StyleSheet, Pressable, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button, Text } from "react-native-paper";


export default function SignupScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    try {
      setLoading(true);
      await signup(name, email, password);
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#9088f1" />
      <Text variant="headlineSmall" style={styles.header}>Sign Up</Text>
      
      <TextInput 
        label='Name'
        mode="outlined"
        style={styles.inputBox}
        placeholder="name" 
        value={name} 
        onChangeText={setName} 
        textColor="#1e1e1e"
        theme={{ colors: { primary: '#1e1e1e' } }}
      />
      {/* <Text style={styles.subtitle}>Email</Text> */}
      <TextInput 
        label='Email'
        mode="outlined"
        style={styles.inputBox}
        placeholder="name@email.com" 
        value={email} 
        onChangeText={setEmail} 
        keyboardType="email-address"
        autoCapitalize="none"
        textColor="#1e1e1e"
        theme={{ colors: { primary: '#1e1e1e' } }}
      />
      {/* <Text style={styles.subtitle}>Password</Text> */}
      <TextInput 
        label='Password'
        mode="outlined"
        style={styles.inputBox}
        placeholder="password" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
        autoCapitalize="none"
        textColor="#1e1e1e"
        theme={{ colors: { primary: '#1e1e1e' } }}
      />
      
      <Button
        mode="elevated"
        onPress={handleSignup}
        loading={loading}
        disabled={loading}
        style={[styles.button, loading && styles.disabledButton]}
        labelStyle={{ color: '#1e1e1e', fontSize: 16 }}
      >
        {loading ? 'Signing up...' : 'Sign up'}
      </Button>
      <Text 
        variant='labelLarge'
        style={[styles.subtitle, {textAlign: 'center'}]} 
        onPress={() => navigation.navigate('Login')}
      >
        Already have an account? <Text style={{color: '#fff', fontWeight: '700'}}>Login</Text>
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
    backgroundColor: '#9088f1'
  },
  disabledButton: {
    backgroundColor: '#bcbfb0'
  },
  header: {
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 25,
    color: '#fefefe'
  },
  inputBox: {
    backgroundColor: "#EDF4ED",
    marginBottom: 10,
    borderRadius: 0,
    elevation: 5
  },
  subtitle: {
    marginBottom: 5,
    color: '#fefefe',
    fontWeight: '500'
  }
});