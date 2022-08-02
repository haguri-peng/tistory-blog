<template>
  <div class="app">
    <!-- <app-header></app-header> -->
    <!-- {{ test }} -->
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
  props: {
    category: {
      type: Array,
      default: [],
    },
    test: String,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  created() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);

    // console.log(this.test);
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
