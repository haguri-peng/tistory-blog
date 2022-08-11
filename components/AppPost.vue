<template>
  <li @click="clickPost(postItem.id)">
    <span class="post-id">ID: {{ postItem.id }}</span>
    <span class="post-title">
      <span>{{ postItem.title }}</span>
      <span style="margin-left: 5px; font-size: 1rem">
        [{{ postItem.comments }}]
      </span>
    </span>
    <span class="post-url">{{ postItem.postUrl }}</span>
    <span class="post-date">{{ postItem.date }}</span>
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
  methods: {
    clickPost(id) {
      console.log('postId >> ' + id);
    },
  },
};
</script>

<style scoped>
li {
  display: table;
  width: 100%;
  /* border: 3px solid #73a9ad; */
  font-size: 1.5rem;
  margin: 2px 10px;
  /* opacity: 0.8; */
}
li:hover {
  /* border: 3px solid darkcyan; */
  background-color: rgb(254, 251, 231, 0.4);
  color: lightcoral;
  /* opacity: 1; */
  cursor: pointer;
}
span.post-id,
span.post-url {
  display: none;
}
span.post-date {
  margin-left: 10px;
  display: none;
}
</style>
