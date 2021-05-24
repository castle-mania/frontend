import React from 'react';

import {
  Modal,
  IconButton,
  Input,
  InputGroup,
  Dropdown,
  Whisper,
  Popover,
  Icon,
  Button,
} from 'rsuite';

export default function ListingModal({ listingState }) {
  const [open, setOpen] = listingState;
  return (
    <Modal show={open} onHide={() => setOpen(false)}>
      <Modal.Header>
        <Modal.Title>Create a New Listing</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="listing-create-buttons">
          <WithDropdown />
          <InputGroup>
            <InputGroup.Addon> Gems</InputGroup.Addon>
            <Input placeholder="0" />
          </InputGroup>
          <Input rows={3} placeholder="Textarea" />
        </div>
      </Modal.Body>
      <Button style={{ width: 150 }} onClick={() => setOpen(false)} appearance="primary">
        Create Listing
      </Button>
      <Button style={{ width: 150 }} onClick={() => setOpen(false)} appearance="subtle">
        Cancel
      </Button>
    </Modal>
  );
}

const MenuPopover = ({ onSelect, ...rest }) => (
  <Popover {...rest} full>
    <Dropdown.Menu onSelect={onSelect}>
      <Dropdown.Item eventKey={1}>New File</Dropdown.Item>
      <Dropdown.Item eventKey={2}>New File with Current Profile</Dropdown.Item>
      <Dropdown.Item eventKey={3}>Download As...</Dropdown.Item>
      <Dropdown.Item eventKey={4}>Export PDF</Dropdown.Item>
      <Dropdown.Item eventKey={5}>Export HTML</Dropdown.Item>
      <Dropdown.Item eventKey={6}>Settings</Dropdown.Item>
      <Dropdown.Item eventKey={7}>About</Dropdown.Item>
    </Dropdown.Menu>
  </Popover>
);

const WithDropdown = () => {
  const triggerRef = React.createRef();
  function handleSelectMenu(eventKey, event) {
    triggerRef.current.hide();
  }
  return (
    <Whisper
      placement="bottomStart"
      trigger="click"
      triggerRef={triggerRef}
      speaker={<MenuPopover onSelect={handleSelectMenu} />}
    >
      <IconButton icon={<Icon icon="caret-down" />} style={{ width: '100%' }} appearance="ghost">
        Generator
      </IconButton>
    </Whisper>
  );
};
