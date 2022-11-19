const getters = {
  getCategoryId(state) {
    return state.categoryId;
  },
  getPageNum(state) {
    return state.pageNum;
  },
  getParentCommentId(state) {
    return state.parentCommentId;
  },
  getCommentId(state) {
    return state.commentId;
  },
  getModComment(state) {
    return state.modComment;
  },
};

export default getters;
