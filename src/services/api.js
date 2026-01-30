```js
import axios from 'axios';
import store from '@/store';
import router from '@/router';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '',
  timeout: 10000,
});

api.interceptors.request.use(
  config => {
    const token = store.getters['auth/token'];
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  async error => {
    const { response } = error;
    if (!response) {
      return Promise.reject({ message: 'Network Error' });
    }

    if (response.status === 401 && !store.getters['auth/isGuest']) {
      await store.dispatch('auth/logout');
      router.replace({ name: 'login' });
    }

    const data = response.data || {};
    const message = data.message || response.statusText;
    return Promise.reject({ ...data, status: response.status, message });
  }
);

export default {
  get(url, params = {}, config = {}) {
    return api.get(url, { params, ...config });
  },

  post(url, payload = {}, config = {}) {
    return api.post(url, payload, config);
  },

  put(url, payload = {}, config = {}) {
    return api.put(url, payload, config);
  },

  patch(url, payload = {}, config = {}) {
    return api.patch(url, payload, config);
  },

  delete(url, config = {}) {
    return api.delete(url, config);
  },

  upload(url, file, fieldName = 'file', extra = {}, config = {}) {
    const form = new FormData();
    form.append(fieldName, file);
    Object.entries(extra).forEach(([key, value]) => form.append(key, value));

    return api.post(url, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
      ...config,
    });
  },
};
```