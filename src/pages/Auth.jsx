import { Component } from 'react';

export default class DiscordAuth extends Component {
  componentDidMount() {
    const { props } = this;
    fetch(`/auth/discord/callback${props.location.search}`)
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error(response.json());
      })
      .then((JSON) => {
        window.localStorage.setItem('castlemania-JWT', JSON.token);
        const redirect = window.localStorage.getItem(
          'cstl-jwt-callback',
        );
        window.location.href = redirect;
      });
  }

  render() {
    return null;
  }
}
