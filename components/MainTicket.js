import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import HeaderTicket from './HeaderTicket';
import Categories from './Categories';
import Banner from './Banner';
import {connect} from 'react-redux';

const { width: screenWidth } = Dimensions.get('window')
class MainTicket extends Component {
    render() {
        if (this.props.detailId != 0) {
            this.props.navigation.navigate('TicketDetail', {
                detailId1: this.props.detailId
            });
        } 
        this.props.dispatch({
            type: 'TOGGLE_DONE',
            done: "false"
        });
        return (
            <ScrollView>
                <View>
                    <HeaderTicket />
                </View>
                <View style={{ alignItems: 'center', height: 180, width: screenWidth, backgroundColor: '#e6e6e6' }}>
                    <Banner />
                </View>
                <View style={{ alignItems: 'center', backgroundColor: '#e6e6e6' }}>
                    <Categories />
                </View>
            </ScrollView>
        );
    }
}

function mapStatetoProps(state) {
    return {
        detailId: state.detailId
    };
}
export default connect(mapStatetoProps)(MainTicket);