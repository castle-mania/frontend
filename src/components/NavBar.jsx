import React, { Component } from 'react'
import '../styles/NavBar.css'
import PropTypes from "prop-types";
import gem from '../res/gem.png'
import Patreon from './Patreon'
    
export default class NavBar extends Component {

    state = {
        toggled: false,
        authenticated: false,
        user: {}
    }

    static propTypes = {
        authenticated: PropTypes.bool.isRequired
    };

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
        const { authenticated } = this.state;
        const { premium } = this.state.user;

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
                    { authenticated && (
                        <li>
                            <a href={'/castle?userid=' + this.state.user.discordId}>🏰 Castle</a>
                        </li>
                    )}
                    <li>
                        <a href="https://www.patreon.com/castlemania?fan_landing=true">❤️ Premium</a>
                    </li>
                    <li>
                        <a href="/leaderboards">🏆 Leaderboards</a>
                    </li>
                    { !authenticated ? (
                        <li className="login">
                            <p className="logButton" onClick={this._handleLoginClick}>Login</p>
                        </li>
                    ) : ( 
                        <li className="login">
                            <p className="logButton" onClick={this._handleLogoutClick}>Logout</p>
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
    