import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button } from 'react-native-paper'

// const API_URL = "http://192.168.1.8:5000";
const API_URL = "https://task-manager-backend-k9tk.onrender.com";

export default function ResetPasswordScreen() {
  const route = useRoute();
  const { email } = route.params as { email: string };
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axios.post(`${API_URL}/auth/reset-password`, {
        email,
        code,
        newPassword
      });
      setSuccess('Password reset successfully!');
      setTimeout(() => navigation.navigate('Login'), 2000);
    } catch (err) {
      setError('Invalid code or password requirements not met');
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
          <Text style={styles.header}>Reset Password</Text>

          <Text style={styles.subtitle}>Verification Code</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter 6-digit code"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
          />

          <Text style={styles.subtitle}>New Password</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter new password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />

          {error && <Text style={styles.errorText}>{error}</Text>}
          {success && <Text style={styles.successText}>{success}</Text>}

          <Button
            mode="elevated"
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
            style={[styles.button, loading && styles.disabledButton]}
            labelStyle={{ color: '#fff', fontSize: 16 }}
          >
            {loading ? 'Processing...' : 'Reset Password'}
          </Button>

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
    fontSize: 25,
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 25,
  },
  inputBox: {
    backgroundColor: '#EDF4ED',
    marginBottom: 10,
    borderRadius: 8,
    padding: 12,
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
    marginVertical: 10
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
    color: '#51291E',
    fontSize: 14
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