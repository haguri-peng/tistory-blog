<template>
  <li>
    <div class="post-id">ID: {{ postItem.id }}</div>
    <div class="post-title">
      <span>{{ postItem.title }}</span>
      <span>[{{ postItem.comments }}]</span>
    </div>
    <div class="post-url">URL: {{ postItem.postUrl }}</div>
    <div class="post-date">작성일자: {{ postItem.date }}</div>
  </li>
</template>

<script>
export default {
  props: {
    postItem: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
li {
  display: inline-block;
  width: 40%;
  border: 3px solid #73a9ad;
  margin: 10px 10px;
  opacity: 0.8;
}
li:hover {
  border: 3px solid darkcyan;
  opacity: 1;
  cursor: pointer;
}
</style>
