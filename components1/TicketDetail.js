import React, { Component } from 'react';
import axios from 'axios';
import EventDetail from './EventDetail'
import { connect } from 'react-redux';

class TicketDetail extends Component {
    constructor(props) {
        super(props);
        this.getDetail(this.props.myDetailId);
    }

    getDetail(detailId) {
        axios.get(`https://api-ticket.hotdeal.vn/api/ticket/event/` + detailId)
            .then(res => {
                this.props.dispatch({
                    type: 'PASS_DETAIL',
                    place: res.data.data.info.place,
                    address: res.data.data.info.address,
                    description: res.data.data.info.description,
                    avatar: res.data.data.info.avatar
                });

            })
    }
    render() {
        const { navigation } = this.props;
        const detailId1 = navigation.getParam('detailId1', 'NO-ID');
        return (
                <EventDetail detailId={JSON.stringify(detailId1)} /> 
        );
    }
}
function mapStatetoProps(state) {
        return {
            myDetail: state.detail,
            myDetailId: state.detailId
        };
    // }
}
export default connect(mapStatetoProps)(TicketDetail);

