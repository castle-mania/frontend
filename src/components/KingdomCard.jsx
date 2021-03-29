import React, { Component } from 'react';
import { Panel, Placeholder, Alert, Icon } from 'rsuite';
import Moment from 'react-moment';
import Currency from './Currency'
import { Link } from 'react-router-dom';
import '../styles/KingdomGrid.css'
    
export default class KingdomCard extends Component {

    _copyToClipboard (value) {
        navigator.clipboard.writeText(value)
        Alert.success(`${value} copied to clipboard`)
    }

    render() {
        const { kingdom, success } = this.props;
        
        if (kingdom === 'none') return <div></div>
        
        return (
            <Panel className="user-card" shaded>
                <div className="details">
                    <div className="mini-details">  
                        <div>
                            { success ? (
                                <img className="profile-icon" src={kingdom.icon_url} alt={ kingdom.icon_url }/>
                            ) : ( <Placeholder.Graph active width={100} height={100} style={{borderRadius: 5}}/> )}
                        </div>
                        <div>
                            { success ? (
                            <ul>
                                <h4 ><Link to={`/kingdom?kingdomId=${kingdom._id}`} className="highlight">{ kingdom.name }</Link></h4>
                                <li>
                                    <div className="icon-text">
                                        <Icon icon='people-group'></Icon>
                                        <p>{kingdom.users.length} Members</p>
                                    </div>
                                </li>
                                <li><Currency icon={true} value={kingdom.money}></Currency></li>
                                <li>{kingdom.stats.totalGPS}/s</li>
                                <li>Created <Moment durationFromNow date={ kingdom.created }/> ago</li>
                            </ul>
                            ) : (
                                <Placeholder.Graph active width={200} height={100} style={{borderRadius: 5}}/>
                            )}
                        </div>  
                    </div>
                </div>
            </Panel>
        )
    }
}
    