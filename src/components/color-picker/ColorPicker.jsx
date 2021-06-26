import React from 'react';
import { CirclePicker } from 'react-color';
import {
  Popover, Whisper, IconButton, Icon,
} from 'rsuite';

function ColorPicker(onChange) {
  return (
    <Popover>
      <CirclePicker
        onChange={onChange}
        colors={['#5865F2', '#3ba55c', '#e0cc51', '#eb459e', '#e56b6f', '#6930c3']}
      />
    </Popover>
  );
}

export default function Picker({ onChange }) {
  return (
    <Whisper placement="bottomLeft" speaker={ColorPicker(onChange)} trigger="click">
      <IconButton icon={<Icon icon="paint-brush" />} />
    </Whisper>
  );
}
