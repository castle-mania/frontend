import React, { Component } from 'react'
import '../styles/Info.css'
import { Panel } from 'rsuite';
    
export default class UserCard extends Component {

    render() {
        const { title, desc } = this.props
        return (
           <Panel shaded className="panel">
               <h1>{title}</h1>
               <p>{desc}</p>
           </Panel>
        )
    }
}
    