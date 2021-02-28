import React, { Component } from 'react';
import '../styles/UserCard.css';
import { Progress, Panel, Placeholder, Alert } from 'rsuite';
import Moment from 'react-moment';
import Currency from './Currency'
    
export default class UserCard extends Component {

    _copyToClipboard (value) {
        navigator.clipboard.writeText(value)
        Alert.success(`${value} copied to clipboard`)
    }

    render() {
        const { castle } = this.props;
        const { Line } = Progress; 
        const { XP, baseLevelXP, nextLevelXP} = this.props.castle;
        const progress = Math.floor(((XP - baseLevelXP) / (nextLevelXP - baseLevelXP)) * 100) > 100 
                        ? 100
                        : Math.floor(((XP - baseLevelXP) / (nextLevelXP - baseLevelXP)) * 100);

        
        return (
            <Panel className="user-card" shaded style={{minHeight: 226}}>
                <div className="details">
                    <div className="mini-details">  
                        <div>
                            { castle.lastKnownAvatarURL ? (
                                <img className="profile-icon" src={castle.lastKnownAvatarURL} alt={ castle.lastKnownUsername }/>
                            ) : ( <Placeholder.Graph active width={100} height={100} style={{borderRadius: 5}}/> )}
                        </div>
                        <div>
                            { castle.lastKnownUsername ? (
                            <ul>
                                <li className="highlight copy" onClick={() => this._copyToClipboard(castle.discordId)}>{ castle.lastKnownUsername }</li>
                                <li><Currency icon={true} value={castle.money}></Currency></li>
                                <li>{ castle.GPS }/s</li>
                                <li>{ castle.level } lvl</li>
                                <li><Moment durationFromNow date={ castle.created }/></li>
                            </ul>
                            ) : (
                                <Placeholder.Graph active width={200} height={100} style={{borderRadius: 5}}/>
                            )}
                        </div>  
                        <div>
                            { castle.premium && (
                                <div className="premium-indicator">
                                    <a href="https://www.patreon.com/castlemania?fan_landing=true">PREMIUM</a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                { castle.level && (
                    <div>
                        <Line status="active" percent={progress} strokeColor="var(--accent)"></Line>
                        <div className="level-flex">
                            <p>{ castle.level } lvl</p>
                            <p>{ castle.level + 1 } lvl</p>
                        </div>
                    </div>
                ) }
            </Panel>
        )
    }
}
    