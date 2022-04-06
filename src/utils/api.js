import axios from 'axios';

let accessToken = localStorage.getItem('jwt-token');

function request(method, path, data = {}) {
  const url = `/api/${path}`;

  const options = {
    method,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
    url,
    ...data,
  };

  return axios(options);
}

export default {
  GET(path, options) {
    return request('GET', path, options);
  },

  POST(path, options) {
    return request('POST', path, options);
  },

  PUT(path, options) {
    return request('PUT', path, options);
  },

  PATCH(path, options) {
    return request('PATCH', path, options);
  },

  DELETE(path, options) {
    return request('DELETE', path, options);
  },

  setToken(token) {
    accessToken = token;
  },
};
