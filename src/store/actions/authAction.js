import axios from 'axios';
import { mockAPI } from '../../mockapi';
import { SET_USER } from './userAction';

export const CHANGE_SIGNIN_INPUTS = 'CHANGE_SIGNIN_INPUTS';
export const AUTH_SIGNIN_ERROR = 'AUTH_SIGNIN_ERROR';

export const changeLoginInputs = payloads => {
    return (dispatch, getState) => {
        dispatch({ type: CHANGE_SIGNIN_INPUTS, payloads });
    };
};

export const signIn = credentials => {
    return (dispatch, getState, getAppLocalStorage) => {
        const appLocalStorage = getAppLocalStorage();

        axios.get(mockAPI.path + 'user').then(response => {
            const users = response.data;

            users.forEach(user => {
                if (user.emeil === credentials.emeil && user.password === credentials.password) {
                    dispatch({ type: SET_USER, user });
                    appLocalStorage.userSignIn(user.id);
                } else {
                    dispatch({ type: AUTH_SIGNIN_ERROR, error: 'Email or password is invalid' });
                }
            });
        });
    };
};