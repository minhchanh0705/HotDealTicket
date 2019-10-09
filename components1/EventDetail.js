import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, Modal,Image } from 'react-native';
import HTML from 'react-native-render-html';
import Lightbox from 'react-native-lightbox';

import { connect } from 'react-redux';

class EventDetail extends Component {
    render() {
        // const images = [{ url: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/sample_img.png', },];
        let { place, address, description, avatar } = this.props.myDetail;
        // console.log({ avatar });
        return (
            <ScrollView style={{ flex: 1 }}>
                <Text>Place: {place}</Text>
                <Text>Address: {address}</Text>
                <Text>Avatar: {avatar}</Text>
                <Modal visible={true} transparent={true}>
                    <Lightbox>
                        <Image
                            style={{ height: 300 }}
                            source={{ uri: 'http://knittingisawesome.com/wp-content/uploads/2012/12/cat-wearing-a-reindeer-hat1.jpg' }}
                        />
                    </Lightbox>
                </Modal>
                <HTML html={description} imagesMaxWidth={Dimensions.get('window').width} />
            </ScrollView>
        );
    }
}
function mapStatetoProps(state) {
    return {
        myDetailId: state.detailId,
        myDetail: state.detail
    };

}
export default connect(mapStatetoProps)(EventDetail);

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        alignItems: 'center',
    },
});