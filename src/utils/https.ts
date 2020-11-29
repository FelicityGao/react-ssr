import { fetch } from 'dva';

function parseJSON(response: any) {
  return response.json();
}

function checkStatus(response: any) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error: any = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
let BASE_URL = process.env.REACT_APP_BASE_API
export default function request(url: any, options?: any) {
  url = BASE_URL + url
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data: any) => ({ data }))
    .catch((err: any) => ({ err }));
}
