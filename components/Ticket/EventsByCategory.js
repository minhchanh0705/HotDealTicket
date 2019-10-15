import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, ActivityIndicator  } from 'react-native';
import axios from 'axios';
import { Image } from 'react-native-elements';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';

const { width: screenWidth } = Dimensions.get('window')
class EventsByCategory extends Component {
    constructor(props) {
        super(props);
        this.toDetailPage = this.toDetailPage.bind(this);
        this.getEventsByCategory();
    }
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
    toDetailPage(id1) {
        this.props.dispatch({
            type: 'NAV',
            detailId: id1
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
                        backgroundColor: '#e6e6e6',
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
                                backgroundColor: '#d9d9d9',
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
                                            style={{ width: screenWidth - 20, height: 140 }} 
                                            PlaceholderContent={<ActivityIndicator />}
                                            />
                                        <Text style={{
                                            backgroundColor: '#d9d9d9',
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
                                                    <Text style={{
                                                        fontWeight: 'bold',
                                                        fontSize: 18,
                                                        color: '#b32d00',
                                                        backgroundColor: '#d9d9d9'
                                                    }}>
                                                        Free
                                                </Text>
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
                                                    <Text style={{ fontSize: 18 }}>GIÁ TỪ </Text>
                                                    <NumberFormat value={item.price} displayType={'text'} thousandSeparator={true}
                                                        renderText={
                                                            value => <Text style={{
                                                                fontWeight: 'bold',
                                                                fontSize: 18,
                                                                color: '#b32d00',
                                                                backgroundColor: '#d9d9d9'
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
                                        margin: 14
                                    }}>
                                        <Text style={{
                                            color: '#cc3300',
                                            backgroundColor: '#d9d9d9',
                                            borderStyle: 'solid',
                                            borderWidth: 1,
                                            borderColor: 'black',
                                            marginTop: 12,
                                            textAlign: 'center',
                                            borderRadius: 10,
                                            padding: 5,
                                            fontSize: 15
                                        }}>
                                            {item.state}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1 }}></View>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        // borderStyle: 'solid',
                                        borderWidth: 0.8,
                                        borderColor: 'black',
                                        margin: 8
                                    }}>
                                        <View style={{
                                            backgroundColor: '#cc3300',
                                            width: '100%',
                                            alignItems: 'center',
                                        }}>
                                            <Text style={{ fontSize: 17, color: 'white' }}>
                                                {this.convertMonth(item.datetime)}
                                            </Text>
                                        </View>
                                        <View style={{ backgroundColor: '#d9d9d9', width: '100%', alignItems: 'center' }}>
                                            <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 25 }}>
                                                {this.convertDay(item.datetime)}
                                            </Text>
                                            <Text style={{ color: 'black', fontSize: 17 }}>
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
