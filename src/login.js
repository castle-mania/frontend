function handleLoginClick() {
  window.localStorage.setItem('cstl-jwt-callback', window.location.href);
  window.open('/auth/discord', '_self');
}

function handleLogoutClick() {
  window.localStorage.removeItem('castlemania-JWT');
  window.location.reload();
}

export { handleLoginClick, handleLogoutClick };
