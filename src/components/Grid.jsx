import React, { Component } from 'react'
import '../styles/Grid.css';
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
            <img src={url} alt='blank'/>
        </Button>
    </Whisper>
);
  
export default class Grid extends Component {

    render() {
        const { grid, slots, premium } = this.props;
        const slotsB = slots ? slots : premium ? 54 : 36;
        const generators = premium ? 
            new Array(54).fill(<div className="grid-icon locked"/>).fill(<div className="grid-icon empty"/>, 0, slotsB) :
            new Array(36).fill(<div className="grid-icon locked"/>).fill(<div className="grid-icon empty"/>, 0, slotsB)

        if (grid) {
            for (const [index, value] of grid.entries())
            {
                const url = `https://cdn.discordapp.com/emojis/${value.emoji.replace(/\D+/g, '')}.gif`
                value.url = url
                generators[index] = (
                    <div className="grid-icon" key={index}>
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
    