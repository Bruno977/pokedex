<template>
  <div v-if="totalPokemons" class="container md-pd">
    <div class="grid columns gap2">
      <div class="span-4">
        <SidebarTypes :type.sync="type" />
      </div>
      <div class="span-8 grid columns gap2">
        <div class="span-12 grid columns gap2">
          <div class="span-6 flex ai-gc">
            <img
              src="../assets/img/icon-poke-red.svg"
              alt="Quantity pokémons"
              class="mr-1"
            />
            <span class="text-bold"> {{ totalPokemons.count }} Pokémons</span>
          </div>
          <div class="span-6">
            <SearchPokemon :pokemonSearch.sync="pokemonSearch" />
          </div>
        </div>
        <div class="span-12 grid columns gap2">
          <div
            v-for="pokemon in pokemonsList"
            :key="pokemon.name"
            class="span-4"
          >
            <ListPokemons :pokemonUrl="pokemon.url" />
          </div>
        </div>
        <div class="span-12">
          <PaginationPokemons
            :totalPokemons="totalPokemons"
            :pokemonsList.sync="pokemonsList"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "@/services.js";
import SidebarTypes from "@/components/SidebarTypes.vue";
import SearchPokemon from "@/components/SearchPokemon.vue";
import PaginationPokemons from "@/components/PaginationPokemons.vue";
import ListPokemons from "@/components/ListPokemons.vue";
export default {
  name: "HomeView",
  components: {
    SidebarTypes,
    SearchPokemon,
    PaginationPokemons,
    ListPokemons,
  },
  data() {
    return {
      totalPokemons: null,
      type: "",
      pokemonSearch: "",
      pokemonsList: null,
    };
  },

  methods: {
    async getTotalPokemons() {
      const response = await api.get("/pokemon");
      this.totalPokemons = response.data;
    },
  },
  watch: {
    pokemonsList() {
      console.log(this.pokemonsList);
    },
  },
  created() {
    this.getTotalPokemons();
  },
};
</script>
