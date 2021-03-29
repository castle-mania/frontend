import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Panel, Alert, Loader} from 'rsuite';
import '../styles/KingdomGrid.css'
    
export default class KingdomUsers extends Component {

    _copyToClipboard (value) {
        navigator.clipboard.writeText(value)
        Alert.success(`${value} copied to clipboard`)
    }

    render() {
        const { kingdom, success } = this.props;

        if (!success) return (
            <Panel className='kingdom-users-panel' shaded>
                <Loader></Loader>
            </Panel>
        )

        const users = kingdom.users.map(user => 
            <li>
                <img className='kingdom-user-profile-img' src={user.icon_url} alt={user.username}/> 
                <Link to={`/castle?discordId=${user.discordId}`}> {user.username}</Link>
            </li>
        )
        
        return (
            <Panel className='kingdom-users-panel' shaded>
              <ul className='kingdom-users'>
                {users}
              </ul>
            </Panel>
        )
    }
}
    