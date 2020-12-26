import React, { Component } from 'react';
import Grid from '../components/Grid';
import UserCard from '../components/UserCard';
import Leaderboard from '../components/Leaderboard'
import '../styles/PageGrid.css';
import '../styles/NavBar.css';
import '../styles/Sidenav.css'
import { Alert, Placeholder } from 'rsuite';

export default class Castle extends Component {

    state = {
        success: false,
        castle: {},
        user: {},
        loggedIn: false,
    }

    componentDidMount() {
        fetch(`/api/castle${this.props.location.search}`, {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            }
        }).then(response => {
            if (response.status === 200) return response.json()
            throw new Error(response.json())
        })
        .then(responseJSON => {
            this.setState({
                success: true,
                castle: responseJSON
            });
        })
        .catch(error => {
            this.setState({
                authenticated: false,
                error: "Authentication Failure"
            })
            Alert.error('Failed to find castle')
        })
    }

    render() {

        const { castle, success } = this.state
        const { generators, inventory } = castle
        
        return (
            <div>
                { success ? (  
                <div className="page-grid">
                    <div className="item-1">
                        <UserCard castle={castle}/>
                    </div>
                    <div className="item-2">
                        <Grid className='item-2' grid={generators}/>
                    </div>
                    <div className="item-3">
                        <Grid className='item-3' grid={inventory}/>
                    </div>
                    <div className="item-4">
                        <Leaderboard/>
                    </div>
                </div> ) : 
                <div className="page-grid">
                    <div className="item-1">
                        <Placeholder.Graph active />
                    </div>
                    <div className="item-2">
                        <Placeholder.Graph active />
                    </div>
                    <div className="item-3">
                        <Placeholder.Graph active />
                    </div>
                </div>}
            </div>
        )
    }

    _handleNotAuthenticated = () => {
        this.setState({authenticated: false})
        this.props.history.push('/')
    }
}
    
//<Grid className='item-2' grid={generators}/>
//<Grid className='item-3' grid={inventory}/>