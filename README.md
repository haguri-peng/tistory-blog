## Vue 를 활용한 Tistory Blog

어느 정도 작업이 완료되어 블로그에 배포하였습니다.   
기능은 하나씩 추가중입니다.

🐸 [Haguri & Peng's Blog](https://haguri-peng.tistory.com) 🐧


## Vue

[Vue3](https://vuejs.org/)

[Vue Router](https://router.vuejs.org/)

[Vuex](https://vuex.vuejs.org/)

### Vue Router

주소창에 BaseUrl 이외의 Url 로 접근할 수가 없어서 Hash Mode 사용   
배포하여 테스트를 해 본 결과 HTML5 Mode 에서 문제가 없었습니다.   
즉, 개발하면서 preview 로 확인할 때에는 Hash Mode 를 사용하고, 배포 시에는 HTML5 Mode 로 변경하면 문제 없을 것 같습니다.

[Vue Router History Mode](https://router.vuejs.org/guide/essentials/history-mode.html)

```js
// /router/index.js
import {
  createWebHistory, // HTML5 Mode
  // createWebHashHistory, // Hash Mode
  createRouter,
} from 'vue-router';

...

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHashHistory(),
  routes,
});

export default router;
```

### Vuex

게시글에서 이전 페이지로 이동 시 문제가 있어   
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

### Code Highlight

[vue-code-highlight](https://github.com/elisiondesign/vue-code-highlight)   
[PRISM](https://prismjs.com/)


## Color

[Color Hunt](https://colorhunt.co/palette/fcf8e894b49fdf786176549a)   
<img src="/images/color.png" width="300px" height="300px"></img>


## Tistory

Tistory 에서 제공하는 Open API 를 활용 ([Tistory Open API](https://tistory.github.io/document-tistory-apis/))   
제공해주는 Open API 에 한계가 있어 이를 감안하고 개발하였으니 참고 바랍니다.

### 댓글

댓글의 수정/삭제 기능을 구현하였으나 Open API 에서 로그인한 사용자의 정보를 알 수 없어(사용자 검증 문제) 실질적으로 사용할 수 없습니다.   
로그인한 사용자를 알 수 없기에 댓글 등록 시, 블로그 주소 정보를 입력하고 댓글을 입력해야 등록할 수 있습니다.

### 공지사항 및 방명록

Open API 에서 제공하지 않음


## Tidory

Tidory **8.2.3** 버전으로 업데이트   
8.0.5 버전에서 빌드 후 배포하여 보니 app.xxxx.js 파일에서 연결된 다른 script(.js) 파일을 찾지 못하는 문제가 발생.   
확인해보니 'tidory.config.js' 에서 설정한 'public_path' 대로 경로가 제대로 세팅되지 않아 수동으로 변경하여 문제를 해결하였습니다.   
위 이슈는 Tidory 제작자에게 문의한 결과 8.2.1 버전 이후부터는 해결되었다고 답변을 받았습니다.


## 저작권

[MIT](https://github.com/tidory/tidory/blob/master/LICENSE)

[티도리 제작자(SangWoo Jeong)](https://github.com/pronist)

[티도리(Tidory) 프레임워크](http://www.tidory.com)
