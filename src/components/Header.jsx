import React, { Component } from 'react'
import { Button } from 'rsuite'
import '../styles/Header.css'
    
export default class UserCard extends Component {

    render() {
        return (
            <div className="Header">
                <h1>CastleMania</h1>
                <div className="header-buttons">
                    <Button 
                    appearance='primary'
                    style={{ padding: 10 }}>Add to Discord</Button>
                    <Button 
                    appearance='primary'
                    style={{ padding: 10 }}>Login with Discord</Button>
                </div>
            </div>
        )
    }
}
    