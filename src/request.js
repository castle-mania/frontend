import axios from 'axios';

const JWT = window.localStorage.getItem('castlemania-JWT');

const HEADERS = {
  Accept: 'application/json',
  Authorization: `Bearer ${JWT}`,
  'Content-Type': 'application/json',
  'Access-Control-Allow-Credentials': true,
};

function request(method, path, data = {}) {
  const url = `/api${path}`;
  return axios({
    method,
    headers: HEADERS,
    url,
    data,
  });
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
};
