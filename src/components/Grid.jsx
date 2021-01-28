import React, { Component } from 'react'
import '../styles/Grid.css';
import PropTypes from 'prop-types'; 
import { Popover, Whisper, Button, Panel } from 'rsuite';

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
        const generators = new Array(36).fill(
            <div>
                <img className="generator-icon" src="https://i.imgur.com/hQ8ivGn.png" alt='blank'/>
            </div>
        )

        if (grid) {
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
        }
        

        return (
            <Panel shaded className="grid-panel">
                <div className="grid-container" style={{padding: 0}}>
                    {generators}
                </div>
            </Panel>
            
        )
    }
}
    