<template>
  <div>
    <div v-if="typePokemons" class="grid columns gap2">
      <div v-if="loading" class="span-4">
        <LoadingPage />
      </div>
      <div
        v-else
        v-for="pokemons in listPokemonsPerType"
        :key="pokemons.name"
        class="span-4"
      >
        <ListPokemons :pokemons="pokemons" />
        <ErrorMessage :error="error" />
      </div>
    </div>
    <div v-else-if="searchPokemon" class="grid columns gap2">
      <div v-if="loading" class="span-4">
        <LoadingPage />
      </div>

      <div v-else class="span-4">
        <ListPokemons :pokemons="listPokemonSearch" />
        <ErrorMessage :error="error" />
      </div>
    </div>
    <div v-else-if="allPokemons" class="grid columns gap2">
      <div v-if="loading" class="span-4">
        <LoadingPage />
      </div>

      <div
        v-else
        v-for="pokemons in listAllPokemons"
        :key="pokemons.name"
        class="span-4"
      >
        <ListPokemons :pokemons="pokemons" />
        <ErrorMessage :error="error" />
      </div>
    </div>
    <div v-else>Nenhum pokemon encontrado</div>
  </div>
</template>
<script>
import ListPokemons from "@/components/ListPokemons.vue";

import { api } from "@/services.js";

export default {
  name: "ResultPokemons",
  components: {
    ListPokemons,
  },
  props: {
    listPokemons: {
      type: Array,
    },
    listTypePokemons: {
      type: Array,
    },
    resultPokemonSearch: {
      type: String,
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

      listAllPokemons: [],
      listPokemonsPerType: [],
      listPokemonSearch: null,

      emptySearch: this.resultPokemonSearch,
      loading: true,
      error: "",
    };
  },
  methods: {
    async getAllPokemons() {
      this.listAllPokemons = [];
      this.error = "";
      for (let i = 0; i < this.listPokemons.length; i++) {
        try {
          const response = await api.get(`${this.listPokemons[i].url}`);
          this.listAllPokemons.push({
            img: response.data.sprites.other.dream_world.front_default
              ? response.data.sprites.other.dream_world.front_default
              : "",
            id: response.data.id,
            name: response.data.name,
            type: response.data.types[0].type.name,
          });
        } catch (error) {
          this.error = error.response.data;
        }
      }
      this.loading = false;
    },
    async getAllpokemonsType() {
      this.listPokemonsPerType = [];
      this.error = "";
      for (let i = 0; i < this.listTypePokemons.length; i++) {
        try {
          const response = await api.get(
            `${this.listTypePokemons[i].pokemon.url}`
          );
          this.listPokemonsPerType.push({
            img: response.data.sprites.other.dream_world.front_default
              ? response.data.sprites.other.dream_world.front_default
              : "",
            id: response.data.id,
            name: response.data.name,
            type: response.data.types[0].type.name,
          });
        } catch (error) {
          this.error = error.response.data;
        }
      }
      this.loading = false;
    },
    async getSearchPokemon() {
      this.error = "";
      this.listPokemonSearch = null;
      try {
        const response = await api.get(`/pokemon/${this.resultPokemonSearch}`);
        this.listPokemonSearch = {
          img: response.data.sprites.other.dream_world.front_default
            ? response.data.sprites.other.dream_world.front_default
            : "",
          id: response.data.id,
          name: response.data.name,
          type: response.data.types[0].type.name,
        };
      } catch (error) {
        this.error = error.response.data;
      }
      this.loading = false;
      this.emptySearch = "";
      this.$emit("update:resultPokemonSearch", this.emptySearch);

      // console.log(this.listPokemonSearch);
    },
  },

  watch: {
    resultPokemonSearch() {
      // console.log(this.resultPokemonSearch);
      if (this.resultPokemonSearch !== "") {
        this.loading = true;
        this.getSearchPokemon();
        this.allPokemons = false;
        this.typePokemons = false;
        this.searchPokemon = true;
      }
    },
    listPokemons() {
      if (this.listPokemons.length > 0) {
        this.loading = true;
        this.getAllPokemons();
        this.allPokemons = true;
        this.typePokemons = false;
        this.searchPokemon = false;
      }
    },
    listTypePokemons() {
      if (this.listTypePokemons.length > 0) {
        this.loading = true;
        this.getAllpokemonsType();
        this.allPokemons = false;
        this.searchPokemon = false;
        this.typePokemons = true;
      }
    },
    showAllPokemons() {
      if (this.showAllPokemons && this.listPokemons.length > 0) {
        this.searchPokemon = false;
        this.typePokemons = false;
        this.allPokemons = true;
      }
    },
  },
};
</script>
<style></style>
