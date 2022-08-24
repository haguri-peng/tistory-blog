## Vue 를 활용한 Tistory Blog

※ 작업중..   
아직 블로그에 배포한 상태는 아닙니다.

🐸 [Haguri & Peng's Blog](https://haguri-peng.tistory.com)


## Vue

[Vue3](https://vuejs.org/)

[Vue Router](https://router.vuejs.org/)

[Vuex](https://vuex.vuejs.org/)

### Vue Router

주소창에 BaseUrl 이외의 Url 로 접근할 수가 없어서 Hash Mode 사용   
(해결 방안이 있으면 HTML5 Mode 로 변경할 예정)

[Vue Router History Mode](https://router.vuejs.org/guide/essentials/history-mode.html)

```js
// /router/index.js
import {
  // createWebHistory,
  createWebHashHistory,
  createRouter,
} from 'vue-router';

...

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
});

export default router;
```

### Vuex

게시글에서 이전 페이지로 이동 시 문제가 있어서   
어쩔 수 없이 vuex 를 사용하여 페이지 정보와 검색어를 저장
```js
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
  ...
});

export default store;
```

### Icon

[Font Awesome](https://fontawesome.com/)

### Modal

댓글 등록 시 Modal 사용   
[Gitart Vue Dialog](https://github.com/gitart-group/vue-dialog)


## Color

[Color Hunt](https://colorhunt.co/palette/fcf8e894b49fdf786176549a)   
<img src="/images/color.png" width="300px" height="300px"></img>


## Tistory

Tistory 에서 제공하는 Open API 를 활용 ([Tistory Open API](https://tistory.github.io/document-tistory-apis/))   
제공해주는 Open API 에 한계가 있어 이를 감안하고 개발하였으니 참고 바랍니다.


## 저작권

[MIT](https://github.com/tidory/tidory/blob/master/LICENSE)

[티도리 제작자(SangWoo Jeong)](https://github.com/pronist)

[티도리(Tidory) 프레임워크](http://www.tidory.com)
