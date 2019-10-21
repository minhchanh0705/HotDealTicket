import React, { Component } from 'react';
import {
    I18nManager,
    SafeAreaView, View, Text, FlatList, Dimensions, TouchableOpacity, ActivityIndicator
} from 'react-native';
import axios from 'axios';
import { Image } from 'react-native-elements';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import NumberFormat from 'react-number-format';
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize";
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

class EventsByCategory extends Component {
    constructor(props) {
        super(props);
        this.toDetailPage = this.toDetailPage.bind(this);
        this.getEventsByCategory();
        setI18nConfig();
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
    getEventsByCategory() {
        axios.get(`http://api-ticket.hotdeal.vn/api/ticket/event/category`, {
            params: { category_id: this.props.categoryId }
        })
            .then(res => {
                this.props.dispatch({
                    type: 'PASS_EVENTS',
                    events: res.data
                })
                return res;
            })
    }
    toDetailPage(id) {
        this.props.dispatch({
            type: 'NAV',
            detailId: id
        });
    }
    convertMonth(unixTimestamp) {
        var date = new Date(unixTimestamp * 1000);
        var gMonth = date.getMonth() + 1;
        return "THÁNG " + gMonth;
    }
    convertDay(unixTimestamp) {
        var date = new Date(unixTimestamp * 1000);
        var gDate = date.getDate();
        return (gDate > 9) ? gDate : '0' + gDate;
    }
    convertWDay(unixTimestamp) {
        var date = new Date(unixTimestamp * 1000);
        var gWDay = date.getDay() + 1;
        day = '';
        switch (gWDay) {
            case 1:
                day = "chủ nhật";
                break;
            case 2:
                day = "thứ hai";
                break;
            case 3:
                day = "thứ ba";
                break;
            case 4:
                day = "thứ tư";
                break;
            case 5:
                day = "thứ năm";
                break;
            case 6:
                day = "thứ sáu";
                break;
            case 7:
                day = "thứ bảy";
                break;
            default:
                day = "Invalid day";
        }
        return day;
    }
    render() {
        let { category, data } = this.props.events;
        if (category == undefined) {
            return (<View></View>);
        } else {
            return (
                <View>
                    <View style={{
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        marginBottom: 10,
                        marginTop: 10,
                    }}>
                        <Text style={{
                            fontSize: 27,
                        }}>
                            {category.category_name}
                        </Text>
                    </View>
                    <FlatList
                        data={data}
                        renderItem={({ item }) =>
                            <View style={{
                                backgroundColor: '#fff',
                                marginBottom: 10,
                                marginLeft: 10,
                                marginRight: 10,
                                borderStyle: 'solid',
                                borderWidth: 1,
                                borderColor: '#b3b3b3',
                            }}>
                                <TouchableOpacity onPress={() => this.toDetailPage(item.id)}>
                                    <View>
                                        <Image
                                            source={{ uri: item.banner }}
                                            style={{ width: screenWidth - 22, height: 140 }}
                                            PlaceholderContent={<ActivityIndicator />}
                                        />
                                        <Text style={{
                                            backgroundColor: '#fff',
                                            fontWeight: 'bold',
                                            fontSize: 17,
                                            padding: 5,
                                        }}>
                                            {item.title}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', alignContent: 'space-around' }}>
                                    {
                                        item.price && item.price == 1000 ?
                                            (
                                                <View style={{
                                                    flex: 2,
                                                    marginTop: 12,
                                                    marginLeft: 14,
                                                    textAlign: 'left',
                                                }}>

                                                    <SafeAreaView>
                                                        <Text style={{
                                                            fontWeight: 'bold',
                                                            fontSize: 18,
                                                            color:'#404040'
                                                        }}>
                                                            {translate("free")}
                                                        </Text>
                                                    </SafeAreaView>
                                                </View>
                                            ) :
                                            (
                                                <View style={{
                                                    flex: 2,
                                                    marginTop: 12,
                                                    marginLeft: 14,
                                                    textAlign: 'left',
                                                    flexDirection: 'row'
                                                }}>
                                                    <SafeAreaView >
                                                        <Text style={{fontSize: 18,color:'#404040'}}>{translate("from")} </Text>
                                                    </SafeAreaView>

                                                    <NumberFormat value={item.price} displayType={'text'} thousandSeparator={true}
                                                        renderText={
                                                            value => <Text style={{
                                                                fontWeight: 'bold',
                                                                fontSize: 18,
                                                                color:'#404040'
                                                            }}>{value}Đ</Text>
                                                        }
                                                    />

                                                </View>
                                            )
                                    }
                                    <Text style={{ flex: 2 }}></Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignSelf: 'stretch'
                                }}>
                                    <View style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        marginTop:25,
                                        margin: 14,
                                        borderStyle: 'solid',
                                        borderWidth: 1,
                                        borderColor: '#666666',
                                        borderRadius: 10,
                                        padding: 7,
                                        paddingHorizontal:10,
                                        flexDirection:'row',
                                        height: 38
                                    }}>
                                        <Icon name='map-marker' size={20} style={{color:'#666666'}}/>
                                        <Text style={{fontSize: 15, paddingLeft:5, color:'#666666'}}>
                                            {item.state}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1 }}></View>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        margin: 8
                                    }}>
                                        <View style={{
                                            backgroundColor: '#ff3333',
                                            width: '100%',
                                            borderTopLeftRadius: 10,
                                            borderTopRightRadius: 10,
                                            alignItems: 'center',
                                            paddingVertical:3
                                        }}>
                                            <Text style={{ fontSize: 14, fontWeight:'bold', color: 'white' }}>
                                                {this.convertMonth(item.datetime)}
                                            </Text>
                                        </View>
                                        <View style={{
                                            backgroundColor: '#f2f5ff', 
                                            width: '100%', 
                                            borderBottomLeftRadius: 10,
                                            borderBottomRightRadius: 10,
                                            paddingBottom:5,
                                            alignItems: 'center' }}>
                                            <Text style={{color: 'red', fontWeight: 'bold', fontSize: 25 }}>
                                                {this.convertDay(item.datetime)}
                                            </Text>
                                            <Text style={{color: 'black', fontSize: 17 }}>
                                                {this.convertWDay(item.datetime)}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        }
                        keyExtractor={item => item.id + ''}>
                    </FlatList>
                </View >
            );
        }
    }
}
function mapStatetoProps(state) {
    return {
        events: state.events
    };
}
export default connect(mapStatetoProps)(EventsByCategory);
