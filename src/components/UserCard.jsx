import React, { Component } from 'react';
import '../styles/UserCard.css';
import { Progress } from 'rsuite';
import Moment from 'react-moment';
import Currency from './Currency'
    
export default class UserCard extends Component {

    render() {
        const { castle } = this.props;
        const { Line } = Progress; 
        const { allTimeEarnings, baseLevelXP, nextLevelXP} = this.props.castle;
        const progress = Math.floor(((allTimeEarnings - baseLevelXP) / (nextLevelXP - baseLevelXP)) * 100) > 100 
                        ? 100
                        : Math.floor(((allTimeEarnings - baseLevelXP) / (nextLevelXP - baseLevelXP)) * 100);

        const multiplier =
             castle.multiplier === 1 ? '' : `x${castle.multiplier}`
        
        return (
            <div className="user-card">
                <div className="details">
                    <div className="mini-details">  
                        <div>
                            <img className="profile-icon" src={castle.lastKnownAvatarURL} alt={ castle.lastKnownUsername }/>
                        </div>
                        <div>
                            <ul>
                                <li className="highlight">{ castle.lastKnownUsername }</li>
                                <li><Currency value={castle.money}></Currency></li>
                                <li>{ castle.GPS }/s {multiplier}</li>
                                <li>{ castle.level } lvl</li>
                                <li><Moment durationFromNow date={ castle.created }/></li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
                <Line percent={progress} strokeColor="var(--accent)"></Line>
            </div>
        )
    }
}
    