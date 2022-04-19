<template>
  <div>
    <div v-if="pokemonsType">
      <div class="card-pokemon">
        <img
          :src="`${
            pokemonsType.sprites.other.dream_world.front_default
              ? pokemonsType.sprites.other.dream_world.front_default
              : ''
          }`"
          :alt="`pokemon`"
          class="pokemon-img"
        />
        <div class="pokemon-id">{{ pokemonsType.id }}</div>
        <div>{{ pokemonsType.name }}</div>
        <div>{{ pokemonsType.types[0].type.name }}</div>
      </div>
    </div>
    <div v-if="searchPokemon">
      <div class="card-pokemon search">
        <img
          :src="`${
            searchPokemon.sprites.other.dream_world.front_default
              ? searchPokemon.sprites.other.dream_world.front_default
              : ''
          }`"
          :alt="`pokemon`"
          class="pokemon-img"
        />
        <div class="pokemon-id">{{ searchPokemon.id }}</div>
        <div>{{ searchPokemon.name }}</div>
        <div>{{ searchPokemon.types[0].type.name }}</div>
      </div>
    </div>
    <div v-if="allPokemons">
      <div class="card-pokemon">
        <img
          :src="`${
            allPokemons.sprites.other.dream_world.front_default
              ? allPokemons.sprites.other.dream_world.front_default
              : ''
          }`"
          :alt="`pokemon`"
          class="pokemon-img"
        />
        <div class="pokemon-id">{{ allPokemons.id }}</div>
        <div>{{ allPokemons.name }}</div>
        <div>{{ allPokemons.types[0].type.name }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { api } from "@/services.js";
export default {
  name: "ListPokemons",
  props: {
    listTypePokemons: {
      type: Object,
    },
    resultPokemonSearch: {
      type: Object,
    },
    listPokemons: {
      type: Object,
    },
  },
  data() {
    return {
      pokemonsType: null,
      allPokemons: null,
      searchPokemon: null,
    };
  },
  methods: {
    async getTypePokemons() {
      this.allPokemons = null;
      this.searchPokemon = null;
      if (this.listTypePokemons) {
        const response = await api.get(`${this.listTypePokemons.pokemon.url}`);
        this.pokemonsType = response.data;
      }
    },
    async getAllPokemons() {
      this.pokemonsType = null;
      this.searchPokemon = null;
      if (this.listPokemons) {
        const response = await api.get(`${this.listPokemons.url}`);
        this.allPokemons = response.data;
      }
    },
    getPokemonSearch() {
      this.pokemonsType = null;
      this.allPokemons = null;
      this.searchPokemon = this.resultPokemonSearch;
    },
  },
  watch: {
    listPokemons() {
      this.getAllPokemons();
    },
    listTypePokemons() {
      this.getTypePokemons();
    },
    resultPokemonSearch() {
      this.getPokemonSearch();
    },
  },
  created() {
    this.getTypePokemons();
    this.getAllPokemons();
    this.getPokemonSearch();
  },
};
</script>
<style>
.card-pokemon {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: var(--all-transition);
}
.card-pokemon:hover {
  box-shadow: var(--box-shadow);
}
.pokemon-img {
  height: 150px;
  display: block;
  margin: 0 auto;
}
</style>
