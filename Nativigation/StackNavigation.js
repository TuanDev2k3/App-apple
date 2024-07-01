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


const Stack = createStackNavigator();

export default function StackNavigation({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          borderBottomWidth: 0, // Đặt chiều rộng của đường viền dưới là 0
        },
        
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen}
        options={{
          title: 'Apple',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#000',
           // Đặt màu nền cho header
           height: 100
          },
          headerTintColor: '#fff', // Đặt màu chữ cho header
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 30, // Thiết lập font chữ cho title
          },
          headerLeft: () => (
            <Icon name="apple" size={40} color="#fff" style={{ marginLeft: 15, marginRight: -5 }} />
          ),
          headerRight: () => (
            <Icon
              name="bars" size={25} color="#fff" style={{ marginRight: 15 }}// Icon của Drawer
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        }}
      />
      <Stack.Screen name="IPhone" component={IPhone}
        options={{
          title: 'iPhone',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#000', // Đặt màu nền cho header
          },
          headerTintColor: '#fff', // Đặt màu chữ cho header
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 16, // Thiết lập font chữ cho title
          },
          // headerRight: () => (
          //   <Icon
          //     name="bars" size={25} color="#fff" style={{ marginRight: 15 }}// Icon của Drawer
          //     onPress={() => navigation.toggleDrawer()}
          //   />
          // ),
        }} />
      {/* Macbook */}
      <Stack.Screen name="MacBook" component={MacBook}
        options={{
          title: 'Macbook',
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
      <Stack.Screen name="AppleWatch" component={AppleWatch}
        options={{
          title: 'AppleWatch',
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
      <Stack.Screen name="AirPods" component={AirPods}
        options={{
          title: 'Airpods',
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