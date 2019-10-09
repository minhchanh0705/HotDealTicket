import React, { Component } from 'react';
import { View, Text, Button, Dimensions, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux';

const { width: screenWidth } = Dimensions.get('window')
class Banner extends Component {
    constructor() {
        super()
        this.getBanner();
    }
    getBanner() {
        axios.get(`http://api-ticket.hotdeal.vn/api/ticket/event/banner`)
            .then(res => {
                this.props.dispatch({
                    type: 'PASS_BANNER',
                    banners: res.data.data
                })
            })
    }
    _renderItem({ item }) {
        return (
            <Image source={{ uri: item.banner }} style={{ width: screenWidth - 40, height: 140 }} />
        );
    }

    render() {
        console.log('banners1: ' + this.props.banners)
        let {banners}=this.props;
        if (banners == undefined) {
            return (<View></View>);
        } else {
            return (
                <View>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.props.banners}
                        renderItem={this._renderItem}
                        sliderWidth={screenWidth - 40}
                        itemWidth={screenWidth - 40}
                    />
                </View>
            );
        }
    }
}
function mapStatetoProps(state) {
    return {
        banners: state.banners
    };
}
export default connect(mapStatetoProps)(Banner);
