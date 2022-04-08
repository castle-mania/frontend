/* eslint-disable import/prefer-default-export */
import api from './api';

const leaderboardCache = {};

export async function fetchUsers(type, guild, setLoading) {
  const scale = guild?._id || 'global';
  const key = `${scale}-${type}`;

  const users = leaderboardCache[key];
  if (users != null) {
    return users;
  }

  setLoading(true);

  try {
    const req = await api.GET('leaderboards', {
      params: {
        type,
        guildId: guild?._id,
      },
    });

    leaderboardCache[key] = req.data.users;
    return req.data.users;
  } catch (err) {
    return null;
  }
}
