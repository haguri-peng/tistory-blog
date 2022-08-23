const actions = {
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
  setCommentInfo({ commit }, commentInfo) {
    commit('setParentCommentId', commentInfo.parentCommentId || '');
    commit('setCommentId', commentInfo.commentId || '');
    commit('setModComment', commentInfo.comment || '');
  },
  clearCommentInfo({ commit }) {
    commit('clearParentCommentId');
    commit('clearCommentId');
    commit('clearModComment');
  },
};

export default actions;
