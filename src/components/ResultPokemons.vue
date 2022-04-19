<template>
  <div>
    <div v-if="typePokemons" class="grid columns gap2">
      <div
        v-for="pokemon in listTypePokemons"
        :key="pokemon.name"
        class="span-4"
      >
        <ListPokemons :listTypePokemons="pokemon" />
      </div>
    </div>
    <div v-else-if="searchPokemon" class="grid columns gap2">
      <div class="span-4">
        <ListPokemons :resultPokemonSearch="resultPokemonSearch" />
      </div>
    </div>
    <div v-else-if="allPokemons" class="grid columns gap2">
      <div v-for="pokemon in listPokemons" :key="pokemon.name" class="span-4">
        <ListPokemons :listPokemons="pokemon" />
      </div>
    </div>
    <div v-else>Nenhum pokemon encontrado</div>
  </div>
</template>
<script>
import ListPokemons from "@/components/ListPokemons.vue";
export default {
  name: "ResultPokemons",
  components: { ListPokemons },
  props: {
    listPokemons: {
      type: Array,
    },
    listTypePokemons: {
      type: Array,
    },
    resultPokemonSearch: {
      type: Object,
    },
    showAllPokemons: {
      type: Boolean,
    },
  },
  data() {
    return {
      searchPokemon: false,
      typePokemons: false,
      allPokemons: false,
    };
  },
  watch: {
    resultPokemonSearch() {
      this.allPokemons = false;
      this.typePokemons = false;
      this.searchPokemon = true;
    },
    listPokemons() {
      this.allPokemons = true;
      this.typePokemons = false;
      this.searchPokemon = false;
    },
    listTypePokemons() {
      this.allPokemons = false;
      this.searchPokemon = false;
      this.typePokemons = true;
    },
    showAllPokemons() {
      if (this.showAllPokemons) {
        this.allPokemons = true;
        this.searchPokemon = false;
        this.typePokemons = false;
      }
    },
  },
  created() {},
  mounted() {},
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
