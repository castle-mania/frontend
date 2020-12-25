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
        limit: 36,
        offset: 0,
        loaded: false,
        search: this.props.search || 'generator',
        user: this.props.user
    }

    componentWillReceiveProps(next) {
        this.setState({
            loaded: true,
            listings: [],
            hasMore: true,
            limit: 36,
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
                    <div className="center" style={{marginTop: 20}}>
                        <Loader speed="fast" content="Loading listings..."/>
                    </div>
                )}
            >
                <div className="listing-grid">
                    {listingPanels}
                </div>
                { listingPanels.length === 0 && (
                    <div>
                        <div className="center">You've seen everything!</div>
                    </div>
                )}  
                
            </InfiniteScroll>
        )
    }

    loadMore = () => {

        if (!this.state.loaded) return
        
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
            this.setState({
                authenticated: false,
                error: "Authentication Failure"
            })
            Alert.error('Unable to fetch')
        })
    }
}