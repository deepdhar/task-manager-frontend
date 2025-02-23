import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { NavigationProp, useNavigation } from '@react-navigation/native';

// const API_URL = "http://192.168.1.8:5000";
const API_URL = "https://task-manager-backend-k9tk.onrender.com";

interface AuthContextType {
  userToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  handleForgotPassword: (email: string) => Promise<void>;
  handleResetPassword: (email: string, code: string, newPassword: string) => Promise<void>;
}

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  AddTask: undefined;
  TaskDetail: { id: string };
  ForgotPassword: undefined;
  ResetPassword: undefined
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  // const navigation = useNavigation();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setUserToken(token);
      }
    };
    checkLoginStatus();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const token = response.data.token;
      await AsyncStorage.setItem('userToken', token);
      setUserToken(token);
      alert(response.data && response.data.message);
      navigation.navigate('Home');
    } catch (error) {
      alert(error.response.data.message);
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, { name, email, password });
      const token = response.data.token;
      await AsyncStorage.setItem('userToken', token);
      setUserToken(token);
      alert(response.data && response.data.message);
      navigation.navigate('Home');
    } catch (error) {
      alert(error.response.data.message);
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    setUserToken(null);
    navigation.navigate('Login');
  };

  const handleForgotPassword = async (email: string) => {
    try {
      await axios.post(`${API_URL}/auth/forgot-password`, { email });
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  };

  const handleResetPassword = async (email: string, code: string, newPassword: string) => {
    try {
      await axios.post(`${API_URL}/auth/reset-password`, {
        email,
        code,
        newPassword
      });
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ userToken, login, signup, logout, handleForgotPassword, handleResetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};