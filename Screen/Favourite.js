import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Image, TextInput, StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, Alert } from 'react-native';
import { Dimensions } from 'react-native';
import { dataHeart } from '../data/dataFavourite';
import { Notification } from './Cart';
import { dataCart } from '../data/dataCart';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeigh = Dimensions.get('window').height;

export function AddToHeart(item) {
  let findItem = dataHeart.find(product => product.idCart === item.id)
  if (findItem) {
    dataHeart.map((product, index) => {
      if (product.idCart === item.id) {
        dataHeart.splice(index, 1);
        item.inStar = false;
      }
    })

  }
  else {
    let itemCart = {
      idCart: item.id,
      nameCart: item.name,
      imageCart: item.image[0],
      priceCart: item.price,
      theloai: item.TheLoai
    }
    item.inStar = true;
    dataHeart.push(itemCart);
  }
}

export default function Favourite(props) {
  const [cartItems, setCartItems] = useState(dataHeart);
  const [showNotify, setShowNotify] = useState(false);

  // ======== Remove ================
  function removeCartItem(index) {
    const updatedCart = [...cartItems.slice(0, index), ...cartItems.slice(index + 1)];
    setCartItems(updatedCart);
    dataHeart.splice(index, 1); // Cap nhat lai dataCart gốc 
  }
  function handRemoveAll() {
    const reCart = [];
    setCartItems(reCart);
    dataHeart.length = [];
  }

  // ===== ItemCart =========
  function ItemCart({ item, index, removeCartItem }) {

    return (
      <View style={styles.boxItemCart}>
        <View style={styles.detail_ItemCart}>
          <View style={{ width: 100, height: 90, padding: 0, margin: 5, borderRightWidth: 2, borderRightColor: 'gray' }}>
            <Image
              source={{ uri: item.imageCart }}
              style={styles.imageItemCart}
            />
          </View>
          <View style={styles.infoCart}>
            <Text style={styles.nameItem}>{item.nameCart}</Text>
            <Text style={{ fontSize: 16, color: 'red' }}>${item.priceCart}</Text>
          </View>
        </View>
        <View style={styles.heartBox}>
          <Icon name="trash" size={21} color="red" onPress={() => {
            removeCartItem(index)
            setTimeout(() => {
              setShowNotify(true);
            }, 100)
            setTimeout(() => {
              setShowNotify(false);
            }, 2500);
          }} />
          <Icon name='suitcase' size={28} color={'#000'} onPress={() => {
            removeCartItem(index)
            let findItem = dataCart.find(product => product.idCart === item.idCart)
            if (findItem) {
              findItem.quantity++;
            }
            else {
              let itemCart = {
                idCart: item.idCart,
                nameCart: item.nameCart,
                imageCart: item.imageCart,
                priceCart: item.priceCart,
                quantity: 1,
                theloai: item.theloai
              }
              dataCart.push(itemCart);
            }
            Alert.alert(
              'Thông báo',
              `Đã thêm sản phẩm yêu thích vào giỏ hàng !!`
            )
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
          <Text style={{ color: 'gray', marginVertical: 30, fontSize: 17 }}>There are no favorite products</Text>
          : cartItems.map((item, index) => (
            <ItemCart
              key={item.idCart}
              item={item}
              index={index}
              removeCartItem={removeCartItem}
            />
          ))}
      </ScrollView>
      {(showNotify) && Notification('check-circle', 'Đã xóa khỏi mục yêu thích')}
      <View style={{ width: ScreenWidth, display: 'flex', flexDirection: 'row', gap: 20, paddingVertical: 20, justifyContent: 'space-around' }}>
        <TouchableOpacity style={[{ backgroundColor: 'gray' }, styles.button]} title='Remove all' onPress={() => handRemoveAll()}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Remove all</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
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
    width: ScreenWidth-30,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 30,
    marginTop: 10,
    overflow: 'hidden',
    padding: 10,
    borderWidth: 2,
  },
  heartBox: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 20,
    // marginVertical: 20,
    marginRight: 12,
    // borderWidth: 3,
    // padding: 9,
    // borderRadius: 100,
    // borderColor: '#ff4040',
  },
  infoCart: {
    marginVertical: 10,
    marginLeft: 4
  },
  detail_ItemCart: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageItemCart: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff'
  },
  nameItem: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
    width: 180,
  },
  numberItem: {
    paddingHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
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
