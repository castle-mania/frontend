import React, { Component } from 'react'
import '../styles/Lootboxes.css';
import { Button, Alert, Modal, Loader, Panel } from 'rsuite';
import regular from '../res/regular_gift.png'
import legendary from '../res/legendary_gift.png'
import epic from '../res/epic_gift.png'
import TextPanel from '../components/TextPanel'
import Currency from '../components/Currency'

export default class Lootboxes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lootboxes: [],
            error: null,
            loaded: false,
            reward: {},
            show: false,
            currentType: 'regular',
        }
    }

    componentDidMount() {

        const JWT = window.localStorage.getItem('castlemania-JWT')

        fetch("/api/castle/lootboxes", {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + JWT,
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            }
        }).then(response => {
            if (response.status === 200) return response.json()
            throw new Error("Authentication Failure")
        })
        .then(responseJSON => {
            this.setState({
                loaded: true, 
                lootboxes: responseJSON
            });
        })
        .catch(error => {
            this.setState({
                loaded: false,
                error: "Authentication Failure"
            })
            window.localStorage.setItem('cstl-jwt-callback', window.location.href)
            window.open("/auth/discord", "_self")
        })
    }

    render() {
        const { loaded, lootboxes } = this.state;
        let listLootboxes = []

        if (loaded && lootboxes != null) {
            listLootboxes = lootboxes.map((lootbox, index) => 
                <div key={index} type={lootbox.type} className="lootbox-button">
                    <Button 
                        className={lootbox.type} 
                        onClick={() => {this.fetchLootbox(lootbox.id)}} 
                        style={{ padding: 10 }}>
                    <img src={this.getImg(lootbox.type)} className="lootbox-img" alt={lootbox.type}></img>
                    </Button>
                </div>
            )
        }
        
        return (
            <div className="panels">
                <TextPanel 
                    title="Your Lootboxes"
                    desc="Here is where any loot boxes you have will appear! Open your boxes for the contents to automatically be sent to your castle or inventory. If you are unable to open your boxes, it may be due to limited space in your castle/inventory, so try clearing some space!"
                />
                {(loaded) ? (
                <Panel shaded className="panel">
                    
                    {(listLootboxes.length > 0) ? (
                        <div>
                            <div className="lootboxes-grid">
                                {listLootboxes}
                            </div>
                        </div>
                    ) : (
                        <p className="center">Nothing to open!</p>
                    )}
                    <RewardPopup reward={this.state.reward} show={this.state.show}></RewardPopup>
                    
                </Panel>
                ) : (
                    <Panel shaded className="panel"><Loader speed="fast" content="Loading loot" /></Panel>
                )}
            </div>
        )
    }

    getImg(tier) {
        switch (tier) {
            case 'legendary':
                return legendary
            case 'epic':
                return epic
            default:
                return regular
        }
    }

    fetchLootbox(id) {
        this.setState({reward: {}})
        this.setState({show: true})
        const JWT = window.localStorage.getItem('castlemania-JWT')
        
        fetch(`/api/castle/lootboxes/open?lootboxId=${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + JWT,
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            }
        }).then(response => {
            if (response.status === 200) return response.json()
            throw new Error(response.json())
        })
        .then(responseJSON => {
            this.componentDidMount();
            if (responseJSON.success) {
                this.setState({ reward: responseJSON.reward });
            } else {
                Alert.error(responseJSON.message);
                this.setState({show: false})
            }
        })
        .catch(error => {
            console.log(error)
            this.setState({
                authenticated: false,
                error: "Authentication Failure"
            })
            Alert.error('Not authenticated.')
            this.props.history.push('/')
        })
    }

    _handleNotAuthenticated = () => {
        this.setState({authenticated: false})
        this.props.history.push('/')
    }
}

class RewardPopup extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        backdrop: true,
        show: this.props.show,
        reward: {}
      };
      this.close = this.close.bind(this);
      this.open = this.open.bind(this);
    }
    close() {
      this.setState({ show: false });
    }
    open() {
      this.setState({ show: false });
    }

    componentWillReceiveProps(props) {
        this.setState({show: props.show})
        this.setState({reward: props.reward})
    }

    _levelColour (lvl) {
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

    _sellGenerator (tier) {
        const JWT = window.localStorage.getItem('castlemania-JWT')

        fetch("/api/castle/sell", {
            method: "POST",
            credentials: "include",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + JWT,
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify(tier)
        }).then(response => {
            if (response.status === 200) return response.json()
            throw new Error("Authentication Failure")
        })
        .then(responseJSON => {
            Alert.success(<div style={{display: "flex", columnGap: 5}}>Sold {responseJSON.generator} for <Currency icon={true} value={responseJSON.value}/></div>)
        })
        .catch(error => {
            console.log(error)
            Alert.error('Failed to sell generator')
        })
    }

    render() {
      const { backdrop, show } = this.state;
      const { reward } = this.state;
      const success = !(Object.keys(reward).length === 0 && reward.constructor === Object)
      const colour = success ? this._levelColour(reward.items[0].level) : "var(--lightBG)"
      return (
        <div className="modal-container">
          <Modal style={{top: "10%"}} backdrop={backdrop} show={show} size="xs" onHide={this.close}>
            <Modal.Header>
              <Modal.Title>🎉 Congratulations!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { success ? (
                    <div>
                        <div className="unboxed-item">
                        <img src={reward.items[0].url} alt={reward.items[0].name}/>
                        </div>
                        <Panel style={{backgroundColor: "var(--lightBG)", marginTop: 20}}>
                            <p style={{color: colour}}>{reward.items[0].name}</p>  
                            <p>Level: {reward.items[0].level}</p>  
                            <p>GPS: {reward.items[0].moneypersecond}</p>                
                        </Panel>
                    </div>
                ) : (
                <div className="center"><Loader content="Loading..."></Loader></div>)}
            </Modal.Body>
            <Modal.Footer className="lootbox-footer">
              <Button style={{ padding: 10, width: 100, backgroundColor: "var(--accent)" }} onClick={ () => {Alert.success('Added to your inventory or castle'); this.close()}}>
                Accept
              </Button>
              <Button style={{ padding: 10, width: 100 }} onClick={() => {this._sellGenerator(reward.items[0].tier); this.close()}}  color="red">
                Sell
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }
  