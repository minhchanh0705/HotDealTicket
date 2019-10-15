import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Input, Button, Icon } from 'react-native-elements';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
var STORAGE_KEY = 'key_access_token';
const BG_IMAGE = require('../img/bg_screen1.jpg');
export default class MainScreen extends Component {
    static navigationOptions = {
        header: (
            <View/>
        )
    };
    constructor(props) {
        super(props);
        this.state = {
            email: '',
        };
        try {
            AsyncStorage.getItem(STORAGE_KEY).then((user_data_json) => {
                let userData = JSON.parse(user_data_json);
                if (userData == undefined) {                    
                    this.setState({
                        email: '',
                    });
                } else {
                    this.setState({
                        email: userData.email,
                    });
                    console.log('...'+this.state.email)
                }
            });

        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    }
    _onPressLogout(event) {
        try {
            AsyncStorage.removeItem(STORAGE_KEY);
            var { navigate } = this.props.navigation;
            navigate('LoginScreen');
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                    <View style={styles.loginView}>
                        <View></View>
                        <View>
                            {this.state.email != '' ? (
                                <View>
                                    <Text style={styles.travelText}>{this.state.email}</Text>
                                    <Text style={styles.travelText}>Logged In</Text>
                                </View>
                            ) : <View></View>
                            }
                        </View>
                        <Button
                            title="LOG OUT"
                            activeOpacity={1}
                            underlayColor="transparent"
                            onPress={this._onPressLogout.bind(this)}
                            loadingProps={{ size: 'small', color: 'white' }}
                            buttonStyle={{
                                height: 50,
                                width: 250,
                                backgroundColor: 'transparent',
                                borderWidth: 2,
                                borderColor: 'white',
                                borderRadius: 30
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
        flex: 1
    },
    loginView: {
        flex: 1,
        justifyContent: 'space-around'
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
    travelText: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'bold',
        alignContent: 'center',
        alignSelf: 'center'
    }
});
