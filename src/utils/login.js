export function login() {
  window.localStorage.setItem('jwt-token-callback', window.location.pathname);
  window.open('/auth/discord', '_self');
}

export function logout() {
  window.localStorage.removeItem('jwt-token');
  window.location.reload();
}
