import React, { Component } from 'react'
import '../styles/Grid.css';
import PropTypes from 'prop-types'; 
import { Popover, Whisper, Button } from 'rsuite';

const tooltip = function (generator) {
    return (
        <Popover style={{width: 200}}>
            <ul style={{listStyle: 'none'}}>
                <li><b>Generator Details</b></li>
                <li>{generator.name}</li>
                <li>Generator Level {generator.level}</li>
                <li>GPS: {generator.moneypersecond}</li>
            </ul>
        </Popover>
    )
};
  

const CustomComponent = ({ placement, generator, url }) => (
    <Whisper
        trigger="hover"
        placement={placement}
        speaker={tooltip(generator)}
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
    