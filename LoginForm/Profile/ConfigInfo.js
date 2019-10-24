
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, I18nManager, TextInput } from 'react-native';
import i18n from "i18n-js";
import memoize from "lodash.memoize";
import { connect } from 'react-redux';
import * as RNLocalize from "react-native-localize";
const translationGetters = {
    en: () => require("./../../src/translations/en.json"),
    vi: () => require("./../../src/translations/vi.json")
};
const BASE_URL = "http://api.ticket-staging.hotdeal.vn/api";
var STORAGE_KEY = 'key_access_token';
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
class ConfigInfo extends Component {
    constructor(props) {
        super(props);
        setI18nConfig();
        this.state = {
            name: this.props.myAccount.name,
            email: '',
            phone: this.props.myAccount.phone
        }

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
    btn_cancel(event) {
        console.log('Nam1e: ' + this.state.name);
        this.state.name = this.props.myAccount.name;
        this.state.phone = this.props.myAccount.phone
    };
     btn_update(event) {
    
     }
    render() {
        return (
            <View style={styles.content}>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    onChangeText={(name) => this.setState({ name })}
                    value={this.state.name}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    editable={false}
                    // onChangeText={(email) => this.setState({ email })}
                    value={this.props.myAccount.email}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    onChangeText={(phone) => this.setState({ phone })}
                    value={this.state.phone}
                />
                <View style={{ flexDirection: 'row-reverse' }}>
                    <TouchableOpacity
                        // onPress={this.btn_update.bind(this)}
                        style={{
                            backgroundColor: '#ff3333', width: 100, alignItems: 'center', alignSelf: 'flex-end', marginTop: 18, marginBottom: 3
                        }}>
                        <Text style={{ color: 'white', padding: 10, fontSize: 18 }}>{translate("update")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.btn_cancel.bind(this)}
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
    console.log("N: " + state.acc.name)
    return {
        myAccount: state.acc
    };
}

export default connect(mapStatetoProps)(ConfigInfo);

const styles = StyleSheet.create({
    content: {
        margin: 5,
        padding: 5,
        backgroundColor: 'white'
    },
    input: {
        height: 40,
        borderColor: '#a6a6a6',
        borderBottomWidth: 1,
        marginBottom: 4
    }
});
