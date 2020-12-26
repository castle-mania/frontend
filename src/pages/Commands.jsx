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
                    <Commands/>
                </Panel>
            </div>
        )
    }


    _handleNotAuthenticated = () => {
        this.setState({authenticated: false})
    }
}
    