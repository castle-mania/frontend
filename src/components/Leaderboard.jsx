import React, { Component } from 'react'
import '../styles/PageGrid.css';
import '../styles/NavBar.css';
import { Alert, Table } from 'rsuite';

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
            Alert.error('Error loading leaderboard.')
        })
    }

    render() {
        return (
            <div className="leaderboard">
                { this.state.success ? (
                <Table width={350} height={350} data={this.state.data.map((d, i) => {i++; return {...d, p: i}})}>
                    <Column width={40} align="left" fixed>
                        <HeaderCell>#</HeaderCell>
                        <Cell dataKey="p" />
                    </Column>
                    <Column width={50} align="center" fixed>
                        <HeaderCell></HeaderCell>
                        <ImageCell dataKey="icon" />
                    </Column>
                    <Column width={140} align="left" fixed>
                        <HeaderCell>Name</HeaderCell>
                        <Cell>
                            {rowData => (
                                <a href={`/castle?userid=${rowData._id}`}>{rowData.name}</a>
                            )}
                        </Cell>
                    </Column>
                    <Column width={120} align="left" fixed>
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