
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, I18nManager, TextInput, Alert } from 'react-native';
import i18n from "i18n-js";
import memoize from "lodash.memoize";
import { connect } from 'react-redux';
import * as RNLocalize from "react-native-localize";
import AsyncStorage from '@react-native-community/async-storage';
var STORAGE_KEY = 'key_access_token';
const BASE_URL = "http://api.ticket-staging.hotdeal.vn/api";
const translationGetters = {
    en: () => require("./../../src/translations/en.json"),
    vi: () => require("./../../src/translations/vi.json")
};

const translate = memoize(
    (key, config) => i18n.t(key, config),
    (config) => (config ? JSON.stringify(config) : '')
);

const setI18nConfig = () => {
    const fallback = { languageTag: 'en', isRTL: false };
    const { languageTag, isRTL } =
        RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) || fallback;
    translate.cache.clear();
    I18nManager.forceRTL(isRTL);
    i18n.translations = { [languageTag]: translationGetters[languageTag]() };
    i18n.locale = languageTag;
};
class ChangePass extends Component {
    constructor(props) {
        super(props);
        setI18nConfig();
        this.state = {
            password: '',
            passwordNew: '',
            rePassword: ''
        };
    }
    componentDidMount() {
        RNLocalize.addEventListener("change", this.handleLocalizationChange);
    }

    componentWillUnmount() {
        RNLocalize.removeEventListener("change", this.handleLocalizationChange);
    }
    handleLocalizationChange = () => {
        setI18nConfig();
        this.forceUpdate();
    };
    btn_changepass(event) {
        let serviceUrl = BASE_URL + "/user/changePassword?token=" + this.props.myToken;
        console.log('name: ' + this.state.name);
        let password = this.state.password;
        let passwordNew = this.state.passwordNew;
        let rePassword = this.state.rePassword;
        
        if(rePassword===passwordNew){
        fetch(serviceUrl, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: password,
                passwordNew: passwordNew
            }),
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                this.setState({
                    password: responseJSON.user.password,
                    passwordNew: responseJSON.user.passwordNew
                });
                try {
                    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(responseJSON));
                    Alert.alert('Change Password Successful');
                } catch (error) {
                    console.log('AsyncStorage error: ' + error.message);
                }
            })
            .catch((error) => {
                console.warn(error);
            });
        }else{
            Alert.alert('Confirm password was wrong!!!');
        }
    };
    render() {
        return (
            <View style={styles.content}>
                <TextInput
                    style={styles.input}
                    placeholder="Pass"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                />
                <TextInput
                    style={styles.input}
                    placeholder="New Pass"
                    secureTextEntry={true}
                    onChangeText={(passwordNew) => this.setState({ passwordNew })}
                    value={this.state.passwordNew}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm"
                    secureTextEntry={true}
                    onChangeText={(rePassword) => this.setState({ rePassword })}
                    value={this.state.rePassword}
                />
                <View style={{ flexDirection: 'row-reverse' }}>
                    <TouchableOpacity
                        onPress={this.btn_changepass.bind(this)}
                        style={{
                            backgroundColor: '#ff3333', width: 100, alignItems: 'center', alignSelf: 'flex-end', marginTop: 18, marginBottom: 3
                        }}>
                        <Text style={{ color: 'white', padding: 10, fontSize: 18 }}>{translate("update")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        // onPress={this.btn_cancel.bind(this)}
                        style={{
                            backgroundColor: '#e6e6e6', width: 100, alignItems: 'center', alignSelf: 'flex-end', marginTop: 18, marginBottom: 3, marginRight: 5
                        }}>
                        <Text style={{ color: '#404040', padding: 10, fontSize: 18 }}>{translate("cancel")}</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }
}
function mapStatetoProps(state) {
    return {
        myAccount: state.acc,
        myToken: state.token
    };
}

export default connect(mapStatetoProps)(ChangePass);

const styles = StyleSheet.create({
    content: {
        margin: 5,
        padding: 5,
        backgroundColor: 'white',
        height: 400
    },
    input: {
        height: 40,
        borderColor: '#a6a6a6',
        borderBottomWidth: 1,
        marginBottom: 4
    }
});

