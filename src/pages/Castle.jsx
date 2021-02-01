import React, { Component } from 'react';
import Grid from '../components/Grid';
import UserCard from '../components/UserCard';
import Leaderboard from '../components/Leaderboard'
import '../styles/PageGrid.css';
import '../styles/NavBar.css';
import { Alert, Panel } from 'rsuite';

export default class Castle extends Component {


    state = {
        success: false,
        castle: {},
        user: {},
        loggedIn: false,
    }

    componentDidMount() {
        const search = this.props.location.search
        fetch(`/api/castle${search}`, {
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
            this.props.history.push('/')
            Alert.error('Could not fetch user')
        })
    }

    render() {

        const { castle } = this.state
        const { generators, inventory } = castle
        
        return (
            <div>
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
                        <Panel shaded className="small-panel">
                            <Leaderboard/>
                        </Panel>
                    </div>
                </div> 
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