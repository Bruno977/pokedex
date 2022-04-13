<template>
  <div v-if="totalPokemons" class="container">
    <PaginationItems :totalPokemons="totalPokemons" />
  </div>
</template>

<script>
import { api } from "@/services.js";
import PaginationItems from "@/components/PaginationItems.vue";
export default {
  name: "HomeView",
  components: {
    PaginationItems,
  },
  data() {
    return {
      totalPokemons: null,
    };
  },

  methods: {
    async getTotalPokemons() {
      const response = await api.get("/pokemon");
      this.totalPokemons = response.data;
    },
  },
  created() {
    this.getTotalPokemons();
  },
};
</script>
