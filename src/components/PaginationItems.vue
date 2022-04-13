<template>
  <div>
    <div class="grid columns gap2">
      <aside class="span-4">Sidebar</aside>
      <div class="span-8 grid columns gap2">
        <div v-for="pokemon in pokemons" :key="pokemon.name" class="span-4">
          <ListPokemons :pokemonUrl="pokemon.url" />
        </div>
        <ul class="span-12 flex ai-gc jc-c pagination">
          <li
            v-for="pagina in paginas.pagesArray"
            :key="pagina"
            @click="numberPagination"
            :class="{ active: isActive }"
            ref="pages"
          >
            {{ pagina }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { api } from "@/services.js";
import ListPokemons from "./ListPokemons.vue";
export default {
  name: "PaginationItems",
  props: ["totalPokemons"],
  components: {
    ListPokemons,
  },
  data() {
    return {
      totalItemsPerPage: 9,
      pokemons: null,
      pokemonsPerPage: 9,
      currentPageNumber: 1,
      isActive: false,
    };
  },
  methods: {
    // Pega Pokemons Por Páginação
    async getTotalPokemons() {
      const response = await api.get(
        `pokemon?offset=${
          this.pokemonsPerPage - this.totalItemsPerPage
        }&limit=${this.totalItemsPerPage}`
      );
      this.pokemons = response.data.results;
    },

    //Calculo offset paginação
    numberPagination({ target }) {
      this.pokemonsPerPage =
        this.totalItemsPerPage * Number(target.textContent);
      this.currentPageNumber = Number(target.textContent);

      this.toggleClassPagination(target);
      this.getTotalPokemons();
    },

    //Adiciona e remove classe na paginação ativa
    toggleClassPagination(target) {
      if (target) {
        for (let i = 0; i < this.$refs.pages.length; i++) {
          this.$refs.pages[i].classList.remove("active");
        }
        target.classList.add("active");
      }
    },
  },
  computed: {
    //Calculo Total de páginas
    totalPagination() {
      const totalPages =
        Number(this.totalPokemons.count) / this.totalItemsPerPage;
      const roundNumber = Math.ceil(totalPages);

      return roundNumber;
    },
    //Limita paginas ativas
    paginas() {
      const current = this.currentPageNumber;
      const range = 9;
      const offset = Math.ceil(range / 2);
      const total = this.totalPagination;
      const pagesArray = [];

      for (let i = 1; i < total; i++) {
        pagesArray.push(i);
      }

      pagesArray.splice(0, current - offset);
      pagesArray.splice(range, total);

      return { pagesArray, className: this.isActive };
    },
  },
  created() {
    this.getTotalPokemons();
  },
  mounted() {
    this.toggleClassPagination();
    this.$refs.pages[0].classList.add("active");
  },
};
</script>
<style scoped>
.pagination li {
  background-color: rgba(233, 99, 3, 0.1);
  color: #e96303;

  width: 40px;
  height: 40px;
  border-radius: 100px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: var(--all-transition);
}
.pagination li:hover,
.pagination li.active {
  background-color: #e96303;
  color: white;
}

.pagination li + li {
  margin-left: 10px;
}
</style>
