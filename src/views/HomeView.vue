<template>
  <div v-if="totalPokemons" class="container md-pd">
    <div class="grid columns gap2">
      <div class="span-4">
        <SidebarTypes :type.sync="type">
          <li @click="showAllPokemonsSide" class="flex ai-gc">
            <img src="../assets/img/icon-all.svg" alt="All Pokemons" />
            <p class="ml-1">All</p>
          </li>
        </SidebarTypes>
      </div>
      <div class="span-8 grid columns gap2 grid-pokemons">
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
        <div class="span-12">
          <ResultPokemons
            :listPokemons="listPokemons"
            :listTypePokemons="listTypePokemons"
            :resultPokemonSearch="resultPokemonSearch"
            :showAllPokemons="showAllPokemons"
          />
        </div>
        <div class="span-12" v-if="showPagination">
          <PaginationPokemons
            :totalPokemons="totalPokemons"
            :offsetAndLimit.sync="offsetAndLimit"
            :showPagination.sync="showPagination"
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
import ResultPokemons from "@/components/ResultPokemons.vue";
export default {
  name: "HomeView",
  components: {
    SidebarTypes,
    SearchPokemon,
    PaginationPokemons,
    ResultPokemons,
  },
  data() {
    return {
      totalPokemons: null,
      type: "",
      pokemonSearch: "",

      offsetAndLimit: null,

      listPokemons: null,
      listTypePokemons: null,
      resultPokemonSearch: null,

      showAllPokemons: false,
      showPagination: true,
      // showTypeSidebar: "",
    };
  },

  methods: {
    // Pega Pokemons Por Páginação
    async getPokemonsPerPagination() {
      if (this.offsetAndLimit) {
        const response = await api.get(
          `pokemon?offset=${
            this.offsetAndLimit.offset - this.offsetAndLimit.limit
          }&limit=${this.offsetAndLimit.limit}`
        );
        this.listPokemons = response.data.results;
      }
    },
    async getTotalPokemons() {
      this.showAllPokemons = false;
      const response = await api.get("/pokemon");
      this.totalPokemons = response.data;
    },
    async searchPokemon() {
      this.showAllPokemons = false;
      if (this.pokemonSearch !== "") {
        const response = await api.get(`/pokemon/${this.pokemonSearch}`);
        this.resultPokemonSearch = response.data;
      }
      this.pokemonSearch = "";
    },
    async getPokemonsType() {
      this.showAllPokemons = false;
      this.showAllPokemonsActive = false;

      if (this.type !== "") {
        const response = await api.get(`/type/${this.type.trim()}`);
        // if (!response.data.pokemon.length) {
        //   this.showTypeSidebar = this.type;
        // }
        this.listTypePokemons = response.data.pokemon;
      }
      this.type = "";
    },
    showAllPokemonsSide() {
      this.showAllPokemons = true;
    },
  },
  watch: {
    pokemonSearch() {
      this.searchPokemon();
      // console.log(this.pokemonSearch);
      // this.showAllPokemons = false;
      this.showPagination = false;
    },
    type() {
      this.getPokemonsType();
      // this.type = "";
      // console.log(this.type);
      // this.showAllPokemons = false;
      this.showPagination = false;
    },
    showAllPokemons() {
      this.showPagination = true;
    },
    offsetAndLimit() {
      this.getPokemonsPerPagination();
    },
    showPagination() {
      // console.log(this.showPagination);
    },
  },
  created() {
    this.getTotalPokemons();
  },
};
</script>
<style scoped>
.grid-pokemons {
  grid-template-rows: 50px auto;
}
</style>
