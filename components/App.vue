<template>
  <div class="app">
    <app-header
      :categoryList="category"
      @moveCategory="moveCategory"
      @showSearchInput="showSearchInput"
    ></app-header>

    <loading-spinner v-if="isLoading"></loading-spinner>
    <div class="app-contents" v-else>
      <router-view></router-view>
    </div>

    <!-- Search Modal -->
    <search-input-modal
      :showSearch="showSearch"
      @closeSearchModal="closeSearchModal"
    ></search-input-modal>
  </div>
</template>

<script>
import AppHeader from './AppHeader.vue';
import LoadingSpinner from './LoadingSpinner.vue';
import SearchInputModal from './SearchInputModal.vue';

import { fetchBlogInfo, fetchCategoryList } from '../api/index';
import _ from 'lodash';

export default {
  components: {
    AppHeader,
    LoadingSpinner,
    SearchInputModal,
  },
  // props: ['bodyId'],
  data() {
    return {
      isLoading: true,
      category: [],
      postCnt: 0,
      loginId: '',
      loginUserId: '',
      showSearch: false,
    };
  },
  methods: {
    async fetchBlog() {
      const { data } = await fetchBlogInfo();
      // console.log(data);

      this.postCnt =
        _.find(data.tistory.item.blogs, ['name', 'haguri-peng']).statistics
          .post || 0;

      // const defaultBlog = _.head(
      //   _.filter(data.tistory.item.blogs, ['default', 'Y'])
      // );
      // console.log(defaultBlog);
      this.loginId = data.tistory.item.id || '';
      this.loginUserId = data.tistory.item.userId || '';
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
    showSearchInput() {
      // console.log('showSearchInput');
      this.showSearch = true;
    },
    closeSearchModal(type, keyword) {
      this.showSearch = false;

      if (type == 'search') {
        this.$router.push(`/search/posts/${keyword}`);
      }
    },
  },
  created() {
    this.showLoadingSpinner();
    this.fetchBlog();
    this.fetchCategory();
  },
};
</script>

<style>
a {
  color: #df7861;
}
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
