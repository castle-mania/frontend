import React, { Component } from 'react'
import '../styles/PageGrid.css';
import '../styles/NavBar.css';
import { Alert, Table } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

export default class Leaderboard extends Component {

    state = {
        data: {},
        success: false,
    }

    componentDidMount() {
        this.setState({success: false})
        fetch(this.props.url, {
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
            Alert.error('Something went wrong.')
            this.props.history.push('/')
        })
    }

    render() {
        
        return (
            <div className="leaderboard">
                { this.state.success ? (
                <Table width={720} height={520} data={this.state.data.map((d, i) => {i++; return {...d, p: i}})}>
                    <Column width={50} align="left" fixed>
                        <HeaderCell>#</HeaderCell>
                        <Cell dataKey="p" />
                    </Column>
                    <Column width={200} align="left" fixed>
                        <HeaderCell>Name</HeaderCell>
                        <Cell dataKey="name" />
                    </Column>
                    <Column width={200} align="left" fixed>
                        <HeaderCell>{this.props.field}</HeaderCell>
                        <Cell dataKey={this.props.field} />
                    </Column>
                </Table>
                ) : (<Table width={480} height={520} loading={true}/>)}
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