import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { IconButton } from 'react-native-paper';
import { TextInput, Button, Text } from "react-native-paper";

// const API_URL = "http://192.168.1.8:5000";
const API_URL = "https://task-manager-backend-k9tk.onrender.com";

export default function AddTaskScreen() {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { userToken } = useAuth();

  const handleAddTask = async () => {
    try {
      setLoading(true);
      if(title==='' || description==='') {
        alert("Add both title and description.");
        return;
      }
      await axios.post(
        `${API_URL}/tasks`,
        { title, description },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      navigation.goBack();
    } catch (error) {
      console.error("Add task error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: 10}}>
        <IconButton
          icon="arrow-left"
          size={30}
          onPress={() => navigation.goBack()}
          style={{margin: 0, marginLeft: -5}}
          iconColor="#fff"
          theme={{colors: {primary: '#000'}}}
        />
        <Text style={styles.header} variant="headlineMedium">Add Task</Text>
        <View style={{width: 30}}/>
      </View>

      <View>
        
        <TextInput
          label='Title'
          mode="outlined"
          style={styles.inputBox}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          textColor="#1e1e1e"
          theme={{ colors: { primary: '#1e1e1e',  background: '#EDF4ED'  } }}
        />
        
        <TextInput
          label='Description'
          mode="outlined"
          style={styles.inputBox}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          textColor="#1e1e1e"
          theme={{ colors: { primary: '#1e1e1e',  background: '#EDF4ED'  } }}
        />
      </View>

      <Button
        mode="elevated"
        onPress={handleAddTask}
        loading={loading}
        disabled={loading}
        style={[styles.button, loading && styles.disabledButton]}
        labelStyle={{ color: '#1e1e1e', fontSize: 16 }}
      >
        {loading ? "Adding..." : "Add"}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#dcf881",
    alignItems: "center",
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 18,
    backgroundColor: "#9088f1",
  },
  disabledButton: {
    backgroundColor: '#bcbfb0'
  },
  header: {
    // fontSize: 25,
    fontWeight: '700',
    color: '#fff000'
  },
  inputBox: {
    backgroundColor: "#EDF4ED",
    marginBottom: 10,
    borderRadius: 0,
    elevation: 5
  },
  subtitle: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "500",
    marginBottom: 5,
  },
});
