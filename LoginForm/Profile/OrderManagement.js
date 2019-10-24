import React, { Component } from 'react';
import { View, Text, StyleSheet, I18nManager } from 'react-native';
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
export default class OrderManagement extends Component {
    constructor(props) {
        super(props);
        setI18nConfig();
        this.state = {
            email: '',
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

                <Text style={styles.header}>{translate("OrderManagement")}</Text>
            
                <View></View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 17,
        color: '#333333',
        borderColor: '#999999',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingBottom: 8
    }, content: {
        margin: 10,
        borderColor: '#a6a6a6',
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 10,
        backgroundColor: 'white'
    }
});
