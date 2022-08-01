<template>
  <div class="app">
    <app-header></app-header>
    <loading-spinner v-if="isLoading"></loading-spinner>
  </div>
</template>

<script>
import AppHeader from './AppHeader.vue';
import LoadingSpinner from './LoadingSpinner.vue';

export default {
  components: {
    AppHeader,
    LoadingSpinner,
  },
  props: ['title'],
  data() {
    return {
      isLoading: true,
    };
  },
  created() {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  },
};
</script>

<style>
s_t3 {
  height: 100vh;
  align-items: center;
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>
