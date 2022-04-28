<template>
  <div class="container md-pd">
    <div v-if="totalPokemons" class="grid columns gap2">
      <div class="span-4">
        <SidebarTypes
          :listTypePokemons.sync="listTypePokemons"
          :showAllPokemons="showAllPokemons"
          :allPokemonsisActive.sync="allPokemonsisActive"
          :resultPokemonSearch="resultPokemonSearch"
        >
          <li
            @click="showAllPokemonsSide"
            class="all-pokemons flex ai-gc"
            :class="{ active: allPokemonsisActive }"
          >
            <img src="../assets/img/icon-all.svg" alt="All Pokemons" class="" />
            <p class="ml-1">All</p>
          </li>
        </SidebarTypes>
      </div>
      <div class="span-8 grid columns gap2 grid-pokemons">
        <!-- <div v-if="loadingPage" class="span-8">
          <LoadingPage />
        </div> -->

        <div class="grid columns gap2 span-12">
          <div class="span-6 flex ai-gc">
            <img
              src="../assets/img/icon-poke-red.svg"
              alt="Quantity pokémons"
              class="mr-1"
            />
            <span class="text-bold"> {{ totalPokemons.count }} Pokémons</span>
          </div>
          <div class="span-6">
            <SearchPokemon :resultPokemonSearch.sync="resultPokemonSearch" />
          </div>
        </div>

        <div class="span-12">
          <ResultPokemons
            :listPokemons="listPokemons"
            :listTypePokemons="listTypePokemons"
            :resultPokemonSearch.sync="resultPokemonSearch"
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
    <div v-else><LoadingPage /></div>
  </div>
</template>

<script>
import { api } from "@/services.js";
import SidebarTypes from "@/components/SidebarTypes.vue";
import SearchPokemon from "@/components/SearchPokemon.vue";
import PaginationPokemons from "@/components/PaginationPokemons.vue";
import ResultPokemons from "@/components/ResultPokemons.vue";
// import LoadingPage from "@/components/LoadingPage.vue";
export default {
  name: "HomeView",
  components: {
    SidebarTypes,
    SearchPokemon,
    PaginationPokemons,
    ResultPokemons,
    // LoadingPage,
  },
  data() {
    return {
      totalPokemons: null,
      // type: "",

      offsetAndLimit: null,

      listPokemons: null,
      listTypePokemons: null,
      // resultPokemonSearch: null,
      resultPokemonSearch: "",

      showAllPokemons: false,
      showPagination: true,
      allPokemonsisActive: true,
      // showTypeSidebar: "",
      // loadingPage: true,
    };
  },

  methods: {
    // Pega Pokemons Por Páginação
    async getPokemonsPerPagination() {
      // this.loadingPage = true;
      // console.log("Iniciou");
      if (this.offsetAndLimit) {
        const response = await api.get(
          `pokemon?offset=${
            this.offsetAndLimit.offset - this.offsetAndLimit.limit
          }&limit=${this.offsetAndLimit.limit}`
        );
        // this.loadingPage = true;
        this.listPokemons = response.data.results;
      }
      // console.log(this.loadingPage);
    },
    async getTotalPokemons() {
      // this.loadingPage = true;
      this.showAllPokemons = false;
      const response = await api.get("/pokemon");
      this.totalPokemons = response.data;
      // this.loadingPage = false;
    },

    showAllPokemonsSide() {
      this.showAllPokemons = true;
      if (this.showAllPokemons) {
        this.allPokemonsisActive = true;
      }
    },
  },
  watch: {
    resultPokemonSearch() {
      this.showAllPokemons = false;
      this.allPokemonsisActive = false;
      this.showPagination = false;
    },
    listTypePokemons() {
      this.showAllPokemons = false;
      this.showAllPokemonsActive = false;
      this.showPagination = false;
      // console.log(this.listTypePokemons);
    },
    showAllPokemons() {
      this.showPagination = true;
    },
    offsetAndLimit() {
      // setTimeout(() => {
      // this.loadingPage = false;
      this.getPokemonsPerPagination();
      // }, 1500);
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
.all-pokemons img {
  filter: grayscale(1.5);
}
.all-pokemons.active p {
  color: #3f5db3;
}
.all-pokemons.active img {
  filter: grayscale(0);
}
</style>
