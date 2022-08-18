import axios from 'axios';

// axios 초기화
function createInstance() {
  return axios.create({
    baseURL: 'https://www.tistory.com/apis',
  });
}

const instance = createInstance();
const params = {
  accessToken:
    '02768df77149fadd44aa4a8236daea50_29e2bb88b91e72ee39d8c93198beb93d',
  blogName: 'https://haguri-peng.tistory.com',
  outputType: 'json',
};

function fetchBlogInfo() {
  const queryString =
    'access_token=' + params.accessToken + '&output=' + params.outputType;
  return instance.get(`/blog/info?${queryString}`);
}

function fetchCategoryList() {
  const queryString =
    'access_token=' +
    params.accessToken +
    '&output=' +
    params.outputType +
    '&blogName=' +
    params.blogName;
  return instance.get(`/category/list?${queryString}`);
}

function fetchPostList(pageNum) {
  const queryString =
    'access_token=' +
    params.accessToken +
    '&output=' +
    params.outputType +
    '&blogName=' +
    params.blogName +
    '&page=' +
    (pageNum || 1);
  return instance.get(`/post/list?${queryString}`);
}

function fetchPostListByCategory(categoryId, pageNum) {
  const queryString =
    'access_token=' +
    params.accessToken +
    '&output=' +
    params.outputType +
    '&blogName=' +
    params.blogName +
    '&page=' +
    (pageNum || 1);
  return instance.get(`/post/list?${queryString}`, {
    params: {
      categoryId,
      // visibility: '20', // 발행된 건만
    },
  });
}

function fetchPost(postId) {
  const queryString =
    'access_token=' +
    params.accessToken +
    '&output=' +
    params.outputType +
    '&blogName=' +
    params.blogName +
    '&postId=' +
    postId;
  return instance.get(`/post/read?${queryString}`);
}

function fetchComments(postId) {
  const queryString =
    'access_token=' +
    params.accessToken +
    '&output=' +
    params.outputType +
    '&blogName=' +
    params.blogName +
    '&postId=' +
    postId;
  return instance.get(`/comment/list?${queryString}`);
}

function insertComment(data) {
  const queryString =
    'access_token=' +
    params.accessToken +
    '&output=' +
    params.outputType +
    '&blogName=' +
    params.blogName +
    '&postId=' +
    data.postId +
    '&content=' +
    data.content +
    '&secret=' +
    data.secret;
  return instance.post(`/comment/write?${queryString}`);
}

export {
  fetchBlogInfo,
  fetchCategoryList,
  fetchPostList,
  fetchPostListByCategory,
  fetchPost,
  fetchComments,
  insertComment,
};
