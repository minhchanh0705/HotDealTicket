//get Categories from API => send to Redux => EventsByCategory
import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import EventsByCategory from './EventsByCategory'

const { width: screenWidth } = Dimensions.get('window')

class Categories extends Component {
    constructor() {
        super()
        this.getCategories();
    }
    getCategories() {
        axios.get(`http://api-ticket.hotdeal.vn/api/ticket/categories`)
            .then(res => {
                this.props.dispatch({
                    type: 'PASS_CATEGORIES',            
                    categories:res.data.data
                })  
            })           
    }
    render() {
        return (
            <View>
                <FlatList
                    data={this.props.categories}
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
function mapStatetoProps(state){
    return {
        categories:state.categories
    };
}
export default connect(mapStatetoProps)(Categories);
