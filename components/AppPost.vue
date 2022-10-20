<template>
  <li @click="clickPost(postItem.id)">
    <span class="post-id">ID: {{ postItem.id }}</span>
    <span class="post-title">
      <span>{{ postItem.title }}</span>
      <span style="margin-left: 5px; font-size: 1rem">
        <font-awesome-layers full-width class="fa-lg">
          <font-awesome-icon icon="fa-regular fa-comment" />
          <font-awesome-layers-text
            counter
            :value="postItem.comments"
            position="top-right"
            style="
              font-size: 3rem;
              margin-right: -15px;
              background-color: #76549a;
            "
          />
        </font-awesome-layers>
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
    clickPost(postId) {
      this.$emit('openContent', postId);
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
  /* background-color: rgba(196, 223, 170, 0.2); */
  color: #df7861;
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
