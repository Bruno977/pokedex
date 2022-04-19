<template>
  <div v-if="totalPokemons" class="container md-pd">
    <div class="grid columns gap2">
      <div class="span-4">
        <SidebarTypes
          :type.sync="type"
          :showAllPokemons.sync="showAllPokemons"
        />
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
        <!-- <div v-if="pokemons" class="span-12"> -->
        <div class="span-12">
          <!-- <div v-for="pokemon in pokemons" :key="pokemon.name" class="span-4"> -->
          <ResultPokemons
            :listPokemons="listPokemons"
            :listTypePokemons="listTypePokemons"
            :resultPokemonSearch="resultPokemonSearch"
            :showAllPokemons="showAllPokemons"
          />
          <!-- </div> -->
        </div>
        <!-- <div class="grid columns gap2">
          <div class="span-4 card-pokemon">
            <img
              :src="`${pokemons.sprites.other.dream_world.front_default}`"
              :alt="`pokemon`"
              class="pokemon-img"
            />
            <div class="pokemon-id">{{ pokemons.id }}</div>
            <div>{{ pokemons.name }}</div>
            <div>{{ pokemons.types[0].type.name }}</div>
          </div>
        </div> -->
        <!-- <div v-else>Nenhum pokemon encontrado</div> -->
        <!-- </div> -->
        <div class="span-12" v-if="showPagination">
          <PaginationPokemons
            :totalPokemons="totalPokemons"
            :offsetAndLimit.sync="offsetAndLimit"
            :showPagination.sync="showPagination"
            :showAllPokemons="showAllPokemons"
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
// import ListPokemonSearch from "@/components/ListPokemonSearch.vue";
export default {
  name: "HomeView",
  components: {
    SidebarTypes,
    SearchPokemon,
    PaginationPokemons,
    ResultPokemons,
    // ListPokemonSearch,
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

      showPagination: true,
      showAllPokemons: false,
      pokemonTypeChange: false,
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
      const response = await api.get("/pokemon");
      this.totalPokemons = response.data;
    },
    async searchPokemon() {
      // this.pokemons = [];
      const response = await api.get(`/pokemon/${this.pokemonSearch}`);
      this.resultPokemonSearch = response.data;

      // console.log(this.pokemons);
      // this.showAllPokemons = false
    },
    async getPokemonsType() {
      const response = await api.get(`/type/${this.type.trim()}`);
      this.listTypePokemons = response.data.pokemon;
      // console.log("home" + this.pokemons);
      // this.listTypePokemons = response.data.pokemon;
      // console.log(this.pokemons);
      // this.showAllPokemons = false;
    },
  },
  watch: {
    pokemonSearch() {
      this.searchPokemon();
      // this.showPagination = false;
      // console.log(this.pokemonSearch);
      this.showAllPokemons = false;
    },
    type() {
      this.getPokemonsType();
      // this.showPagination = false;
      this.showAllPokemons = false;
    },
    offsetAndLimit() {
      this.getPokemonsPerPagination();
    },
    showAllPokemons() {
      // console.log(this.showAllPokemons);
    },
    // pokemonsList() {
    //   this.getTotalPokemons();
    //   this.showPagination = true;
    //   console.log("testesteste");
    // },
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
