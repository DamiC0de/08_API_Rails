import axios from 'axios';

export const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};

const api = axios.create({
  baseURL: 'http://127.0.0.1:4242/api',
  headers: {
    'Accept': 'application/json'
  }
});

export const signUp = async (userDetails) => {
  return await api.post('/sign_up', { user: userDetails });
};

export const signIn = async (userDetails) => {
  const res = await api.post('/sign_in', userDetails);
  if (res.status === 200) {
    const token = res.data.token;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
  }
  return res;
};

export const createArticle = async (articleDetails) => {
  const token = localStorage.getItem('jwtToken');
  setAuthToken(token);
  console.log("Stored Token: ", token);
  return await api.post('/articles', { article: articleDetails });
};

export default api;
