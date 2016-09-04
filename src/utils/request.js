import { PATH } from '../constants/path.js';

export function get (resourceUrl) {
  const url = generateRequestUrl(resourceUrl);

  return performRequest(url, 'GET');
};

export function put (resourceUrl, payload) {
  const url = generateRequestUrl(resourceUrl);

  return performRequest(url, 'PUT', payload);
};

export function post (resourceUrl, payload) {
  const url = generateRequestUrl(resourceUrl);

  return performRequest(url, 'POST', payload);
};

export function remove (resourceUrl, payload) {
  const url = generateRequestUrl(resourceUrl);

  return performRequest(url, 'DELETE', payload);
};

export function performRequest(url, method, payload) {
  const data = JSON.stringify(payload);

  return fetch(url, {
      body: data,
      method,
 //     mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log(response.status);
      if (response.status === 404) {
        throw new Error('404');
      }
      if (response.status === 300) {
        return '300';
      }
      if (response.status === 401) {
        throw new Error('401');
      }
      return response.json();
    });
};

export function generateRequestUrl (resourceUrl) {
  return `${PATH}${resourceUrl}`;
};
