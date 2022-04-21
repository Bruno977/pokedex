<template>
  <div class="card-pokemon">
    <div class="container-img-pokemon">
      <img :src="`${pokemons.img}`" :alt="`pokemon`" class="pokemon-img" />
      <div :class="`background-pokemon ${pokemons.type}`"></div>
    </div>
    <div class="pokemon-id">{{ pokemons.id }}</div>
    <div>{{ pokemons.name }}</div>
    <div>{{ pokemons.type }}</div>
  </div>
</template>
<script>
export default {
  name: "ShowAllPokemons",
  props: ["pokemons"],
  data() {
    return {
      pokemonImg: null,
    };
  },
  methods: {
    getStylesPokemons() {
      if (this.pokemons.type === "grass") {
        this.pokemonImg = {
          background: "grass",
          img: "img-grass",
        };
      }
      if (this.pokemons.type === "fire") {
        this.pokemonImg = {
          background: "fire",
          img: "img-fire",
        };
      }
    },
  },
  created() {
    this.getStylesPokemons();
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
  height: 120px;
  display: block;
  margin: 0 auto;
  /* margin-bottom: 10px; */
}
.container-img-pokemon {
  position: relative;
  /* z-index: 9999; */
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 0;
}
.container-img-pokemon img {
  position: relative;
  z-index: 10;
}
.background-pokemon {
  position: absolute;
  z-index: 1;
  top: -13px;
  width: 150px;
  height: 150px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
