import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';
import { Dimensions } from 'react-native';
import { dataCart } from '../data/dataCart';
import { AddToCart, Notification } from './Cart';
import { AddToHeart } from './Favourite';
import { dataHeart } from '../data/dataFavourite';
import IPhone from './IPhone';
const ScreenWidth = Dimensions.get('window').width;
const SreenHeight = Dimensions.get('window').height;


export default function Detail({ route, navigation }) {
  const { item } = route.params;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showZoom, setShowZoom] = useState(false)
  const [showNotify, setShowNotify] = useState(false);
  const [isHeart, setIsHeart] = useState(dataHeart.find(heart => heart.idCart === item.id))

  const swiperRef = useRef(null);
  const handleThumbnailPress = (index) => {
    setSelectedIndex(index)
    if (swiperRef.current) {
      swiperRef.current.scrollBy(index - swiperRef.current.state.index, true);
    }
  };
  function handShow(index) {
    setTimeout(() => {
      setShowZoom(true);
      handleThumbnailPress(index);
    }, 100)
  }
  //======= BUY Now ===========
  async function handBuyNow() {
    const storedArray = await AsyncStorage.getItem('myLogin');
    const myLogin = JSON.parse(storedArray); // Chuyển đổi chuỗi JSON thành mảng
    if (myLogin && myLogin[0].isLogin) {
      // Nếu người dùng đã đăng nhập, điều hướng đến trang checkout
      navigation.navigate('Checkout', { item })

    } else {
      // Nếu người dùng chưa đăng nhập, điều hướng đến trang đăng nhập
      navigation.navigate('LoginPage')
    }
  }
  return (
    // Show Image Zoom
    (showZoom) ? (<View style={styles.showImage}>
      <Swiper ref={swiperRef} horizontal={true} paginationStyle={{ bottom: 10 }}
        dotStyle={{ backgroundColor: '#fff' }} activeDotStyle={{ backgroundColor: 'red' }}>
        {item.image.map((imageURL, index) => (
          <View key={index} style={styles.slideShow}>
            <Image source={{ uri: imageURL }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        ))}
      </Swiper>
      <TouchableOpacity style={styles.btnIconClose} onPress={() => setShowZoom(false)}>
        <Icon name="times" size={35} color="gray" />
      </TouchableOpacity>
    </View >
    ) : (
      <ScrollView style={{ backgroundColor: '#2e2e2e' }}>
        <View style={styles.contain}>
          <Swiper ref={swiperRef} horizontal={true} paginationStyle={{ bottom: 5 }}>
            {item.image.map((imageURL, index) => (
              <TouchableOpacity key={index} style={styles.slide} onPress={() => handShow(index)}>
                <Image source={{ uri: imageURL }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </Swiper>

          <View><ScrollView horizontal={true} style={styles.wrapper}>
            {item.image.map((imageURL, index) => (
              <TouchableOpacity key={index}
                onPress={() => handleThumbnailPress(index)}
                style={[styles.thumbnail, index === selectedIndex && styles.selectedThumbnail]}>
                <Image source={{ uri: imageURL }} resizeMode="cover" style={{ width: '100%', height: '100%', backgroundColor: 'white' }} />
              </TouchableOpacity>
            ))}
          </ScrollView></View>

          <View style={{ padding: 6 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 5, marginBottom: 0 }}>
              <Text style={styles.describe}>
                <Icon name="star" size={16} color="yellow" />
                <Icon name="star" size={16} color="yellow" />
                <Icon name="star" size={16} color="yellow" />
                <Icon name="star" size={16} color="yellow" />
                <Icon name="star" size={16} color="yellow" />
              </Text>
            </View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>

            <TouchableOpacity style={{ padding: 15, borderRadius: 50, backgroundColor: (!isHeart) ? '#fff' : 'red', position: 'absolute', top: '86%', right: 15, }}
              onPress={() => {setIsHeart(!isHeart), AddToHeart(item)}} >
              <Icon name="heart" size={23} color={(!isHeart) ? 'red' : '#fff'} />
            </TouchableOpacity>

            {/* ======== Mo ta SP ==========*/}
            <View style={{ paddingTop: 10, paddingLeft: 5 }}>
              <Text style={styles.describe}><Icon name="check-square" size={14} color="green" />  Brand: Apple</Text>
              <Text style={styles.describe}><Icon name="check-square" size={14} color="green" />  Condition: Fullbox</Text>
              <Text style={styles.describe}><Icon name="check-square" size={14} color="green" />  Origin: America</Text>
              <Text style={styles.describe}><Icon name="check-square" size={14} color="green" />  Warranty: 2 Years</Text>
              <Text style={styles.describe}><Icon name="check-square" size={14} color="green" />  Inventory: In stock</Text>
            </View>
          </View>
          <View style={{ marginTop: 150, position: 'absolute' }}>{(showNotify) && Notification('check-circle', 'Đã thêm vào giỏ hàng')}</View>
        </View>
        {/* ======= button Add Cart =========== */}
        <View style={styles.button}>
          <TouchableOpacity style={styles.btnAddCart} title='Add To Cart' onPress={() => {
            let findItem = dataCart.find(product => product.idCart === item.id)
            if (findItem) {
              findItem.quantity++;
            }
            else {
              // === Add_To_Cart ===
              AddToCart(item);
            }
            setTimeout(() => {
              setShowNotify(true);
            }, 100)
            setTimeout(() => {
              setShowNotify(false);
            }, 2500);
          }}>
            <Icon name="cart-plus" size={25} color="#fff" />
            <Text style={{ color: '#fff', fontSize: 12 }}>Add to cart</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnBuyNow} title='Mua ngay' onPress={() => handBuyNow()}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#fff' }}>BUY NOW</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={{marginTop: 10}}>
          <IPhone />
        </View> */}
      </ScrollView>)


  )
}

const styles = StyleSheet.create({
  contain: {
    height: SreenHeight,
    backgroundColor: '#2e2e2e',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 7,
    color: '#fff',
  },
  price: {
    fontSize: 20,
    marginHorizontal: 10, // Thêm margin cho giá
    marginBottom: 5, // Thêm margin dưới giá
    color: 'red',
    fontWeight: '600'
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: ScreenWidth,
    height: 50,
    marginTop: 25,
    marginBottom: 20
  },
  btnAddCart: {
    width: '40%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8888ff',
    borderRadius: 30,
    marginRight: 10,
  },
  btnBuyNow: {
    backgroundColor: '#ff4242',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '50%',
    borderRadius: 30
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  thumbnail: {
    width: 90,
    height: 90,
    borderWidth: 1,
  },
  selectedThumbnail: {
    borderColor: 'red',
    borderWidth: 2
  },
  describe: {
    color: '#fff',
    fontSize: 14,
    paddingLeft: 5,
    paddingVertical: 4
  },
  showImage: {
    backgroundColor: '#2e2e2e',
    height: SreenHeight,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  slideShow: {
    height: 500,
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  btnIconClose: {
    position: 'absolute',
    top: 10,
    right: 10
  }
});