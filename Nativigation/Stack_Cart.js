import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Cart from '../Screen/Cart';
import Checkout from '../Screen/Checkout';
import Icon from 'react-native-vector-icons/FontAwesome';
import Stack_Login from './Stack_Login';


const Stack = createStackNavigator();

export default function Stack_Cart() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          borderBottomWidth: 0, // Đặt chiều rộng của đường viền dưới là 0
        },
        // headerShown: 
      }}>
      <Stack.Screen name="Cart" component={Cart}
        options={{
          title: 'Cart',
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
            <Icon name="shopping-bag" size={25} color="#fff" style={{ marginLeft: 15 }} />
          )
        }} />
      <Stack.Screen name="LoginPage" component={Stack_Login}
        options={{
          headerShown: false
        }} />
      <Stack.Screen name="Checkout" component={Checkout}
        options={{
          headerShown: false
        }} />

    </Stack.Navigator>
  );
}