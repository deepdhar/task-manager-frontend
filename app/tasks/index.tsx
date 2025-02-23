import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Button,
  RefreshControl,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// const API_URL = "http://192.168.1.8:5000";
const API_URL = "https://task-manager-backend-k9tk.onrender.com";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { userToken, logout } = useAuth();

  const handleAddTask = () => navigation.navigate("AddTask");
  const handleTaskPress = (id: string) =>
    navigation.navigate("TaskDetail", { id: id });
  // const handleTaskPress = (id: string) => alert(id);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setTasks(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Fetch tasks error:", error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchTasks().then(() => setRefreshing(false));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  function formatDate(str) {
    const date = new Date(str);

    const formatter = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });

    const [
      { value: day }, , 
      { value: month }, , 
      { value: year }, ,
    ] = formatter.formatToParts(date);    
    
  
    return `${day}/${month}/${year}`;
  }

  function formatTime(str) {
    const date = new Date(str);
    
    const formatter = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    
    // Get formatted parts
    const [
      { value: hour }, , 
      { value: minute }, , 
      { value: dayPeriod }
    ] = formatter.formatToParts(date);

    return `${String(hour).padStart(2, '0')}:${minute} ${dayPeriod.toUpperCase()}`;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#9088f1" />

      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
          marginBottom: 20
        }}
      >
        <Text style={styles.header}>Tasks</Text>
        <Pressable 
          onPress={()=> {
            logout()
            alert("Logged out")
          }}
        >
          <MaterialIcons name="logout" size={25} color="white" />
        </Pressable>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text
            style={[
              styles.subtitle,
              { marginTop: 100, textAlign: "center", fontWeight: "500", color: '#fefefe' },
            ]}
          >
            No tasks to display! Add new tasks.
          </Text>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.itemCard}
            onPress={() => handleTaskPress(item._id)}
          >
            <Text style={styles.title}>{item.title}</Text>
            <View style={{height: 1, borderBottomColor: '#fefefe', borderWidth: 0.5, marginBottom: 5}}/>
            <Text style={[styles.subtitle, {marginBottom: 20, color: '#fefefe'}]}>{item.description}</Text>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.time}>{formatDate(item.updatedAt)}</Text>
              <Text style={styles.time}>{formatTime(item.updatedAt)}</Text>
            </View>
          </Pressable>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <Pressable style={styles.button} onPress={() => handleAddTask()}>
        <MaterialIcons name="add" size={28} color="black" />
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#dcf881",
    alignItems: "center",
    padding: 12,
    borderRadius: 15,
    marginTop: 10,
    position: 'absolute',
    right: 26,
    bottom: 40
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 18,
    backgroundColor: "#9088f1",
  },
  disabledButton: {
    backgroundColor: "#5a5a5a",
  },
  header: {
    fontSize: 28,
    fontWeight: "600",
    color: '#fff000'
  },
  inputBox: {
    backgroundColor: "#EDF4ED",
    marginBottom: 10,
    borderRadius: 8,
    padding: 12,
  },
  itemCard: {
    backgroundColor: 'transparent',
    marginBottom: 18,
    borderRadius: 12,
    padding: 15,
    borderWidth: 2,
    borderColor: '#f0f0f0'
  },
  subtitle: {
    fontSize: 15,
    color: "#000",
    fontWeight: "400",
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 5,
  },
  time: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fefefe',
  }
});
