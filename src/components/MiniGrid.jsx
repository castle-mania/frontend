import React, { Component } from 'react'
import '../styles/MiniGrid.css';
import { Popover, Whisper, Button } from 'rsuite';
    
const Speaker = ({ generator, url, ...props }) => {
return (
        <Popover {...props}>
            <div className="mini-generator-info">
                <div>
                    <img className="mini-generator-icon" src={url} alt='blank'/>
                </div>
                <div>
                    <ul className="mini-generator-info-list">
                        <li className="Title">{generator.name}</li>
                        <li>GPS: {generator.moneypersecond}</li>
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
            <img className="mini-generator-icon" src={url} alt='blank'/>
        </Button>
    </Whisper>
);
  
export default class Grid extends Component {

    render() {
        const { grid } = this.props;
        let generators = new Array(9);

        generators.fill(
            <div>
                <img className="mini-generator-icon" src="https://cdn.discordapp.com/emojis/757304938484334715.png?v=1" alt='blank'/>
            </div>
        )

        for (const [index, value] of grid.entries())
        {
            if (!value.url) {
                const url = `https://cdn.discordapp.com/emojis/${value.emoji.replace(/\D+/g, '')}.gif`
                value.url = url
            }
            
            generators[index] = (
                <div key={index}>
                    <CustomComponent placement="top" generator={value} url={value.url}/>
                </div>
            )
        }

        return (
            <div className="mini-grid-container">
                {generators}
            </div>
        )
    }
}
    