<template>
  <div class="search-pokemon">
    <input type="text" placeholder="Search name or id" v-model="pokemonName" />
    <button @click="searchPokemon">
      <svg
        width="18"
        height="19"
        viewBox="0 0 18 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.1931 2.74887C13.525 5.08069 13.525 8.86132 11.1931 11.1931C8.86132 13.525 5.08069 13.525 2.74887 11.1931C0.417045 8.86132 0.417045 5.08069 2.74887 2.74887C5.08069 0.417045 8.86132 0.417045 11.1931 2.74887"
          stroke="#3E75C3"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.1499 11.227L16.9999 17.157"
          stroke="#3E75C3"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
</template>
<script>
export default {
  name: "SearchPokemon",
  props: ["pokemonSearch"],
  data() {
    return {
      pokemonName: this.pokemonSearch,
    };
  },
  methods: {
    searchPokemon() {
      this.$emit("update:pokemonSearch", this.pokemonName);
      this.pokemonName = "";
    },
  },
  watch: {
    searchPokemon() {
      console.log("mudou");
    },
  },
};
</script>
<style scoped>
input {
  height: 40px;
  border-radius: 8px;
  border: 1px solid #ededed;
  padding: 20px;
  width: 100%;
  transition: var(--all-transition);
}
input,
input::placeholder {
  color: var(--text-color);
}
input:hover,
input:focus {
  border: 1px solid rgba(63, 93, 179, 0.1);
  outline: none;
  box-shadow: var(--box-shadow);
}
.search-pokemon {
  position: relative;
}
.search-pokemon button {
  position: absolute;
  top: 6px;
  right: 10px;
  padding: 5px;

  background: none;
  border: none;

  cursor: pointer;
}
.search-pokemon button svg path {
  transition: var(--all-transition);
}
.search-pokemon button:hover svg path {
  stroke: #2446a7;
}
</style>
