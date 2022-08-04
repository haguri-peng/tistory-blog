<template>
  <div class="app">
    <app-header
      :categoryList="category"
      @moveCategory="moveCategory"
    ></app-header>
    <loading-spinner v-if="isLoading"></loading-spinner>
    <div class="app-contents" v-else>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppHeader from './AppHeader.vue';
import LoadingSpinner from './LoadingSpinner.vue';
import { fetchCategoryList } from '../api/index';
import _ from 'lodash';

export default {
  components: {
    AppHeader,
    LoadingSpinner,
  },
  // props: ['bodyId'],
  data() {
    return {
      isLoading: true,
      category: '',
    };
  },
  methods: {
    async fetchCategory() {
      const { data } = await fetchCategoryList();
      // console.log(data.tistory);

      if (data.tistory.status == '200') {
        const categories = data.tistory.item.categories;
        this.category = _.filter(categories, (c) => Number(c.entries) > 0);
      }
    },
    showLoadingSpinner() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
    moveCategory(name) {
      this.showLoadingSpinner();
      this.$router.push(`/category/${name}`);
    },
  },
  created() {
    this.showLoadingSpinner();
    this.fetchCategory();

    /**
     * Page type(body_id)
     * 홈화면(tt-body-index)
     * 글화면(tt-body-page)
     * 카테고리 글 리스트(tt-body-category)
     * 보관함 글 리스트(tt-body-archive)
     * 태그 리스트(tt-body-tag)
     * 검색결과 리스트(tt-body-search)
     * 방명록(tt-body-guestbook)
     * 지역로그(tt-body-location)
     */

    // console.log(this.$attrs.bodyid);
    // console.log(this.$route);
  },
};
</script>

<style></style>
