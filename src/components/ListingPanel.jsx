import React, { Component } from 'react'
import '../styles/Listing.css';
import { Panel, Avatar, Badge, Alert } from 'rsuite';
import Currency from './Currency';
  
export default class ListingPanel extends Component {

    state = {
        value: '',
        copied: false,
    }

    _copyToClipboard (value) {
        navigator.clipboard.writeText(value)
        Alert.success(`${value} copied to clipboard`)
    }

    render() {
    
        const listing = this.props.listing;
        const { generator, seller } = listing;
        const sellerUrl = '/castle/?userid=' + seller.discordId
        const url = `https://cdn.discordapp.com/emojis/${generator.emoji.replace(/\D+/g, '')}.gif`
        const percentOff = Math.floor((generator.cost - listing.cost) / generator.cost * 100);

        return (

            <div className='listing' onClick={() => {this._copyToClipboard(listing.shortId)}}>
                    <Panel shaded bodyFill style={{ display: 'inline-block', width: 170, height: 360 }}>
                        <img className="listing-icon" src={url} alt={generator.name}/>
                        <div className="listing-badges">
                            {percentOff > 0 && ( <Badge content={percentOff + '% off'}/>)}
                            {listing.promoted && ( <Badge style={{ background: '#7a17eb' }} content={'Promoted'}/>)}
                        </div>
                        <Panel>
                            <div className="listing-info">
                                <div>
                                    <h5 className={'highlight'}>{generator.name}</h5>
                                    <Currency value={listing.cost}></Currency>
                                </div>
                                <p>{listing.shortId}</p>
                                <div className="seller-listing">
                                    <a href={sellerUrl} className="logotext">
                                        <Avatar style={{marginRight: 10}} src={seller.lastKnownAvatarURL} size="xs"></Avatar>{seller.lastKnownUsername}
                                    </a>
                                </div>
                            </div> 
                        </Panel>
                    </Panel>
            </div>    
        )
    }
}
