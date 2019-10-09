import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import EventsByCategory from './EventsByCategory'

const { width: screenWidth } = Dimensions.get('window')

export default class Categories extends Component {
    constructor() {
        super()
        this.state = {
            categories: []
        }
    }
    componentDidMount() {
        axios.get(`http://api-ticket.hotdeal.vn/api/ticket/categories`)
            .then(res => {
                const categories = res.data.data;
                this.setState({ categories });
            })           
    }
    render() {
        return (
            <View>
                <FlatList
                    data={this.state.categories}
                    renderItem={({ item }) =>
                        <EventsByCategory categoryId={item.id}/>
                    }
                    keyExtractor={item => item.id + ''}
                >
                </FlatList>
            </View>
        );
    }
}
