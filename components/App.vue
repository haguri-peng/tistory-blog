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
import { fetchBlogInfo, fetchCategoryList } from '../api/index';
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
      category: [],
      postCnt: 0,
    };
  },
  methods: {
    async fetchBlog() {
      const { data } = await fetchBlogInfo();
      // console.log(data);
      this.postCnt =
        _.find(data.tistory.item.blogs, ['name', 'haguri-peng']).statistics
          .post || 0;
    },
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
      }, 300);
    },
    moveCategory(id) {
      this.showLoadingSpinner();
      this.$router.push(`/category/${id}`);
    },
  },
  created() {
    this.showLoadingSpinner();
    this.fetchBlog();
    this.fetchCategory();

    /**
     * Page type(data-body-id)
     * 홈화면(tt-body-index)
     * 글화면(tt-body-page)
     * 카테고리 글 리스트(tt-body-category)
     * 보관함 글 리스트(tt-body-archive)
     * 태그 리스트(tt-body-tag)
     * 검색결과 리스트(tt-body-search)
     * 방명록(tt-body-guestbook)
     * 지역로그(tt-body-location)
     */

    // console.log(this.$attrs.data-body-id);
    // console.log(this.$route);
  },
};
</script>

<style>
div.app {
  width: 100%;
}
div.app-contents {
  display: flex;
  text-align: -webkit-center;
  justify-content: center;
  align-items: center;
}
</style>
