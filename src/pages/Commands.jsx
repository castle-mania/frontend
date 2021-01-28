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
                    <h1 style={{marginLeft: 25}}>Commands</h1>
                    <Commands/>
                </Panel>
                <Panel shaded className="panel">
                    <h1 style={{marginLeft: 25}}>Listing Commands</h1>
                    <Commands category="listing"/>
                </Panel>
                <Panel shaded className="panel">
                    <h1 style={{marginLeft: 25}}>Kingdom Commands</h1>
                    <Commands category="kingdom"/>
                </Panel>
            </div>
        )
    }


    _handleNotAuthenticated = () => {
        this.setState({authenticated: false})
    }
}
    