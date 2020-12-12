import React, { Component } from 'react';
import '../styles/PageGrid.css';
import '../styles/NavBar.css';
import '../styles/Leaderboards.css'
import Leaderboard from '../components/Leaderboard';

export default class Castle extends Component {

    state = {
        success: false,
        castle: {},
        user: {}
    }

    render() {
        
        return (
            <div>
                <div className="leaderboard-grid">
                    <div className="item-1">
                    <Leaderboard field="GPS" url="/api/leaderboard/gps"/>
                    </div>
                    <div className="item-2">
                    <Leaderboard field="money" url="/api/leaderboard/kingdom"/>
                    </div>
                    <div className="item-3">
                    <Leaderboard field="money" url="/api/leaderboard/money"/>
                    </div>
                    <div className="item-4">
                    <Leaderboard field="level" url="/api/leaderboard/level"/>
                    </div>
                </div>
            </div>
        )
    }

    _handleNotAuthenticated = () => {
        this.setState({authenticated: false})
        this.props.history.push('/')
    }
}
    
//<Grid className='item-2' grid={generators}/>
//<Grid className='item-3' grid={inventory}/>