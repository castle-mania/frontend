import React, { Component } from 'react'
import { Button, Icon, Panel } from 'rsuite'
import '../styles/Home.css';
import TextPanel from '../components/TextPanel'
import '../styles/Wave.css'
import Commands from '../components/Commands'
import phone from '../res/phone.png'

const images = [
    "https://media.discordapp.net/attachments/768872642874572810/769625789460774912/CastleExample1_2.gif",
    "https://media.discordapp.net/attachments/768872642874572810/769625929864970290/ShopExample.gif",
    "https://media.discordapp.net/attachments/768872642874572810/769626707610042378/dungeonExample.gif"
]

export default class Home extends Component {
    

    render() {
        const image = images[Math.floor(Math.random() * images.length)]
        return (

            <div className="landing-page">
                <div class="wave-container">

                
                        
                    <Panel className="landing-page-main">
                        
                        <div className="front-video">
                            <img className="phone-info" src={image} alt="phone-info"/>
                            <img className="phone-background" src={phone} alt="phone-background"/>
                        </div>
                        
                        <div>
                            <h1 className="main-text">Meet the Most <div className="highlight">Competitive</div> Bot on Discord</h1>
                            <p>A Unique Global Currency game that allows you to Buy, Sell, Raid and Gamble your way to the top of the leaderboard! and much more!</p>
                            <div className="landing-page-buttons">
                                <Button
                                    onClick={() => this._openWindow('https://discord.com/api/oauth2/authorize?client_id=757120026867138580&permissions=2147756096&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdiscord%2Fcallback&scope=applications.commands%20bot')}
                                    style={{padding: 10, backgroundColor: "var(--accent)", marginTop: 25}}>
                                    <Icon icon="plus"/> Add to Discord
                                </Button>
                                <Button
                                    onClick={() => this._handleLoginClick()}
                                    style={{padding: 10, marginTop: 25 }}>
                                    <Icon icon="user-plus" /> Login with Discord
                                </Button>
                            </div>
                        </div>
                        
                    </Panel>
                    <div className="tutorial-indicator">
                        <Icon icon="angle-down" size="3x"/>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#21252b" fill-opacity="1" d="M0,160L60,181.3C120,203,240,245,360,261.3C480,277,600,267,720,250.7C840,235,960,213,1080,213.3C1200,213,1320,235,1380,245.3L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
                </div>
                
                <div className="tutorial-panels">
                    <TextPanel
                        title="Getting Started"
                        desc="Type !castle to visit your castle! You can see a whole bunch of statistics like the number of gems you have, your generator grid, charms you have equipped and more!"
                        image="https://media.discordapp.net/attachments/768872642874572810/769625789460774912/CastleExample1_2.gif"
                    />
                    <TextPanel
                        title="The Shop"
                        desc="Typing !shop will show what's currently being sold, this is varied to change depending on the season! you can go to the next page by using !shop <number> it will default to page one if not specified!"
                        image="https://media.discordapp.net/attachments/768872642874572810/769625929864970290/ShopExample.gif"
                    />
                    <TextPanel
                        title="Buying"
                        desc="Typing !buy <generator> will buy a generator for your castle, be careful make sure you have enough gems!"
                        image="https://media.discordapp.net/attachments/768872642874572810/769626147179986994/buyExample.gif"
                    />
                    <TextPanel
                        title="Selling"
                        desc="If you wish to sell a generator simply type !sell <generator> you will recieve 50% of what you bought it for!"
                        image="https://media.discordapp.net/attachments/768872642874572810/769626542627094528/sellExample2.gif"
                    />
                    <TextPanel
                        title="Dungeons"
                        desc="Dungeon runs are probably one of the most lucrative ways to create money, you will receive a lootbox on completion!"
                        image="https://media.discordapp.net/attachments/768872642874572810/769626707610042378/dungeonExample.gif"
                    />
                    <Panel shaded className="panel">
                        <h4 className="highlight">Commands</h4>
                        <p>You must prefix these commands with !</p>
                        <Commands/>
                    </Panel>
                </div>
            </div>
            
        )
    }


    _handleNotAuthenticated = () => {
        this.setState({authenticated: false})
    }

    _handleLoginClick = () => {
        window.localStorage.setItem('cstl-jwt-callback', window.location.href)
        window.open("/auth/discord", "_self")
    }

    _openWindow(url) {
        window.open(url)
    }
}

    