import React, { Component } from 'react'
import Header from '../components/Header';
import '../styles/NavBar.css';
    
export default class Home extends Component {

    state = {
        user: {},
        error: null,
        authenticated: false
    }

    componentDidMount() {
        fetch("/auth", {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            }
        }).then(response => {
            if (response.status === 200) return response.json()
            throw new Error("Authentication Failure")
        })
        .then(responseJSON => {
            this.setState({authenticated: true, user: responseJSON.user});
        })
        .catch(error => {
            this.setState({
                authenticated: false,
                error: "Authentication Failure"
            })
        })
    }

    render() {
        return (
            <div>
                <Header/>
            </div>
            
        )
    }


    _handleNotAuthenticated = () => {
        this.setState({authenticated: false})
    }
}
    