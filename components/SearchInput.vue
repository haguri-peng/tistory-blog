<template>
  <div class="input-wrapper">
    <input
      type="text"
      class="search-input"
      v-model="keyword"
      @keyup.enter="$emit('search', $event.target.value)"
    />
    <button type="button" class="btn" @click="searchKeyword">Search</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: '',
    };
  },
  methods: {
    searchKeyword() {
      this.$emit('search', this.keyword);
    },
  },
};
</script>

<style scoped>
.input-wrapper {
  height: 40px;
  margin: 1rem 0;
}
.search-input {
  width: 200px;
  font-size: 1.2rem;
  font-weight: 500;
}
.btn {
  pointer-events: all;
  font-size: 1.2rem;
  font-weight: 500;
}
</style>
