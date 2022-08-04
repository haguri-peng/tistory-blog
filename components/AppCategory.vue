<template>
  <div>Category Page</div>
</template>

<script>
import { fetchPostListByCategory } from '../api/index';
import _ from 'lodash';

export default {
  data() {
    return {
      postList: [],
    };
  },
  methods: {
    async fetchPostByCategory() {
      const { data } = await fetchPostListByCategory(
        this.$route.params.categoryId,
        1
      );
      // console.log(data);

      // 발행된 건만
      this.postList = _.filter(
        data.tistory.item.posts,
        (p) => p.visibility == '20'
      );
    },
  },
  created() {
    // console.log(this.$route.params.categoryId);
    this.fetchPostByCategory();
  },
};
</script>

<style scoped></style>
