import React, { Component } from 'react';
import { Text } from 'react-native';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class HeaderTicket extends Component {
    render() {
        return (
            <Header
                leftComponent={<Icon name="rocket" size={30} color="#900" />}
                centerComponent={<Text style={{ color: '#fff', fontSize: 17,fontWeight:'bold' }}>MY TITLE</Text>}
                rightComponent={<Icon name='home' size={20} color='#fff' />}
                
            />
        );
    }
} 