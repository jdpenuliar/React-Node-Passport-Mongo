import axios from 'axios';
import { browserHistory } from 'react-router';

import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './action-types';

const ROOT_URL = `http://localhost:3090`;

export const signupUser = ({ email, password }) => {
  const dispatchFunction = (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then((response) => {
        if (response.data) {
          console.log('response hahaha------\n', response);
          // If request is good
          // update state to indicate user is authenticated
          dispatch({
            type: AUTH_USER,
          })
          // save the jwt token 
          localStorage.setItem('token', response.data.token);
          // redirect to the route '/feature'
          browserHistory.push('/feature');
        }
      })
      .catch((err) => {
        console.log('errr------\n', err);
        // If request is badd .
        // show error
        dispatch({
          type: AUTH_ERROR,
          payload: 'Nope! email is in use alraedy',
        });
      });
  }
  return dispatchFunction;
}

export const signinUser = ({ email, password }) => {
  const dispatchFunction = (dispatch) => {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then((response) => {
        if (response.data) {
          console.log('response hahaha------\n', response);
          // If request is good
          // update state to indicate user is authenticated
          dispatch({
            type: AUTH_USER,
          })
          // save the jwt token 
          localStorage.setItem('token', response.data.token);
          // redirect to the route '/feature'
          browserHistory.push('/feature');
        }
      })
      .catch((err) => {
        console.log('errr------\n', err);
        // If request is badd .
        // show error
        dispatch({
          type: AUTH_ERROR,
          payload: 'Nope',
        });
      });
  };
  return dispatchFunction;
};

export const signoutUser = () => {
  const dispatchFunction = (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: UNAUTH_USER });
  };
  return dispatchFunction;
};

export const fetchMessage = () => {
  const dispatchFunction = (dispatch) => {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then((response) => {
        console.log('response------\n', response.data.message);
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message,
        });
      })
      .catch((err) => {
        console.log('errr------\n', err);
      });
  };
  return dispatchFunction;
};
