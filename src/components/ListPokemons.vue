<template>
  <div>
    <div v-if="pokemonsType">
      <ShowAllPokemons :pokemons="pokemons" />
    </div>
    <div v-if="searchPokemon">
      <ShowAllPokemons :pokemons="pokemons" />
    </div>
    <div v-if="allPokemons">
      <ShowAllPokemons :pokemons="pokemons" />
    </div>
  </div>
</template>
<script>
import { api } from "@/services.js";
import ShowAllPokemons from "@/components/ShowAllPokemons.vue";

export default {
  name: "ListPokemons",
  components: {
    ShowAllPokemons,
  },
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
      // getStyle: false,
      pokemons: null,
    };
  },
  methods: {
    async getTypePokemons() {
      this.allPokemons = null;
      this.searchPokemon = null;
      if (this.listTypePokemons) {
        const response = await api.get(`${this.listTypePokemons.pokemon.url}`);
        this.pokemonsType = response.data;
        this.pokemons = {
          img: this.pokemonsType.sprites.other.dream_world.front_default
            ? this.pokemonsType.sprites.other.dream_world.front_default
            : "",
          id: this.pokemonsType.id,
          name: this.pokemonsType.name,
          type: this.pokemonsType.types[0].type.name,
        };
      }
    },
    async getAllPokemons() {
      this.pokemonsType = null;
      this.searchPokemon = null;
      if (this.listPokemons) {
        const response = await api.get(`${this.listPokemons.url}`);
        this.allPokemons = response.data;
        this.pokemons = {
          img: this.allPokemons.sprites.other.dream_world.front_default
            ? this.allPokemons.sprites.other.dream_world.front_default
            : "",
          id: this.allPokemons.id,
          name: this.allPokemons.name,
          type: this.allPokemons.types[0].type.name,
        };
      }
    },
    getPokemonSearch() {
      this.pokemonsType = null;
      this.allPokemons = null;
      this.searchPokemon = this.resultPokemonSearch;
      if (this.searchPokemon) {
        this.pokemons = {
          img: this.searchPokemon.sprites.other.dream_world.front_default
            ? this.searchPokemon.sprites.other.dream_world.front_default
            : "",
          id: this.searchPokemon.id,
          name: this.searchPokemon.name,
          type: this.searchPokemon.types[0].type.name,
        };
      }
    },
    // getPokemonsStyle() {
    //   if (this.getStyle === false) {
    //     this.getStyle = true;
    //     console.log(this.getStyle);
    //     console.log(pokemonsStyle);
    //   }
    // },
  },
  watch: {
    listPokemons() {
      this.getAllPokemons();
    },
    listTypePokemons() {
      this.getTypePokemons();
      console.log("list");
    },
    resultPokemonSearch() {
      this.getPokemonSearch();
    },
  },
  created() {
    this.getTypePokemons();
    this.getAllPokemons();
    this.getPokemonSearch();
    // this.getPokemonsStyle();
  },
};
</script>
<style></style>
