import { createDrawerNavigator, DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import IPhone from "../Screen/IPhone";
import MacBook from "../Screen/MacBook";
import StackNavigation from "./StackNavigation";
import { Ionicons } from '@expo/vector-icons';
import AppleWatch from "../Screen/AppleWatch";
import AirPods from "../Screen/AirPods";
import { View, Text, StyleSheet ,TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";
import Stack_Login from "./Stack_Login";

const Drawer = createDrawerNavigator();


export function CustomDrawerContent(props) {
  // ==========Profile==========
  function AccountInfo() {
    const [userData, setUserData] = useState(null);
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const storedData = await AsyncStorage.getItem('myLogin');
          const userData = JSON.parse(storedData);
          setUserData(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchUserData();
    }, []);
  
    if (!userData) {
      return null; 
    }
  
    // ==== render =====
    return (
      <TouchableOpacity style={styles.container} onPress={() => props.navigation.navigate('LoginPage')}>
        <Image
          source={require('../image/login.jpg')}
          style={styles.profileImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.username}>{userData[0].firstName} {userData[0].lastName}</Text>
          <Text style={styles.email}>{userData[0].email}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <DrawerContentScrollView {...props}>
      <AccountInfo/>
      <DrawerItem
        label="Home"
        icon={({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />}
        onPress={() => props.navigation.navigate('HomeScreen')}
      />
      <DrawerItem
        label="IPhone"
        icon={({ color, size }) => <Ionicons name="phone-portrait-outline" size={size} color={color} />}
        onPress={() => props.navigation.navigate('IPhone')}
      />
      <DrawerItem
        label="MacBook"
        icon={({ color, size }) => <Ionicons name="laptop-outline" size={size} color={color} />}
        onPress={() => props.navigation.navigate('MacBook')}
      />
      <DrawerItem
        label="Apple Watch"
        icon={({ color, size }) => <Ionicons name="watch-outline" size={size} color={color} />}
        onPress={() => props.navigation.navigate('AppleWatch')}
      />
      <DrawerItem
        label="AirPods"
        icon={({ color, size }) => <Ionicons name="headset-outline" size={size} color={color} />}
        onPress={() => props.navigation.navigate('AirPods')}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerNav() {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      initialRouteName="Home"
      screenOptions={{
        drawerActiveTintColor: 'red', // Đổi màu thành đỏ
        drawerItemStyle: { marginVertical: 10 },
        drawerStyle: {
          backgroundColor: '#FFFFFF',
          width: 300,
        },
        headerStyle: styles.drawerHeader,
        headerTintColor: '#FFFFFF',
        headerTitleStyle: styles.drawerHeaderText,
      }}
    >
      <Drawer.Screen name="Home" component={StackNavigation} options={{ headerShown: false }} />
      <Drawer.Screen name="IPhone" component={IPhone} />
      <Drawer.Screen name="MacBook" component={MacBook} />
      <Drawer.Screen name="AppleWatch" component={AppleWatch} />
      <Drawer.Screen name="AirPods" component={AirPods} />
      <Drawer.Screen name="LoginPage" component={Stack_Login} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  drawerHeader: {
    backgroundColor: '#000',
    height: 100,

  },
  drawerHeaderText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  // Profile
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
});
