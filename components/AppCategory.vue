<template>
  <LoadingSpinner v-if="isLoading"></LoadingSpinner>
  <div class="w-full" v-else>
    <div class="category-title">
      {{ categoryName }}
    </div>
    <div class="posts">
      <ul>
        <AppPost
          v-for="post in postList"
          :key="post.id"
          :postItem="post"
          @openContent="moveContent"
        ></AppPost>
      </ul>
      <AppPaging :page="pageInfo" @movePage="fetchPostByCategory"></AppPaging>
    </div>
  </div>
</template>

<script setup>
import AppPost from './AppPost.vue';
import AppPaging from './AppPaging.vue';
import LoadingSpinner from './common/LoadingSpinner.vue';

import { ref, reactive, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

import {
  fetchCategoryList,
  fetchPostListByCategory,
  // fetchPostList,
} from '../api/index';
import _ from 'lodash';

const store = useStore();
const route = useRoute();
const router = useRouter();

// data
const postList = reactive([]);
const searchPostList = reactive([]);
const pageInfo = reactive({});
const isLoading = ref(false);
const categoryName = ref('');

// computed
const getCategoryId = computed(() => store.getters.getCategoryId);
const getPageNum = computed(() => store.getters.getPageNum);

// methods
const fetchPostByCategory = async (pageNum) => {
  isLoading.value = true;
  postList.length = 0;

  const { data } = await fetchPostListByCategory(
    route.params.categoryId,
    pageNum || (route.params.categoryId == getCategoryId ? getPageNum : 1)
  );

  if (data.tistory.status == '200') {
    // 페이징 정보 세팅
    pageInfo.currentPage = data.tistory.item.page;
    pageInfo.totalPage = Math.ceil(
      Number(data.tistory.item.totalCount) / Number(data.tistory.item.count)
    );

    // 발행된 건만
    postList.push(..._.filter(data.tistory.item.posts, ['visibility', '20']));

    // 카테고리 정보 세팅
    setCategoryInfo({
      id: route.params.categoryId,
      page: pageInfo.currentPage,
    });

    // 카테고리 목록 조회
    getCategoryList();
  }
  isLoading.value = false;
};
const moveContent = (id) => {
  isLoading.value = true;
  router.push(`/${id}`);
};
const setCategoryInfo = (categoryInfo) => {
  // 카테고리 및 페이지 번호를 vuex에 세팅
  store.dispatch('setCategoryInfo', categoryInfo);
};
const getCategoryList = async () => {
  const { data } = await fetchCategoryList();

  if (data.tistory.status == '200') {
    const currentCategory = _.find(data.tistory.item.categories, [
      'id',
      getCategoryId,
    ]);
    // console.log(currentCategory);

    if (currentCategory != null && currentCategory != undefined) {
      categoryName.value = currentCategory.label.replace(/\//g, ' > ');
    }
  }
};

onMounted(() => {
  fetchPostByCategory();
});
</script>

<style scoped>
div.category-title {
  font-size: 2rem;
  font-weight: bold;
  color: #76549a;
  /* text-decoration: underline; */
  margin-bottom: 50px;
}
div.posts {
  position: relative;
  width: 80%;
  height: calc(100% - 60px);
}
ul {
  margin: 50px 0;
  list-style: none;
}
</style>
