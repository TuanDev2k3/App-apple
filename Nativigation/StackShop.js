import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screen/HomeScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import IPhone from '../Screen/IPhone';
import MacBook from '../Screen/MacBook';
import AppleWatch from '../Screen/AppleWatch';
import Detail from '../Screen/Detail';
import AirPods from '../Screen/AirPods';
import Stack_Login from './Stack_Login';
import {TouchableOpacity } from 'react-native';
import CheckoutNow from '../Screen/CheckoutNow';
import Shop from '../Screen/Shop';


const Stack = createStackNavigator();

export default function StackShop({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          borderBottomWidth: 0, // Đặt chiều rộng của đường viền dưới là 0
        },
        
      }}>
      <Stack.Screen name="ShopPage" component={Shop}
        options={{
          title: 'Shop',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#000', // Đặt màu nền cho header
          },
          headerTintColor: '#fff', // Đặt màu chữ cho header
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20, // Thiết lập font chữ cho title
          },
          headerLeft: () => (
            <Icon name="shopping-cart" size={30} color="#fff" style={{ marginLeft: 15 }} />
          ),
          
        }}
      />
      {/* ======DETAIL======== */}
      <Stack.Screen name="Detail" component={Detail}
        options={{
          title: 'Detail product',
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
      <Stack.Screen name="Checkout" component={CheckoutNow}
        options={{
          headerShown: false
        }} />
      <Stack.Screen name="LoginPage" component={Stack_Login}
        options={{
          headerShown: false
        }} />
    </Stack.Navigator>
  );
}