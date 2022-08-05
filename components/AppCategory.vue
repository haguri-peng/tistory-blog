<template>
  <search-input @search="searchPosts"></search-input>
  <div class="posts">
    <ul>
      <app-post
        v-for="post in postList"
        :key="post.id"
        :postItem="post"
      ></app-post>
    </ul>
  </div>
</template>

<script>
import SearchInput from './SearchInput.vue';
import AppPost from './AppPost.vue';
import { fetchPostListByCategory, fetchPostList } from '../api/index';
import _ from 'lodash';

export default {
  components: {
    SearchInput,
    AppPost,
  },
  data() {
    return {
      postList: [],
      searchPostList: [],
    };
  },
  methods: {
    async fetchPostByCategory(pageNum) {
      const { data } = await fetchPostListByCategory(
        this.$route.params.categoryId,
        pageNum || 1
      );
      // console.log(data);

      // 발행된 건만
      this.postList = _.filter(data.tistory.item.posts, ['visibility', '20']);
    },
    async searchPosts(keyword, pageNum) {
      const tmpPosts = [];
      const limitCnt = 10;
      const maxPageNum = Math.ceil($vm.data.postCnt / 10);

      for (
        pageNum = pageNum || 1;
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
      console.log(tmpPosts);
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
  margin: 30px 0;
  list-style: none;
}
</style>
