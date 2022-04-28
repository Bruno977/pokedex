<template>
  <transition>
    <ul class="error" v-if="error">
      {{
        error
      }}
      <!-- <li v-for="(erro, index) in erros" :key="index" v-html="erro"></li> -->
    </ul>
  </transition>
</template>

<script>
export default {
  name: "ErrorMessage",
  props: {
    error: String,
  },
};
</script>

<style scoped>
.error {
  color: var(--fire-color);
}
</style>
