const mutations = {
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
  setParentCommentId(state, parentCommentId) {
    state.parentCommentId = parentCommentId;
  },
  clearParentCommentId(state) {
    state.parentCommentId = '';
  },
  setCommentId(state, commentId) {
    state.commentId = commentId;
  },
  clearCommentId(state) {
    state.commentId = '';
  },
  setModComment(state, comment) {
    state.modComment = comment;
  },
  clearModComment(state) {
    state.modComment = '';
  },
};

export default mutations;
