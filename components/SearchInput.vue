<template>
  <div class="input-wrapper">
    <input
      type="text"
      class="search-input"
      v-model="keyword"
      @keyup.enter="$emit('search', $event.target.value)"
    />
    <button type="button" class="btn" @click="searchKeyword">
      <font-awesome-icon
        icon="fa-solid fa-magnifying-glass"
        beat
        style="--fa-animation-duration: 2s"
      />
    </button>
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
  border-radius: 5px;
}
.btn {
  pointer-events: all;
  font-size: 1.2rem;
  font-weight: 400;
  padding: 0 5px;
  margin-left: 5px;
  background-color: unset;
  border: unset;
  cursor: pointer;
}
</style>
