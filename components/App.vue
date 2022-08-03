<template>
  <div class="app">
    <app-header :category="category" @moveMenu="movePage"></app-header>
    <loading-spinner v-if="isLoading"></loading-spinner>
    <div class="app-contents" v-else>
      <router-view></router-view>
    </div>
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
  // props: ['category', 'test'],
  data() {
    return {
      isLoading: true,
      category: '',
    };
  },
  methods: {
    showLoadingSpinner() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
    movePage(menuNm, link) {
      this.showLoadingSpinner();
      this.$router.push(link);
    },
  },
  created() {
    this.showLoadingSpinner();
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
