/* eslint-disable react/no-array-index-key */
import {
  Avatar,
  Flex,
  Heading,
  Tag,
  Text,
  useColorModeValue,
  Box,
  Divider,
  Skeleton,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  useRadio,
  useRadioGroup,
} from '@chakra-ui/react';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {GuildContext} from '../../contexts/GuildContext';
import {fetchUsers} from '../../utils/leaderboard';
import Currency, {Types} from '../Currency';

export const LeaderboardTypes = {
  CPH: 'cph',
  MONEY: 'money',
};

const LeaderboardTypeText = {
  [LeaderboardTypes.MONEY]: 'Total Coins',
  [LeaderboardTypes.CPH]: 'Coins Per Hour',
};

function LeaderboardValue({type, ...rest}) {
  if (type === LeaderboardTypes.MONEY) {
    return <Currency type={Types.COIN} {...rest} />;
  }

  if (type === LeaderboardTypes.CPH) {
    return <Currency type={Types.CPH} {...rest} />;
  }

  return null;
}

function RadioCard({children, ...props}) {
  const {getInputProps, getCheckboxProps} = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        _checked={{
          bg: useColorModeValue('gray.200', 'gray.700'),
          borderColor: useColorModeValue('gray.200', 'gray.700'),
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={4}
        py={2}>
        {children}
      </Box>
    </Box>
  );
}

function TrophyPlace({user, place, type, ...rest}) {
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" rowGap={4} minW={175}>
      <Avatar src={user?.avatar} {...rest} />
      <Flex direction="column" justifyContent="center" alignItems="center" rowGap={2}>
        <Flex justifyContent="center" alignItems="center" gap={4}>
          <Tag>#{place}</Tag>
          <Heading size="sm">{user?.username}</Heading>
        </Flex>
        <LeaderboardValue type={type} value={user?.[type]} />
      </Flex>
    </Flex>
  );
}

function BasicPlace({user, index, type}) {
  return (
    <Box p={4} m={0}>
      <Flex justifyContent="space-between">
        <Flex alignItems="center" columnGap={4}>
          <Tag>#{index + 1}</Tag>
          <Avatar src={user?.avatar} size="sm" />
          <Text>{user.username}</Text>
        </Flex>
        <LeaderboardValue type={type} value={user?.[type]} />
      </Flex>
    </Box>
  );
}

const validate = () => window.innerWidth < 600;

const GLOBAL_GUILD = {
  name: 'Global',
  icon: null,
};

export default function Leaderboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {guilds} = useContext(GuildContext);

  const [small, setSmall] = useState(validate());
  const [type, setType] = useState(searchParams.get('type') ?? LeaderboardTypes.MONEY);
  const [guildId, setGuildId] = useState(searchParams.get('guildId'));
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    setSearchParams({
      type,
      ...(guildId != null ? {guildId} : {}),
    });

    const tempUsers = await fetchUsers(type, guildId, setLoading);

    setUsers(tempUsers);
    setLoading(false);
  }, [guildId, type]);

  const selectedGuild = useMemo(() => {
    if (guildId == null || guilds == null) {
      return GLOBAL_GUILD;
    }

    const foundGuild = guilds.find(({_id}) => _id === guildId);

    if (foundGuild == null) {
      return GLOBAL_GUILD;
    }

    return foundGuild;
  }, [guildId, guilds]);

  useEffect(() => {
    const onResize = () => setSmall(validate());

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const {getRootProps, getRadioProps} = useRadioGroup({
    name: 'leaderboard_type',
    defaultValue: type,
    onChange: (value) => setType(value),
  });

  const group = getRootProps();

  const Navigation = (
    <>
      <Flex p={4} justifyContent="space-between" gap={4} flexDirection={{base: 'column', sm: 'row'}}>
        <Flex {...group} gap={4} flexDirection={{base: 'column', sm: 'row'}}>
          {Object.values(LeaderboardTypes).map((_type) => {
            const radio = getRadioProps({value: _type});
            return (
              <RadioCard key={_type} {...radio}>
                {LeaderboardTypeText[_type]}
              </RadioCard>
            );
          })}
        </Flex>
        {guilds != null ? (
          <Menu placement="bottom-end">
            <MenuButton leftIcon={<Avatar size="xs" src={selectedGuild.icon} />} as={Button}>
              {selectedGuild.name}
            </MenuButton>
            <MenuList onSelect={setType}>
              <MenuItem icon={<Avatar size="sm" src={null} />} key="global" onClick={() => setGuildId(null)}>
                Global
              </MenuItem>
              {guilds.map((_guild) => {
                const {_id, name, icon} = _guild;
                return (
                  <MenuItem icon={<Avatar size="sm" src={icon} />} key={_id} onClick={() => setGuildId(_id)}>
                    {name}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
        ) : null}
      </Flex>
      <Divider />
    </>
  );

  if (small) {
    return (
      <Skeleton isLoaded={!loading}>
        <Flex
          shadow="md"
          rounded="md"
          flexDirection="column"
          border="1px"
          p={0}
          borderColor={useColorModeValue('gray.200', 'gray.700')}>
          {Navigation}
          {users.map((user, index) => (
            <Box key={`${user.username}-${index}`}>
              <BasicPlace user={user} index={index} type={type} />
              {index === users.length - 1 ? null : <Divider />}
            </Box>
          ))}
        </Flex>
      </Skeleton>
    );
  }

  const [topUser, secondUser, thirdUser, ...rest] = users;

  return (
    <Skeleton
      isLoaded={!loading}
      flexDirection="column"
      border="1px"
      shadow="md"
      p={0}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      rounded="md">
      {Navigation}
      <Flex px={4} py={8} columnGap={4} alignItems="baseline" justifyContent="center" w="100%">
        <TrophyPlace user={secondUser} size="xl" place={2} type={type} />
        <TrophyPlace user={topUser} size="2xl" place={1} type={type} />
        <TrophyPlace user={thirdUser} size="xl" place={3} type={type} />
      </Flex>
      {rest.map((user, index) => (
        <React.Fragment key={`${user.username}-${index}`}>
          <Divider />
          <BasicPlace user={user} index={index + 3} type={type} />
        </React.Fragment>
      ))}
    </Skeleton>
  );
}
