import { Alert, Table,  } from 'rsuite';
import React, { Component } from 'react'

const { Column, HeaderCell, Cell } = Table;

export default class CommandsTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addColumn: false,
            success: false,
            data: [],
            loggedIn: false,
        };
        this.handleSortColumn = this.handleSortColumn.bind(this);
      }
    
      getData() {
        const { data, sortColumn, sortType } = this.state;
    
        if (sortColumn && sortType) {
          return data.sort((a, b) => {
            let x = a[sortColumn];
            let y = b[sortColumn];
            if (typeof x === 'string') {
              x = x.charCodeAt();
            }
            if (typeof y === 'string') {
              y = y.charCodeAt();
            }
            if (sortType === 'asc') {
              return x - y;
            } else {
              return y - x;
            }
          });
        }
        return data;
      }
    
      handleSortColumn(sortColumn, sortType) {
        this.setState({
          loading: true
        });
    
        setTimeout(() => {
          this.setState({
            sortColumn,
            sortType,
            loading: false
          });
        }, 500);
      }

    componentDidMount() {
        fetch(`/api/commands?category=${this.props.category}`, {
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
                data: responseJSON.filter(c => c.admin === false)
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

        // const sub = this.props.category === undefined ? '' : this.props.category + ' '

        return (
            <div className="big-panel">
                <Table 
                    width={650} 
                    autoHeight
                    data={this.getData()}
                    sortColumn={this.state.sortColumn}
                    sortType={this.state.sortType}
                    onSortColumn={this.handleSortColumn}
                    loading={this.state.loading}
                >
                    <Column width={100} align="left" fixed>
                        <HeaderCell>Category</HeaderCell>
                        <Cell dataKey="category" />
                    </Column>
                    <Column width={150} align="left" fixed sortable>
                        <HeaderCell>Command</HeaderCell>
                        <Cell dataKey="name" />
                    </Column>
                    <Column width={400} align="left" fixed>
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