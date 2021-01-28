import React, { Component } from 'react'
import '../styles/Info.css'
    
export default class UserCard extends Component {

    render() {
        const { title } = this.props
        const { desc } = this.props
        const { img } = this.props
        return (
            <div className="info">
                <div>
                    <h1>{title}</h1>
                    <p className="highlight">{desc}</p>
                </div>
                <div>
                    <img 
                        src={img} 
                        alt={title}
                    />
                </div>
            </div>
        )
    }
}
    