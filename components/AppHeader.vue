<template>
  <header>
    <!-- 카테고리 -->
    <div class="category">
      <ul class="inline-flex h-full">
        <li>
          <font-awesome-icon
            icon="fa-solid fa-house"
            size="xl"
            title="Home"
            style="cursor: pointer"
            @click="moveHome"
          />
        </li>
        <li @click="moveGuestbook">
          <font-awesome-layers full-width class="fa-xl">
            <font-awesome-icon
              icon="fa-solid fa-book"
              title="GuestBook"
              style="color: royalblue; cursor: pointer"
            />
            <font-awesome-layers-text
              transform="down-12 shrink-8"
              value="GuestBook"
            />
          </font-awesome-layers>
        </li>
        <li
          v-for="category in getTopCategory"
          :key="category.id"
          :class="{ active: activeCategory == category.id }"
          :data-category-id="category.id"
          @click="clickCategory(category.id)"
        >
          <span class="menu"> {{ category.name }}</span>
          <span class="font-light"> [{{ category.entries }}] </span>
          <span class="newFlag"> {{ showFlag(category.id) }} </span>
        </li>
        <li @click="$emit('showSearchInput')">
          <font-awesome-icon
            icon="fa-solid fa-magnifying-glass"
            beat-fade
            style="--fa-animation-duration: 4s"
          />
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

<script setup>
import { ref, reactive, toRefs, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { fetchPostList } from '../api/index';
import _ from 'lodash';

const router = useRouter();

const emit = defineEmits(['showSearchInput', 'moveCategory']);
const props = defineProps(['categoryList']);

const { categoryList } = toRefs(props);

// data
const activeCategory = ref('');
const recentCategoryIds = reactive([]);
const subCategoryList = reactive([]);

// computed
const getTopCategory = computed(() =>
  _.filter(categoryList.value, (c) => c.parent == '')
);

// methods
const fetchPost = async (pageNum) => {
  const { data } = await fetchPostList(pageNum);
  if (data.tistory.status == '200') {
    // 최근에 올린 글 목록 (10개. 발행된 건만)
    const recentPosts = _.filter(
      data.tistory.item.posts,
      (p) => p.visibility == '20'
    );
    recentCategoryIds.push(..._.keys(_.countBy(recentPosts, 'categoryId')));
    // console.log(recentCategoryIds);
  }
};
const showFlag = (categoryId) => {
  const fIdx = _.findIndex(recentCategoryIds, (id) => id == categoryId);
  if (fIdx > -1) {
    return 'N';
  } else {
    const parentIds = _.chain(categoryList.value)
      .filter((c) => recentCategoryIds.includes(c.id))
      .map((c) => c.parent)
      .compact()
      .value();
    // console.log(parentIds);
    return parentIds.includes(categoryId) ? 'N' : '';
  }
};
const clickCategory = (categoryId, subFlag) => {
  // Sub Category display CSS 초기화
  $('div.subCategory').css('display', '');

  if (subFlag != 'sub') {
    activeCategory.value = categoryId;
  }

  const subCategory = _.filter(
    categoryList.value,
    (c) => c.parent == categoryId
  );
  // console.log(subCategory);

  subCategoryList.length = 0;
  if (subCategory.length == 0) {
    emit('moveCategory', categoryId);
  } else {
    subCategoryList.push(...subCategory);
  }
};
const hideSubCategory = () => {
  $('div.subCategory').slideUp(400);
};
const subCategoryOut = () => {
  hideSubCategory();
};
const moveHome = () => {
  router.push('/');
};
const moveGuestbook = () => {
  router.push('/guestbook');
};

onMounted(() => {
  fetchPost(1);
});
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
}
div.category ul li {
  list-style: none;
  font-size: 1.2rem;
  font-weight: 400;
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
  transform: scale(1.05, 1.05);
  text-decoration: underline;
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
