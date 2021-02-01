import React, { Component } from 'react'
import '../styles/NavBar.css';
import '../styles/Panel.css'
import Commands from '../components/Commands'
import { Panel } from 'rsuite'

export default class Home extends Component {

    render() {
        return (
            <div className="panels">
                <Panel shaded className="panel">
                    <h4 className="highlight">Main Commands</h4>
                    <p>You must prefix these commands with !</p>
                    <Commands/>
                </Panel>
                <Panel shaded className="panel">
                    <h4 className="highlight">Listing Commands</h4>
                    <p>You must prefix these commands with !listing</p>
                    <Commands category="listing"/>
                </Panel>
                <Panel shaded className="panel">
                    <h4 className="highlight">Kingdom Commands</h4>
                    <p>You must prefix these commands with !kingdom</p>
                    <Commands category="kingdom"/>
                </Panel>
            </div>
        )
    }


    _handleNotAuthenticated = () => {
        this.setState({authenticated: false})
    }
}
    