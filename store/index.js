import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      // 카테고리ID와 페이지 번호 모두 숫자 형식이지만 String 으로 설정
      categoryId: '',
      pageNum: '',
      // 검색어
      keyword: '',
    };
  },
  getters: {
    getCategoryId(state) {
      return state.categoryId;
    },
    getPageNum(state) {
      return state.pageNum;
    },
    getKeyword(state) {
      return state.keyword;
    },
  },
  mutations: {
    setCategoryId(state, categoryId) {
      state.categoryId = categoryId;
    },
    clearCategoryId(state) {
      state.categoryId = '';
    },
    setPageNum(state, pageNum) {
      state.pageNum = pageNum;
    },
    clearPageNum(state) {
      state.pageNum = '';
    },
    setKeyword(state, keyword) {
      state.keyword = keyword;
    },
    clearKeyword(state) {
      state.keyword = '';
    },
  },
  actions: {
    setCategoryInfo({ commit }, categoryInfo) {
      // Vuex's state
      commit('setCategoryId', categoryInfo.id);
      commit('setPageNum', categoryInfo.page);
    },
    setWord({ commit }, keyword) {
      commit('setKeyword', keyword);
    },
    clearWord({ commit }) {
      commit('clearKeyword');
    },
  },
});

export default store;
