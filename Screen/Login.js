import React, { useState, useEffect, useRef } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { dataAccount } from '../data/dataAccount';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Notification } from './Cart';

export default function Login(props) {
    const [isLogin, setIsLogin] = useState(false); // Initialize isLogin state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showNotify, setShowNotify] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    //tham chieu cho cac TextInput
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    
    useEffect(() => {
        // Reset state khi chuyển tab
        const unsubscribe = props.navigation.addListener('focus', () => {
            checkLoginStatus();
            setEmail(''),
                setFirstName(''),
                setLastName(''),
                setPassword(''),
                setEmailError('');
            setPasswordError('');
        });

        return unsubscribe;
    }, [props.navigation]);

    const onRefresh = () => {
        setRefreshing(true);
        // Xóa dữ liệu trong TextInput
        setEmail('');
        setPassword('');
        setRefreshing(false);
    };

    // DANG NHAP
    const handleLogin = async () => {
        // Validate inputs
        if (email.trim() === '' || !validateEmailFormat(email) || !validateGmailFormat(email)) {
            setEmailError('Enter a valid email or phone');
            return;
        }
        if (password.trim().length < 5 || !validatePasswordFormat(password)) {
            setPasswordError('Enter a valid password');
            return;
        }

        // ====== Đăng nhập (Login) ======
        let findEmail = dataAccount.find(item => item.Email === email);
        if (findEmail && findEmail.PassWord === password.trim()) {
            setFirstName(findEmail.firstName);
            setLastName(findEmail.lastName);
            setIsLogin(true); // Update isLogin state to true
            const myLogin = JSON.stringify([{ isLogin: true, firstName: findEmail.firstName, lastName: findEmail.lastName, email: email }]);

            await AsyncStorage.setItem('myLogin', myLogin);
        }
        else {
            setTimeout(() => {
                setShowNotify(true);
            }, 100)
            setTimeout(() => {
                setShowNotify(false);
            }, 2500);
        }
    };

    const handleLogout = async () => {
        setIsLogin(false); // Update isLogin state to false
        await AsyncStorage.removeItem('myLogin');
    };

    const validateEmailFormat = (email) => {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
    };

    const validateGmailFormat = (email) => {
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return gmailRegex.test(email);
    };

    const validatePasswordFormat = (password) => {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/;
        return passwordPattern.test(password);
    }

    const checkLoginStatus = async () => {
        const storedArray = await AsyncStorage.getItem('myLogin');
        const myLogin = JSON.parse(storedArray); // Chuyển đổi chuỗi JSON thành mảng
        if (myLogin && myLogin[0].isLogin) {
            setIsLogin(true);
            setEmail(myLogin[0].email)
            setFirstName(myLogin[0].firstName)
            setLastName(myLogin[0].lastName)
        }
    };

    const [hidePassword, setHidePassword] = useState(true);

    // ====== Trang Login =============
    return (
        <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View style={styles.container}>
                <TouchableOpacity style={{ marginTop: 20 }} onPress={() => props.navigation.navigate('HomeScreen')}>
                    <Image
                        source={require('../image/login.jpg')}
                        style={{ width: '60%', height: 190, marginTop: 20, marginBottom: 20, marginLeft: 'auto', marginRight: 'auto' }}
                    />
                </TouchableOpacity>
                {(showNotify) && Notification('times-circle','Đăng nhập thất bại. Vui lòng kiểm tra và thử lại')}
                {(!isLogin) ? (
                    <View>
                        <Text style={styles.title}>ID Apple</Text>
                        <Text style={styles.subtitle}>Manage your Apple account</Text>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.input, { borderColor: emailError ? 'red' : '#000' }]}
                                placeholder='Email or phone number'
                                onChangeText={(text) => {
                                    setEmail(text);
                                    setEmailError('');
                                }}
                                value={email}
                                ref={emailInputRef}
                                onSubmitEditing={() => passwordInputRef.current.focus()}
                                returnKeyType="done"
                                
                            />

                            {emailError !== '' && <Text style={{ color: 'red' }}>Enter a valid email address (gmail.com).</Text>}
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.input, { borderColor: passwordError ? 'red' : '#000' }]}
                                placeholder='Password'
                                secureTextEntry={hidePassword}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    setPasswordError('');
                                }}
                                value={password}
                                ref={passwordInputRef}
                                onSubmitEditing={handleLogin}
                                returnKeyType="done"
                            />
                            <TouchableOpacity onPress={() => setHidePassword(!hidePassword)} style={{ position: 'absolute', right: 10, top: 15 }}>
                                <Icon name="eye" size={20} color="gray" style={{ marginRight: 10 }} />
                            </TouchableOpacity>
                            {passwordError !== '' && <Text style={{ color: 'red' }}>{passwordError}</Text>}
                        </View>

                        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={() => props.navigation.navigate('Register')}>
                            <Text style={styles.buttonText}>Create Your Apple ID</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('ForgotPassword')}>
                            <Text style={styles.forgotPassword}>Forgot password?</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View>
                        <Text style={styles.title}>{firstName + ' ' + lastName}</Text>
                        <Text style={styles.subtitle}>Email: {email}</Text>
                        <TouchableOpacity style={styles.btn} onPress={handleLogout}>
                            <Text style={styles.buttonText}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        padding: 45,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 35,
        marginBottom: 10,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        color: 'gray'
    },
    inputContainer: {
        width: '100%',
        marginBottom: 10,
    },
    input: {
        borderWidth: 2,
        height: 50,
        borderRadius: 15,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    btn: {
        backgroundColor: '#1D1D1F',
        width: '100%',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,

    },
    buttonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
    },
    forgotPassword: {
        marginTop: 10,
        marginBottom: 80,
        textAlign: 'center'
    },
    scrollView: {
        flexGrow: 1,
    },
});
