<template>
  <aside>
    <ul v-for="type in types" :key="type.name">
      <li @click="getType">{{ type.name }}</li>
    </ul>
  </aside>
</template>
<script>
import { api } from "@/services.js";
export default {
  name: "SidebarTypes",
  props: ["type"],
  data() {
    return {
      typesPokemons: this.type,
      types: null,
    };
  },
  methods: {
    async getTypesPokemons() {
      const response = await api.get("/type");
      this.types = response.data.results;
    },
    getType({ target }) {
      this.typesPokemons = target.textContent;
      this.$emit("update:type", this.typesPokemons);
    },
  },
  created() {
    this.getTypesPokemons();
  },
};
</script>
<style scoped></style>
