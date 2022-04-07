import {Button, Container, Menu, MenuButton, MenuItem, MenuList} from '@chakra-ui/react';
import React, {useState} from 'react';
import {MdArrowDownward} from 'react-icons/md';
import Leaderboard, {LeaderboardTypes} from '../../components/Leaderboard';

const LeaderboardTypeText = {
  [LeaderboardTypes.MONEY]: 'Total Coins',
  [LeaderboardTypes.CPH]: 'Coins per Hour',
};

export default function Leaderboards() {
  const [type, setType] = useState(LeaderboardTypes.MONEY);

  return (
    <Container maxW="container.md" my={4}>
      <Menu>
        <MenuButton leftIcon={<MdArrowDownward />} as={Button} mb={4}>
          {LeaderboardTypeText[type]}
        </MenuButton>
        <MenuList onSelect={setType}>
          {Object.values(LeaderboardTypes).map((_type) => (
            <MenuItem key={_type} onClick={() => setType(_type)}>
              {LeaderboardTypeText[_type]}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Leaderboard type={type} />
    </Container>
  );
}
