import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ImageBackground,
    View,
    Alert,
    Dimensions
} from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
const BASE_URL = "http://api.ticket-staging.hotdeal.vn/api";
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const BG_IMAGE = require('../img/bg_screen1.jpg');
var STORAGE_KEY = 'key_access_token';
export default class RegisterScreen extends Component {
    static navigationOptions = {
        header: (
            <View/>
        )
    };
    constructor(props) {
        super(props);
        
        this.state = {
            name: '',
            email:'',
            password: '',
        };
    }
    _onPressRegisterBtn(event) {
        let serviceUrl = BASE_URL + "/user/register";
        let name = this.state.name;
        let email = this.state.email;
        let password = this.state.password;
        var access_token = '';
        var { navigate } = this.props.navigation;
        fetch(serviceUrl, {
            method: "POST",

            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
              }),
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                access_token = responseJSON.token;
                if (access_token != undefined) {
                    try {
                        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(responseJSON));
                        navigate('LoginScreen');
                    } catch (error) {
                        console.log('AsyncStorage error: ' + error.message);
                    }

                }
                else {
                    Alert.alert('Register failure');
                }

            })
            .catch((error) => {
                console.warn(error);
            });


    }
    static navigationOptions = {
        title: 'RegisterScreen',
        header: null,
    };
    render() {
        const { email, password, name } = this.state;
        return (
            <View style={styles.container}>
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                    <View style={styles.registerView}>
                        <View style={styles.registerTitle}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.travelText}>Register Form</Text>
                            </View>
                        </View>
                        <View style={styles.registerInput}>
                            <Input
                                leftIcon={
                                    <Icon
                                        name="user-o"
                                        type="font-awesome"
                                        color="rgba(171, 189, 219, 1)"
                                        size={25}
                                    />
                                }
                                containerStyle={{ marginVertical: 10 }}
                                onChangeText={name => this.setState({ name })}
                                value={name}
                                inputStyle={{ marginLeft: 10, color: 'white' }}
                                keyboardAppearance="light"
                                placeholder="Username"
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
                                        name="envelope-o"
                                        type="font-awesome"
                                        color="rgba(171, 189, 219, 1)"
                                        size={25}
                                    />
                                }
                                containerStyle={{ marginVertical: 10 }}
                                onChangeText={email => this.setState({ email })}
                                value={email}
                                inputStyle={{ marginLeft: 10, color: 'white' }}
                                keyboardAppearance="light"
                                placeholder="Email"
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
                            title="REGISTER"
                            activeOpacity={1}
                            underlayColor="transparent"
                            onPress={this._onPressRegisterBtn.bind(this)}
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
    registerView: {
        marginTop: 150,
        backgroundColor: 'transparent',
        width: 250,
        height: 400,
    },
    registerTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    travelText: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'bold',
    },
    plusText: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'regular',
    },
    registerInput: {
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

