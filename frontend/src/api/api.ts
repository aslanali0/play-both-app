import axios from 'axios';
import type { Game } from '../types/content'
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000'
})

export const getGame = async (gameName: string): Promise<Game> => {
  const response = await api.get<Game>('/games/search', { params: { game_name: gameName } });
  return response.data;
}
