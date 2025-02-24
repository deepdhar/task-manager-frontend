import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, StatusBar } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { TextInput, Button, Text, IconButton } from "react-native-paper";

// const API_URL = "http://192.168.1.8:5000";
const API_URL = "https://task-manager-backend-k9tk.onrender.com";

export default function TaskDetailScreen({ route }) {
  const navigation = useNavigation();
  // const route = useRoute();
  const { id } = route.params;
  // alert(id);
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const router = useRouter();
  const { userToken } = useAuth();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`${API_URL}/tasks/${id}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setTask(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
      } catch (error) {
        console.error("Fetch task error:", error);
      }
    };
    fetchTask();
  }, [id]);

  const handleUpdateTask = async () => {
    try {
      setLoadingUpdate(true);
      await axios.put(
        `${API_URL}/tasks/${id}`,
        { title, description },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      navigation.goBack();
    } catch (error) {
      console.error("Update task error:", error);
    } finally {
      setLoadingUpdate(false);
    }
  };

  const handleDeleteTask = async () => {
    try {
      setLoadingDelete(true);
      await axios.delete(`${API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      navigation.goBack();
    } catch (error) {
      console.error("Delete task error:", error);
    } finally {
      setLoadingDelete(false);
    }
  };

  if (!task)
    return (
      <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
        <Text style={[styles.header, {fontWeight: '400', fontSize: 20}]}>Loading...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#9088f1" />

      <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: 10}}>
        <IconButton
          icon="arrow-left"
          size={30}
          onPress={() => navigation.goBack()}
          style={{margin: 0, marginLeft: -5}}
          iconColor="#fff"
          theme={{colors: {primary: '#000'}}}
        />
        <Text variant="headlineMedium" style={styles.header}>Edit Task</Text>
        <View style={{width: 30}}/>
      </View>

      <View>
        
        <TextInput
          label='Title'
          mode="outlined"
          style={styles.inputBox}
          value={title}
          onChangeText={setTitle}
          placeholder="enter title"
          placeholderTextColor={'gray'}
          textColor="#1e1e1e"
          theme={{ colors: { primary: '#1e1e1e',  background: '#EDF4ED'  } }}
        />
        
        <TextInput
          label='Description'
          mode="outlined"
          style={styles.inputBox}
          value={description}
          onChangeText={setDescription}
          placeholder="enter description"
          placeholderTextColor={'gray'}
          textColor="#1e1e1e"
          theme={{ colors: { primary: '#1e1e1e',  background: '#EDF4ED'  } }}
        />
      </View>

      <View>
        <Button
          mode="elevated"
          onPress={handleUpdateTask}
          loading={loadingUpdate}
          disabled={loadingUpdate || loadingDelete}
          style={[styles.button, loadingUpdate && styles.disabledButton]}
          labelStyle={{ color: '#1e1e1e', fontSize: 16 }}
        >
          {loadingUpdate ? "Updating..." : "Update"}
        </Button>

        <Button
          mode="elevated"
          onPress={handleDeleteTask}
          loading={loadingDelete}
          disabled={loadingUpdate || loadingDelete}
          style={[styles.button, loadingDelete && styles.disabledButton]}
          labelStyle={{ color: '#1e1e1e', fontSize: 16 }}
        >
          {loadingDelete ? "Deleting..." : "Delete"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#dcf881",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#1e1e1e",
    fontSize: 16,
    fontWeight: "600",
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
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
    elevation: 5
  },
  subtitle: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "500",
    marginBottom: 5
  },
});
