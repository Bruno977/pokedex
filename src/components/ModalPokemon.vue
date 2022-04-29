<template>
  <div v-if="pokemonDetails">
    <div class="overflow"></div>
    <div class="modal">
      <div class="modal-content">
        <img
          src="../assets/img/close.svg"
          alt="Close Modal"
          class="close-modal"
          @click="closeModal"
        />
        <div class="grid columns gap2 jc-sb container-grid">
          <div class="span-3">
            <div
              :class="` relative bg-${pokemonDetails.type[0].type.name} container-image`"
            >
              <div class="pokemon-icon">
                <img
                  :src="
                    require(`../assets/img/${pokemonDetails.type[0].type.name}.svg`)
                  "
                  :alt="pokemonDetails.type[0].type.name"
                />
              </div>
              <div class="pokemon-image">
                <img :src="pokemonDetails.img" :alt="pokemonDetails.name" />
              </div>
            </div>
          </div>
          <div class="span-9 container-content">
            <div class="flex ai-gc">
              <div class="pokemon-name">{{ pokemonDetails.name }}</div>
              <div class="pokemon-id">#{{ pokemonDetails.id }}</div>
            </div>
            <div class="flex ai-gc">
              <div
                v-for="type in pokemonDetails.type"
                :key="type.type.name"
                class="type-item"
              >
                <p
                  class="type-name"
                  :class="type.type.name"
                  :style="`color: var(--${type.type.name}-color)`"
                >
                  {{ type.type.name }}
                </p>
              </div>
            </div>
            <div class="flex ai-gc jc-sb mt-3 mb-3">
              <div class="height">
                <p>Height</p>
                <p>
                  {{ pokemonDetails.height }}
                </p>
              </div>
              <div class="weight">
                <p>Weight</p>
                <p>
                  {{ pokemonDetails.weight }}
                </p>
              </div>
              <div class="abilities">
                <p>Abilities</p>
                <p>
                  {{ pokemonDetails.weight }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { api } from "@/services.js";

export default {
  name: "ModalPokemon",
  props: ["pokemon", "isActive"],
  data() {
    return {
      pokemonDetails: null,
      modalActive: this.isActive,
    };
  },
  methods: {
    async getPokemon() {
      this.pokemonDetails = null;
      try {
        const response = await api.get(`/pokemon/${this.pokemon}`);
        this.pokemonDetails = {
          id: response.data.id,
          name: response.data.name,
          img: response.data.sprites.other.dream_world.front_default
            ? response.data.sprites.other.dream_world.front_default
            : "",
          type: response.data.types,
          height: response.data.height,
          weight: response.data.weight,
          abilities: response.data.abilities,
          stats: response.data.stats,
        };
        // console.log(response.data);
        // console.log(this.pokemonDetails);
      } catch (error) {
        console.log(error);
      }
    },
    closeModal() {
      this.modalActive = false;
      //   console.log(this.modalActive);
      this.$emit("update:isActive", this.modalActive);
    },
  },
  created() {
    this.getPokemon();
  },
};
</script>
<style scoped>
.overflow {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  cursor: initial;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: initial;
}
.modal-content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 50rem;
  height: 30.8rem;
  background-color: #ffffff;
  box-shadow: var(--box-shadow);
  border-radius: 16px;
}
.close-modal {
  position: absolute;
  top: -50px;
  right: 0;
  display: inline-block;
  cursor: pointer;
  background: #fff;
  border-radius: 10px;
  padding: 10px;
}
.container-grid {
  height: 100%;
}
.container-image {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-radius: 16px 0 0 16px;
}
.container-content {
  padding: 20px 60px;
}
.pokemon-image {
  position: relative;
  right: -2.5rem;
}
.pokemon-icon {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;

  align-items: center;
  justify-content: center;
}
.pokemon-name {
  font-weight: bold;
  font-size: 2rem;
  color: var(--text-color);
  text-transform: capitalize;
}
.pokemon-id {
  color: var(--light-text-color);
  padding-left: 10px;
  font-size: 0.875em;
}
.type-name {
  font-weight: bold;
  padding: 4px 8px;
  text-transform: capitalize;
  border-radius: 5px;
  font-size: 0.8em;
}
.type-item + .type-item {
  margin-left: 0.3rem;
}
.height p:first-of-type,
.weight p:first-of-type,
.abilities p:first-of-type {
  color: var(--light-text-color);
  font-size: 0.875em;
}
.height p:last-of-type,
.weight p:last-of-type,
.abilities p:last-of-type {
  color: var(--text-color);
  font-size: 0.875em;
}

.bg-normal {
  background: url("../assets/img/bg-normal.svg") center center no-repeat;
}
.bg-fighting {
  background: url("../assets/img/bg-fighting.svg") center center no-repeat;
}
.bg-flying {
  background: url("../assets/img/bg-flying.svg") center center no-repeat;
}
.bg-poison {
  background: url("../assets/img/bg-poison.svg") center center no-repeat;
}
.bg-ground {
  background: url("../assets/img/bg-ground.svg") center center no-repeat;
}
.bg-rock {
  background: url("../assets/img/bg-rock.svg") center center no-repeat;
}
.bg-bug {
  background: url("../assets/img/bg-bug.svg") center center no-repeat;
}
.bg-ghost {
  background: url("../assets/img/bg-ghost.svg") center center no-repeat;
}
.bg-steel {
  background: url("../assets/img/bg-steel.svg") center center no-repeat;
}
.bg-fire {
  background: url("../assets/img/bg-fire.svg") center center no-repeat;
}
.bg-water {
  background: url("../assets/img/bg-water.svg") center center no-repeat;
}
.bg-grass {
  background: url("../assets/img/bg-grass.svg") center center no-repeat;
}
.bg-electric {
  background: url("../assets/img/bg-electric.svg") center center no-repeat;
}
.bg-psychic {
  background: url("../assets/img/bg-psychic.svg") center center no-repeat;
}
.bg-ice {
  background: url("../assets/img/bg-ice.svg") center center no-repeat;
}
.bg-dragon {
  background: url("../assets/img/bg-dragon.svg") center center no-repeat;
}
.bg-dark {
  background: url("../assets/img/bg-dark.svg") center center no-repeat;
}
.bg-fairy {
  background: url("../assets/img/bg-fairy.svg") center center no-repeat;
}
</style>
