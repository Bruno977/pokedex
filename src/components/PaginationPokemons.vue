<template>
  <ul class="span-12 flex ai-gc jc-c fw-w pagination">
    <li
      v-for="pagina in paginas"
      :key="pagina"
      @click="numberPagination"
      ref="pages"
    >
      {{ pagina }}
    </li>
  </ul>
</template>
<script>
import { api } from "@/services.js";
export default {
  name: "PaginationPokemons",
  props: ["totalPokemons", "pokemonsList"],
  data() {
    return {
      totalItemsPerPage: 9,
      pokemons: this.pokemonsList,
      pokemonsPerPage: 9,
      currentPageNumber: 1,
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

      this.$emit("update:pokemonsList", this.pokemons);
    },
    //Calculo offset paginação
    numberPagination({ target }) {
      this.hideFilter = false;
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
      return pagesArray;
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
  background-color: rgba(63, 93, 179, 0.1);
  color: #3f5db3;

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
  background-color: #3f5db3;
  color: white;
}

.pagination li + li {
  margin-left: 10px;
}
</style>
