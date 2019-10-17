import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import axios from 'axios';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Swiper from 'react-native-swiper';
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
   
    renderBanner(listBanner) {
        if (!listBanner) return null;
        let imgBanner = listBanner.map((item, key) =>
                <Image key={key} style={styles.image} source={{ uri: item.banner }} />
        );
        if (!imgBanner) return null;

        return (
            <Swiper
                style={styles.wrapper}
                loop={true}
                autoplay={true}
                autoplayTimeout={4}
                height={150}
                dot={<View style={{ backgroundColor: '#fff', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
                activeDot={<View style={{ backgroundColor: '#666666', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
                paginationStyle={{ bottom: 15 }}
            >
                {imgBanner}
            </Swiper>
        );
    }
    render() {
        return (
            this.renderBanner(this.props.MyBanners)
        );
    }
}
function mapStatetoProps(state) {
    return {
        MyBanners: state.banners
    };
}
export default connect(mapStatetoProps)(Banner);
const styles = {
    container: {
        flex: 1
    },
    image: {
        width: screenWidth,
        flex: 1
    },
    wrapper: {
        alignItems: 'center', height: 180, width: screenWidth
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BB',
    }
}