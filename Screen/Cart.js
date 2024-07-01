import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Image, TextInput, StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import { dataCart } from '../data/dataCart';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScreenWidth = Dimensions.get('window').width - 10;
const ScreenHeigh = Dimensions.get('window').height;

export function Notification(icon, mess) {
  return (
    <View style={styles.notifyBox}>
      <View style={styles.notifyItem}>
        <Icon name={icon} size={56} color="#fff" />
        <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center', marginTop: 12 }}>{mess}</Text>
      </View>
    </View>
  );
}

export default function Cart(props) {
  const [cartItems, setCartItems] = useState(dataCart);
  const [total, setTotal] = useState(0);
  const [showNotify, setShowNotify] = useState(false);

  useEffect(() => {
    // Tính lại tổng số tiền mỗi khi cartItems thay đổi
    updateTotal();
  }, [cartItems]);

  // ======= Total ============
  function updateTotal() {
    let total = 0;
    dataCart.forEach(item => total += item.priceCart * item.quantity);
    setTotal(total);
  }

  // Update Quantity
  const changeQuantity = (index, newQuantity) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
  };

  // ======== Remove ================
  function removeCartItem(index) {
    const updatedCart = [...cartItems.slice(0, index), ...cartItems.slice(index + 1)];
    setCartItems(updatedCart);
    dataCart.splice(index, 1); // Cap nhat lai dataCart gốc 
  }
  //======= BUY CART ===========
  async function handBuyCart() {
    const storedArray = await AsyncStorage.getItem('myLogin');
    const myLogin = JSON.parse(storedArray); // Chuyển đổi chuỗi JSON thành mảng
    if (cartItems.length === 0) {
      return;
    }
    else if (myLogin && myLogin[0].isLogin) {
      // Nếu người dùng đã đăng nhập, điều hướng đến trang checkout
      props.navigation.navigate('Checkout');
    } else {
      // Nếu người dùng chưa đăng nhập, điều hướng đến trang đăng nhập
      props.navigation.navigate('LoginPage');
    }
  }
  // ======== Save Cart in AsyncStorage ============
  // async function SaveCart(){
  //   let myCart = JSON.stringify(dataCart);
  //   await AsyncStorage.setItem('myCart', myCart);
  // }
  // async function LoadCart(){
  //   let myCart = JSON.parse(await AsyncStorage.getItem('myCart'));
  //   setCartItems(myCart)
  // }

  // ===== ItemCart =========
  function ItemCart({ item, index, removeCartItem }) {

    return (
      <View style={styles.boxItemCart}>
        <View style={styles.detail_ItemCart}>
          <TouchableOpacity style={{ width: 110, height: 90, padding: 0, margin: 10, borderRightWidth: 2, borderRightColor: 'gray' }} onPress={() => props.navigation.navigate('Detail')}>
            <Image
              source={{ uri: item.imageCart }}
              style={styles.imageItemCart}
            />
          </TouchableOpacity>
          <View style={styles.infoCart}>
            <Text style={styles.nameItem}>{item.nameCart}</Text>
            <Text style={{ fontSize: 20, color: 'red', marginTop: 5, fontWeight: 'bold'}}>${item.priceCart * item.quantity}</Text>
          </View>
        </View>
        <View style={styles.quantityItem}>
          <AntDesign name="pluscircle" size={25} color="red" onPress={() => changeQuantity(index, item.quantity + 1)} />
          <Text style={styles.numberItem}>{item.quantity}</Text>
          <AntDesign name="minuscircle" size={25} color="red" onPress={() => {
            changeQuantity(index, Math.max(0, item.quantity - 1))
            // If số lượng = 0 thi xóa SP khỏi cart
            if (item.quantity === 0) {
              removeCartItem(index)
              setTimeout(()=>{
                setShowNotify(true);
              }, 100)
              setTimeout(() => {
                setShowNotify(false);
              }, 2500);
            }
          }} />
        </View>
      </View>
    );
  }

  // ==== Render Cart ============
  return (
    <View style={styles.container}>
      <ScrollView>
        {(cartItems == false) ?
          <Text style={{ color: 'gray', marginVertical: 30, fontSize: 16 }}>No product in cart</Text>
          : cartItems.map((item, index) => (
            <ItemCart
              key={item.idCart}
              item={item}
              index={index}
              removeCartItem={removeCartItem}
            />
          ))}
      </ScrollView>
      {(showNotify) && Notification('check-circle','Đã xóa khỏi giỏ hàng')}
      {/* === Total ========= */}
      <View style={{ paddingVertical: 15, width: ScreenWidth-30, display: 'flex', flexDirection: 'row', gap: 8, borderTopWidth: 2, borderColor: 'white', marginTop: 5 }}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', paddingLeft: 10 }}>Total:</Text>
        <Text style={{ color: 'red', fontSize: 20, fontWeight: 'bold' }}>${total}</Text>
      </View>
      {/* === Button ======= */}
      <View style={{ width: ScreenWidth, display: 'flex', flexDirection: 'row', gap: 20, paddingVertical: 20, justifyContent: 'space-around', marginTop: -10 }}>
        <TouchableOpacity style={[{backgroundColor: 'gray' }, styles.button]} title='Buy Product' onPress={() => handBuyCart()}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color:  '#fff', textAlign: 'center' }}>Check out</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}


export function AddToCart(item) {
  let itemCart = {
    idCart: item.id,
    nameCart: item.name,
    imageCart: item.image[0],
    priceCart: item.price,
    quantity: 1,
    theloai: item.TheLoai
  }
  dataCart.push(itemCart);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  boxItemCart: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: ScreenWidth,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 30,
    marginTop: 10,
    overflow: 'hidden',
    padding: 6,
  },
  quantityItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 3,
    marginVertical: 10
  },
  infoCart: {
    marginVertical: 10
  },
  detail_ItemCart: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageItemCart: {
    width: '100%',
    height: '100%',
    borderRadius: 10
  },
  nameItem: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    width: 180
  },
  numberItem: {
    paddingHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
  },
  button: {
    width: '45%',
    height: 50,
    justifyContent: 'center',
    borderRadius: 25,
  },
  notifyBox: {
    width: ScreenWidth,
    height: ScreenHeigh,
    position: 'absolute',
    isplay: 'flex',
    alignItems: 'center',
    zIndex: 101,
  },
  notifyItem: {
    backgroundColor: '#4f4f4f',
    width: 280,
    height: 150,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: '65%',
    borderWidth: 1, borderColor: 'gray',
    opacity: 0.9
  }
});
