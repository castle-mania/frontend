import React, { Component } from 'react';
import Grid from '../components/Grid';
import UserCard from '../components/UserCard';
import '../styles/PageGrid.css';
import '../styles/NavBar.css';
import { Alert, Placeholder } from 'rsuite';

export default class Castle extends Component {

    state = {
        success: false,
        castle: {},
        user: {}
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
            throw new Error("Authentication Failure")
        })
        .then(responseJSON => {
            this.setState({
                success: true,
                castle: responseJSON.castle,
                user: responseJSON.user
            });
        })
        .catch(error => {
            this.setState({
                authenticated: false,
                error: "Authentication Failure"
            })
            Alert.error('Not authenticated.')
            this.props.history.push('/')
        })
    }

    render() {
        const { user } = this.state;
        const { castle } = this.state;
        const { success } = this.state;
        const { generators } = this.state.castle;
        const { inventory } = this.state.castle;
        
        return (
            <div>
                { success ? (  
                <div className="page-grid">
                    <div className="item-1">
                        <UserCard 
                            user={user}
                            castle={castle}
                        />
                    </div>
                    <div className="item-2">
                        <Grid className='item-2' grid={generators}/>
                    </div>
                    <div className="item-3">
                        <Grid className='item-3' grid={inventory}/>
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