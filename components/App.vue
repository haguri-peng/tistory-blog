<template>
  <div class="app">
    <AppHeader
      :categoryList="category"
      @moveCategory="moveCategory"
      @showSearchInput="showSearchInput"
    />

    <LoadingSpinner v-if="isLoading" />
    <div class="app-contents" v-else>
      <router-view></router-view>
    </div>

    <!-- Search Modal -->
    <SearchInputModal
      :showSearch="showSearch"
      @closeSearchModal="closeSearchModal"
    />
  </div>
</template>

<script setup>
import AppHeader from './AppHeader.vue';
import LoadingSpinner from './common/LoadingSpinner.vue';
import SearchInputModal from './common/SearchInputModal.vue';

import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { fetchBlogInfo, fetchCategoryList } from '../api/index';
import _ from 'lodash';

const router = useRouter();

// data
const isLoading = ref(true);
const category = reactive([]);
const postCnt = ref(0);
const loginId = ref('');
const loginUserId = ref('');
const showSearch = ref(false);

// methods
const fetchBlog = async () => {
  const { data } = await fetchBlogInfo();
  // console.log(data);

  postCnt.value =
    _.find(data.tistory.item.blogs, ['name', 'haguri-peng']).statistics.post ||
    0;
  loginId.value = data.tistory.item.id || '';
  loginUserId.value = data.tistory.item.userId || '';
};
const fetchCategory = async () => {
  const { data } = await fetchCategoryList();
  // console.log(data.tistory);

  if (data.tistory.status == '200') {
    const categories = data.tistory.item.categories;
    category.push(..._.filter(categories, (c) => Number(c.entries) > 0));
  }
};
const showLoadingSpinner = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 300);
};
const moveCategory = (id) => {
  showLoadingSpinner();
  router.push(`/category/${id}`);
};
const showSearchInput = () => {
  showSearch.value = true;
};
const closeSearchModal = (type, keyword) => {
  showSearch.value = false;

  if (type == 'search') {
    router.push(`/search/posts/${keyword}`);
  }
};

onMounted(() => {
  showLoadingSpinner();
  fetchBlog();
  fetchCategory();
});
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
