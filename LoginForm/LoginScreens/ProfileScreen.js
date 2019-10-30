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
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Avatar, Icon } from 'react-native-elements';
import i18n from "i18n-js";
import memoize from "lodash.memoize";
import * as RNLocalize from "react-native-localize";
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
        this.getInfo(this.props.myToken);  
    }
    getInfo(token) {
        axios.get(`http://api.ticket-staging.hotdeal.vn/api/user/getUser?token=` + token)
            .then(res => {
                this.props.dispatch({
                    type: 'PASS_TOKEN',
                    name: res.data.user.name,
                    email: res.data.user.email,
                    phone: res.data.user.phone
                })
            })
    }
    _onPressAccount(event) {
        console.log("ok");
        var { navigate } = this.props.navigation;
        navigate('AccountInfo');
    }
    _onPressOrders(event) {
        console.log("ok");
        var { navigate } = this.props.navigation;
        navigate('OrderManagement');
    }
    getIconColor(statusName) {
        const { myFilterDisplay } = this.props;
        if (statusName === myFilterDisplay) return '#0059b3';
        return '#404040';
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
                    <Text style={styles.travelText}>{this.props.myAccount.name}</Text>
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
                        <TouchableOpacity style={{ flexDirection: 'row' }} 
                        onPress={this._onPressAccount.bind(this)} 
                        >
                            <Icon
                                name='user'
                                type='font-awesome'
                                size={17}
                                color='#404040'
                                onPress={() => console.log('hello')} />
                            <Text
                                style={styles.buttonText}
                                >
                                {translate("accountInformation")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        borderColor: '#bfbfbf',
                        borderBottomWidth: 1,
                        padding: 12
                    }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }} 
                        onPress={this._onPressOrders.bind(this)} 
                        >
                            <Icon
                                name='bars'
                                type='font-awesome'
                                size={17}
                                color='#404040'
                                onPress={() => console.log('hello')} />
                            <Text
                                style={styles.buttonText}
                                >
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
                                color='#404040'
                                size={17}
                                onPress={() => console.log('hello')} />
                            <Text
                                style={styles.buttonText}
                                >
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
                </View>
            </ScrollView >
        );
    }
}
function mapStatetoProps(state) {
    return {
        myFilterDisplay: state.filterDisplay,
        myAccount: state.acc,
        myToken: state.token
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
        color: '#404040',
        flex: 1,
        fontSize: 15,
        paddingLeft: 9
    }
});
