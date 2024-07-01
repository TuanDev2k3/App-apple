import { FlatList, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import iPhones from '../data/data-iPhone'
import { useState } from 'react';
import { RefreshControl } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';


export default function IPhone(props) {
    const [refreshing, setRefreshing] = useState(false);
    const [List, setList] = useState(false);
    const [numColumns, setNumColumns] = useState(2);
    const onRefresh = () => {
        setRefreshing(true);
        // Thực hiện các thao tác làm mới dữ liệu ở đây
        setTimeout(() => {
            setRefreshing(false); // Kết thúc quá trình làm mới sau 2 giây
        }, 1000);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => props.navigation.navigate('Detail', { item })} style={(!List) ? styles.item : styles.itemlist} resizeMode="cover">
            <Image source={{ uri: item.image[0] }} style={(!List) ? styles.image : styles.imagelist} />
            <Text style={(!List) ? styles.name : styles.namelist}>{item.name}</Text>
            <Text style={(!List) ? styles.price : styles.pricelist}>${item.price}</Text>
        </TouchableOpacity>
    );
    function handList() {
        if (!List) {
            setNumColumns(1)
            setList(true)
        }
        else {
            setNumColumns(2)
            setList(false)
        }
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
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
                </View>
                <View style={{ display: 'flex', flexDirection: 'row',marginVertical: 10, justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', marginLeft: 10}}>
                        <Ionicons name="filter" size={30} color="white" />
                        <Text style={{color: 'white', fontSize: 20, textAlign: 'center', marginHorizontal: 10}}>Filter</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        onPress={() => handList()}>
                        <Ionicons name={(List) ? 'grid-outline' : 'list-sharp'} size={30} color='white' style={{marginRight: 15}} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    scrollEnabled={false}
                    data={iPhones}
                    key={numColumns}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={numColumns} // Hiển thị danh sách thành hai cột
                    contentContainerStyle={{ paddingHorizontal: 5 }} // Căn giữa danh sách
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        paddingBottom: 5,
        backgroundColor: '#000',
    },
    backgroundImage: {
        width: '100%',
        height: 220,
        backgroundColor: '#fff',
        objectFit: 'cover',
    },
    item: {
        flex: 1,
        minHeight: 260,
        backgroundColor: 'white',
        margin: 10, // Margin giữa các mục
        elevation: 2, // Hiển thị shadow,
        borderRadius: 25,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: 180,
        backgroundColor: '#fff',
        top: 20,
        marginBottom: 15,
    },
    name: {
        fontSize: 15,
        fontWeight: 'bold',
        padding: 8,
        color: 'black',
        textAlign: 'center'
    },
    price: {
        fontSize: 15,
        marginHorizontal: 8, // Thêm margin cho giá
        marginBottom: 20, // Thêm margin dưới giá
        color: 'gray',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    //list
    itemlist: {
        flex: 1,
        height: 450,
        backgroundColor: 'white',
        margin: 20, // Margin giữa các mục
        elevation: 2, // Hiển thị shadow,
        borderRadius: 30,
        overflow: 'hidden',
    },
    imagelist: {
        width: '100%',
        height: '80%',
        backgroundColor: '#fff',
        // top: 20,
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    namelist: {
        top: -40,
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    },
    pricelist: {
        top: -30,
        fontSize: 27,
        marginHorizontal: 8, // Thêm margin cho giá
        color: 'gray',
        fontWeight: 'bold',
        textAlign: 'center'
    },
});

// const styles = StyleSheet.create({
//     backgroundImage: {
//         width: '100%',
//         height: 220,
//         backgroundColor: '#fff',
//         objectFit: 'cover',
//     },
//     container: {
//         paddingHorizontal: 5,
//         paddingBottom: 5,
//         backgroundColor: '#000',
//     },
// });