import React, { Component } from 'react';
import '../styles/PageGrid.css';
import '../styles/NavBar.css';
import '../styles/Leaderboards.css'
import { Alert, Input, InputGroup, Loader, Button } from 'rsuite'
import ListingPanel from '../components/ListingPanel'
  

export default class Marketplace extends Component {

    state = {
        url: '',
        success: false,
        offset: 0,
        data: {},
        loading: true,
        typing: false,
        typingTimeout: 0
    }

    componentDidMount() {
        this._updateListings(this.props.location.search.replace('?', ''), this.state.offset)
    }

    render() {
       
        const { success, data, loading, offset } = this.state;
        
        return (
            <div>
                <div className="search-bar">
                    <InputGroup >
                    <Input placeholder="Search for a generator..." onChange={(value) => this._search(`search=${value}`, this.state.offset)}/>
                    </InputGroup>
                </div>

                <div className="listing-grid">
                    { !loading && data.length > 0 && (
                        data.map(listing => (
                            <div>
                                <ListingPanel
                                    listing = { listing }
                                    loading = { false }
                                />
                            </div>
                        ))
                    )}

                    { loading  && (
                        <Loader speed="fast" content="Loading listings" />
                    )}

                    { !loading && data.length === 0 && (
                        <p>No results</p>
                    )}
                </div>

                <div className="page-btns">
                    { !loading && success && offset > 0 && (
                        <Button 
                            style={{padding: 10}} 
                            onClick={() => this._updateListings(this.state.url, this.state.offset - 16)}>
                                Last Page
                        </Button>
                    )}

                    { !loading && success && data.length > 0 && data.length === 16 && (
                        <Button 
                            style={{padding: 10}} 
                            onClick={() => this._updateListings(this.state.url, this.state.offset + 16)}>
                                Next Page
                        </Button>
                    )}
                </div>
                

            </div>
        )
    }

    

    _updateListings(query, offset) {
        if (offset < 0) offset = 0;
        this.setState({ loading: true, url: query, offset })
        fetch(`/api/listings?${query}&offset=${offset}`, {
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
                loading: false,
                data: responseJSON
            });
        })
        .catch(error => {
            this.setState({
                authenticated: false,
                error: "Authentication Failure"
            })
            Alert.error('Unable to fetch')
        })
    }

    _search(query, offset) {
        if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
        }

        this.setState({
            offset: 0,
        })

        this.setState({
            typing: false,
            typingTimeout: setTimeout(() => {
                this._updateListings(query, this.state.offset)
            }, 500)
         });
    }

    _handleNotAuthenticated = () => {
        this.setState({authenticated: false})
        this.props.history.push('/')
    }
}
    


//<Grid className='item-2' grid={generators}/>
//<Grid className='item-3' grid={inventory}/>