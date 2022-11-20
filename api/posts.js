import axios from 'axios';

// axios 초기화
function createInstance() {
  return axios.create({
    baseURL: 'https://haguri-peng.tistory.com/m',
  });
}

const instance = createInstance();

// 글 검색
function searchPosts(keyword, page, size) {
  return instance.get(
    `/search/posts.json?keyword=${keyword}&page=${page - 1}&size=${size || 20}`
  );
}

// Tag 검색
function searchTags(keyword, page, size) {
  return instance.get(
    `/search/tags.json?keyword=${keyword}&page=${page - 1}&size=${size || 20}`
  );
}

// Reaction 검색
function searchReaction(postId) {
  return instance.get(`/${postId}/reaction.json`);
}

// post Reaction
function postReaction(postId) {
  return instance.post(`/${postId}/reaction.json`);
}

// delete Reaction
function deleteReaction(postId) {
  return instance.delete(`/${postId}/reaction.json`);
}

// Guest Book count
function getGuestbookCount() {
  return instance.get('/guestbook/count.json');
}

// Guest Book init (get requestUser's info)
function getGuestbookInit() {
  return instance.get('/guestbook/init.json');
}

// get Guest Book
function getGuestbook(size) {
  return instance.get(`/guestbook.json?size=${size || 30}`);
}

export {
  searchPosts,
  searchTags,
  searchReaction,
  postReaction,
  deleteReaction,
  getGuestbookCount,
  getGuestbookInit,
  getGuestbook,
};
