import React, { Component } from 'react';

export default class DiscordAuth extends Component {

    componentDidMount() {
        fetch('/auth/discord/callback' + this.props.location.search)
            .then(response => {
                if (response.status === 200) return response.json()
                throw new Error(response.json())
            })
            .then(JSON => {
                console.log(JSON)
                window.localStorage.setItem('castlemania-JWT', JSON.token)
                const redirect = window.localStorage.getItem('cstl-jwt-callback')
                window.location.href = redirect
            })
            .catch(e => {
                console.log(e)
            }) 
    }

    render() {
        return (
            <div></div>
        )
    }
}