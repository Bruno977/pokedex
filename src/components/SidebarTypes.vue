<template>
  <aside>
    <ul>
      <slot></slot>

      <li
        v-for="type in types"
        :key="type"
        @click="getType"
        class="flex ai-gc gray-filter sidebar-types"
        ref="typeActive"
        :class="type"
        @mouseenter="hoverActive"
        @mouseleave="hoverOff"
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
  props: ["type", "showTypeSidebar", "showAllPokemons", "allPokemonsisActive"],
  data() {
    return {
      typesPokemons: this.type,
      types: [],
      typesEmpty: [],
      allPokemonsActive: this.allPokemonsisActive,
      isActive: false,
    };
  },
  methods: {
    async getTypesPokemons() {
      const response = await api.get("/type");
      for (let i = 0; i < response.data.results.length; i++) {
        const responseTypes = await api.get(`${response.data.results[i].url}`);
        if (!responseTypes.data.pokemon.length) {
          this.typesEmpty.push(response.data.results[i].name);
        }
      }
      response.data.results.filter((item) => {
        if (!this.typesEmpty.includes(item.name)) {
          this.types.push(item.name);
        }
      });
    },
    getType({ target, currentTarget }) {
      this.typesPokemons = target.textContent;
      this.$emit("update:type", this.typesPokemons);

      for (let i = 0; i < this.$refs.typeActive.length; i++) {
        this.$refs.typeActive[i].classList.remove("active");
      }
      currentTarget.classList.add(`active`);

      this.allPokemonsActive = false;
      this.$emit("update:allPokemonsisActive", this.allPokemonsActive);
    },
    hoverActive({ currentTarget }) {
      currentTarget.classList.add("hoverActive");
    },
    hoverOff({ currentTarget }) {
      currentTarget.classList.remove("hoverActive");
    },
  },
  watch: {
    typesPokemons() {},
    showTypeSidebar() {},
    showAllPokemons() {
      if (this.showAllPokemons) {
        for (let i = 0; i < this.$refs.typeActive.length; i++) {
          this.$refs.typeActive[i].classList.remove("active");
        }
      }
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
  transition: var(--all-transition);
}
ul li:hover {
  color: #3f5db3;
}

.sidebar-types {
  background: none;
  filter: grayscale(1.5);
}
.sidebar-types.active {
  filter: grayscale(0);
}
.hoverActive {
  filter: grayscale(0);
}
.grass.active,
.grass.hoverActive {
  color: var(--grass-color);
}
.fire.active,
.fire.hoverActive {
  color: var(--fire-color);
  /* filter: grayscale(0); */
}
.water.active,
.water.hoverActive {
  color: var(--water-color);
}
.normal.active,
.normal.hoverActive {
  color: var(--normal-color);
}
.fighting.active,
.fighting.hoverActive {
  color: var(--fighting-color);
}
.flying.active,
.flying.hoverActive {
  color: var(--flying-color);
}
.poison.active,
.poison.hoverActive {
  color: var(--poison-color);
}
.ground.active,
.ground.hoverActive {
  color: var(--ground-color);
}
.rock.active,
.rock.hoverActive {
  color: var(--rock-color);
}
.bug.active,
.bug.hoverActive {
  color: var(--bug-color);
}
.ghost.active,
.ghost.hoverActive {
  color: var(--ghost-color);
}
.steel.active,
.steel.hoverActive {
  color: var(--steel-color);
}
.electric.active,
.electric.hoverActive {
  color: var(--eletric-color);
}
.psychic.active,
.psychic.hoverActive {
  color: var(--psychic-color);
}
.ice.active,
.ice.hoverActive {
  color: var(--ice-color);
}
.dragon.active,
.dragon.hoverActive {
  color: var(--dragon-color);
}
.dark.active,
.dark.hoverActive {
  color: var(--dark-color);
}
.fairy.active,
.fairy.hoverActive {
  color: var(--fairy-color);
}
</style>
