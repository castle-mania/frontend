import React, { Component } from 'react';
import '../styles/PageGrid.css';
import '../styles/NavBar.css';
import { Alert, Input, Panel, InputGroup, Icon } from 'rsuite';
import Leaderboard from '../components/Leaderboard'
import KingdomCard from '../components/KingdomCard'
import KingdomUsers from '../components/KingdomUsers'

const styles = {
    width: 300,
};

export default class Kingdom extends Component {

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
        this.getData(`?kingdomId=${id}`)
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
        fetch(`/api/kingdom${search}`, {
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
                kingdom: responseJSON
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

        const { kingdom, success } = this.state;

        if (kingdom === 'none') return (<div></div>)
        
        return (
            <div>
                <div className="kingdom-grid">
                    <div className="item-1">
                        <KingdomCard kingdom={kingdom} success={success}></KingdomCard>
                    </div>
                    <div className="item-2">
                        <KingdomUsers kingdom={kingdom} success={success}></KingdomUsers>
                    </div>
                    <div className="item-4">
                        <Panel shaded className="small-panel">
                            <div className="search-bar">
                                <InputGroup inside style={styles}>
                                    <Input placeholder='Enter kingdom name' onPressEnter={(Event) => this.handler(Event.target.value)}/>
                                    <InputGroup.Button>
                                        <Icon icon="search" />
                                    </InputGroup.Button>
                                </InputGroup>
                            </div>
                        </Panel>
                        <Panel shaded className="small-panel">
                            <Leaderboard handler={this.handler} url={'/api/leaderboard/kingdom'}/>
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