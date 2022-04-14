<template>
  <div v-if="pokemon" class="card-pokemon">
    <img
      :src="`${pokemon.img}`"
      :alt="`pokemon-${getIndexUrl}`"
      class="pokemon-img"
    />
    <div class="pokemon-id">{{ pokemon.id }}</div>
    <div>{{ pokemon.name }}</div>
    <div>{{ pokemon.type }}</div>
  </div>
</template>
<script>
import { api } from "@/services.js";
export default {
  name: "ListPokemons",
  props: ["pokemonUrl", "pokemonSearch"],
  data() {
    return {
      pokemon: null,
    };
  },
  methods: {
    async getTypePokemons() {
      if (this.getIndexUrl) {
        const response = await api.get(`/pokemon/${this.getIndexUrl}`);
        this.pokemon = {
          name: response.data.name,
          id: response.data.id,
          type: response.data.types[0].type.name,
          img: response.data.sprites.other.dream_world.front_default,
        };
      }
    },
  },
  // watch: {
  //   pokemonSearch() {
  //     console.log(this.pokemonSearch);
  //   },
  // },
  computed: {
    getIndexUrl() {
      let index;
      if (this.pokemonUrl) {
        index = this.pokemonUrl.split("/");
      }
      return this.pokemonUrl ? index[index.length - 2] : null;
    },
  },
  created() {
    this.getTypePokemons();
  },
};
</script>
<style scoped>
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
