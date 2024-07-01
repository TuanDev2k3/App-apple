import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { Dimensions } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import iPhones from '../data/data-iPhone';
import iMacs from '../data/data-macbook';
import aWatch from '../data/data-awatch';
import aPods from '../data/data-air';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

export default function HomeScreen(props) {
    const swiperRef = useRef(null);
    const [searchText, setSearchText] = useState('');
    const dataAll = [...iPhones, ...iMacs, ...aWatch, ...aPods];
    const [data, setData] = useState(dataAll);
    const [isSearch, setIsSearch] = useState(false)
    const handleSearch = () => {
        if (searchText.trim() === '') {
            setIsSearch(false)
        }
        else {
            const filteredData = dataAll.filter(item =>
                item.name.toLowerCase().includes(searchText.trim().toLowerCase())
            );
            setData(filteredData);
            setIsSearch(true);
        }

    };
    const ItemProduct = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate('Detail', { item })} style={styles.itemSearch} resizeMode="cover">
                <Image source={{ uri: item.image[0] }}
                    style={styles.image} />
                <Text style={styles.nameSearch}>{item.name}</Text>
                <Text style={styles.priceSearch}>${item.price}</Text>
            </TouchableOpacity>
        )
    }
    const ItemMiniProduct = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate('Detail', { item })} style={styles.item} resizeMode="cover">
                <Image source={{ uri: item.image[0] }}
                    style={styles.image} />
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>${item.price}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ backgroundColor: 'black' }}>
            <View >
                <Icon name="search" size={25} color='gray' style={styles.iconsearch} />
                <TextInput style={styles.search} placeholder='Search...'
                    onChangeText={(text) => {
                        setSearchText(text)
                    }}
                    value={searchText}
                    onSubmitEditing={() => handleSearch()}
                />
            </View>
            {/* Home */}
            {(!isSearch) ? (<ScrollView style={{ marginBottom: 80, marginTop: 10 }}>
                {/* =======BANNER========== */}
                <Swiper horizontal={true} style={{ height: 250 }} showsPagination={false}>
                    <View key="1" style={styles.slideShow}>
                        <Image
                            source={require('../image/banner1.jpg')}
                            style={styles.backgroundImage}
                            resizeMode="cover"
                        />
                    </View>
                    <View key="2" style={styles.slideShow}>
                        <Image
                            source={require('../image/bannerair.jpg')}
                            style={styles.backgroundImage}
                            resizeMode="cover"
                        />
                    </View>
                    <View key="3" style={styles.slideShow}>
                        <Image
                            source={require('../image/banner2.jpg')}
                            style={styles.backgroundImage}
                            resizeMode="cover"
                        />
                    </View>
                    <View key="4" style={styles.slideShow}>
                        <Image
                            source={require('../image/banner3.jpg')}
                            style={styles.backgroundImage}
                            resizeMode="cover"
                        />
                    </View>
                    <View key="4" style={styles.slideShow}>
                        <Image
                            source={require('../image/bannerair.jpg')}
                            style={styles.backgroundImage}
                            resizeMode="cover"
                        />
                    </View>
                </Swiper>
                {/* ===== MAIN ========== */}
                <View style={{ borderBottomWidth: 2, borderColor: 'gray' }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginVertical: 20 }}>
                        <Icon name="apple" size={25} color="#fff" style={{ marginRight: 4, top: 9 }} />
                        <Text style={styles.text}>iPhone</Text>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Swiper horizontal={true} style={{ height: 240 }} showsPagination={false}>
                            <Image
                                source={require('../image/bannerip1.jpg')}
                                style={styles.backgroundImage}
                                resizeMode="cover"
                            />
                            <Image
                                source={require('../image/bannerair.jpg')}
                                style={styles.backgroundImage}
                                resizeMode="cover"
                            />
                        </Swiper>
                        <View style={{ position: 'absolute', flexDirection: 'row', paddingVertical: 0, justifyContent: 'space-around', bottom: 18, left: 100 }}>
                            <TouchableOpacity style={styles.buttonbannerip} onPress={() => props.navigation.navigate('IPhone')}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'black', textAlign: 'center' }}>BUY NOW</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Swiper style={{ height: 260 }} showsPagination={false} slidesPerView={2}>
                        <View style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                            <ItemMiniProduct key="1" item={iPhones[1]} />
                            <ItemMiniProduct key="2" item={iPhones[2]} />
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                            <ItemMiniProduct item={iPhones[2]} />
                            <ItemMiniProduct item={iPhones[3]} />
                        </View>
                    </Swiper>
                    <View style={{ flexDirection: 'row', paddingVertical: 20, justifyContent: 'space-around' }}>
                        <TouchableOpacity style={[{ backgroundColor: 'gray' }, styles.button]} onPress={() => props.navigation.navigate('IPhone')}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>SEE ALL</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* MACBOOk */}
                <View style={{ borderBottomWidth: 2, borderColor: 'gray' }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginVertical: 20 }}>
                        <Icon name="apple" size={25} color="#fff" style={{ marginRight: 4, top: 9 }} />
                        <Text style={styles.text}>Mac</Text>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Swiper horizontal={true} style={{ height: 250 }} showsPagination={false}>
                            <Image
                                source={require('../image/bannermac.jpg')}
                                style={styles.backgroundImage}
                                resizeMode="cover"
                            />
                            <Image
                                source={require('../image/bannermac1.jpg')}
                                style={styles.backgroundImage}
                                resizeMode="cover"
                            />
                        </Swiper>
                        <View style={{ position: 'absolute', flexDirection: 'row', paddingVertical: 0, justifyContent: 'space-around', bottom: 18, left: 100 }}>
                            <TouchableOpacity style={styles.buttonbannerip} onPress={() => props.navigation.navigate('MacBook')}>
                                <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black', textAlign: 'center' }}>BUY NOW</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Swiper style={{ height: 260 }} showsPagination={false} slidesPerView={2}>
                        <View style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                            <ItemMiniProduct key="1" item={iMacs[1]} />
                            <ItemMiniProduct key="2" item={iMacs[2]} />
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                            <ItemMiniProduct item={iMacs[3]} />
                            <ItemMiniProduct item={iMacs[4]} />
                        </View>
                    </Swiper>
                    <View style={{ flexDirection: 'row', paddingVertical: 20, justifyContent: 'space-around' }}>
                        <TouchableOpacity style={[{ backgroundColor: 'gray' }, styles.button]} onPress={() => props.navigation.navigate('MacBook')}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>SEE ALL</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ borderBottomWidth: 2, borderColor: 'gray' }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginVertical: 20 }}>
                        <Icon name="apple" size={25} color="#fff" style={{ marginRight: 4, top: 9 }} />
                        <Text style={styles.text}>AppleWatch</Text>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Swiper horizontal={true} style={{ height: 250 }} showsPagination={false}>
                            <Image
                                source={require('../image/bannerair.jpg')}
                                style={styles.backgroundImage}
                                resizeMode="cover"
                            />
                            <Image
                                source={require('../image/banneraw.jpg')}
                                style={styles.backgroundImage}
                                resizeMode="cover"
                            />
                        </Swiper>
                        <View style={{ position: 'absolute', flexDirection: 'row', paddingVertical: 0, justifyContent: 'space-around', bottom: 18, left: 100 }}>
                            <TouchableOpacity style={styles.buttonbannerip} onPress={() => props.navigation.navigate('AppleWatch')}>
                                <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black', textAlign: 'center' }}>BUY NOW</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Swiper style={{ height: 260 }} showsPagination={false} slidesPerView={2}>
                            <View style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                                <ItemMiniProduct key="1" item={aWatch[1]} />
                                <ItemMiniProduct key="2" item={aWatch[2]} />
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                                <ItemMiniProduct item={aWatch[3]} />
                                <ItemMiniProduct item={aWatch[4]} />
                            </View>
                        </Swiper>
                        <View style={{ flexDirection: 'row', paddingVertical: 20, justifyContent: 'space-around' }}>
                            <TouchableOpacity style={[{ backgroundColor: 'gray' }, styles.button]} onPress={() => props.navigation.navigate('AppleWatch')}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>SEE ALL</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

                <View style={{ borderBottomWidth: 2, borderColor: 'gray' }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginVertical: 20 }}>
                        <Icon name="apple" size={25} color="#fff" style={{ marginRight: 4, top: 9 }} />
                        <Text style={styles.text}>AirPods</Text>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Swiper horizontal={true} style={{ height: 240 }} showsPagination={false}>
                            <Image
                                source={require('../image/bannerairmax.jpg')}
                                style={styles.backgroundImage}
                                resizeMode="cover"
                            />
                            <Image
                                source={require('../image/bannerair1.jpg')}
                                style={styles.backgroundImage}
                                resizeMode="cover"
                            />
                            <Image
                                source={require('../image/bannerair2.jpg')}
                                style={styles.backgroundImage}
                                resizeMode="cover"
                            />
                        </Swiper>
                        <View style={{ position: 'absolute', flexDirection: 'row', paddingVertical: 0, justifyContent: 'space-around', bottom: 16, left: 100 }}>
                            <TouchableOpacity style={styles.buttonbannerip} onPress={() => props.navigation.navigate('AirPods')}>
                                <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black', textAlign: 'center' }}>BUY NOW</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Swiper style={{ height: 260 }} showsPagination={false} slidesPerView={2}>
                            <View style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                                <ItemMiniProduct key="1" item={aPods[1]} />
                                <ItemMiniProduct key="2" item={aPods[2]} />
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                                <ItemMiniProduct item={aPods[3]} />
                                <ItemMiniProduct item={aPods[0]} />
                            </View>
                        </Swiper>
                        <View style={{ flexDirection: 'row', paddingVertical: 20, justifyContent: 'space-around' }}>
                            <TouchableOpacity style={[{ backgroundColor: 'gray' }, styles.button]} onPress={() => props.navigation.navigate('AirPods')}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>SEE ALL</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </ScrollView>) :

                (<View style={styles.container}>
                    {(data.length === 0) ? (<Text style={{color: '#fff', textAlign: 'center', marginTop: 30, fontSize: 16}}>We don't have an "{searchText}" yet</Text>):
                    (<FlatList
                        data={data}
                        renderItem={ItemProduct}
                        keyExtractor={item => item.id}
                        numColumns={2} // Hiển thị danh sách thành hai cột
                        contentContainerStyle={{ paddingHorizontal: 5 }}
                    />)}
                </View>)}
        </View>
    )
}


const styles = StyleSheet.create({
    button: {
        width: '35%',
        height: 50,
        justifyContent: 'center',
        borderRadius: 25,
    },
    buttonbannerip: {
        width: '50%',
        height: 40,
        borderColor: 'gray',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 50,
        elevation: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 5,
        }
    },
    buttonbannerair: {
        width: '50%',
        height: 40,
        borderColor: 'gray',
        justifyContent: 'center',
        backgroundColor: '#ffffff', 
        borderRadius: 50,
        elevation: 10, 
        shadowColor: '#000000', 
        shadowOffset: {
            width: 0, 
            height: 5, 
        }
    },
    item: {
        flex: 1,
        minHeight: 250,
        backgroundColor: 'white',
        margin: 6, 
        elevation: 2, 
        borderRadius: 20,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 180,
        backgroundColor: '#fff',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginHorizontal: 10
    },
    price: {
        fontSize: 15,
        marginHorizontal: 8,
        marginBottom: 10,
        color: '#fff',
        textAlign: 'center',
        color: 'gray', fontWeight: 'bold'

    },
    text: {
        color: 'white',
        fontSize: 31,
    },
    iconsearch: {
        position: 'absolute',
        top: '34%',
        left: '6%',
        zIndex: 100
    },
    search: {
        position: 'relative',
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginVertical: 15,
        height: 50,
        borderRadius: 30,
        paddingHorizontal: 20,
        fontSize: 18,
        paddingLeft: 45,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        objectFit: 'cover',
    },
    slideShow: {
        height: 240,
        objectFit: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // SEARCH
    nameSearch: {
        fontSize: 15,
        fontWeight: 'bold',
        padding: 8,
        color: 'black',
        textAlign: 'center'
    },
    priceSearch: {
        fontSize: 15,
        marginHorizontal: 8, // Thêm margin cho giá
        marginBottom: 20, // Thêm margin dưới giá
        color: 'gray',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    container: {
        paddingHorizontal: 5,
        paddingBottom: 10,
        backgroundColor: '#000',
        height: ScreenHeight - 190
    },
    itemSearch: {
        flex: 1,
        minHeight: 260,
        maxWidth: 200,
        backgroundColor: 'white',
        margin: 9, // Margin giữa các mục
        elevation: 2, // Hiển thị shadow,
        borderRadius: 25,
        overflow: 'hidden'
    }
});