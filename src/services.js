import axios from "axios";
const instance = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});
export const api = {
  get(endpoint) {
    return instance.get(endpoint);
  },
};
export const pokemonsStyle = {
  grass: {
    background: "grass",
    img: "grass img",
  },
  fire: {
    background: "fire",
    img: "fire img",
  },
};
