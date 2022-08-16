<template>
  <loading-spinner v-if="isLoading"></loading-spinner>
  <div style="width: 100%" v-else>
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
    <search-input @search="searchPosts"></search-input>
  </div>
</template>

<script>
import SearchInput from './SearchInput.vue';
import AppPost from './AppPost.vue';
import AppPaging from './AppPaging.vue';
import LoadingSpinner from './LoadingSpinner.vue';
import { fetchPostListByCategory, fetchPostList } from '../api/index';
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
    };
  },
  methods: {
    async fetchPostByCategory(pageNum) {
      this.isLoading = true;
      this.postList = [];

      const { data } = await fetchPostListByCategory(
        this.$route.params.categoryId,
        pageNum || 1
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
      }
      this.isLoading = false;
    },
    async searchPosts(keyword) {
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
    },
    moveContent(id) {
      this.isLoading = true;
      this.$router.push(`/${id}`);

      // setTimeout(() => {
      //   this.$router.push(`/${id}`);
      //   this.isLoading = false;
      // }, 300);
    },
  },
  created() {
    // console.log(this.$route.params.categoryId);
    // console.log($vm.data.postCnt);
    this.fetchPostByCategory();
  },
};
</script>

<style scoped>
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
