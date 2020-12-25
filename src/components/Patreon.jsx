import React, { Component } from 'react'
import { Button } from 'rsuite'
import '../styles/Patreon.css'
    
export default class UserCard extends Component {

    render() {
        return (
            <div className="patreon">
                <p>❤️ Support Castle Mania on Patreon!</p>
                <Button 
                    href="https://www.patreon.com/castlemania?fan_landing=true" 
                    style={{ padding: 7 }}
                >Support Here</Button>
            </div>
        )
    }
}
    