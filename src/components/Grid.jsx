import React, { Component } from 'react'
import '../styles/Grid.css';
import PropTypes from 'prop-types'; 
import { Popover, Whisper, Button } from 'rsuite';
import Moment from 'react-moment';
    
const Speaker = ({ generator, url, ...props }) => {
return (
        <Popover {...props}>
            <div className="generator-info">
                <div>
                    <img className="generator-icon" src={url} alt='blank'/>
                </div>
                <div>
                    <ul className="generator-info-list">
                        <li className="Title">{generator.name}</li>
                        <li>GPS: {generator.moneypersecond}</li>
                        <li><Moment durationFromNow date={generator.purchased}/> ago</li>
                    </ul>
                </div>
            </div>
        </Popover>
    );
};
  

const CustomComponent = ({ placement, generator, url }) => (
    <Whisper
        trigger="click"
        placement={placement}
        speaker={<Speaker generator={generator} url={url} />}
    >
        <Button appearance="subtle">
            <img className="generator-icon" src={url} alt='blank'/>
        </Button>
    </Whisper>
);
  
export default class Grid extends Component {

    static propTypes = {
        grid: PropTypes.array.isRequired,
    }

    render() {
        const { grid } = this.props;
        let generators = new Array(36);

        generators.fill(
            <div>
                <img className="generator-icon" src="https://cdn.discordapp.com/emojis/757304938484334715.png?v=1" alt='blank'/>
            </div>
        )

        for (const [index, value] of grid.entries())
        {
            const url = `https://cdn.discordapp.com/emojis/${value.emoji.replace(/\D+/g, '')}.gif`
            value.url = url
            generators[index] = (
                <div key={index}>
                    <CustomComponent placement="top" generator={value} url={url}/>
                </div>
            )
        }

        return (
            <div className="grid-container">
                {generators}
            </div>
        )
    }
}
    