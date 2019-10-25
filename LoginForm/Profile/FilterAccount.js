import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, I18nManager, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import i18n from "i18n-js";

import memoize from "lodash.memoize";
import ConfigInfo from './ConfigInfo';
import ChangePass from './ChangePass';
import * as RNLocalize from "react-native-localize";
// import { Button } from 'react-native-elements';
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
class Filter extends Component {
    constructor(props) {
        super(props);
        setI18nConfig();
        this.state = {
            email: '',
        };
    };
    getTextStyle(statusName) {
        const { myFilterDisplay } = this.props;
        if (statusName === myFilterDisplay) return { flex: 1, fontSize: 15, paddingLeft: 8 };
        return styles.buttonText;
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
    getTextStyle(statusName) {
        const { myFilterAccount } = this.props;
        if (statusName === myFilterAccount) return styles.selectedText;
        return styles.unSelectedText;
    }

    setFilterStatus(actionType) {
        console.log('filter')
        this.props.dispatch({ type: actionType });
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.setFilterStatus('FILTER_INFO')}>
                        <Text style={this.getTextStyle('INFO')}>{translate("personalInformation")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setFilterStatus('FILTER_CHANGEPASS')}>
                        <Text style={this.getTextStyle('CHANGEPASS')}>{translate("changePassword")}</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.props.myFilterAccount == 'INFO' ? (
                        <ConfigInfo></ConfigInfo>
                    ) : (
                            <ChangePass></ChangePass>
                        )
                }
            </View>
        );
    }
}

function mapStatetoProps(state) {
    return {
        myFilterAccount: state.filterAccount,
        myToken: state.token
    };
}

export default connect(mapStatetoProps)(Filter);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        marginVertical:10,
        height:45,
        padding: 5,
    },
    unSelectedText: {
        flex: 1,
        padding: 5,
        color: '#0073e6',
        fontSize: 17,
        borderBottomWidth: 1,
        borderColor: '#737373'
    },
    selectedText: {
        flex: 1,
        color: '#737373',
        fontSize: 17,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        padding: 5,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#737373'
    }
})