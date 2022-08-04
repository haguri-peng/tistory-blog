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

export { fetchCategoryList };