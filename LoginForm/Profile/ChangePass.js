import React, { Component } from 'react';
import { View, Text, StyleSheet, I18nManager,TouchableOpacity, TextInput } from 'react-native';
import i18n from "i18n-js";
import memoize from "lodash.memoize";
import * as RNLocalize from "react-native-localize";
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
export default class ChangePass extends Component {
    constructor(props) {
        super(props);
        setI18nConfig();
        this.state = {
            name: '',
            email: '',
            phone: ''
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
    render() {
        return (
            <View style={styles.content}>
                <TextInput
                    style={styles.input}
                    placeholder="Pass"
                    onChangeText={(name) => this.setState({ name })}
                    value={this.state.name}
                />
                <TextInput
                    style={styles.input}
                    placeholder="New Pass"
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm"
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
