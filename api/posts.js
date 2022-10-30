import axios from 'axios';

// axios 초기화
function createInstance() {
  return axios.create({
    baseURL: 'https://haguri-peng.tistory.com/m/search',
  });
}

const instance = createInstance();

// 글 검색
function searchPosts(keyword, page, size) {
  return instance.get(
    `/posts.json?keyword=${keyword}&page=${page - 1}&size=${size || 20}`
  );
}

// Tag 검색
function searchTags(keyword, page, size) {
  return instance.get(
    `/tags.json?keyword=${keyword}&page=${page - 1}&size=${size || 20}`
  );
}

export { searchPosts, searchTags };
