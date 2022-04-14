import React from 'react';
import {useParams} from 'react-router';
import {UserContext} from '../contexts/UserContext';
import * as users from '../stores/users';

export default function useUser() {
  const [user, setUser] = React.useState(null);
  const {discordId} = useParams();
  const {user: recUser} = React.useContext(UserContext);

  React.useEffect(async () => {
    if (discordId == null) {
      setUser(recUser);
      return;
    }

    const fetchedUser = await users.fetch(discordId);
    setUser(fetchedUser);
  }, [discordId, recUser]);

  return [user, setUser];
}
