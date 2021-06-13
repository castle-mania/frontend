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

export function unbox(place, index) {
  dispatcher.dispatch({
    type: 'UNBOX',
    place,
    index,
  });
}

export function moveItem(place, index) {
  dispatcher.dispatch({
    type: 'MOVE',
    place,
    index,
  });
}

export function setCastle(items) {
  dispatcher.dispatch({
    type: 'CASTLE',
    items,
  });
}

export function setInventory(items) {
  dispatcher.dispatch({
    type: 'INVENTORY',
    items,
  });
}

export function sortItems() {
  dispatcher.dispatch({
    type: 'SORT',
  });
}
