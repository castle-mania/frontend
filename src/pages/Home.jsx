import React, { Component } from 'react'
import Header from '../components/Header';
import '../styles/NavBar.css';

export default class Home extends Component {

    render() {
        return (
            <div>
                <Header></Header>
            </div>
        )
    }


    _handleNotAuthenticated = () => {
        this.setState({authenticated: false})
    }
}
    