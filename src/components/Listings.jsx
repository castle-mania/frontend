import React, { Component } from 'react';
import '../styles/PageGrid.css';
import '../styles/NavBar.css';
import '../styles/Leaderboards.css'
import { Alert, Loader } from 'rsuite'
import ListingPanel from './ListingPanel'
import InfiniteScroll from 'react-infinite-scroller';
  

export default class ListingPanels extends Component {

    state = {
        listings: [],
        hasMore: true,
        limit: 32,
        offset: 0,
        search: this.props.search || 'generator',
        user: this.props.user
    }

    componentWillReceiveProps(next) {
        this.setState({
            listings: [],
            hasMore: true,
            limit: 32,
            offset: 0,
            search: next.search || 'generator',
            user: next.user
        })
    }

    render() {
       
        const { listings, hasMore } = this.state;

        const listingPanels = listings.map((listing, index) => (
            <ListingPanel
                key={index}
                listing = { listing }
                loading = { false }
            />
        ))

        return (     
            <InfiniteScroll
                pageStart={0}
                loadMore={this.loadMore}
                hasMore={hasMore}
                loader={(
                    <div className="center">
                        <Loader speed="fast" content="Loading listings..."/>
                    </div>
                )}
            >
                <div className="listing-grid">
                    {listingPanels}
                </div>
            </InfiniteScroll>
        )
    }

    loadMore = () => {

        const params = {
            search: this.state.search,
            limit: this.state.limit,
            offset: this.state.offset,
        }
        
        const esc = encodeURIComponent;
        const query = Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');

        fetch(`/api/marketplace?${query}`, {
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
        .then(JSON => {
            const { listings, offset } = this.state;
            this.setState({
                offset: offset + JSON.length,
                listings: [...listings, ...JSON],
                hasMore: !(JSON.length === 0)
            });
        })
        .catch(error => {
            console.log(error)
            this.setState({
                authenticated: false,
                error: "Authentication Failure"
            })
            Alert.error('Unable to fetch')
        })
    }
}