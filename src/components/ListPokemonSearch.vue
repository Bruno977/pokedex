<template>
  <div>search</div>
</template>
<script>
export default {
  name: "listPokemonSearch",
  props: ["pokemons"],
  watch: {
    pokemons() {
      console.log(this.pokemons);
    },
  },
};
</script>
<style scoped></style>
