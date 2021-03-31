import React, { Component } from 'react'
import '../styles/NavBar.css'
import gem from '../res/gem.png'
import { Avatar, Dropdown, Icon, IconButton } from 'rsuite'
import { Link } from 'react-router-dom';

import box from '../res/epic_gift.png'
import crown from '../res/crown.png'
    
export default class NavBar extends Component {

    state = {
        toggled: false,
        authenticated: false,
        loading: true,
        user: {},
    }

    componentDidMount() {
        const JWT = window.localStorage.getItem('castlemania-JWT')
        const { setUser } = this.props;
        this.setState({loading: true})

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
                setUser(this.state.user);
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
                        <Link to="/" className="logotext">
                            <img src={gem} className="logo" alt="gem"></img>
                            <h5>CastleMania</h5>
                        </Link>
                    </div>
                    <ul className="nav-links">
                        { ( authenticated && !loading ) ? (
                            <li>
                                <Link to={'/castle?discordId=' + user.discordId}>🏰 Castle</Link>
                            </li>
                        ) : (
                            <li>
                                <a style={{cursor: "pointer", textDecoration: "none" }} onClick={this._handleLoginClick}><p>🏰 Castle</p></a>
                            </li>
                        )}
                        <li>
                            <a className="logotext" href='https://www.patreon.com/join/castlemania?'><img width={20} src={crown}/><p>Premium</p></a>
                        </li>
                        <li>
                            <Link to="/marketplace">🛍️ Marketplace</Link>
                        </li>
                        <li>
                            <Link className="logotext" to='/lootboxes'><img width={20} src={box}/>Lootboxes</Link>
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
                        <Dropdown placement="bottomEnd" noCaret size="lg"
                            renderTitle={() => {
                                return <IconButton icon={<Icon icon="plus" />} circle />;
                              }}
                            >
                            { ( authenticated ) ? (
                                <Dropdown.Item>
                                    <Link to={'/castle?discordId=' + user.discordId}>🏰 Castle</Link>
                                </Dropdown.Item>
                            ) : (
                                <Dropdown.Item>
                                    <a style={{cursor: "pointer", textDecoration: "none" }} onClick={this._handleLoginClick}><p>🏰 Castle</p></a>
                                    </Dropdown.Item>
                            )}
                            <Dropdown.Item>
                                <Link to="/marketplace">🛍️ Marketplace</Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Link className="logotext" to='/lootboxes'><img width={20} src={box}/>Lootboxes</Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <a className="logotext" href='https://www.patreon.com/join/castlemania?'><img width={20} src={crown}/><p>Premium</p></a>
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
                <div className="divider"></div>
            </div>
        )
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