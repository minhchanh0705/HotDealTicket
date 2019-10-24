import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    I18nManager,
    TouchableOpacity,
    Dimensions,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { Avatar, Icon } from 'react-native-elements';
import i18n from "i18n-js";
import memoize from "lodash.memoize";
import * as RNLocalize from "react-native-localize";
import AccountInfo from "../Profile/AccountInfo";
import OrderManagement from "../Profile/OrderManagement";
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
var STORAGE_KEY = 'key_access_token';

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


class ProfileScreen extends PureComponent {
    static navigationOptions = {
        header: (
            <View />
        )
    };
    constructor(props) {
        super(props);
        setI18nConfig();
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
                }
            });

        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    }

    getTextStyle(statusName) {
        const { myFilterDisplay } = this.props;
        if (statusName === myFilterDisplay) return { color: '#0059b3', flex: 1, fontSize: 15, paddingLeft: 8 };
        return styles.buttonText;
    }
    getIconColor(statusName) {
        const { myFilterDisplay } = this.props;
        if (statusName === myFilterDisplay) return '#0059b3';
        return '#4d4d4d';
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
    _onPressLogout(event) {
        try {

            AsyncStorage.removeItem(STORAGE_KEY);
            this.props.dispatch({
                type: 'TOGGLE_LOGGED',
                logged: false
            });
            var { navigate } = this.props.navigation;
            console.log('presssed1: ' + navigate);

            navigate('LoginScreen');
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    }
    setFilterStatus(actionType) {
        this.props.dispatch({ type: actionType});
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.loginView}>
                    <Avatar
                        size={120}
                        rounded

                        icon={{ name: 'user', color: '#262626', type: 'font-awesome' }}
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}
                        containerStyle={{ alignSelf: 'center', marginTop: 30 }}
                    />
                    <Text style={styles.travelText}>{this.state.email}</Text>
                </View>

                <View style={{
                    margin: 10,
                    borderColor: '#bfbfbf',
                    borderWidth: 1,
                    flexDirection: 'column'
                }}>
                    <View style={{
                        borderColor: '#bfbfbf',
                        borderBottomWidth: 1,
                        padding: 12,

                    }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.setFilterStatus('FILTER_ACCOUNT')}>
                            <Icon
                                name='user'
                                type='font-awesome'
                                size={17}
                                color={this.getIconColor('ACCOUNT')}
                                onPress={() => console.log('hello')} />
                            <Text
                                style={this.getTextStyle('ACCOUNT')}>
                                {translate("accountInformation")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        borderColor: '#bfbfbf',
                        borderBottomWidth: 1,
                        padding: 12
                    }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.setFilterStatus('FILTER_ORDER')}>
                            <Icon
                                name='bars'
                                type='font-awesome'
                                size={17}
                                color={this.getIconColor('ORDER')}
                                onPress={() => console.log('hello')} />
                            <Text
                                style={this.getTextStyle('ORDER')}>
                                {translate("orderManagement")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        padding: 12
                    }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={this._onPressLogout.bind(this)}>
                            <Icon
                                name='sign-out'
                                type='font-awesome'
                                color='#4d4d4d'
                                size={17}
                                onPress={() => console.log('hello')} />
                            <Text
                                style={this.getTextStyle('logout')}>
                                {translate("logout")}
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={{
                    flex: 1,
                    paddingTop: 5,
                    paddingRight: 10,
                    
                }}>
                    {
                        this.props.myFilterDisplay == 'ACCOUNT' ? (
                            <AccountInfo />
                        ) : (
                            <OrderManagement />
                            )
                    }
                </View>


            </ScrollView >
        );
    }
}
function mapStatetoProps(state) {
    return {
        myFilterDisplay: state.filterDisplay
    };
}
export default connect(mapStatetoProps)(ProfileScreen);

const styles = StyleSheet.create({

    loginView: {
        borderColor: '#bfbfbf',
        borderWidth: 1,
        margin: 10
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
        fontSize: 25,
        alignContent: 'center',
        alignSelf: 'center',
        padding: 10
    },
    buttonText: {
        color: '#4d4d4d',
        flex: 1,
        fontSize: 15,
        paddingLeft: 9
    }
});
