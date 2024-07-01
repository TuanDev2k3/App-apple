import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Register from '../Screen/Register'
import ForgotPassword from '../Screen/ForgotPassword'
import Login from '../Screen/Login';

const Stack = createStackNavigator();

export default function Stack_Login() {
  return (
      <Stack.Navigator
      screenOptions={{
        headerStyle: {
          borderBottomWidth: 0, // Đặt chiều rộng của đường viền dưới là 0
        },
        // headerShown: 
      }}>
      <Stack.Screen name="Login" component={Login}
        options={{
          headerShown: false
        }} />
      <Stack.Screen name="Register" component={Register}
        options={{
          title: 'Register',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#000', // Đặt màu nền cho header
          },
          headerTintColor: '#fff', // Đặt màu chữ cho header
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 16, // Thiết lập font chữ cho title
          },
        }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword}
        options={{
          title: 'ForgotPassword',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#000', // Đặt màu nền cho header
          },
          headerTintColor: '#fff', // Đặt màu chữ cho header
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 16, // Thiết lập font chữ cho title
          },
        }} />
    </Stack.Navigator>
  );
}