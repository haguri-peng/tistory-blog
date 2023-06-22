<template>
  <GDialog v-model="dialogState" max-width="400" @update:modelValue="close">
    <div class="input-wrapper">
      <input
        type="text"
        class="search-input"
        v-model="keyword"
        ref="searchInput"
        @keyup.enter="searchKeyword"
      />
      <button
        type="button"
        class="btn bg-violet-300 hover:bg-violet-400"
        @click="searchKeyword"
      >
        검색
      </button>
    </div>
  </GDialog>
</template>

<script>
export default {
  props: ['showSearch'],
  data() {
    return {
      dialogState: false,
      keyword: '',
    };
  },
  methods: {
    searchKeyword() {
      if (this.keyword == '') {
        alert('검색어를 입력해주세요.');
        return;
      }

      this.$emit('closeSearchModal', 'search', this.keyword);
      this.resetData();
    },
    close() {
      this.$emit('closeSearchModal', 'close');
      this.resetData();
    },
    resetData() {
      this.dialogState = false;
      this.keyword = '';
    },
  },
  watch: {
    showSearch() {
      this.dialogState = this.showSearch;

      setTimeout(() => {
        if (this.showSearch) {
          this.$refs.searchInput.focus();
        }
      }, 100);
    },
  },
  updated() {
    $('.g-dialog-content')
      .css('--g-dialog-content-bg', 'rgba(118, 84, 154, 0.66)')
      .css('border', '2px solid rgb(118, 84, 154)');
  },
};
</script>

<style scoped>
.input-wrapper {
  height: 40px;
  margin: 1rem 0;
  display: flex;
  justify-content: center;
}
.search-input {
  width: 200px;
  font-size: 1.2rem;
  font-weight: 500;
  border-radius: 5px;
  background-color: #fcf8e8;
  padding: 0 5px;
}
.btn {
  pointer-events: all;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0 5px;
  margin-left: 5px;
  cursor: pointer;
  border-radius: 3px;
}
</style>
