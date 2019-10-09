import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { connect } from 'react-redux';
const { width: screenWidth } = Dimensions.get('window')
class Banner extends Component {
    constructor() {
        super();
        this.getBanner();
        this.state = {
            activeSlide: 0
        };
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
    _renderItem({ item, index }) {
        return (
            <Image source={{ uri: item.banner }} style={{ width: screenWidth , height: 163 }} />
        );
    }
    get pagination() {
        const { activeSlide } = this.state;
        const { myBanners } = this.props;
        return (
            <Pagination
                dotsLength={myBanners.length}
                activeDotIndex={activeSlide}
                containerStyle={{ paddingVertical:5}}
            />
        );
    }
    render() {
        return (
            <View style={styles.container}>
                <Carousel
                    data={this.props.myBanners}
                    renderItem={this._renderItem}
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth}
                    onSnapToItem={(index) => this.setState({ activeSlide: index })}
                    loop={true}
                />
                {this.pagination}
            </View>
        );
    }
}
function mapStatetoProps(state) {
    return {
        myBanners: state.banners
    };
}
export default connect(mapStatetoProps)(Banner);
const styles = {
    container: {
        flex: 1
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    image: {
        screenWidth,
        flex: 1
    }
}