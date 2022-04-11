export default function login() {
  localStorage.setItem('jwt-token-callback', `${window.location.pathname}${window.location.search}`);
  window.open('/auth/discord', '_self');
}
