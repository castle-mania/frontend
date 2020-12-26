import React, { Component } from 'react'
import { Button } from 'rsuite'
import '../styles/Header.css'
    
export default class UserCard extends Component {

    render() {
        return (
            <div className="Header">
                <h1>Castle Mania</h1>
                <div className="header-buttons">
                    <Button 
                    appearance='primary'
                    style={{ padding: 10 }}
                    onClick={() => this._openWindow('https://discord.com/oauth2/authorize?client_id=757120026867138580&permissions=2176&scope=bot')}>Add to Discord</Button>
                    <Button 
                    appearance='primary'
                    style={{ padding: 10 }}
                    href='/auth/login'>Login with Discord</Button>
                </div>
            </div>
        )
    }

    _openWindow(url) {
        window.open(url)
    }
}
    