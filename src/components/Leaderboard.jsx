import React, { Component } from 'react'
import '../styles/PageGrid.css';
import '../styles/NavBar.css';
import { Alert, Table, Dropdown } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

const ImageCell = ({ rowData, dataKey, ...props }) => (
    <Cell {...props}>
        {rowData[dataKey] ? (
            <img className="leaderboard-icon" src={rowData[dataKey]} alt="icon"/>
        ) : ( <p>🏰</p> )} 
        
    </Cell>
  );


export default class Leaderboard extends Component {

    state = {
        data: {},
        success: false,
        url: '/api/leaderboard/gps'
    }

    componentDidMount() {
        this.setState({success: false})
        this._changeLeaderboard(this.state.url)
    }

    render() {
        return (
            <div className="leaderboard">
                { this.state.success ? (
                <div>
                    <Table width={350} autoHeight={true} data={this.state.data.map((d, i) => {i++; return {...d, p: i}})}>
                        <Column width={40} align="left" fixed>
                            <HeaderCell>#</HeaderCell>
                            <Cell dataKey="p" />
                        </Column>
                        <Column width={50} align="center" fixed>
                            <HeaderCell></HeaderCell>
                            <ImageCell dataKey="icon" />
                        </Column>
                        <Column width={260} align="left" fixed>
                            <HeaderCell>Name</HeaderCell>
                            <Cell>
                                {rowData => (
                                    <a href={`/castle?discordId=${rowData._id}`}>{rowData.name}</a>
                                )}
                            </Cell>
                        </Column>
                    </Table>
                    <div className="leaderboard-dropdown">
                        <Dropdown title="Sort By" appearance="default" placement="topStart" trigger={['click', 'hover']} noCaret>
                            <Dropdown.Item onSelect={() => this._changeLeaderboard('/api/leaderboard/gps')}>Top GPS</Dropdown.Item>
                            <Dropdown.Item onSelect={() => this._changeLeaderboard('/api/leaderboard/lvl')}>Top Level</Dropdown.Item>
                            <Dropdown.Item onSelect={() => this._changeLeaderboard('/api/leaderboard/gems')}>Top Money</Dropdown.Item>
                            <Dropdown.Item onSelect={() => this._changeLeaderboard('/api/leaderboard/kingdom')}>Top Kingdom</Dropdown.Item>
                        </Dropdown>
                    </div>
                </div>
                ) : (<Table width={480} height={520} loading={true}/>)}
            </div>
        )
    }

    _changeLeaderboard(url) {
        fetch(url, {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            }
        }).then(response => {
            if (response.status === 200) return response.json()
            throw new Error("Authentication Failure")
        })
        .then(responseJSON => {
            this.setState({data: responseJSON})
            this.setState({success: true})
        })
        .catch(error => {
            Alert.error('Error loading leaderboard.')
        })
    }

    _handleNotAuthenticated = () => {
        this.setState({authenticated: false})
        this.props.history.push('/')
    }
}
    
//<Grid className='item-2' grid={generators}/>
//<Grid className='item-3' grid={inventory}/>