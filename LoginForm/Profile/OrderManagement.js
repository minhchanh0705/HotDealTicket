import React, { Component } from 'react';
import { View, Text, StyleSheet, I18nManager, FlatList, Dimensions } from 'react-native';
import i18n from "i18n-js";
import memoize from "lodash.memoize";
import { connect } from 'react-redux';
import { Icon } from "react-native-elements";
import axios from 'axios';
import * as RNLocalize from "react-native-localize";
const { width: screenWidth } = Dimensions.get('window')

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
class OrderManagement extends Component {
    constructor(props) {
        super(props);
        setI18nConfig();
        this.state = {
            order: '',
            evt: '',
            date: '',
            total: '',
            status: ''
        };
        this.loadOrder(this.props.myToken)
    };
    static navigationOptions = {
        header: (
            <View />
        )
    };
    back(event){
        this.props.navigation.navigate('ProfileScreen');
    }
    loadOrder(token) {
        axios.get(`http://api.ticket-staging.hotdeal.vn/api/order/getOrders`, {
            params: { token: token }
        })
            .then(res => {
                this.props.dispatch({
                    type: 'PASS_ORDERS',
                    orders: res.data
                })
                return res;
            })
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
            <View >
                <View
                    style={{
                        backgroundColor: '#00aced',
                        padding: 5,
                        alignContent: 'space-around',
                        flexDirection: 'row'
                    }}>
                    <Icon
                        name='chevron-left'
                        color='#fff'
                        size={36} 
                        onPress={this.back.bind(this)}/>
                    <Text style={{ color: '#fff', fontSize: 20 }}>{translate("AccountInformation")}</Text>
                </View>
                <View style={styles.content}>
                    <FlatList
                        data={this.props.myOrders}
                        renderItem={({ item, index }) =>
                            <View style={{
                                padding: 10,
                                flex: 1,
                                width: screenWidth - 22, backgroundColor: index % 2 == 0 ? "#FFFFFF" : "#f2f2f2"
                            }}>
                                <View style={styles.row}>
                                    <View style={styles.orderLeft}>
                                        <Text style={styles.txt_left}>{translate("codeOrder")}</Text>
                                    </View>
                                    <View style={styles.orderRight}>
                                        <Text style={styles.txt_right}>{item.info.order_id}</Text>
                                    </View>
                                </View>

                                <View style={styles.row}>
                                    <View style={styles.orderLeft}>
                                        <Text style={styles.txt_left}>{translate("event")}</Text>
                                    </View>
                                    <View style={styles.orderRight}>
                                        <Text style={styles.txt_right}>{item.order_event.info.name}</Text>
                                    </View>
                                </View>

                                <View style={styles.row}>
                                    <View style={styles.orderLeft}>
                                        <Text style={styles.txt_left}>{translate("date")}</Text>
                                    </View>
                                    <View style={styles.orderRight}>
                                        <Text style={styles.txt_right}>{item.info.timestamp}</Text>
                                    </View>
                                </View>

                                <View style={styles.row}>
                                    <View style={styles.orderLeft}>
                                        <Text style={styles.txt_left}>{translate("total")}</Text>
                                    </View>
                                    <View style={styles.orderRight}>
                                        <Text style={styles.txt_right}>{item.info.total}</Text>
                                    </View>
                                </View>

                                <View style={styles.row}>
                                    <View style={styles.orderLeft}>
                                        <Text style={styles.txt_left}>{translate("status")}</Text>
                                    </View>
                                    <View style={styles.orderRight}>
                                        <Text style={styles.txt_right}>{item.info.status_name}</Text>
                                    </View>
                                </View>
                            </View>
                        }
                        keyExtractor={(item, index) => index+''}
                    >
                    </FlatList>
                </View>
            </View>

        );
    }
}

function mapStatetoProps(state) {
    return {
        myToken: state.token,
        myOrders: state.orders
    };
}

export default connect(mapStatetoProps)(OrderManagement);

const styles = StyleSheet.create({
    header: {
        fontSize: 17,
        color: '#333333',
        backgroundColor: '#e6e6e6',
        padding: 10,
        fontWeight: 'bold'

    }, content: {
        margin: 10,
        padding: 10,
        paddingBottom: 30,
        backgroundColor: 'white',
        marginBottom: 32
    },
    orderForm: {
        padding: 10,
        flex: 1,
        width: screenWidth - 22
    },

    orderLeft: {
        flex: 1
    },
    orderRight: {
        flex: 3,
        marginLeft: 15
    },
    txt_left: {
        fontWeight: 'bold',
        marginTop: 7,
        fontSize: 15
    },
    txt_right: {
        marginTop: 7,
        fontSize: 15,
        width: screenWidth - 155
    },
    row: {
        flexDirection: 'row'
    }
});
