import React, { useState, useRef } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, ScrollView, RefreshControl, Alert } from 'react-native';
import { dataAccount } from '../data/dataAccount';
import { Notification } from './Cart';

let randomPass = [
    'ABc123#',
    'aBC234&',
    'Cba324%',
    'AAa551$',
    '$Text6@'
];

export default function ForgotPassword(props) {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [showNotify, setShowNotify] = useState(false);

    const emailInputRef = useRef(null);

    const handleResetPassword = () => {
        if (email.trim() === '' || !validateEmailFormat(email) || !validateGmailFormat(email)) {
            setEmailError(true);
            return; // Stop execution if email is empty
        }
        if (!emailError) {
            let findEmail = dataAccount.find(item => item.Email === email.trim())
            if (findEmail) {
                findEmail.PassWord = randomPass[Math.floor(Math.random() * (randomPass.length - 1))];
                setTimeout(() => {
                    Alert.alert(
                        'Forgot password',
                        `Password mới của bạn:  ${findEmail.PassWord}.\nHãy thử đăng nhập lại với password mới này !!`
                    )
                    props.navigation.navigate('Login');
                }, 1500)
            }
            else {
                setTimeout(() => {
                    setShowNotify(true);
                }, 100)
                setTimeout(() => {
                    setShowNotify(false);
                }, 2500);
            }
        }

        // Handle reset password logic here
    };


    const validateEmailFormat = (email) => {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
    };

    const validateGmailFormat = (email) => {
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return gmailRegex.test(email);
    };

    const onRefresh = () => {
        setRefreshing(true);
        setEmail('');
        setEmailError(false);
        if (emailInputRef.current) {
            emailInputRef.current.clear(); // Xóa dữ liệu trong TextInput
        }
        setRefreshing(false);
    };

    return (
        <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            <View style={styles.container}>
                {(showNotify) && Notification('times-circle', 'Email không tồn tại !!')}
                <TouchableOpacity style={{ width: 200, height: 200, marginBottom: 30 }}>
                    <Image
                        source={require('../image/login.jpg')}
                        style={{ width: '100%', height: '100%', marginTop: 20, marginBottom: 20, marginHorizontal: 'auto' }}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>Forgot Password</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        ref={emailInputRef}
                        style={[styles.input, { borderColor: emailError ? 'red' : '#000' }]} // Change border color based on error
                        placeholder='Email'
                        onChangeText={text => {
                            setEmail(text);
                            setEmailError(false); // Reset error when typing
                        }}
                    />
                    <Text>{emailError && <Text style={{ color: 'red' }}>Please enter your email (gmail.com).</Text>} {/* Display error message */}</Text>
                </View>
                <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
                    <Text style={styles.buttonText}>Reset Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.backButton} onPress={() => props.navigation.goBack()}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        padding: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollView: {
        flexGrow: 1,
    },
    logo: {
        width: '60%',
        height: 190,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 35,
        marginBottom: 20,
        textAlign: 'center'
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        borderWidth: 2,
        height: 50,
        borderRadius: 15,
        paddingHorizontal: 20,
        fontSize: 16,
    },
    resetButton: {
        backgroundColor: '#1D1D1F',
        width: '100%',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    backButton: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    }
});
