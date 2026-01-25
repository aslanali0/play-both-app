import axios from 'axios';
import type { Game } from '../types/content'
const api = axios.create({
  baseURL: 'http://localhost:8000'
})

/*All requests will be transfered in this file*/


export default api;