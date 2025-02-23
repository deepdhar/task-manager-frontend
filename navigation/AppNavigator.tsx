import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../app/auth/login";
import SignupScreen from "../app/auth/signup";
import HomeScreen from "../app/tasks/index";
import AddTaskScreen from "../app/tasks/add";
import TaskDetailScreen from "../app/tasks/[id]";
import { useAuth } from "../context/AuthContext";
import ForgotPasswordScreen from "@/app/auth/forgot-password";
import ResetPasswordScreen from "@/app/auth/reset-password";

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  AddTask: undefined;
  TaskDetail: { id: string };
  ForgotPassword: undefined;
  ResetPassword: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { userToken } = useAuth();

  return (
    <Stack.Navigator>
      {userToken ? (
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddTask"
            component={AddTaskScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TaskDetail"
            component={TaskDetailScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPasswordScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
