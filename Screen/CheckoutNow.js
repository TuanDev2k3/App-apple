import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { dataCart } from '../data/dataCart';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import { FlatList } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Alert } from 'react-native';
const ScreenWidth = Dimensions.get('window').width - 20;
const ScreenHeight = Dimensions.get('window').height;

export default function CheckoutNow({route, navigation}) {
    const {item} = route.params;
    const [selectedCountry, setSelectedCountry] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [cartItems, setCartItems] = useState(dataCart);
    const [isCheckInfo, setCheckInfo] = useState(false);
    const [isCheckOut, setIsCheckOut] = useState(false)


    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [countryError, setCountryError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [ship, setShip] = useState(0)

    const countries = [
        { label: 'Vietnam', value: 'Vietnam', shipPrice: 0 },
        { label: 'United States', value: 'United States', shipPrice: 50 },
        { label: 'United Kingdom', value: 'United Kingdom', shipPrice: 30 },
        { label: 'Japan', value: 'Japan', shipPrice: 5 },
        { label: 'Korea', value: 'Korea', shipPrice: 6 },
        { label: 'ThaiLand', value: 'ThaiLand', shipPrice: 10 },
        { label: 'Indonesia', value: 'Indonesia', shipPrice: 12 },
        { label: 'Hong Kong', value: 'Hong Kong', shipPrice: 7 },
        { label: 'Philippines', value: 'Philippines', shipPrice: 9 },
        { label: 'China', value: 'China', shipPrice: 3 },
    ];

    function handInfo() {
        let isValid = true;
        if (firstName.trim() === '') {
            setFirstNameError(true);
            isValid = false;
        } else {
            setFirstNameError(false);
        }

        if (lastName.trim() === '') {
            setLastNameError(true);
            isValid = false;
        } else {
            setLastNameError(false);
        }

        if (selectedCountry === '') {
            setCountryError(true);
            isValid = false;
        } else {
            setCountryError(false);
        }

        if (email.trim() === '' || !validateEmailFormat(email) || !validateGmailFormat(email)) {
            setEmailError(true);
            isValid = false;
        } else {
            setEmailError(false);
        }

        if (phone.trim() === '' || !validatePhoneNumber(phone)) {
            setPhoneError(true);
            isValid = false;
        } else {
            setPhoneError(false);
        }

        if (isValid) {
            setCheckInfo(true)
        }
    }

    const validatePhoneNumber = (inputtxt) => {
        const phoneno = /^0\d{9}$/;
        return inputtxt.match(phoneno);
    };

    const validateEmailFormat = (email) => {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
    };

    const validateGmailFormat = (email) => {
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return gmailRegex.test(email);
    };
    
    function ItemProduct({ item }) {
        return (
            <View key={item.idCart} style={styles.productContainer}>
                <Image source={{ uri: item.image[0] }} style={styles.productImage} />
                <View style={styles.productInfo}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.productPrice}>Price: ${item.price} </Text>
                        <Text style={[styles.productPrice, { color: 'red' }]}>x1</Text>
                    </View>
                </View>
            </View>
        )
    };
    // Trang Check/Nhap thong tin 
    return (
        (isCheckInfo) ?
            (<View style={{ padding: 10 }}>

                <Text style={styles.productTitle}>Products</Text>
                <View style={{ maxHeight: 380, borderBottomWidth: 2, paddingBottom: 5 }}>
                    <ItemProduct item={item}/>
                </View>
                <View style={{ width: ScreenWidth, marginTop: 20, paddingHorizontal: 5 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10 }}>
                        <Icon name='book' size={18} color={'red'} />
                        <Text style={{ marginLeft: 5 }}>Chi tiết thanh toán</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 3, justifyContent: 'space-between' }}>
                        <Text style={{ color: '#5b5b5b' }}>Tổng tiền hàng: </Text>
                        <Text style={{ color: '#5b5b5b' }}>${item.price}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 3, justifyContent: 'space-between' }}>
                        <Text style={{ color: '#5b5b5b' }}>Tổng phí vận chuyển: </Text>
                        <Text style={{ color: '#5b5b5b' }}>${ship}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 3, justifyContent: 'space-between' }}>
                        <Text style={{ color: '#5b5b5b' }}>Giảm phí vận chuyện: </Text>
                        <Text style={{ color: '#5b5b5b' }}>-$0</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 3, justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 500 }}>Tổng thanh toán: </Text>
                        <Text style={{ fontWeight: 500, color: 'red' }}>${item.price + ship}</Text>
                    </View>

                    <TouchableOpacity style={[styles.payButton, { marginVertical: 30, backgroundColor: '#ff2d2d' }]}
                        onPress={() => {
                            setTimeout(() => {
                                setIsCheckOut(true);
                            }, 1500)
                        }}>
                        <Text style={[styles.buttonText, { fontSize: 16 }]}>Đặt hàng</Text>
                    </TouchableOpacity>
                </View>

                {/* Mua hang thanh cong */}
                <View style={[styles.succesBox, { display: (isCheckOut) ? 'flex' : 'none' }]}>
                    <Text style={{ fontSize: 50, color: '#fff', fontWeight: 'bold', margin: 10, textAlign: 'center' }}>Payment Successfull</Text>
                    <Text style={{ color: '#fff' }}>Your order will arrive in 3 - 5 business days</Text>
                    <Image
                        source={require('../image/success.png')}
                        style={{ width: 160, margin: 20, height: 160, marginTop: 30 }}
                        resizeMode="cover"
                    />
                    <TouchableOpacity style={[styles.payButton, { backgroundColor: '#fff', width: 250, marginTop: 30, }]}
                        onPress={() => {
                            navigation.popToTop();
                        }}>
                        <Text style={{ color: '#000', fontSize: 18, fontWeight: 500 }}>Home</Text>
                    </TouchableOpacity>
                </View>
            </View>)
            :
            (<ScrollView style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../image/login.jpg')}
                        style={{ width: '60%', height: 190, marginTop: 20, marginBottom: 20, marginLeft: 'auto', marginRight: 'auto' }}>
                    </Image>
                </TouchableOpacity>

                <Text style={styles.title}>Payment</Text>


                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <View style={styles.inputContainername}>
                        <TextInput
                            style={[styles.input, { borderColor: firstNameError ? 'red' : '#000' }]}
                            placeholder='First Name'
                            onChangeText={(text) => {
                                setFirstName(text);
                                setFirstNameError(false);
                            }}
                        />
                    </View>
                    <View style={styles.inputContainername}>
                        <TextInput
                            style={[styles.input, { borderColor: lastNameError ? 'red' : '#000' }]}
                            placeholder='Last Name'
                            onChangeText={(text) => {
                                setLastName(text);
                                setLastNameError(false);
                            }}
                        />
                    </View>
                </View>
                {(lastNameError || firstNameError) && <Text style={{ color: 'red' }}>Invalid name</Text>}

                <View style={styles.inputContainer}>
                    <Text style={{ textAlign: 'center', fontSize: 15, }}>Contact Info</Text>
                    <TextInput
                        style={[styles.input, { borderColor: phoneError ? 'red' : '#000' }]}
                        placeholder='Phone'
                        onChangeText={(text) => {
                            setPhone(text);
                            setPhoneError(false);
                        }}
                    />
                    {phoneError && <Text style={{ color: 'red' }}>Invalid phone number.</Text>}
                    <TextInput
                        style={[styles.input, { borderColor: emailError ? 'red' : '#000' }]}
                        placeholder='name@example.com'
                        onChangeText={(text) => {
                            setEmail(text);
                            setEmailError(false);
                        }}
                    />
                    {emailError && <Text style={{ color: 'red' }}>Email is not valid.</Text>}
                    <View style={[styles.inputlist, { borderColor: countryError ? 'red' : '#000' }]}>
                        <RNPickerSelect
                            style={pickerSelectStyles}
                            placeholder={{
                                label: 'Select a country',
                                value: null,
                                shipPrice: 0
                            }}
                            onValueChange={(value, index) => {
                                if (value !== null) {
                                    setSelectedCountry(value);
                                    setCountryError(false);
                                    setShip(countries[index - 1].shipPrice);
                                }
                            }}
                            items={countries}
                            value={selectedCountry}
                        />
                    </View>
                    {countryError && <Text style={{ color: 'red' }}>Country is not valid.</Text>}

                </View>

                <TouchableOpacity style={styles.payButton} onPress={() => handInfo()}>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </ScrollView>)

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        paddingVertical: 50,
        paddingHorizontal: 40,
        position: 'relative',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 35,
        marginBottom: 15,
        textAlign: 'center'
    },
    inputContainername: {
        width: '50%',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },

    input: {
        borderWidth: 2,
        borderColor: '#000',
        height: 50,
        borderRadius: 15,
        paddingHorizontal: 20,
        fontSize: 16,
        margin: 5
    },
    productContainer: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginVertical: 5,
        elevation: 5,
        shadowColor: '000',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 20,
        marginBottom: 15
    },
    productTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 20,
        textAlign: 'center'
    },
    productImage: {
        width: 100,
        height: 100,
        marginRight: 5,
        borderRadius: 5,
        backgroundColor: '#fff'
    },
    productInfo: {
        flex: 1,
        marginLeft: 3
    },
    productName: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 3
    },
    productPrice: {
        fontSize: 15,
        color: 'green'
    },
    payButton: {
        backgroundColor: '#1D1D1F',
        width: '100%',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 80
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    inputlist: {
        borderWidth: 2,
        borderColor: '#000',
        height: 50,
        borderRadius: 15,
        fontSize: 16,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15
    },
    succesBox: {
        width: ScreenWidth + 20,
        height: ScreenHeight,
        // display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1e1e2a',
        position: 'absolute'
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        borderWidth: 2,
        borderColor: '#000',
        height: 50,
        borderRadius: 15,
        paddingHorizontal: 20,
        fontSize: 16,
        marginBottom: 20,
    },
    inputAndroid: {
        borderWidth: 2,
        borderColor: '#000',
        height: 50,
        borderRadius: 15,
        paddingHorizontal: 20,
        fontSize: 16,
        marginBottom: 20,
    },
    // TB Dat hang thanh cong
});