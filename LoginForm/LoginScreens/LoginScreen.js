import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    ImageBackground,
    Dimensions
} from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
const BASE_URL = "http://api.ticket-staging.hotdeal.vn/api";
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const BG_IMAGE = require('../img/bg_screen1.jpg');

var STORAGE_KEY = 'key_access_token';
export default class LoginScreen extends Component {
    static navigationOptions = {
        header: (
            <View/>
        )
    };
    constructor(props) {
        super(props);
        
        this.state = {
            email: '',
            password: '',
            emailholder:'Email@@@'
        };
    }
    _onPressRegister(event) {
        var { navigate } = this.props.navigation;
        navigate('RegisterScreen');
    }
    _onTestLogin(event) {
        var { navigate } = this.props.navigation;
        navigate('MainScreen');
    }
    _onPressLogin(event) {
        let serviceUrl = BASE_URL + "/user/login";
        let email = this.state.email;
        let password = this.state.password;
        var access_token = '';
        console.log("email=" + email + "&password=" + password)
        
        fetch(serviceUrl, {
            method: "POST",

            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email, password: password
              }),
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                access_token = responseJSON.token;
                console.log("access_token=" + access_token)
                if (access_token != undefined) {
                    try {
                        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(responseJSON));
                        var { navigate } = this.props.navigation;
                        navigate('MainScreen');
                    } catch (error) {
                        console.log('AsyncStorage error: ' + error.message);
                    }
                }
                else {
                    Alert.alert('Login failure');
                }
            })
            .catch((error) => {
                console.warn(error);
            });
    }

    render() {
        const { email, password } = this.state;
        return (
            <View style={styles.container}>
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                    <View style={styles.loginView}>
                        <View style={styles.loginTitle}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.headerText}>Login Form</Text>
                            </View>
                        </View>
                        <View style={styles.loginInput}>
                            <Input
                                leftIcon={
                                    <Icon
                                        name="envelope-o"
                                        type="font-awesome"
                                        color="rgba(171, 189, 219, 1)"
                                        size={25}/>
                                }
                                containerStyle={{ marginVertical: 10 }}
                                onChangeText={email => this.setState({ email })}
                                value={email}
                                inputStyle={{ marginLeft: 10, color: 'white' }}
                                keyboardAppearance="light"
                                // placeholder="Email"
                                placeholder={this.state.emailholder}
                                autoFocus={false}
                                autoCapitalize="none"
                                autoCorrect={false}
                                returnKeyType="next"
                                blurOnSubmit={false}
                                placeholderTextColor="white"
                                errorStyle={{ textAlign: 'center', fontSize: 12 }}
                            />
                            <Input
                                leftIcon={
                                    <Icon
                                        name="lock"
                                        type="font-awesome"
                                        color="rgba(171, 189, 219, 1)"
                                        size={25}
                                    />
                                }
                                containerStyle={{ marginVertical: 10 }}
                                onChangeText={password => this.setState({ password })}
                                value={password}
                                inputStyle={{ marginLeft: 10, color: 'white' }}
                                secureTextEntry={true}
                                keyboardAppearance="light"
                                placeholder="Password"
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="default"
                                returnKeyType="done"
                                blurOnSubmit={true}
                                placeholderTextColor="white"
                            />
                        </View>
                        <Button
                            title="LOG IN"
                            activeOpacity={1}
                            underlayColor="transparent"
                            onPress={this._onPressLogin.bind(this)}
                            loadingProps={{ size: 'small', color: 'white' }}
                            buttonStyle={{
                                height: 50,
                                width: 250,
                                backgroundColor: 'transparent',
                                borderWidth: 2,
                                borderColor: 'white',
                                borderRadius: 30,
                            }}
                            containerStyle={{ marginVertical: 10 }}
                            titleStyle={{ fontWeight: 'bold', color: 'white' }}
                        />
                        <Button
                            title="MAIN SCREEN"
                            activeOpacity={1}
                            underlayColor="transparent"
                            onPress={this._onTestLogin.bind(this)}
                            loadingProps={{ size: 'small', color: 'white' }}
                            buttonStyle={{
                                height: 50,
                                width: 250,
                                backgroundColor: 'transparent',
                                borderWidth: 2,
                                borderColor: 'white',
                                borderRadius: 30,
                            }}
                            containerStyle={{ marginVertical: 10 }}
                            titleStyle={{ fontWeight: 'bold', color: 'white' }}
                        />
                        <View style={styles.footerView}>
                            <Text style={{ color: 'grey' }}>New here?</Text>
                            <Button
                                title="Create an Account"
                                type="clear"
                                activeOpacity={0.5}
                                titleStyle={{ color: 'white', fontSize: 15 }}
                                containerStyle={{ marginTop: -10 }}
                                onPress={this._onPressRegister.bind(this)}
                            />
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginView: {
        marginTop: 150,
        backgroundColor: 'transparent',
        width: 250,
        height: 400,
    },
    loginTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'bold',
    },
    loginInput: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerView: {
        marginTop: 20,
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

