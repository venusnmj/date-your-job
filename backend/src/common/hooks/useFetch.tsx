import { serverDomainUrl } from '../../config/serverDomainUrl';
import { LocalStorageEnum } from '@common/types';

// Helper functions
const handleResponse = async (response: Response) => {
  if (response.ok) return response.json();

  // Status not ok
  try {
    const data = await response.json();
    return Promise.reject(data || response.status);
  } catch {
    // Could not parse the JSON
    return Promise.reject(response.status);
  }
};

// Custom fetch hook
const useFetch = () => {
  // Getting Jwt access_token from localStorage and set in authHeader (if any)
  // ***** NOTE: currently, there is no checking of expiry of access_token *****
  // ***** if want to implement refresh token functionality, please  add   *****
  // ***** 'jsonwebtoken' package to verify the access_token & make a HTTP *****
  // ***** request to the api endpoint configured to refresh token         *****
  const getAuthHeader = () => {
    const access_token = localStorage.getItem(LocalStorageEnum.access_token);
    let authHeader = {};
    if (access_token) authHeader = { Authorization: `Bearer ${access_token}` };
    return authHeader;
  };

  const get = async (url: string) => {
    const requestOptions = {
      method: 'GET',
      headers: getAuthHeader(),
      credentials: 'include' as RequestCredentials,
    };
    const response = await fetch(serverDomainUrl + url, requestOptions);
    return handleResponse(response);
  };

  const post = async (url: string, body: unknown) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      credentials: 'include' as RequestCredentials,
      body: JSON.stringify(body),
    };
    const response = await fetch(serverDomainUrl + url, requestOptions);
    return handleResponse(response);
  };

  const put = async (url: string, body: unknown) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      credentials: 'include' as RequestCredentials,
      body: JSON.stringify(body),
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
  };

  // prefixed with underscored because delete is a reserved word in javascript
  const _delete = async (url: string) => {
    const requestOptions = {
      method: 'DELETE',
      headers: getAuthHeader(),
      credentials: 'include' as RequestCredentials,
    };
    const response = await fetch(serverDomainUrl + url, requestOptions);
    return handleResponse(response);
  };

  return { get, post, put, _delete };
};

export default useFetch;
