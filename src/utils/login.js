export default function login() {
  window.localStorage.setItem('jwt-token-callback', window.location.pathname);
  window.open('/auth/discord', '_self');
}
