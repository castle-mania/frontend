import React, { Component } from 'react'
import '../styles/NavBar.css'
import gem from '../res/gem.png'
import Patreon from './Patreon'
import { Avatar, Dropdown, Icon, IconButton } from 'rsuite'
    
export default class NavBar extends Component {

    state = {
        toggled: false,
        authenticated: false,
        loading: true,
        user: {},
    }

    componentDidMount() {
        const JWT = window.localStorage.getItem('castlemania-JWT')
        
        if (JWT != null) {
            fetch("/api/user", {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + JWT,
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true
                }
            }).then(response => {
                if (response.status === 200) return response.json()
                throw new Error("Authentication Failure")
            })
            .then(responseJSON => {
                this.setState({
                    authenticated: true, 
                    loading: false,
                    user: responseJSON, 
                });
            })
            .catch(error => {
                this.setState({
                    authenticated: false,
                    loading: false,
                    error: "Authentication Failure"
                })
            })
        } else {
            this.setState({
                authenticated: false,
                loading: false,
                error: "Authentication Failure"
            })
        }

        
    }

    render() {
        const { authenticated, user, loading } = this.state;

        return (
            <div>
                <nav>
                    <div>
                        <a href="/" className="logotext">
                            <img src={gem} className="logo" alt="gem"></img>
                            <h5>Castle Mania</h5>
                        </a>
                    </div>
                    <ul className="nav-links">
                        { ( authenticated && !loading ) && (
                            <li>
                                <a href={'/castle?discordId=' + user.discordId}>🏰 Castle</a>
                            </li>
                        )}
                        <li>
                            <a href="/marketplace">🛍️ Marketplace</a>
                        </li>
                        <li>
                            <a href="/commands">📖 Commands</a>
                        </li>
                        { ( authenticated && !loading ) && (
                            <li>
                                <a href={'/lootboxes'}>📦 Lootboxes</a>
                            </li>
                        )}
                        <li>
                            <a href="https://www.patreon.com/castlemania?fan_landing=true">❤️ Premium</a>
                        </li>
                        { (!authenticated && !loading ) ? (
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
                    <div className="burger">
                        <Dropdown  placement="bottomEnd" noCaret size="lg"
                            renderTitle={() => {
                                return <IconButton icon={<Icon icon="plus" />} circle />;
                              }}
                            >
                            { ( authenticated && !loading ) && (
                                <Dropdown.Item>
                                    <a href={'/castle?discordId=' + user.discordId}>🏰 Castle</a>
                                </Dropdown.Item>
                            )}
                            <Dropdown.Item>
                                <a href="/marketplace">🛍️ Marketplace</a>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <a href="/commands">📖 Commands</a>
                            </Dropdown.Item>
                            { ( authenticated && !loading ) && (
                                <Dropdown.Item>
                                    <a href={'/lootboxes'}>📦 Lootboxes</a>
                                </Dropdown.Item>
                            )}
                            <Dropdown.Item>
                                <a href="https://www.patreon.com/castlemania?fan_landing=true">❤️ Premium</a>
                            </Dropdown.Item>
                            { (!authenticated && !loading ) ? (
                                <Dropdown.Item className="login">
                                    <p className="logButton" onClick={this._handleLoginClick}>Login</p>
                                </Dropdown.Item>
                            ) : ( 
                                <Dropdown.Item className="login">
                                    <p className="logButton logotext" onClick={this._handleLogoutClick}>
                                        <Avatar size="xs" style={{marginRight: 10}} src={user.lastKnownAvatarURL}></Avatar>
                                        Logout
                                    </p>
                                </Dropdown.Item>
                            )}
                        </Dropdown>
                    </div>
                    
                </nav>
                {(!authenticated || !user.premium) && (<Patreon/>)}
                <div className="divider"></div>
            </div>
        )
    }

    _toggleNavbar = () => {
        
    }

    _handleLoginClick = () => {
        window.localStorage.setItem('cstl-jwt-callback', window.location.href)
        window.open("/auth/discord", "_self")
    }

    _handleLogoutClick = () => {
        window.localStorage.removeItem('castlemania-JWT')
        window.location.reload()
    }
}