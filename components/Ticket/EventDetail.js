import React, { PureComponent } from 'react';
import { View, Text, ScrollView, Dimensions, Image, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import HTML from 'react-native-render-html';
import { connect } from 'react-redux';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';
import { Rect } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import localization from 'moment/locale/vi';
import NumberFormat from 'react-number-format';
import AppText from '../../src/components/app-text';
// import * as actions from '../../src/redux/actions/index';

const { width: screenWidth } = Dimensions.get('window')
class EventDetail extends PureComponent {
    constructor(props) {
        super(props);
        this.props.dispatch({
            type: 'CHANGE_LANGUAGE',
            language: this.props.language
        })
    };

    static navigationOptions = {
        header: (<View />)
    };
    state = {
        fadeValue: new Animated.Value(0),
    };
    _onPress = () => {
        Animated.timing(this.state.fadeValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.bounce,
        }).start();
    };
    convert(unixTimestamp) {
        var date = new Date(unixTimestamp * 1000);
        moment.locale('vi');
        return moment(date).locale("vi", localization).format('LLLL');
    }
    render() {
        let {
            place, address, ward, district, state, description,
            title, from, to, timeTicket, nameTicket,
            priceTicket, partnerName, partnerDesc
        } = this.props.myDetail;
        from1 = timeTicket.substr(0, 10);
        to1 = timeTicket.substr(11, 20);
        let { myDone } = this.props;
        if (myDone == "false") {
            return (
                <View>
                    <SvgAnimatedLinearGradient width={screenWidth} height={300}>
                        <Rect x="10" y="20" rx="10" ry="10" width={screenWidth - 20} height="140" />
                        <Rect x="10" y="190" rx="4" ry="4" width={screenWidth - 20} height="13" />
                        <Rect x="10" y="215" rx="4" ry="4" width={screenWidth - 20} height="13" />
                        <Rect x="10" y="240" rx="4" ry="4" width={screenWidth - 20} height="13" />
                    </SvgAnimatedLinearGradient>
                </View>
            );
        } else {
            return (
                < ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
                    <View style={{ alignItems: 'center', height: 140, width: screenWidth }}>
                        <Image
                            style={{ width: screenWidth, height: 140 }}
                            source={{ uri: this.props.myDetail.avatar }}
                        />
                    </View >
                    <View style={{
                        flex: 1,
                        margin: 10,
                        borderColor: '#a6a6a6',
                        borderWidth: 1,
                        borderStyle: 'solid',
                        padding: 10,
                        backgroundColor: 'white'
                    }}>
                        <Text style={{ flex: 1, fontSize: 19, fontWeight: 'bold' }}>{title}</Text>
                        <View style={{
                            flex: 1,
                            paddingTop: 5,
                            paddingRight: 10,
                        }}>
                            {
                                from != '' ? (
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name='clock-o' size={20} color='#e60000' />
                                        <Text style={{ fontSize: 16, marginLeft: 9 }}>
                                            {this.convert(from)} - {this.convert(to)}
                                        </Text>
                                    </View>
                                ) : (
                                        <Text></Text>
                                    )
                            }
                            <View style={{ flexDirection: 'row', marginTop: 7, marginBottom: 7 }}>
                                <Icon name='map-marker' size={20} color='#e60000' />
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 16, marginLeft: 9 }}>{place}</Text>
                                    <Text style={{ fontSize: 14, marginLeft: 9, marginTop: 5 }}>
                                        {address}, {ward}, {district}, {state}
                                    </Text>
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity >
                                    <View style={styles.button1}>
                                        <AppText i18nKey={'buy-now'} style={styles.buttonText1}></AppText>
                                        {/* <Text style={styles.buttonText1}>MUA VÉ NGAY</Text> */}
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <TouchableOpacity style={{
                                    flex: 1,
                                    color: '#999999',
                                    borderColor: '#999999',
                                    borderWidth: 1,
                                    borderStyle: 'solid',
                                    justifyContent: 'center'
                                }}>
                                    <View style={styles.button2}>
                                        <Icon name='facebook' size={20} color='#999999' />
                                        <AppText i18nKey={'share'} style={styles.buttonText2}></AppText>
                                        {/* <Text style={styles.buttonText2}>CHIA SẺ</Text> */}
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    flex: 1,
                                    color: '#999999',
                                    borderColor: '#999999',
                                    borderRightWidth: 1,
                                    borderTopWidth: 1,
                                    borderBottomWidth: 1,
                                    borderStyle: 'solid'
                                }}>
                                    <View style={styles.button2}>
                                        <Icon name='calendar' size={20} color='#999999' />
                                        <AppText i18nKey={'add-cal'} style={styles.buttonText2}></AppText>
                                        {/* <Text style={styles.buttonText2}>THÊM LỊCH</Text> */}
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.content}>
                        {/* <Text style={styles.header}>GIỚI THIỆU</Text> */}
                        <AppText i18nKey={'introduction'} style={styles.header}></AppText>
                        <HTML
                            baseFontStyle={{
                                fontSize: 12,
                                fontFamily: 'Roboto',
                                color: '#333333',
                                lineHeight: 21
                            }}
                            html={description} imagesMaxWidth={Dimensions.get('window').width - 20} />
                        {/* <HTML html={description} imagesMaxWidth={Dimensions.get('window').width} /> */}
                    </View>

                    <View style={styles.content}>
                        {/* <Text style={styles.header}>THÔNG TIN VÉ</Text> */}
                        <AppText i18nKey={'ticket-information'} style={styles.header}></AppText>
                        <TouchableOpacity onPress={() => this._onPress()}>
                            <Text style={{ textTransform: 'uppercase', fontWeight: 'bold', color: 'gray' }}>
                                {this.convert(from1)} - {this.convert(to1)}
                            </Text>
                        </TouchableOpacity>
                        <Animated.View
                            style={{
                                opacity: this.state.fadeValue,
                                flex: 1,
                                flexDirection: 'row',
                                padding: 5,

                            }}
                        >
                            <Text style={styles.ticketText1}>{nameTicket}</Text>
                            {
                                priceTicket && priceTicket == 1000 ?
                                    (
                                        // <Text style={styles.ticketText2}>FREE</Text>
                                        <AppText i18nKey={'free'} style={styles.ticketText2}></AppText>
                                    ) : (
                                        <NumberFormat value={priceTicket} displayType={'text'} thousandSeparator={true}
                                            renderText={
                                                value => <Text style={styles.ticketText2}>{value}Đ</Text>
                                            }
                                        />
                                    )
                            }
                        </Animated.View>
                    </View>

                    <View style={styles.content}>
                        {/* <Text style={styles.header}>ĐƠN VỊ TỔ CHỨC</Text> */}
                        <AppText i18nKey={'organizational-unit'} style={styles.header}></AppText>
                        <Image style={{
                            width: screenWidth - 40,
                            height: screenWidth - 40,
                            marginTop: 10,
                            borderWidth: 1,
                            borderColor: '#808080'
                        }}
                            source={{
                                uri: this.props.myDetail.partnerImg
                            }} />
                        <Text style={styles.sponsorName}>{partnerName}</Text>
                        <View>
                            <TouchableOpacity >
                                <View style={styles.button3}>
                                    <AppText i18nKey={'contact-organization'} style={styles.buttonText3}></AppText>
                                    {/* <Text style={styles.buttonText3}>LIÊN HỆ NHÀ TỔ CHỨC</Text> */}
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView >

            );
        }
    }
}
function mapStatetoProps(state) {
    return {
        myDetailId: state.detailId,
        myDetail: state.detail,
        myDone: state.done,
        language: state.language
    };
}

export default connect(mapStatetoProps)(EventDetail);
const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        alignItems: 'center'
    },
    button1: {
        marginBottom: 10,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#cc0000'
    },
    button2: {
        marginTop: 10,
        marginBottom: 10,
        padding: 3,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    button3: {
        marginTop: 10,
        marginBottom: 10,
        flex: 1,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#808080',
        borderStyle: 'solid'
    },
    buttonText1: {
        textAlign: 'center',
        padding: 10,
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    buttonText2: {
        textAlign: 'center',
        paddingLeft: 15,
        fontSize: 13,
        color: '#999999'
    },
    buttonText3: {
        textAlign: 'center',
        fontSize: 19,
        color: '#808080',
        padding: 10
    },
    header: {
        fontSize: 17,
        color: '#333333',
        borderColor: '#999999',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingBottom: 8
    },
    content: {
        margin: 10,
        borderColor: '#a6a6a6',
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 10,
        backgroundColor: 'white'
    },
    ticketText1: {
        flex: 1,
        fontSize: 14,
        color: '#595959',
        fontWeight: 'bold'
    },
    ticketText2: {
        // textAlign: 'right',
        alignSelf: 'flex-end',
        fontSize: 14,
        color: '#595959',
        fontWeight: 'bold'
    },
    sponsorName: {
        fontSize: 17,
        color: '#333333',
        paddingBottom: 8,
        paddingTop: 8,
    },

});
