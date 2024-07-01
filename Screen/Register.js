import React, { useState, useRef } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, ScrollView, RefreshControl } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import { dataAccount } from '../data/dataAccount';
import { Notification } from './Cart';
// Lam email da dki tk 

export default function Register(props) {
    const [refreshing, setRefreshing] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [showNotify, setShowNotify] = useState(false);

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [countryError, setCountryError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);

// Tham chiếu cho các TextInput
const firstInputRef = useRef(null);
const lastInputRef = useRef(null);
const phoneInputRef = useRef(null);
const emailInputRef = useRef(null);
const passwordInputRef = useRef(null);
const confirmPasswordInputRef = useRef(null);

    const countries = [
        { label: 'Vietnam', value: 'Vietnam' },
        { label: 'United States', value: 'United States' },
        { label: 'United Kingdom', value: 'United Kingdom' },
        { label: 'Japan', value: 'Japan' },
        { label: 'Korea', value: 'Korea' },
        { label: 'ThaiLand', value: 'ThaiLand' },
        { label: 'Indonesia', value: 'Indonesia' },
        { label: 'Hong Kong', value: 'Hong Kong' },
        { label: 'Philippines', value: 'Philippines' },
        { label: 'China', value: 'China' },
    ];

    const handleRegister = () => {
        // Validation
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

        if (selectedCountry === null) {
            setCountryError(true);
            isValid = false;
        } else {
            setCountryError(false);
        }

        if (email.trim() === '' || !validateEmailFormat(email) || !validateGmailFormat(email) || EmailAvailable(email)) {
            setEmailError(true);
            isValid = false;
        } else {
            setEmailError(false);
        }

        if (password.trim().length < 5 || password.trim() === '' || !validatePasswordFormat(password)) {
            setPasswordError(true);
            isValid = false;
        } else {
            setPasswordError(false);
        }

        if (confirmPassword.trim() !== password.trim() || confirmPassword.trim() === '') {
            setConfirmPasswordError(true);
            isValid = false;
        } else {
            setConfirmPasswordError(false);
        }

        if (phone.trim() === '' || !validatePhoneNumber(phone)) {
            setPhoneError(true);
            isValid = false;
        } else {
            setPhoneError(false);
        }

        if (isValid) {
            setTimeout(() => {
                setShowNotify(true);
                setEmail('')
            }, 100)
            setTimeout(() => {
                setShowNotify(false);
                props.navigation.navigate('Login');
            }, 2500);
            let itemAcc = {
                // id: id,
                firstName: firstName,
                lastName: lastName,
                Email: email,
                Phone: phone,
                PassWord: password
            }
            dataAccount.push(itemAcc);
        }
    };

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

    const validatePasswordFormat = (password) => {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/;
        return passwordPattern.test(password);
    }

    const EmailAvailable = (email) => {
        return dataAccount.find(item => item.Email === email)
    }

    const onRefresh = () => {
        setRefreshing(true);
        setFirstName('');
        setLastName('');
        setSelectedCountry('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setPhone('');
        setRefreshing(false);
    };

    const [hidePassword, setHidePassword] = useState(true);

    return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            <View style={{ marginTop: 100, position: 'absolute', left: -40 }}>{(showNotify) && Notification('check-circle', 'Đăng kí tài khoản thành công')}</View>
            <TouchableOpacity>
                <Image
                    source={require('../image/login.jpg')}
                    style={{ width: '60%', height: 190, marginVertical: 20, marginLeft: 'auto', marginRight: 'auto' }}
                />
            </TouchableOpacity>
            <Text style={styles.title}>Register ID Apple</Text>
            <Text style={{ textAlign: 'center', fontSize: 16, marginBottom: 30 }}>Just have one Apple ID to access all Apple services.</Text>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                <View style={styles.inputContainername}>
                    <TextInput
                        style={[styles.inputname, { borderColor: firstNameError ? 'red' : '#000' }]}
                        placeholder='First Name'
                        onChangeText={(text) => {
                            setFirstName(text);
                            setFirstNameError(false);
                        }}
                        value={firstName}
                        ref={firstInputRef}
                        onSubmitEditing={() => lastInputRef.current.focus()}
                        returnKeyType="done"
                    />
                </View>
                <View style={styles.inputContainername}>
                    <TextInput
                        style={[styles.inputname, { borderColor: lastNameError ? 'red' : '#000' }]}
                        placeholder='Last Name'
                        onChangeText={(text) => {
                            setLastName(text);
                            setLastNameError(false);
                        }}
                        value={lastName}
                        ref={lastInputRef}
                        onSubmitEditing={() => phoneInputRef.current.focus()}
                        returnKeyType="done"
                    />
                </View>
            </View>
            {(lastNameError || firstNameError) && <Text style={{ color: 'red' }}>Invalid name</Text>}
            <View style={styles.inputContainer}>
                <Text style={{ textAlign: 'center', fontSize: 15 }}>Country / Region</Text>
                <View style={[styles.inputlist, { borderColor: countryError ? 'red' : '#000' }]}>
                    <RNPickerSelect
                        style={pickerSelectStyles}
                        placeholder={{
                            label: 'Select a country',
                            value: null,
                        }}
                        onValueChange={(value) => {
                            setSelectedCountry(value);
                            setCountryError(false);
                        }}
                        items={countries}
                        value={selectedCountry}
                    />
                </View>
                <TextInput
                    style={[styles.input, { borderColor: phoneError ? 'red' : '#000' }]}
                    placeholder='Phone Number'
                    onChangeText={(text) => {
                        setPhone(text);
                        setPhoneError(false);
                    }}
                    value={phone}
                    ref={phoneInputRef}
                    onSubmitEditing={() => emailInputRef.current.focus()}
                    returnKeyType="done"
                />
                {phoneError && <Text style={{ color: 'red' }}>Invalid phone number.</Text>}
            </View>
            <Text style={{ textAlign: 'center', fontSize: 15 }}>Apple ID account</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, { borderColor: emailError ? 'red' : '#000' }]}
                    placeholder='name@example.com'
                    onChangeText={(text) => {
                        setEmail(text);
                        setEmailError(false);
                    }}
                    value={email}
                    ref={emailInputRef}
                    onSubmitEditing={() => passwordInputRef.current.focus()}
                    returnKeyType="done"
                />
                {EmailAvailable(email) ? (<Text style={{ color: 'red' }}>Email is available.</Text>)
                    : (emailError ? <Text style={{ color: 'red' }}>Email address is not valid.</Text>
                        : <Text style={{ marginBottom: 10 }}>This will be your new Apple ID.</Text>)}
                <View>
                    <TextInput
                        style={[styles.input, { borderColor: (passwordError) ? 'red' : '#000' }]}
                        placeholder='Password'
                        secureTextEntry={hidePassword}
                        onChangeText={(text) => {
                            setPassword(text);
                            setPasswordError(false);
                        }}
                        value={password}
                        ref={passwordInputRef}
                        onSubmitEditing={() => confirmPasswordInputRef.current.focus()}
                        returnKeyType="done"
                    />

                    {(passwordError) && <Text style={{ color: 'red' }}>Invalid password.</Text>}
                    {(!passwordError && confirmPasswordError) && <Text style={{ color: 'red' }}>IPasswords do not match</Text>}

                    <TextInput
                        style={[styles.input, { borderColor: (!passwordError && confirmPasswordError) ? 'red' : '#000' }]}
                        placeholder='Confirm Password'
                        secureTextEntry={hidePassword}
                        onChangeText={(text) => {
                            setConfirmPassword(text);
                            setConfirmPasswordError(password !== confirmPassword);
                        }}
                        value={confirmPassword}
                        ref={confirmPasswordInputRef}
                        onSubmitEditing={handleRegister}
                        returnKeyType="done"
                    />

                    <TouchableOpacity onPress={() => setHidePassword(!hidePassword)} style={{ position: 'absolute', right: 10, top: 20 }}>
                        <Icon name="eye" size={20} color="gray" style={{ marginRight: 10 }} />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.buttonText}>Create Your Apple ID</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton} onPress={() => props.navigation.navigate('LoginScreen')}>
                <Text style={styles.buttonText}>Back to Login</Text>
            </TouchableOpacity>
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
    inputContainername: {
        width: '47%',
        marginBottom: 10,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 10,
    },
    inputname: {
        borderWidth: 2,
        borderColor: '#000',
        height: 50,
        borderRadius: 15,
        paddingHorizontal: 20,
        fontSize: 16,
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
    registerButton: {
        backgroundColor: '#1D1D1F',
        width: '100%',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    loginButton: {
        backgroundColor: '#1D1D1F',
        width: '100%',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -20,
        marginBottom: 60
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    }
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
});
