import React, { Component } from 'react';
import axios from 'axios';
import EventDetail from './EventDetail'
import { connect } from 'react-redux';
import {View} from 'react-native'
class TicketDetail extends Component {
    constructor(props) {
        super(props);
        this.getDetail(this.props.myDetailId);
    }
    static navigationOptions = {
        header: (
            <View/>
        )
    };
    getDetail(detailId) {
        axios.get(`https://api-ticket.hotdeal.vn/api/ticket/event/` + detailId)
            .then(res => {
                {
                    res.data.data.schedules[0]!=null?                              
                (
                    console.log('true'),
                    this.props.dispatch({                    
                    type: 'PASS_DETAIL',
                    place: res.data.data.info.place,
                    address: res.data.data.info.address,
                    ward: res.data.data.info.ward,
                    district: res.data.data.info.district,
                    state: res.data.data.info.state,
                    description: res.data.data.info.description,
                    avatar: res.data.data.info.avatar,
                    title: res.data.data.info.title,                          
                    from: res.data.data.schedules[0].from,
                    to: res.data.data.schedules[0].to,                                 
                    timeTicket:res.data.data.tickets[0].schedule_code,
                    priceTicket:res.data.data.tickets[0].price,
                    nameTicket:res.data.data.tickets[0].name,
                    partnerImg:res.data.data.partner.avatar,
                    partnerName:res.data.data.partner.name,
                    partnerDesc:res.data.data.partner.description
                })):
                (
                    console.log('false'),
                    this.props.dispatch({                    
                    type: 'PASS_DETAIL',
                    place: res.data.data.info.place,
                    address: res.data.data.info.address,
                    ward: res.data.data.info.ward,
                    district: res.data.data.info.district,
                    state: res.data.data.info.state,
                    description: res.data.data.info.description,
                    avatar: res.data.data.info.avatar,
                    title: res.data.data.info.title,                    
                    from: '',
                    to: '', 
                    timeTicket:res.data.data.tickets[0].schedule_code,
                    priceTicket:res.data.data.tickets[0].price,
                    nameTicket:res.data.data.tickets[0].name,
                    partnerImg:res.data.data.partner.avatar,
                    partnerName:res.data.data.partner.name,
                    partnerDesc:res.data.data.partner.description
                }))

            };
            })
            .then(res => {
                this.props.dispatch({
                    type: 'TOGGLE_DONE',
                    done:"true"
                });
            })
    }
    render() {
        const { navigation } = this.props;
        const detailId = navigation.getParam('detailId');
        console.log('id: '+detailId)
        return (
                <EventDetail 
                // detailId={JSON.stringify(detailId)} 
                /> 
        );
    }
}
function mapStatetoProps(state) {
        return {
            myDetailId: state.detailId
        };
    // }
}
export default connect(mapStatetoProps)(TicketDetail);

