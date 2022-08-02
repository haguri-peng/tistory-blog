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
  // props: {
  //   category: {
  //     type: String,
  //   },
  //   test: String,
  // },
  // props: ['category', 'test'],
  data() {
    return {
      isLoading: true,
      category: '',
    };
  },
  created() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  },
  updated() {
    // console.log($('#category').text());
    // console.log(this);
    this.category = $('#category').text();
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
