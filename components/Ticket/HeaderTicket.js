import React, { Component } from 'react';
import { Picker, View, Text, StyleSheet } from 'react-native';
import { Header, Image } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome'

export default class HeaderTicket extends Component {
    constructor(props) {
        super(props);
        this.state = { language: '' };
    };
    saveLanguage = (lang) => {
        this.setState({ language: lang });
    };
    
    render() {
        
        return (
            <Header
                containerStyle={{ backgroundColor: 'red', paddingTop: 0, height: 30 }}
                leftComponent={
                    <Image
                        style={{ width: 95, height: 14, margin: 5, tintColor: 'white', }}
                        source={require('../../LoginForm/img/hd.png')}
                    />
                }

                rightComponent={
                    <Picker
                        style={{ width: 150, height: 20, alignContent: 'flex-end' }}
                        selectedValue={this.state.language}
                        onValueChange={this.saveLanguage}
                    >
                        <Picker.Item label="Vietnamese" value="vn" />
                        <Picker.Item label="English" value="en" />
                    </Picker>
                }

            />
        );
    }
} 