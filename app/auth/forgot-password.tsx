import React, { useState } from 'react';
import { View, Pressable, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TextInput, Button, Text } from "react-native-paper";


// const API_URL = "http://192.168.1.8:5000";
const API_URL = "https://task-manager-backend-k9tk.onrender.com";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigation = useNavigation();
  const { handleForgotPassword } = useAuth();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axios.post(`${API_URL}/auth/forgot-password`, { email });
      setSuccess('Reset code sent to your email');
      setTimeout(() => navigation.navigate('ResetPassword', { email }), 2000);
    } catch (err) {
      setError('Error sending reset code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ABD1B5" />
        <Pressable onPress={()=>navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={30} color="black" />
        </Pressable>
        <View>
          <Text variant="headlineSmall" style={styles.header}>Forgot Password</Text>
          
          {/* <Text style={styles.subtitle}>Email</Text> */}
          <TextInput
            label='Email'
            mode="outlined"
            style={styles.inputBox}
            placeholder="Enter registered email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            textColor="#1e1e1e"
            theme={{ colors: { primary: '#1e1e1e' } }}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {success ? <Text style={styles.successText}>{success}</Text> : null}


          <Button
            mode="elevated"
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
            style={[styles.button, loading && styles.disabledButton]}
            labelStyle={{ color: '#fff', fontSize: 16 }}
          >
            {loading ? 'Sending...' : 'Send Reset Code'}
          </Button>

          <Pressable
            style={styles.link}
            onPress={() => navigation.goBack()}
          >
            <Text variant='labelLarge' style={styles.linkText}>Back to Login</Text>
          </Pressable>
        </View>
        <View/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 18,
    backgroundColor: '#ABD1B5'
  },
  header: {
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 35,
    color: '#000'
  },
  inputBox: {
    backgroundColor: "#EDF4ED",
    marginBottom: 10,
    borderRadius: 0,
    elevation: 5
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 5,
    color: '#000',
    fontWeight: '500'
  },
  button: {
    backgroundColor: '#301014',
    alignItems: 'center',
    marginTop: 10
  },
  disabledButton: {
    backgroundColor: '#5a5a5a'
  },
  buttonText: {
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600'
  },
  link: {
    marginTop: 15,
    alignItems: 'center'
  },
  linkText: {
    color: '#51291E'
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10
  },
  successText: {
    color: 'green',
    textAlign: 'center',
    marginBottom: 10
  }
});