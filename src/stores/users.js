import axios from 'axios';

let userCache = {};

let timeout = null;

export function clearCache() {
  userCache = {};
}

export async function fetch(userId) {
  if (userCache[userId] != null) {
    return userCache[userId];
  }

  if (timeout != null) {
    clearTimeout(timeout);
  }

  timeout = setTimeout(() => clearCache(), 1000 * 60 * 5);

  try {
    const res = await axios.get(`/api/users/${userId}`);
    userCache[userId] = res.data.user;
    return userCache[userId];
  } catch (err) {
    return null;
  }
}

export function getAll() {
  return Object.values(userCache);
}
