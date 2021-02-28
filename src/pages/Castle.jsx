import React, { Component } from 'react';
import Grid from '../components/Grid';
import UserCard from '../components/UserCard';
import Leaderboard from '../components/Leaderboard'
import '../styles/PageGrid.css';
import '../styles/NavBar.css';
import { Alert, Panel, Input, InputGroup, Icon } from 'rsuite';

const styles = {
    width: 300,
};

export default class Castle extends Component {

    constructor(props) {
        super(props)
        this.handler = this.handler.bind(this)
    }

    handler(id) {
        this.setState({
            success: false,
            castle: {},
            user: {},
        })
        this.getData(`?discordId=${id}`)
    }

    state = {
        success: false,
        castle: {},
        user: {},
    }

    componentDidMount() {
        this.getData(this.props.location.search)
    }


    getData(search) {
        fetch(`/api/castle${search}`, {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            }
        }).then(response => {
            if (response.status === 200) return response.json()
            throw new Error(response.json())
        })
        .then(responseJSON => {
            this.setState({
                success: true,
                castle: responseJSON
            });
        })
        .catch(error => {
            this.setState({
                authenticated: false,
                error: "Authentication Failure"
            })
            this.props.history.push('/')
            Alert.error('Could not fetch user')
        })
    }

    render() {

        const { castle } = this.state
        const { generators, inventory } = castle
        
        return (
            <div>
                <div className="page-grid">
                    <div className="item-1">
                        <UserCard castle={castle}/>
                    </div>
                    <div className="item-2">
                        <Grid className='item-2' grid={generators} slots={castle.slotsUnlocked} premium={castle.premium}/>
                    </div>
                    <div className="item-3">
                        <Grid className='item-3' grid={inventory} premium={castle.premium}/>
                    </div>
                    <div className="item-4">
                        <Panel shaded className="small-panel">
                            <div className="search-bar">
                                <InputGroup inside style={styles}>
                                    <Input placeholder='Enter discord ID' onPressEnter={(Event) => this.handler(Event.target.value)}/>
                                    <InputGroup.Button>
                                        <Icon icon="search" />
                                    </InputGroup.Button>
                                </InputGroup>
                            </div>
                        </Panel>
                        <Panel shaded className="small-panel">
                            <Leaderboard handler={this.handler}/>
                        </Panel>
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