import React, { Component } from 'react'
import '../styles/NavBar.css'
import gem from '../res/gem.png'
import Patreon from './Patreon'
import { Avatar } from 'rsuite'
    
export default class NavBar extends Component {

    state = {
        toggled: false,
        authenticated: false,
        user: {},
        loading: false,
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
            this.setState({authenticated: true, user: responseJSON.user, loading: true});
        })
        .catch(error => {
            this.setState({
                authenticated: false,
                error: "Authentication Failure"
            })
        })
    }

    render() {
        const { authenticated, loading } = this.state;
        const { premium } = this.state.user;
        const { user } = this.state;

        return (
            <div>
            <nav>
                <div>
                    <a href="/" className="logotext">
                        <img src={gem} className="logo" alt="gem"></img>
                        <h4>Castlemania</h4>
                    </a>
                </div>
                <ul className={'nav-links ' + (this.state.toggled && ' nav-active')}>
                    { (authenticated || loading) && (
                        <li>
                            <a href={'/castle?userid=' + this.state.user.discordId}>🏰 Castle</a>
                        </li>
                    )}
                    <li>
                        <a href="/marketplace">🛍️ Marketplace</a>
                    </li>
                    <li>
                        <a href="https://www.patreon.com/castlemania?fan_landing=true">❤️ Premium</a>
                    </li>
                    { (!authenticated || !loading) ? (
                        <li className="login">
                            <p className="logButton" onClick={this._handleLoginClick}>Login</p>
                        </li>
                    ) : ( 
                        <li className="login">
                            <p className="logButton logotext" onClick={this._handleLogoutClick}>
                                <Avatar size="xs" style={{marginRight: 10}} src={user.lastKnownAvatarURL}></Avatar>
                                Logout
                            </p>
                        </li>
                     )}
                </ul>
                <div className="burger" onClick={this._toggleNavbar}>
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>
                
            </nav>
            {(!authenticated || !premium) && (<Patreon/>)}
            </div>
        )
    }

    _toggleNavbar = () => {
        this.setState({toggled: !this.state.toggled})
    }

    _handleLoginClick = () => {
        window.open("/auth/login", "_self")
    }

    _handleLogoutClick = () => {
        window.open("/auth/logout", "_self")
        this.props._handleNotAuthenticated();
    }
}
    