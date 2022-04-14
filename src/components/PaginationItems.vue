<template>
  <div class="grid columns gap2">
    <div v-for="pokemon in pokemons" :key="pokemon.name" class="span-4">
      <ListPokemons :pokemonUrl="pokemon.url" />
    </div>
  </div>
</template>
<script>
// import { api } from "@/services.js";
// import ListPokemons from "./ListPokemons.vue";
export default {
  name: "PaginationItems",
  props: ["totalPokemons", "type"],
  components: {
    // ListPokemons,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped></style>
