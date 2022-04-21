<template>
  <aside>
    <ul>
      <slot></slot>

      <li
        v-for="type in types"
        :key="type.name"
        @click="getType"
        class="flex ai-gc grayFilter"
        ref="typeActive"
      >
        <img
          :src="require(`@/assets/img/${type}.svg`)"
          alt="Type Pokemon"
          ref="typeImg"
        />
        <p class="ml-1">{{ type }}</p>
      </li>
      <!-- <li>{{ types }}</li> -->
    </ul>
  </aside>
</template>
<script>
import { api } from "@/services.js";
export default {
  name: "SidebarTypes",
  props: ["type", "showTypeSidebar"],
  data() {
    return {
      typesPokemons: this.type,
      types: [],
      typesEmpty: [],
    };
  },
  methods: {
    async getTypesPokemons() {
      const response = await api.get("/type");
      // console.log(response.data.results);
      for (let i = 0; i < response.data.results.length; i++) {
        const responseTypes = await api.get(`${response.data.results[i].url}`);
        if (!responseTypes.data.pokemon.length) {
          this.typesEmpty.push(response.data.results[i].name);
          // this.typesEmpty = response.data.results[i].name;
        }
      }
      // this.types = response.data.results;
      response.data.results.filter((item) => {
        if (!this.typesEmpty.includes(item.name)) {
          this.types.push(item.name);
        }
      });
      // console.log(response.data.results);
    },
    getType({ target, currentTarget }) {
      this.typesPokemons = target.textContent;
      this.$emit("update:type", this.typesPokemons);

      for (let i = 0; i < this.$refs.typeActive.length; i++) {
        this.$refs.typeActive[i].removeAttribute("style", "color");
        this.$refs.typeActive[i].classList.add("grayFilter");
      }
      currentTarget.setAttribute(
        "style",
        `color: var(--${this.typesPokemons}-color);`
      );
      currentTarget.classList.remove("grayFilter");
    },
  },
  watch: {
    typesPokemons() {
      // console.log(this.typesPokemons);
    },
    showTypeSidebar() {
      // console.log(this.showTypeSidebar);
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
  /* display: inline-block; */
  transition: var(--all-transition);
}
ul li:hover {
  color: #3f5db3;
}
ul li.active {
  font-weight: bold;
  color: #3f5db3;
}
.grayFilter {
  filter: grayscale(1.5);
}
</style>
