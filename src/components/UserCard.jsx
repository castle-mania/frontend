import React, { Component } from 'react';
import '../styles/UserCard.css';
import { Badge, Button, Progress } from 'rsuite';
import Moment from 'react-moment';
    
export default class UserCard extends Component {

    render() {
        const { user } = this.props;
        const { castle } = this.props;
        const { lootboxes } = this.props.castle;
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
                            <img src={user.lastKnownAvatarURL} alt={ user.lastKnownUsername }/>
                        </div>
                        <div>
                            <ul>
                                <li className="highlight">{ user.lastKnownTag }</li>
                                <li>{ castle.money } Gems</li>
                                <li>{ castle.GPS }/s {multiplier}</li>
                                <li>{ castle.level } lvl</li>
                                <li><Moment durationFromNow date={ castle.created }/></li>
                            </ul>
                        </div>
                        
                    </div>
                    <div>
                        <Badge content={lootboxes.length}>
                            <Button href="/lootboxes" style={{ padding: 10 }}>Open Lootboxes</Button>
                        </Badge>
                    </div>
                </div>
                <Line percent={progress} strokeColor="var(--accent)"></Line>
            </div>
        )
    }
}
    