import React, { Component } from 'react'
import Header from '../components/Header';
import '../styles/NavBar.css';
import '../styles/Panel.css'
import { Panel } from 'rsuite'

export default class Home extends Component {

    render() {
        return (
            <div className="panels">

                <Panel shaded className="panel">
                    <Header/>
                </Panel>
                <Panel shaded className="panel">
                    Hello
                </Panel>
            </div>
        )
    }


    _handleNotAuthenticated = () => {
        this.setState({authenticated: false})
    }
}
    