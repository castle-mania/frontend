/* eslint-disable import/prefer-default-export */
export const Pages = {
  HOME: '0',
  MARKET: '1',
  PREMIUM: '2',
  FRIENDS: '3',
  PETS: '4',
  COMMANDS: '5',
  KINGDOM: '6',
};

export const Paths = {
  [Pages.MARKET]: '/market',
  [Pages.PREMIUM]: '/premium',
  [Pages.FRIENDS]: '/friends',
  [Pages.PETS]: '/pets',
  [Pages.COMMANDS]: '/commands',
  [Pages.KINGDOM]: '/kingdom',
  [Pages.HOME]: '/profile',
};

export function getCurrent() {
  return Object.keys(Paths).find((key) => window.location.pathname === Paths[key]) || '-1';
}
