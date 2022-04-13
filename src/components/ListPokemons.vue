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
  props: ["pokemonName", "pokemonUrl"],
  data() {
    return {
      url: "",
      pokemon: null,
    };
  },
  methods: {
    async getTypePokemons() {
      const response = await api.get(`/pokemon/${this.getIndexUrl}`);
      this.pokemon = {
        name: response.data.name,
        id: response.data.id,
        type: response.data.types[0].type.name,
        img: response.data.sprites.other.dream_world.front_default,
      };
    },
  },
  computed: {
    getIndexUrl() {
      const index = this.pokemonUrl.split("/");
      return index[index.length - 2];
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
