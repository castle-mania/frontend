import { Alert, Table,  } from 'rsuite';
import React, { Component } from 'react'

const { Column, HeaderCell, Cell } = Table;

export default class Castle extends Component {

    state = {
        success: false,
        commands: [],
        loggedIn: false,
    }

    componentDidMount() {
        fetch(`/api/commands`, {
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
                commands: responseJSON.filter(c => c.admin === false)
            });
        })
        .catch(error => {
            this.setState({
                authenticated: false,
                error: 'Failed to fetch commands'
            })
            Alert.error('Failed to fetch commands')
        })
    }

    render() {

        return (
            <div>
                <Table width={680} height={350} data={this.state.commands}>
                    <Column width={100} align="left" fixed>
                        <HeaderCell>Category</HeaderCell>
                        <Cell dataKey="category" />
                    </Column>
                    <Column width={150} align="left" fixed>
                        <HeaderCell>Command</HeaderCell>
                        <Cell>
                            {rowData => (
                                `!${rowData.name}`
                            )}
                        </Cell>
                    </Column>
                    <Column width={430} align="left" fixed>
                        <HeaderCell>Description</HeaderCell>
                        <Cell dataKey="description"/>
                    </Column>
                </Table>
            </div>
        )
    }

    _handleNotAuthenticated = () => {
        this.setState({authenticated: false})
        this.props.history.push('/')
    }
}