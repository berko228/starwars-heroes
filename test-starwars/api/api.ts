
import axios from 'axios';

const API_URL = 'https://sw-api.starnavi.io';

export const getHeroes = async (page = 1) => {
  const response = await axios.get(`${API_URL}/people?page=${page}`);
  return response.data;
};

export const getHeroDetails = async (id: string) => {
  const response = await axios.get(`${API_URL}/people/${id}`);
  return response.data;
};
