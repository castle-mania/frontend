import dispatcher from '../dispatcher.js';

export function setColor({ color }) {
  dispatcher.dispatch({
    type: 'SET_COLOR',
    color,
  });
}

export function buy({ key }) {
  dispatcher.dispatch({
    type: 'BUY',
    key,
  });
}

export function sell({ inventory, index }) {
  dispatcher.dispatch({
    type: 'SELL',
    inventory,
    index,
  });
}

export function unbox({ inventory, index }) {
  dispatcher.dispatch({
    type: 'UNBOX',
    inventory,
    index,
  });
}

export function move({ inventory, index }) {
  dispatcher.dispatch({
    type: 'MOVE',
    inventory,
    index,
  });
}

export function sort() {
  dispatcher.dispatch({
    type: 'SORT',
  });
}
