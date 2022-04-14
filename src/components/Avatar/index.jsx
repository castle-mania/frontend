import React from 'react';
import {Avatar} from '@chakra-ui/react';
import * as ReactDOM from 'react-router-dom';

const ReactLink = ReactDOM.Link;

export default function UserAvatar({user, ...props}) {
  return <Avatar src={user?.avatar} {...props} as={ReactLink} to={`/profile/${user?.discordId}`} />;
}
