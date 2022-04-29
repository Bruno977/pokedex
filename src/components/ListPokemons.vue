<template>
  <div>
    <div class="card-pokemon" @click="targetPokemon">
      <div class="container-img-pokemon">
        <img :src="`${pokemons.img}`" :alt="`pokemon`" class="pokemon-img" />
        <div :class="`background-pokemon ${pokemons.type}`"></div>
      </div>
      <div class="pokemon-id">#{{ pokemons.id }}</div>
      <div class="flex ai-gc jc-sb">
        <div class="pokemon-name">{{ pokemons.name }}</div>
        <img :src="require(`@/assets/img/${pokemons.type}.svg`)" alt="" />
      </div>
    </div>
    <ModalPokemon
      v-if="isActive"
      :isActive.sync="isActive"
      :pokemon="pokemons.id"
    />
  </div>
</template>
<script>
import ModalPokemon from "@/components/ModalPokemon.vue";
export default {
  props: ["pokemons"],
  components: {
    ModalPokemon,
  },
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    targetPokemon() {
      this.isActive = true;
    },
  },
  watch: {
    isActive() {
      console.log(this.isActive);
    },
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
.pokemon-id {
  color: var(--light-text-color);
  font-size: 0.8em;
}
.pokemon-name {
  font-weight: bold;
  color: var(--text-color);
}
</style>
