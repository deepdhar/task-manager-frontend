import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';

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
        <Pressable onPress={()=>navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={30} color="white" />
        </Pressable>
        <Text style={styles.header}>Add Task</Text>
        <View style={{width: 30}}/>
      </View>

      <View>
        <Text style={styles.subtitle}>Title</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <Text style={styles.subtitle}>Description</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <Pressable 
        onPress={handleAddTask}
        style={[styles.button, loading && styles.disabledButton]}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Adding..." : "Add"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#dcf881",
    alignItems: "center",
    padding: 15,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: "#1e1e1e",
    fontSize: 16,
    fontWeight: "600",
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
    fontSize: 25,
    fontWeight: "500",
    color: '#fff000'
  },
  inputBox: {
    backgroundColor: "#EDF4ED",
    marginBottom: 10,
    borderRadius: 8,
    padding: 12,
  },
  subtitle: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "500",
    marginBottom: 5,
  },
});
