import fetch from 'dva/fetch';
console.log('fetch', fetch)

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
export default function request(url: any, options: any) {
  return fetch.default(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data: any) => ({ data }))
    .catch((err: any) => ({ err }));
}
