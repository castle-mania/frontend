import React, { Component } from 'react'
import '../styles/TextPanel.css'
import { Panel } from 'rsuite';
    
export default class UserCard extends Component {

    render() {
        const { title, desc, image } = this.props
        return (
           <Panel shaded className="panel">
               <div className="text-panel-flex">
                    <div>
                        <h4 style={{color: "var(--accent)"}}>{title}</h4>
                        <p>{desc}</p>
                    </div>
                    { image && (
                        <img className="text-panel-image" src={image} alt={title}/>
                    )}
               </div>
           </Panel>
        )
    }
}
    