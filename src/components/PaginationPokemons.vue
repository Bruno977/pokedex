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
export default {
  name: "PaginationPokemons",
  props: [
    "totalPokemons",
    "offsetAndLimit",
    "showPagination",
    "showAllPokemons",
  ],
  data() {
    return {
      limit: 9,
      paginationSize: this.offsetAndLimit,
      offset: 9,
      currentPageNumber: 1,
      // pagination: true,
    };
  },
  methods: {
    //Calculo offset paginação
    numberPagination({ target }) {
      this.offset = this.limit * Number(target.textContent);
      this.currentPageNumber = Number(target.textContent);
      this.toggleClassPagination(target);
      this.offsetLimit();
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
    offsetLimit() {
      this.paginationSize = {
        offset: this.offset,
        limit: this.limit,
      };
      this.$emit("update:offsetAndLimit", this.paginationSize);
    },
  },
  computed: {
    //Calculo Total de páginas
    totalPagination() {
      const totalPages = Number(this.totalPokemons.count) / this.limit;
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
    this.offsetLimit();
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
