<template>
  <loading-spinner v-if="isLoading"></loading-spinner>
  <div style="width: 100%" v-else>
    <div class="category-title">
      {{ categoryName }}
    </div>
    <div class="posts">
      <ul>
        <app-post
          v-for="post in postList"
          :key="post.id"
          :postItem="post"
          @openContent="moveContent"
        ></app-post>
      </ul>
      <app-paging :page="pageInfo" @movePage="fetchPostByCategory"></app-paging>
    </div>
    <search-input :searchWord="getKeyword" @search="searchPosts"></search-input>
  </div>
</template>

<script>
import SearchInput from './SearchInput.vue';
import AppPost from './AppPost.vue';
import AppPaging from './AppPaging.vue';
import LoadingSpinner from './LoadingSpinner.vue';

import {
  fetchCategoryList,
  fetchPostListByCategory,
  fetchPostList,
} from '../api/index';
import { mapGetters } from 'vuex';

import _ from 'lodash';

export default {
  components: {
    SearchInput,
    AppPost,
    AppPaging,
    LoadingSpinner,
  },
  data() {
    return {
      postList: [],
      searchPostList: [],
      pageInfo: {},
      isLoading: false,
      categoryName: '',
    };
  },
  computed: {
    ...mapGetters(['getCategoryId', 'getPageNum', 'getKeyword']),
  },
  methods: {
    async fetchPostByCategory(pageNum) {
      this.isLoading = true;
      this.postList = [];

      const { data } = await fetchPostListByCategory(
        this.$route.params.categoryId,
        pageNum ||
          (this.$route.params.categoryId == this.getCategoryId
            ? this.getPageNum
            : 1)
      );
      // console.log(data);

      if (data.tistory.status == '200') {
        // 페이징 정보 세팅
        this.pageInfo.currentPage = data.tistory.item.page;
        this.pageInfo.totalPage = Math.ceil(
          Number(data.tistory.item.totalCount) / Number(data.tistory.item.count)
        );

        // 발행된 건만
        this.postList = _.filter(data.tistory.item.posts, ['visibility', '20']);

        // 카테고리 정보 세팅
        this.setCategoryInfo({
          id: this.$route.params.categoryId,
          page: this.pageInfo.currentPage,
        });

        // 카테고리 목록 조회
        this.getCategoryList();
      }
      this.isLoading = false;
    },
    async searchPosts(keyword) {
      if (keyword == '') {
        alert('검색어를 입력해주세요.');
        return;
      }

      this.isLoading = true;
      this.postList = [];

      const tmpPosts = [];
      const limitCnt = 15; // 최대 15개까지만 검색
      const maxPageNum = Math.ceil(this.$parent.$parent.postCnt / 10);

      for (
        let pageNum = 1;
        tmpPosts.length < limitCnt && pageNum <= maxPageNum;
        pageNum++
      ) {
        const { data } = await fetchPostList(pageNum);
        // console.log(keyword);
        // console.log(data);

        for (let i = 0; i < data.tistory.item.posts.length; i++) {
          const postData = data.tistory.item.posts[i];
          if (
            postData.visibility == '20' &&
            postData.title.indexOf(keyword) > -1
          ) {
            tmpPosts.push(postData);
            if (tmpPosts.length == limitCnt) break;
          }
        }
      }
      // console.log(tmpPosts);

      this.postList = tmpPosts;
      this.pageInfo.currentPage = 1;
      this.pageInfo.totalPage = 1;
      this.isLoading = false;

      this.setKeyword(keyword);
    },
    moveContent(id) {
      this.isLoading = true;
      this.$router.push(`/${id}`);
    },
    setCategoryInfo(categoryInfo) {
      // 카테고리 및 페이지 번호를 vuex에 세팅
      this.$store.dispatch('setCategoryInfo', categoryInfo);
    },
    setKeyword(keyword) {
      this.$store.dispatch('setWord', keyword);
    },
    async getCategoryList() {
      const { data } = await fetchCategoryList();

      if (data.tistory.status == '200') {
        const currentCategory = _.find(data.tistory.item.categories, [
          'id',
          this.getCategoryId,
        ]);
        // console.log(currentCategory);

        if (currentCategory != null && currentCategory != undefined) {
          this.categoryName = currentCategory.label.replace(/\//g, ' > ');
        }
      }
    },
  },
  created() {
    if (this.getKeyword != '') {
      this.searchPosts(this.getKeyword);
    } else {
      this.fetchPostByCategory();
    }
  },
};
</script>

<style scoped>
div.category-title {
  font-size: 2rem;
  font-weight: bold;
  color: #76549a;
  text-decoration: underline;
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
