import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
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
                        marginTop: 10
                    }}>
                        <Text style={{
                            fontSize: 25,
                            fontWeight: 'bold'
                        }}>
                            {category.category_name}
                        </Text>
                    </View>
                    <FlatList
                        data={data}
                        renderItem={({ item }) =>
                            <View style={{
                                backgroundColor: 'green',
                                marginBottom: 10,
                                marginLeft: 10,
                                marginRight: 10
                            }}>
                                <TouchableOpacity onPress={() => this.toDetailPage(item.id)}>

                                    <View>
                                        <Image
                                            source={{ uri: item.banner }}
                                            style={{ width: screenWidth - 20, height: 140 }} />
                                        <Text style={{
                                            backgroundColor: 'orange',
                                            fontWeight: 'bold',
                                            fontSize: 15,
                                            padding: 5,
                                        }}>
                                            {item.title}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{flexDirection:'row', alignContent:'space-around'}}>
                                    {
                                        item.price && item.price == 1000 ?
                                            (
                                                <Text style={{
                                                    flex:1,
                                                    fontWeight: 'bold',
                                                    fontSize: 20,
                                                    marginTop: 12,
                                                    marginLeft: 14,
                                                    textAlign:'center',
                                                    padding: 5,
                                                    backgroundColor: 'gray'
                                                }}>
                                                    Free
                                                </Text>
                                                
                                            ) :
                                            (
                                                <Text style={{
                                                    flex:1,
                                                    fontWeight: 'bold',
                                                    fontSize: 20,
                                                    marginTop: 12,
                                                    marginLeft: 14,
                                                    textAlign:'center',
                                                    padding: 5,
                                                    backgroundColor: 'gray'
                                                }}>
                                                    {item.price}
                                                </Text>
                                            )                                            
                                    }
                                    <Text style={{flex:3}}></Text>
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
                                        <Text style={{ color: '#cc3300', backgroundColor: 'blue', fontSize: 17, padding: 5 }}>
                                            {item.state}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1 }}></View>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        backgroundColor: 'yellow',
                                        margin: 10
                                    }}>
                                        <View style={{ backgroundColor: '#cc3300', width: '100%', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 17, color: 'white' }}>
                                                {this.convertMonth(item.datetime)}
                                            </Text>
                                        </View>
                                        <View style={{ backgroundColor: '#d9d9d9', width: '100%', alignItems: 'center' }}>
                                            <Text style={{ color: 'red', fontSize: 17 }}>
                                                {this.convertDay(item.datetime)}
                                            </Text>
                                            <Text style={{ color: 'red', fontSize: 17 }}>
                                                {this.convertWDay(item.datetime)}
                                            </Text>
                                        </View>

                                    </View>
                                </View>
                            </View>
                        }
                        keyExtractor={item => item.id + ''}>
                    </FlatList>
                </View>
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
