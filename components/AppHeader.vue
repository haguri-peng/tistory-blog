<template>
  <header>
    <!-- 카테고리 -->
    <div class="category">
      <ul>
        <li>
          <font-awesome-icon
            icon="fa-solid fa-house"
            size="lg"
            beat
            style="cursor: pointer; --fa-animation-duration: 2s"
            @click="moveHome"
          />
        </li>
        <li
          v-for="category in getTopCategory"
          :key="category.id"
          :class="{ active: activeCategory == category.id }"
          :data-category-id="category.id"
          @click="clickCategory(category.id)"
        >
          <span class="menu"> {{ category.name }}</span>
          <span class="cnt"> [{{ category.entries }}] </span>
          <span class="newFlag"> {{ showFlag(category.id) }} </span>
        </li>
      </ul>
    </div>
    <div
      class="subCategory"
      :class="{ hide: subCategoryList.length == 0 }"
      @mouseleave="subCategoryOut"
    >
      <ul>
        <li
          v-for="subCategory in subCategoryList"
          @click="clickCategory(subCategory.id, 'sub')"
        >
          <span class="menu"> {{ subCategory.name }}</span>
          <span class="cnt"> [{{ subCategory.entries }}] </span>
          <span class="newFlag"> {{ showFlag(subCategory.id) }} </span>
        </li>
      </ul>
      <div style="margin-top: 10px">
        <font-awesome-icon
          icon="fa-solid fa-caret-up"
          size="2x"
          title="close"
          bounce
          style="cursor: pointer"
          @click="hideSubCategory"
        />
      </div>
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
      subCategoryList: [],
    };
  },
  computed: {
    getTopCategory() {
      return _.filter(this.categoryList, (c) => c.parent == '');
    },
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
    clickCategory(categoryId, subFlag) {
      // Sub Category display CSS 초기화
      $('div.subCategory').css('display', '');

      if (subFlag != 'sub') {
        this.activeCategory = categoryId;
      }

      const subCategory = _.filter(
        this.categoryList,
        (c) => c.parent == categoryId
      );
      // console.log(subCategory);

      if (subCategory.length == 0) {
        this.subCategoryList = [];
        this.$emit('moveCategory', categoryId);
        this.clearKeyword();
      } else {
        this.subCategoryList = subCategory;
      }
    },
    clearKeyword() {
      this.$store.dispatch('clearWord');
    },
    hideSubCategory() {
      $('div.subCategory').slideUp(400);
    },
    subCategoryOut() {
      this.hideSubCategory();
    },
    moveHome() {
      this.$router.push('/');
    },
  },
  created() {
    this.fetchPost(1);
  },
};
</script>

<style scoped>
@keyframes fadeInDown {
  from {
    transform: TranslateY(-30px);
    opacity: 0;
  }
  to {
    transform: TranslateX(0);
    opacity: 1;
  }
}
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
  font-size: 1.2rem;
  font-weight: 400;
  /* padding-right: 40px; */
  padding: 0 20px;
  cursor: pointer;
  align-self: center;
  transition: 0.2s;
}
div.category ul li.active {
  color: #76549a;
  font-size: 1.4rem;
  font-weight: 600;
  text-decoration: underline;
}
div.category ul li:hover {
  /* color: #a0bcc2; */
  transform: scale(1.05, 1.05);
}
div.category span.cnt {
  font-weight: lighter;
}
div.category span.newFlag {
  color: #df7861;
  font-weight: 500;
}
div.subCategory {
  position: absolute;
  font-size: 1.1rem;
  top: 0;
  width: 100%;
  padding-top: 60px;
  background-color: rgba(252, 248, 232, 0.88);
  animation-name: fadeInDown;
  animation-duration: 0.7s;
  z-index: 999;
}
div.subCategory li {
  font-size: 1.3rem;
  cursor: pointer;
}
div.subCategory li:hover {
  color: #76549a;
  text-decoration: underline;
}
div.subCategory.hide {
  display: none;
}
div.subCategory div:hover {
  color: #df7861;
}
div.subCategory span.newFlag {
  color: #df7861;
}
</style>
