import dispatcher from '../dispatcher.js';

export function setColor(color) {
  dispatcher.dispatch({
    type: 'SET_COLOR',
    color,
  });
}

export function buyItem(item) {
  dispatcher.dispatch({
    type: 'BUY_ITEM',
    item,
  });
}

export function sellItem(item) {
  dispatcher.dispatch({
    type: 'SELL_ITEM',
    item,
  });
}

export function sellItemByIndex(item, place, index) {
  dispatcher.dispatch({
    type: 'SELL_ITEM_INDEX',
    item,
    place,
    index,
  });
}
