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

<script setup>
import { ref, toRefs, watch, onUpdated } from 'vue';

const emit = defineEmits(['closeSearchModal']);
const props = defineProps({
  showSearch: Boolean,
});

const { showSearch } = toRefs(props);

const searchInput = ref(null);
const dialogState = ref(false);
const keyword = ref('');

// methods
const searchKeyword = () => {
  if (keyword.value == '') {
    alert('검색어를 입력해주세요.');
    return;
  }

  emit('closeSearchModal', 'search', keyword.value);
  resetData();
};

const close = () => {
  emit('closeSearchModal', 'close');
  resetData();
};

const resetData = () => {
  dialogState.value = false;
  keyword.value = '';
};

// watch
// props.showSearch
watch(showSearch, (val) => {
  dialogState.value = val;

  setTimeout(() => {
    if (val) {
      searchInput.value.focus();
    }
  }, 100);
});

onUpdated(() => {
  $('.g-dialog-content')
    .css('--g-dialog-content-bg', 'rgba(118, 84, 154, 0.66)')
    .css('border', '2px solid rgb(118, 84, 154)');
});
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
