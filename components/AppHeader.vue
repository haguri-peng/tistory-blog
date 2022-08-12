<template>
  <header>
    <!-- 카테고리 -->
    <div class="category">
      <ul>
        <li
          v-for="category in categoryList"
          :key="category.id"
          :class="{ active: activeCategory == category.id }"
          @click="clickCategory(category.id)"
        >
          <span class="menu"> {{ category.name }}</span>
          <span class="cnt"> [{{ category.entries }}] </span>
          <span class="newFlag"> {{ showFlag(category.id) }} </span>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import { fetchPostList } from '../api/index';
import _ from 'lodash';

export default {
  props: ['categoryList'],
  data() {
    return {
      activeCategory: '',
      recentCategoryIds: [],
    };
  },
  methods: {
    async fetchPost(pageNum) {
      const { data } = await fetchPostList(pageNum);
      // console.log(data);

      if (data.tistory.status == '200') {
        // 최근에 올린 글 목록 (10개. 발행된 건만)
        this.recentPosts = _.filter(
          data.tistory.item.posts,
          (p) => p.visibility == '20'
        );
        this.recentCategoryIds = _.keys(
          _.countBy(this.recentPosts, 'categoryId')
        );
        // console.log(this.recentCategoryIds);
      }
    },
    showFlag(categoryId) {
      const fIdx = _.findIndex(
        this.recentCategoryIds,
        (id) => id == categoryId
      );
      if (fIdx > -1) {
        return 'N';
      }
    },
    clickCategory(categoryId) {
      this.activeCategory = categoryId;
      this.$emit('moveCategory', categoryId);
    },
  },
  created() {
    this.fetchPost(1);
  },
};
</script>

<style scoped>
div.category {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  /* overflow-x: auto; */
  /* background-color: #c4dfaa; */
}
div.category ul {
  display: inline-flex;
  height: 100%;
}
div.category ul li {
  list-style: none;
  font-weight: 400;
  /* padding-right: 40px; */
  padding: 0 20px;
  cursor: pointer;
  align-self: center;
  transition: 0.2s;
}
div.category ul li.active {
  color: #fefbe7;
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: underline;
}
div.category ul li:hover {
  color: #73a9ad;
  transform: scale(1.05, 1.05);
}
div.category span.cnt {
  font-weight: lighter;
}
div.category span.newFlag {
  color: red;
  font-weight: 500;
}
</style>
