import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://todo.api.devcode.gethired.id',
});
