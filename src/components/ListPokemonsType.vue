<template>
  <div>
    <div v-if="listTypePokemons">Type</div>
    <div v-if="resultPokemonSearch">Search</div>
    <div v-if="listPokemons">Pokemons</div>
  </div>
</template>
<script>
export default {
  name: "ListPokemonsType",
  props: {
    listTypePokemons: {
      type: Array,
    },
    resultPokemonSearch: {
      type: Object,
    },
    listPokemons: {
      type: Array,
    },
  },
  watch: {
    resultPokemonSearch() {
      console.log("Search");
    },
    listPokemons() {
      console.log("Pokemons");
    },
    listTypePokemons() {
      console.log("Type");
    },
  },
};
</script>
