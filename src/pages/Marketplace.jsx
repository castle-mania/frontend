import React, { Component } from 'react';
import '../styles/PageGrid.css';
import '../styles/NavBar.css';
import '../styles/Leaderboards.css'
import Listings from '../components/Listings'
import { Input, InputGroup, Icon, Panel } from 'rsuite'
import TextPanel from '../components/TextPanel'

const styles = {
    width: 300,
    marginBottom: 10
};

export default class Marketplace extends Component {

    state = {
        success: false,
        typing: false,
        typingTimeout: 0,
        search: undefined
    }

    componentDidMount() {
        const urlParams = new URLSearchParams(window.location.search);
        this.setState({
            user: urlParams.get('userid'),
            search: urlParams.get('search')
        })
    }

    render() {

        const { search } = this.state

        return (
            <div className="panels">
                <TextPanel 
                    title="Marketplace"
                    desc="Welcome to the marketplace! Here you can buy and sell generators to and from your fellow players. Hover over the available generators to see their statistics such as the ID and pricing! Click on the generator you're looking for to copy the short ID to your clipboard. From there you can purchase said generator via discord!"
                />
                <Panel shaded className="panel">
                <div className="search-bar">
                    <InputGroup inside style={styles}>
                        <Input placeholder='Search for Generator' onPressEnter={(Event) => this._search(Event.target.value)}/>
                        <InputGroup.Button>
                            <Icon icon="search" />
                        </InputGroup.Button>
                    </InputGroup>
                </div>
                    <Listings search={search}/>
                </Panel>
            </div>
        )
    }

    _search(searchInput) {
        this.setState({
            search: searchInput,
            user: null
        })
    }

    _handleNotAuthenticated = () => {
        this.setState({authenticated: false})
        this.props.history.push('/')
    }
}