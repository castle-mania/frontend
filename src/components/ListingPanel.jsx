import React, { Component } from 'react'
import '../styles/Listing.css';
import { Panel, Popover, Whisper, Alert, Badge } from 'rsuite';
import Currency from './Currency';

const tooltip = function (listing) {
    const { generator, seller } = listing;
    const percentOff = Math.floor((generator.cost - listing.cost) / generator.cost * 100);
    return (
        <Popover style={{width: 200}}>
            <ul style={{listStyle: 'none'}}>
                <li><b>{seller.lastKnownUsername} selling for</b></li>    
                <li><Currency 
                    icon={true} 
                    value={listing.cost}>
                    </Currency>
                </li>
            </ul>
            <ul style={{listStyle: 'none'}}>
                <li><b>Generator Details</b></li>
                <li>{generator.name}</li>
                <li>Generator Level {generator.level}</li>
                <li>GPS: {generator.moneypersecond}</li>
            </ul>
            <p><b>Click to copy ID</b></p>
            <div className="listing-badges">
                {listing.promoted && ( <Badge style={{ background: '#7a17eb' }} content={'Promoted'}/>)}
                {percentOff > 0 && ( <Badge content={percentOff + '% off'}/>)}
            </div>
        </Popover>
    )
};
  
export default class ListingPanel extends Component {

    state = {
        value: '',
        copied: false,
    }

    _levelColour (lvl) {
        let colour
        switch(true) {
            case lvl > 50:
                colour = '#ad8e45'
                break
            case lvl > 25:
                colour = '#6645a8'
                break
            default:
                colour = '#333d63'
        }

        return colour;
    }

    _levelBorderColour (lvl) {
        let colour
        switch(true) {
            case lvl > 50:
                colour = '#edc361'
                break
            case lvl > 25:
                colour = '#8e60eb'
                break
            default:
                colour = '#5466a8'
        }

        return colour;
    }
    

    _copyToClipboard (value) {
        navigator.clipboard.writeText(value)
        Alert.success(`${value} copied to clipboard`)
    }

    render() {
    
        const listing = this.props.listing;
        const { generator } = listing;
        const url = `https://cdn.discordapp.com/emojis/${generator.emoji.replace(/\D+/g, '')}.gif`
        

        return (

            <div className='listing' onClick={() => {this._copyToClipboard(listing.shortId)}}>
                <Whisper placement="auto" trigger="hover" speaker={tooltip(listing)}>
                    <Panel bodyFill className='listing-panel'
                        style={{ 
                            background: this._levelColour(generator.level),
                            borderColor:  this._levelBorderColour(generator.level)
                        }}>
                        <img className="listing-icon" src={url} alt={generator.name}/>
                        <div className="listing-info">
                            <Currency className="listing-price" icon={true} value={listing.cost}/>
                        </div>
                    </Panel>
                </Whisper>
            </div>    
        )
    }
}
/*
                        <div className="listing-badges">
                            {percentOff > 0 && ( <Badge content={percentOff + '% off'}/>)}
                            
                        </div>
                        <div className="listing-bottom cover">
                            <Currency icon={true} value={listing.cost}></Currency>
                        </div>
                        */