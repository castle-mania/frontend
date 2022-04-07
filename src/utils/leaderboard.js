/* eslint-disable import/prefer-default-export */
import api from './api';

export async function fetchUsers(type, guild) {
  try {
    const req = await api.GET('leaderboards', {
      params: {
        type,
        guildId: guild?._id,
      },
    });
    return req.data.users;
  } catch (err) {
    return null;
  }
}
