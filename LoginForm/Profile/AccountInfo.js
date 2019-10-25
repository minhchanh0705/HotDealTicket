import React, { Component } from 'react';
import { View, Text, StyleSheet, I18nManager,TouchableOpacity } from 'react-native';
import i18n from "i18n-js";
import memoize from "lodash.memoize";
import * as RNLocalize from "react-native-localize";
import FilterAccount from "./FilterAccount";
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
export default class AccountInfo extends Component {
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
            <View style = { styles.content } >
                <View style = { styles.header }>
                    <Text style={styles.headerText}>{translate("AccountInformation")}</Text>                    
                </View>
                <FilterAccount />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    content: {
        margin: 10,
        padding:10,
        height:400
    },
    header:{
        backgroundColor: '#e6e6e6',
    },
    headerText: {
        fontSize: 17,
        margin:10,
        color: '#333333',
        fontWeight:'bold'
    }
});
