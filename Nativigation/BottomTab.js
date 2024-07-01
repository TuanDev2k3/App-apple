import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackNavigation from './StackNavigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text } from 'react-native';
import Stack_Login from './Stack_Login';
import Stack_Cart from './Stack_Cart';
import Favourite from '../Screen/Favourite';
import DrawerNav from './DrawerNav';
import Shop from '../Screen/Shop';
import StackShop from './StackShop';

const Tab = createBottomTabNavigator();
export default function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        // headerShown: false,
        tabBarStyle: {
          backgroundColor: '#212121', // Màu nền của Bottom Tab Navigator
          borderTopWidth: 0, // Xóa đường viền trên
          height: 60
        },
        tabBarLabelStyle: {
          fontSize: 14, // Kích thước chữ của nhãn tab
          fontWeight: 500, // Độ đậm của chữ của nhãn tab
          marginBottom: 5
        },
        tabBarIconStyle: {
          // Kiểu dáng của biểu tượng tab
          marginBottom: -5, // Dịch chuyển biểu tượng lên một chút
        },
        tabBarActiveTintColor: 'violet', // Màu của biểu tượng khi tab được chọn
        tabBarInactiveTintColor: 'white',

        //============= Header =============
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTintColor: 'white', // Màu của tiêu đề và biểu tượng trong header
        headerTitleStyle: {
          fontWeight: 'bold', // Độ đậm của tiêu đề
        },
        unmountOnBlur: true,
      }}>

      <Tab.Screen name="DrawerPage" component={DrawerNav}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen name="Shop" component={StackShop}
        options={{
          title: 'Shop',
          tabBarLabel: 'Shop',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-cart" size={size} color={color} />
          ),
          headerLeft: () => (
            <Icon name="shopping-cart" size={25} color="#fff" style={{ marginLeft: 15 }} />
          ) 
        }}
      />
      <Tab.Screen name="CartPage" component={Stack_Cart}
        options={{
          title: 'Cart for me',
          tabBarLabel: 'Cart',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="suitcase" size={size} color={color} />
          ),
          headerLeft: () => (
            <Icon name="shopping-bag" size={25} color="#fff" style={{ marginLeft: 15 }} />
          ) 
        }}
      />
      {/*Favourite*/}
      <Tab.Screen name="Favourite" component={Favourite}
        options={{
          title: 'Favourite',
          tabBarLabel: 'Heart',
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" size={size} color={color} />
          ),
          headerLeft: () => (
            <Icon name="heart" size={25} color="#fff" style={{ marginLeft: 15 }} />
          ) 
        }}
      />
      {/* Login page */}
      <Tab.Screen name="LoginHome" component={Stack_Login}
        options={{
          title: 'Login Page',
          tabBarLabel: 'Login',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={size} color={color} />
          ),
          headerLeft: () => (
            <Icon name="user" size={25} color="#fff" style={{ marginLeft: 15 }} />
          ) 
        }}
      />
    </Tab.Navigator>
  );
}
