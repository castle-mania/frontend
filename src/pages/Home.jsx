import React, { Component } from 'react'
import { Button, Icon, Panel } from 'rsuite'
import '../styles/Home.css';
export default class Home extends Component {

    render() {
        return (
            <div className="landing-page">
                <Panel className="landing-page-main">
                    <h1 className="main-text">Meet the Most Addictive bot on Discord</h1>
                    <p>A Unique Global Currency game that allows you to Buy, Sell, Raid and Gamble your way to the top of the leaderboard! and much more!</p>
                    <Button
                        onClick={() => this._openWindow('https://discord.com/api/oauth2/authorize?client_id=757120026867138580&permissions=2176&scope=bot')}
                        style={{padding: 10, backgroundColor: "var(--accent)", marginTop: 25}}>
                        <Icon icon="plus"/> Add to Discord
                    </Button>
                    <Button
                        onClick={() => this._handleLoginClick()}
                        style={{padding: 10, marginTop: 25, marginLeft: 10}}>
                        <Icon icon="user-plus" /> Login with Discord
                    </Button>
                </Panel>
            </div>
            
        )
    }


    _handleNotAuthenticated = () => {
        this.setState({authenticated: false})
    }

    _handleLoginClick = () => {
        window.localStorage.setItem('cstl-jwt-callback', window.location.href)
        window.open("/auth/discord", "_self")
    }

    _openWindow(url) {
        window.open(url)
    }
}
    