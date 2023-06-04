import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3050',
  timeout: 1000,
});
