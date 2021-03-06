import React, { Component } from 'react';
import { View, Image, Text, ScrollView, Dimensions } from 'react-native';
import Categories from './Categories';
import HeaderTicket from './HeaderTicket';
import Banner from './Banner';
import { connect } from 'react-redux';
const { width: screenWidth } = Dimensions.get('window')
class MainTicket extends Component {
    static navigationOptions = {
        header: (<View />)
    };
    render() {
        if (this.props.detailId != 0) {
            this.props.navigation.navigate('TicketDetail', {
                detailId1: this.props.detailId
            });
        }
        this.props.dispatch({
            type: 'TOGGLE_DONE',
            done: "false",
        });
        return (
            <ScrollView>
                <View>
                    <HeaderTicket />
                </View>
                <Banner />
                <View style={{ alignItems: 'center', backgroundColor: '#fff' }}>
                    <Categories />
                </View>
            </ScrollView>
        );
    }
}

function mapStatetoProps(state) {
    return {
        detailId: state.detailId,
        language: state.language
    };
}
export default connect(mapStatetoProps)(MainTicket);
const styles = StyleSheet.create({
    text: {
       fontSize: 30,
       alignSelf: 'center',
       color: 'red'
    }
 })