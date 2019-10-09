import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import Categories from './Categories'
const { width: screenWidth } = Dimensions.get('window')

export default class EventsByCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryObj: []
        };
        axios.get(`http://api-ticket.hotdeal.vn/api/ticket/event/category`, {
            params: {
                category_id: this.props.categoryId
            }
        })
            .then(res => {
                const categoryObj = res.data;
                this.setState({ categoryObj });
                // console.log("C"+this.state.categoryObj.category.category_name);
                console.log("C" + res.data.category.category_name)
                return res;
            })
    }
    sendBack(eventId){
        <Categories eventId={eventId}></Categories>
    }
    render() {
        let { category, data } = this.state.categoryObj;
       
        if (category == undefined) {
            return (
                <View></View>
            );
        } else {
            console.log('A' + data.banner);
            return (
                <View>
                    <View style={{
                        backgroundColor: 'red',
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
                                <TouchableOpacity onPress={()=>sendBack(item.id)}>
                                    <Text>Click</Text>
                                    </TouchableOpacity>
                                    <View>
                                        <Image
                                            source={{ uri: item.banner }}
                                            style={{ width: screenWidth - 20, height: 140 }}
                                        />
                                        <Text style={{
                                            backgroundColor: 'orange',
                                            fontWeight: 'bold',
                                            fontSize: 15,
                                            padding: 5,
                                        }}
                                        >
                                            {item.title}
                                        </Text>
                                    </View>
                                {/* </TouchableOpacity> */}
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                    marginLeft: 54,
                                    marginTop: 10,
                                    marginBottom: 10
                                }}>
                                    {item.price}
                                </Text>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    alignSelf: 'stretch',
                                    marginBottom: 10
                                }}>
                                    <Text style={{ color: 'red', fontSize: 17 }}>
                                        {item.state}
                                    </Text>
                                    <Text style={{ color: 'blue', fontSize: 17 }}>
                                        {item.datetime}
                                    </Text>
                                </View>
                            </View>
                        }
                        keyExtractor={item => item.id + ''}
                    >
                    </FlatList>
                </View>

            );
        }
    }
}