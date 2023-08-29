// api.jsx

import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signUp = async (userDetails) => {
  return await api.post('/sign_up', { user: userDetails });
};


export const signIn = async (userDetails) => {
  return await api.post('/sign_in', userDetails);
};

export const createArticle = async (articleDetails) => {
  return await api.post('/articles', { articleDetails });
};

export default api;
