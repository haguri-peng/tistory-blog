<template>
  <div class="paging">
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

<script>
import _ from 'lodash';

export default {
  props: ['page'],
  data() {
    return {
      showPageCnt: 5, // 보여지는 페이지 수
    };
  },
  computed: {
    showPreviousIcon() {
      return this.page.currentPage > this.showPageCnt;
    },
    showNextIcon() {
      return (
        Math.floor((this.page.currentPage - 1) / this.showPageCnt) *
          this.showPageCnt +
          (this.showPageCnt + 1) <=
        this.page.totalPage
      );
    },
  },
  methods: {
    getPageNum(n) {
      return (
        Math.floor((this.page.currentPage - 1) / this.showPageCnt) *
          this.showPageCnt +
        n
      );
    },
    clickPageNum(evt) {
      // 현재 페이지만 아니면 페이지 이동
      if (!_.includes(evt.target.parentElement.classList, 'active')) {
        this.movePage(Number(evt.target.text));
      }
    },
    clickFirstPage() {
      this.movePage(1);
    },
    clickPreviousPage() {
      this.movePage(
        Math.floor((this.page.currentPage - 1) / this.showPageCnt) *
          this.showPageCnt -
          this.showPageCnt +
          1
      );
    },
    clickNextPage() {
      this.movePage(
        Math.floor((this.page.currentPage - 1) / this.showPageCnt) *
          this.showPageCnt +
          (this.showPageCnt + 1)
      );
    },
    clickLastPage() {
      this.movePage(this.page.totalPage);
    },
    movePage(pageNum) {
      this.$emit('movePage', pageNum);
    },
  },
};
</script>

<style scoped>
div.paging {
  height: 40px;
  margin-bottom: 20px;
  display: inline-flex;
  align-items: center;
}
div.pages span {
  margin: 5px;
}
div.pages span.hide {
  display: none;
}
div.pages span.active a {
  font-weight: 800;
  color: darkcyan;
  text-decoration: none;
  cursor: default;
}
div.pages a {
  text-decoration: none;
  font-size: 1.3rem;
}
div.pages a:link {
  color: #a0bcc2;
}
div.pages a:hover {
  color: black;
  text-decoration: underline;
}
</style>
