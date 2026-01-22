import axios from 'axios';
import type { Game } from '../types/content'
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000'
})

/*All requests will be transfered in this file*/

