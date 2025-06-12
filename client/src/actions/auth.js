import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });
    localStorage.setItem('loginSuccess', 'true'); // ✅ Show toast in Home after redirect
    router.push('/');

    return 'Login successful'; // ✅ Return message for toast (optional if used)
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });
    localStorage.setItem('loginSuccess', 'true'); // ✅ Same flag for toast after redirect
    router.push('/');

    return 'Signup successful'; // ✅ Return message for toast
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
};
