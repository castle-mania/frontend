import {Button} from '@chakra-ui/react';
import {faDiscord} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {DISCORD_INVITE} from '../../constants';

export default function SupportDiscordButton(props) {
  return (
    <Button
      {...props}
      size="lg"
      shadow="md"
      leftIcon={<FontAwesomeIcon icon={faDiscord} />}
      onClick={() => window.open(DISCORD_INVITE)}>
      Support Discord
    </Button>
  );
}
