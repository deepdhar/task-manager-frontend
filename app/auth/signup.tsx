import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Pressable, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

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
      <Text style={styles.header}>Sign Up</Text>
      <Text style={styles.subtitle}>Name</Text>
      <TextInput 
        style={styles.inputBox}
        placeholder="name" 
        value={name} 
        onChangeText={setName} 
      />
      <Text style={styles.subtitle}>Email</Text>
      <TextInput 
        style={styles.inputBox}
        placeholder="name@email.com" 
        value={email} 
        onChangeText={setEmail} 
      />
      <Text style={styles.subtitle}>Password</Text>
      <TextInput 
        style={styles.inputBox}
        placeholder="password" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />
      <Pressable 
        style={[styles.button, loading && styles.disabledButton]} 
        onPress={handleSignup}
        disabled={loading}
      >
        <Text style={{color: '#1e1e1e', fontSize: 16, fontWeight: '600',}}>
          {loading ? 'Signing up...' : 'Sign up'}
        </Text>
      </Pressable>
      <Text 
        style={[styles.subtitle, {textAlign: 'center'}]} 
        onPress={() => navigation.navigate('Login')}
      >
        Already have an account? <Text style={{color: '#fff', fontWeight: '600'}}>Login</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#dcf881',
    alignItems: 'center',
    padding: 15,
    borderRadius: 25,
    marginVertical: 10
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
    fontSize: 25,
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 25,
    color: '#fefefe'
  },
  inputBox: {
    backgroundColor: '#EDF4ED',
    marginBottom: 10,
    borderRadius: 8,
    padding: 12
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 5,
    color: '#fefefe',
    fontWeight: '500'
  }
});