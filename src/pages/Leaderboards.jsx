import React, { Component } from 'react'
import '../styles/NavBar.css';
import '../styles/Leaderboards.css'
import Leaderboard from '../components/Leaderboard';
    
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
                <div className="leaderbords">
                    <Leaderboard field="GPS" url="/api/leaderboard/gps"></Leaderboard>
                    <Leaderboard field="money" url="/api/leaderboard/kingdom"></Leaderboard>
                    <Leaderboard field="money" url="/api/leaderboard/money"></Leaderboard>
                    <Leaderboard field="level" url="/api/leaderboard/level"></Leaderboard>
                </div>
            </div>
            
        )
    }


    _handleNotAuthenticated = () => {
        this.setState({authenticated: false})
    }
}
    