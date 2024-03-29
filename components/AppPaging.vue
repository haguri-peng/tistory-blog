<template>
  <div class="h-10 mb-5 inline-flex items-center">
    <font-awesome-icon
      icon="fa-solid fa-backward"
      size="lg"
      title="first"
      fade
      style="
        margin: 0 10px;
        cursor: pointer;
        --fa-animation-duration: 2s;
        --fa-fade-opacity: 0.7;
      "
      v-if="showPreviousIcon"
      @click="clickFirstPage"
    />
    <font-awesome-icon
      icon="fa-solid fa-backward-step"
      size="lg"
      title="previous"
      fade
      style="
        margin: 0 20px 0 10px;
        cursor: pointer;
        --fa-animation-duration: 2s;
        --fa-fade-opacity: 0.7;
      "
      v-if="showPreviousIcon"
      @click="clickPreviousPage"
    />
    <div class="pages">
      <span
        v-for="n in showPageCnt"
        class="m-1"
        :class="{
          hide: getPageNum(n) > page.totalPage,
          active: getPageNum(n) == page.currentPage,
        }"
      >
        <a
          href="javascript: void(0)"
          v-if="getPageNum(n) <= page.totalPage"
          @click="clickPageNum($event)"
        >
          {{ getPageNum(n) }}
        </a>
      </span>
    </div>
    <font-awesome-icon
      icon="fa-solid fa-forward-step"
      size="lg"
      title="next"
      fade
      style="
        margin: 0 10px 0 20px;
        cursor: pointer;
        --fa-animation-duration: 2s;
        --fa-fade-opacity: 0.7;
      "
      v-if="showNextIcon"
      @click="clickNextPage"
    />
    <font-awesome-icon
      icon="fa-solid fa-forward"
      size="lg"
      title="last"
      fade
      style="
        margin: 0 10px;
        cursor: pointer;
        --fa-animation-duration: 2s;
        --fa-fade-opacity: 0.7;
      "
      v-if="showNextIcon"
      @click="clickLastPage"
    />
  </div>
</template>

<script setup>
import { toRefs, computed } from 'vue';
import _ from 'lodash';

const emit = defineEmits(['movePage']);
const props = defineProps({
  page: {
    type: Object,
    // required: true,
  },
});

const { page } = toRefs(props);

// data
const showPageCnt = 5;

// computed
const showPreviousIcon = computed(() => page.value.currentPage > showPageCnt);
const showNextIcon = computed(
  () =>
    Math.floor((page.value.currentPage - 1) / showPageCnt) * showPageCnt +
      (showPageCnt + 1) <=
    page.value.totalPage
);

// methods
const getPageNum = (n) =>
  Math.floor((page.value.currentPage - 1) / showPageCnt) * showPageCnt + n;
const clickPageNum = (evt) => {
  // 현재 페이지만 아니면 페이지 이동
  if (!_.includes(evt.target.parentElement.classList, 'active')) {
    movePage(Number(evt.target.text));
  }
};
const clickFirstPage = () => {
  movePage(1);
};
const clickPreviousPage = () => {
  movePage(
    Math.floor((page.value.currentPage - 1) / showPageCnt) * showPageCnt -
      showPageCnt +
      1
  );
};
const clickNextPage = () => {
  movePage(
    Math.floor((page.value.currentPage - 1) / showPageCnt) * showPageCnt +
      (showPageCnt + 1)
  );
};
const clickLastPage = () => {
  movePage(page.value.totalPage);
};
const movePage = (pageNum) => {
  emit('movePage', pageNum);
};
</script>

<style scoped>
div.pages span.hide {
  display: none;
}
div.pages span.active a {
  font-weight: 800;
  font-size: 1.4rem;
  color: #76549a;
  text-decoration: none;
  cursor: default;
}
div.pages a {
  text-decoration: none;
  font-size: 1.3rem;
}
div.pages a:link {
  color: rgba(118, 84, 154, 0.33);
}
div.pages a:hover {
  color: black;
  text-decoration: underline;
}
</style>
