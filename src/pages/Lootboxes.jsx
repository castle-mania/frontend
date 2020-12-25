import React, { Component } from 'react'
import '../styles/Lootboxes.css';
import { Button, Alert, Modal, Loader } from 'rsuite';
import MiniGrid from '../components/MiniGrid'

export default class Lootboxes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lootboxes: [],
            error: null,
            authenticated: false,
            reward: {},
            show: false,
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
                authenticated: true, 
                lootboxes: responseJSON
            });
        })
        .catch(error => {
            this.setState({
                authenticated: false,
                error: "Authentication Failure"
            })
            Alert.error('Not authenticated.')
            this.props.history.push('/')
        })
    }

    render() {
        console.log(this.state)
        const { authenticated, lootboxes } = this.state;

        let listLootboxes = []

        if (authenticated && lootboxes != null) {
            listLootboxes = lootboxes.map((lootbox, index) => 
                <li key={index} type={lootbox.type}>
                    <p>📦 {lootbox.type} lootbox</p>
                    <Button 
                        className={lootbox.type} 
                        onClick={() => {this.fetchLootbox(lootbox.id)}} 
                        style={{ padding: 10 }}>
                    Unbox</Button>
                </li>
            )
        }
        
        return (
            <div>
                {(listLootboxes.length > 0 && authenticated) ? (
                    <div>
                        <ul className="lootboxes-list">
                        {listLootboxes}
                        </ul>
                        
                    </div>
                ) : (
                    <p className="center">Nothing to open!</p>
                )}
                <RewardPopup reward={this.state.reward} show={this.state.show}></RewardPopup>
            </div>
        )
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
                Alert.success(responseJSON.message);
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

    render() {
      const { backdrop, show } = this.state;
      const { reward } = this.state;
      const success = !(Object.keys(reward).length === 0 && reward.constructor === Object)
      return (
        <div className="modal-container">
          <Modal  backdrop={backdrop} show={show} size="xs" onHide={this.close}>
            <Modal.Header>
              <Modal.Title>You unboxed!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { success ? (
                    <div>
                        <MiniGrid grid={reward.items}></MiniGrid>
                        <p className="reward-info">The items above were added to your claims</p>
                    </div>
                ) : (
                <div className="center"><Loader content="Loading..."></Loader></div>)}
            </Modal.Body>
            <Modal.Footer>
              <Button style={{ padding: 10 }} onClick={this.close} color="primary">
                Accept
              </Button>
              <Button style={{ padding: 10 }} onClick={this.close} appearance="subtle">
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }
  