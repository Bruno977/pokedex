<template>
  <aside>
    <ul>
      <slot></slot>
      <li v-for="type in types" :key="type.name" @click="getType">
        {{ type.name }}
      </li>
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
  watch: {
    typesPokemons() {
      console.log(this.typesPokemons);
    },
  },
  created() {
    this.getTypesPokemons();
  },
};
</script>
<style scoped>
ul {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
ul li {
  padding: 10px;
  text-transform: capitalize;
  color: var(--light-text-color);
  cursor: pointer;
  display: inline-block;
  transition: var(--all-transition);
}
ul li:hover {
  color: #3f5db3;
}
ul li.active {
  font-weight: bold;
  color: #3f5db3;
}
</style>
