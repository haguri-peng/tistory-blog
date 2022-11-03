<template>
  <div class="search-area">
    <div
      style="
        font-size: 1.5rem;
        font-weight: bold;
        text-align: left;
        padding: 0 0 10px 10px;
        border-bottom: 1px solid purple;
      "
    >
      '
      <span style="color: #df7861">{{ $route.params.keyword }}</span>
      '
      <span v-if="$route.params.type == 'tags'"> Tags</span>
      <span v-else> Posts</span>
      검색결과
      <span>({{ total }})</span>
    </div>

    <div v-for="item in items" :key="item.id">
      <div
        class="tag-item"
        v-if="item.visibility == 'PUBLIC'"
        @click="moveContent(item.id)"
      >
        <div>
          <div class="title">{{ item.title }}</div>
          <div class="summary">{{ item.summary }}</div>
        </div>
        <img
          v-if="item.thumbnailUrl != null"
          :src="item.thumbnailUrl"
          alt=""
          style="width: 150px; height: 150px"
        />
      </div>
    </div>

    <div
      style="
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <div v-if="showNextIcon">
        <font-awesome-icon
          icon="fa-solid fa-circle-notch"
          size="2x"
          spin-pulse
          spin-reverse
          style="color: #76549a; --fa-animation-duration: 0.5s"
        />
      </div>
      <div v-else>&nbsp;</div>
    </div>
  </div>
</template>

<script>
import { searchTags, searchPosts } from '../api/posts';

export default {
  data() {
    return {
      isLast: true,
      page: 1,
      total: 0,
      items: [],
      showNextIcon: false,
      result: {},
    };
  },
  watch: {
    $route(to, from) {
      if (to.path.indexOf('/search') > -1) {
        if (to.path != from.path) {
          this.initData();
          this.search(this.$route.params.type, this.$route.params.keyword);
        }
      }
    },
  },
  methods: {
    async search(type, keyword) {
      let data;
      if (type == 'tags') {
        const res = await searchTags(keyword, this.page, 10);
        data = res.data;
      } else if (type == 'posts') {
        const res = await searchPosts(keyword, this.page, 10);
        data = res.data;
      }
      // console.log(data);

      if (data.code == '200') {
        this.isLast = data.result.isLast;
        this.total = data.result.total;
        for (const item of data.result.items) {
          this.items.push(item);
        }
      }
    },
    initData() {
      this.isLast = true;
      this.page = 1;
      this.total = 0;
      this.items = [];
      this.showNextIcon = false;
    },
    moveContent(id) {
      this.$router.push(`/${id}`);
    },
  },
  created() {
    const result = {
      items: [
        {
          id: 143,
          title: '[jQuery] 사이드바(Sidebar) 메뉴 만들기',
          summary:
            '안녕하세요. 이번에는 jQuery를 사용하여 사이드바(Sidebar) 메뉴를 만들어보겠습니다. 이번에 진행할 예제는 아래 gif를 참고하시면 될 것 같습니다. 👀 먼저 제가 이 예제에 사용한 라이브러리를 말씀드리고 시작하겠습니다. jQuery jQuery UI jQuery blockUI FontAwesome blockUI와 FontAwesome은 필수가 아닙니다. blockUI는 해당 메뉴를 클릭했을 때 데이터를 가져오면서 모달 효과를 내기 위함이고, FontAwesome은 Icon을 가져와서 보여주기 위해 사용하였습니다. 즉, jQuery와 jQuery UI가 필수입니다. 📢 시작하기 전에.. 메뉴와 데이터를 가져오는 부분은 아래 링크를 참고하면 되며, https://jsonplaceholder.typ..',
          commentCount: 0,
          reactionCount: 2,
          published: '2022. 10. 12.',
          thumbnailUrl:
            'https://k.kakaocdn.net/dn/OtgbJ/btrN8AmkZQJ/yZofsP2FDgSILxpk54oJQk/img.gif',
          path: '/m/143',
          restrictType: null,
          visibility: 'PUBLIC',
          visibilityLabel: '공개',
        },
        {
          id: 140,
          title:
            '[jQuery] 다중(Multi) Selectbox (feat. 대분류, 중분류, 소분류)',
          summary:
            '안녕하세요. 이번에는 jQuery로 다중(Multi) Selectbox를 구현해보도록 하겠습니다. 쉽게 대분류, 중분류, 소분류를 생각하시면 되는데요. 각 분류에 해당하는 항목을 Selectbox에 보이게 한다고 보시면 됩니다. 정말 간단하게 구현할 수 있습니다. 뭐.. 구현 방법도 사람마다 조금씩 다를 수 있습니다. 😜 예제 확인 이번 예제는 어떻게 구현하는지 이해만 하면 되기 때문에 간단하게 작성하였습니다. 첫 번째 Selectbox(중분류)에는 fruits, vehicles, brands, footballPlayer가 있고, 두 번째 Selectbox(소분류)에는 중분류에 해당하는 항목들만 보이게 하겠습니다. 🎈 기본 코드 확인 (HTML, CSS) HTML은 중분류와 소분류 Selectbox(se..',
          commentCount: 0,
          reactionCount: 1,
          published: '2022. 10. 1.',
          thumbnailUrl:
            'https://k.kakaocdn.net/dn/dzRRsQ/btrNv8wVofS/IXimR3ayKnep4Na1FUl85k/img.png',
          path: '/m/140',
          restrictType: null,
          visibility: 'PUBLIC',
          visibilityLabel: '공개',
        },
        {
          id: 138,
          title: '[jQuery] 라디오 버튼(Radio Button) 변경 시 이전 값 확인',
          summary:
            "안녕하세요. 라디오 버튼(Radio Button) 변경 시, 이전 값을 확인하는 예제를 포스팅하려고 합니다. 굳이 이전 값을 확인할 필요는 없지만.. 간혹 이전 값을 확인해야 하거나 이전 값으로 돌아가야 할 일이 발생할 수 있습니다. 😄 이번 예제는 아래의 라이브러리가 추가되었으니 참고 바랍니다. jQuery FontAwesome // Icon 때문에 추가 (없어도 상관없음) 자! 그럼 시작하겠습니다. 👀 예제 확인 Radio Button 값이 변경되었을 때, 이전 값과 현재 값을 화면에 출력하는 간단한 예제입니다. 과일, 교통수단, 브랜드, 축구선수 구분 별로 5개씩 테스트 데이터를 만들었으며, 각 버튼을 클릭하면 화면 중앙에 Radio Button이 표시됩니다. 'change' 이벤트로 적용하였기 때..",
          commentCount: 0,
          reactionCount: 2,
          published: '2022. 9. 28.',
          thumbnailUrl:
            'https://k.kakaocdn.net/dn/beGoOU/btrNeJkAJyB/8ZH9F1CmgSRUbDOe87Cjq1/img.png',
          path: '/m/138',
          restrictType: null,
          visibility: 'PUBLIC',
          visibilityLabel: '공개',
        },
        {
          id: 122,
          title: '[jQuery Plugin] BlockUI를 사용하여 모달(Modal) 효과 내보기',
          summary:
            '안녕하세요. jQuery Plugin인 BlockUI를 사용하여 모달(Modal) 효과를 내보는 예제를 포스팅하려 합니다. 더 궁금하신 사항이 있으면, 아래 링크에 Option 및 여러 Demo가 있으니 참조 바랍니다. https://malsup.com/jquery/block/ jQuery BlockUI Plugin Overview The jQuery BlockUI Plugin lets you simulate synchronous behavior when using AJAX, without locking the browser[1]. When activated, it will prevent user activity with the page (or part of the page) until it is dea..',
          commentCount: 2,
          reactionCount: 1,
          published: '2022. 9. 19.',
          thumbnailUrl:
            'https://k.kakaocdn.net/dn/ycaCJ/btrMt4WLheX/ETok6OGkgHFkKXPUREIsKK/img.png',
          path: '/m/122',
          restrictType: null,
          visibility: 'PUBLIC',
          visibilityLabel: '공개',
        },
        {
          id: 114,
          title: '[jQuery UI] Drag and Drop 예제 (드래그 앤 드롭)',
          summary:
            'jQuery UI (User Interface)를 통해 Drag & Drop(드래그 앤 드롭)을 쉽게 구현해보겠습니다. 정말 손쉽게 구현할 수 있으니 큰 어려움은 없을 것이며, 제가 구현한 방법 말고도 좀 더 다양한 방법이 있으니 그 부분은 샘플 코드를 몇 개 보시면 바로 감이 오실 겁니다. 먼저, 기본 예제는 다음 링크에서 소스코드와 함께 확인하시면 됩니다. Sortable | jQuery UI Sortable Reorder elements in a list or grid using the mouse. Enable a group of DOM elements to be sortable. Click on and drag an element to a new spot within the list, and th..',
          commentCount: 2,
          reactionCount: 0,
          published: '2022. 9. 13.',
          thumbnailUrl:
            'https://k.kakaocdn.net/dn/mjYeU/btrLZzQkqZg/1C4NZMuTktQzmW6LkMZlbK/img.png',
          path: '/m/114',
          restrictType: null,
          visibility: 'PUBLIC',
          visibilityLabel: '공개',
        },
        {
          id: 111,
          title: '[jQuery] Item을 위/아래로 옮기기',
          summary:
            'jQuery로 클릭한 부분의 Item의 위치를 위/아래로 옮겨보겠습니다. 말만 들어서는 어떤 것인지 모르니 바로 이미지로 보여드리고 시작하겠습니다. Item을 A, B, C, D 이렇게 4개로 구성하고, (구분하기 쉽게 빨간색, 파란색, 녹색, 노란색으로 설정하였습니다.) 오른쪽에 있는 버튼을 이용하여 위/아래로 옮기거나 삭제할 수 있습니다. 기본 설정 아래와 같이 HTML을 세팅해줍니다. 버튼은 fontawesome을 사용하였으며, 각 버튼의 class에 up(위로), down(아래로), delete(삭제)를 넣었습니다. ◎ item을 위/아래로 옮기거나 삭제할 수 있는 예제입니다. item A item B item C item D CSS는 화면에 최대한 잘 출력되도록 노력하였습니다. 각자 알맞게 사용..',
          commentCount: 1,
          reactionCount: 1,
          published: '2022. 9. 12.',
          thumbnailUrl:
            'https://k.kakaocdn.net/dn/4n34k/btrLLXR13Sq/Zk4EhI7ioyb8xKXsp8Jdq0/img.png',
          path: '/m/111',
          restrictType: null,
          visibility: 'PUBLIC',
          visibilityLabel: '공개',
        },
        {
          id: 110,
          title: '[jQuery] 선택한 행(Row)을 좌우로 이동 시키기',
          summary:
            '이번에는 jQuery를 사용하여 선택(체크)한 행(Row)을 좌우로 이동시켜 보겠습니다. 좀 더 쉽게 구현하기 위해 다음 라이브러리를 사용하였으니 참고 바라겠습니다. jQuery lodash axios fontawesome 샘플 데이터 https://jsonplaceholder.typicode.com/todos 위 URL에서 총 200개의 데이터를 받을 수 있으나 10개만 가지고 테스트를 진행하겠습니다. HTML, CSS 테이블을 좌우로 각각 위치시키고, 버튼(좌로 이동, 우로 이동)은 가운데에 위치시켰습니다. 맨 위에 있는 이미지에서 보셨다시피 버튼은 fontawesome을 이용하여 구현하였습니다. 선택 ID Title Completed 선택 ID Title Completed * { margin: 0;..',
          commentCount: 0,
          reactionCount: 0,
          published: '2022. 9. 11.',
          thumbnailUrl:
            'https://k.kakaocdn.net/dn/Ku85e/btrLLhplyre/ke3pc1KqYZyQL5zaHXs51K/img.png',
          path: '/m/110',
          restrictType: null,
          visibility: 'PUBLIC',
          visibilityLabel: '공개',
        },
        {
          id: 109,
          title: '[Javascript, jQuery] 페이징(Paging) 처리',
          summary:
            '페이징(paging) 처리 방법을 구현해보겠습니다. 다른 분들이 작성한 글을 몇 개 보았는데 페이징 처리는 조금씩 구현 방법이 다를 겁니다. 허나 궁극적으로 보면 비슷하다고 생각합니다. 제가 이번에 작업한 페이징 처리는 서버에 특정 페이지의 데이터를 요청하여 가져오는 것이 아니라 데이터를 미리 가져와서 해당 페이지의 데이터를 보여주는 예제입니다. 이점 확인 바랍니다. (서버까지 세팅하고 진행하려면 일이 커져서.. 😅 그렇지만 큰 그림은 비슷합니다.) 잡설이 길었습니다. 시작해보겠습니다.. 😅 먼저, 저는 귀찮거나 힘들게 구현하기 싫어서 다음 라이브러리를 사용하였습니다. jQuery lodash axios fontawesome lodash는 받아온 데이터를 지지고 볶기 편하기 때문에 사용하였습니다. axi..',
          commentCount: 0,
          reactionCount: 0,
          published: '2022. 9. 9.',
          thumbnailUrl:
            'https://k.kakaocdn.net/dn/dq6kOs/btrLLzvrLfJ/x29EHkOM5wur5ozgypkPM0/img.png',
          path: '/m/109',
          restrictType: null,
          visibility: 'PUBLIC',
          visibilityLabel: '공개',
        },
        {
          id: 108,
          title: '[jQuery] 클릭한 메뉴 영역을 하이라이트',
          summary:
            "jQuery로 클릭한 (메뉴) 영역을 하이라이트 하는 것을 구현해보겠습니다. 알게 모르게 헤더나 메뉴 영역에서 많이 쓰고 있습니다. 최대한 쉽게 구현해보겠습니다. HTML 정말 이보다 더 간단할 순 없습니다. 😊 Menu1 ~ 4까지 만들어줍니다. Menu1 Menu2 Menu3 Menu4 CSS 이번에는 다른 예제들보다 CSS가 더 중요(?)합니다. 클릭한 메뉴에 'active' 라는 class를 부여하겠습니다. (아래 CSS에서 ul>li.active 부분) ul { list-style: none; display: flex; justify-content: center; } ul>li { margin: 0 10px; padding: 10px; font-size: 1rem; cursor: pointer;..",
          commentCount: 0,
          reactionCount: 1,
          published: '2022. 9. 8.',
          thumbnailUrl:
            'https://k.kakaocdn.net/dn/KneAu/btrLDQMkpXo/0eMDLKsh1FU2m3frnWZRWK/img.png',
          path: '/m/108',
          restrictType: null,
          visibility: 'PUBLIC',
          visibilityLabel: '공개',
        },
        {
          id: 105,
          title: '[jQuery] 한 개씩만 체크되도록 하는 체크박스',
          summary:
            '이번에는 jQuery로 체크박스를 한 개씩만 체크되도록 해보겠습니다. 정말 쉽고 간단합니다. 준비 코드 다른 예제에서 사용했던 HTML 코드를 들고 와서 조금만 수정해보겠습니다. 구현하기 나름이지만, 여기에선 체크박스의 name 속성은 동일하게 설정하였습니다. 선택 No Content 1 TEST1 2 TEST2 3 TEST3 4 TEST4 5 TEST5 CSS는 기본적인 테이블(헤더와 바디)처럼 보이게 하는 정도입니다. 참고만 해주세요. 🐸 * { margin: 0; padding: 0; } div.app { width: 100%; } table, td { border: 1px solid #333; border-collapse: collapse; } table { margin: 20px; } td, t..',
          commentCount: 0,
          reactionCount: 0,
          published: '2022. 9. 6.',
          thumbnailUrl:
            'https://k.kakaocdn.net/dn/yUE9h/btrLux6PyRJ/ka2OZwsGLskBF6oBRBhGAk/img.png',
          path: '/m/105',
          restrictType: null,
          visibility: 'PUBLIC',
          visibilityLabel: '공개',
        },
        {
          id: 101,
          title: '[jQuery] 테이블에서 검색어를 통한 필터(filter)링',
          summary:
            'jQuery를 이용하여 입력한 검색어를 가지고 테이블에 있는 데이터를 필터링하여 보여주는 것을 구현해보도록 하겠습니다. 생각보다 간단합니다. 기본 세팅 위와 같은 허접한 테이블과 검색어 부분을 그려주기 위해 다음과 같은 코드가 필요합니다. 😅 데이터는 제가 임의로 10개의 이름을 선정하였습니다. * Name filter: No Name Mail Blog 1 Cordelia test1@gmail.com https://test1.tistory.com/ 2 Adam test2@gmail.com https://test2.tistory.com/ 3 Sara test3@gmail.com https://test3.tistory.com/ 4 Sophia test4@gmail.com https://test4.tistor..',
          commentCount: 0,
          reactionCount: 0,
          published: '2022. 9. 2.',
          thumbnailUrl:
            'https://k.kakaocdn.net/dn/3cn3t/btrLgj8E5Fc/yI24zgHXKZOB4aVrIof4ak/img.png',
          path: '/m/101',
          restrictType: null,
          visibility: 'PUBLIC',
          visibilityLabel: '공개',
        },
        {
          id: 100,
          title: '[jQuery] 테이블 헤더의 체크박스로 전체 체크 및 해제하기',
          summary:
            'jQuery로 테이블 헤더(thead)에 있는 체크박스(checkbox)로 바디(tbody)에 있는 체크박스를 전체 체크하거나 해제하는 기능을 구현해 보려고 합니다. 기본 설정 보다 쉽게 구현하기 위해 헤더와 바디의 체크박스에 각각 name과 id 속성 값을 주었습니다. [헤더에서는 id 값(name값+All)을 주었고, 바디에서는 name 값을 주었습니다.] No ID Content 1 test-1 TEST1 2 test-2 TEST2 3 test-3 TEST3 4 test-4 TEST4 5 test-5 TEST5 클릭 위와 같이 html을 설정하고, * { margin: 0; padding: 0; } button { padding: 5px 10px; cursor: pointer; } button:ho..',
          commentCount: 0,
          reactionCount: 0,
          published: '2022. 9. 2.',
          thumbnailUrl:
            'https://k.kakaocdn.net/dn/F7KdT/btrLfNHtpIu/iNNKHSCD1vm8Se0ImwYO7k/img.png',
          path: '/m/100',
          restrictType: null,
          visibility: 'PUBLIC',
          visibilityLabel: '공개',
        },
        {
          id: 97,
          title: '[jQuery] 스크롤의 위치에 맞게 소제목을 강조하기',
          summary:
            '위의 gif 처럼 (참조: https://developer.mozilla.org/ko/docs/Web/HTML/Element/Heading_Elements) 현재 스크롤이 글의 Heading Tag(티스토리에서는 h2, h3, h4)에 위치해 있을 때 해당 영역이 강조되도록 jQuery로 구현해보겠습니다. 현재 제 블로그에 적용되어 있는 부분을 가져와서 작성하였으니 참고 바랍니다. HTML 먼저, HTML은 간단하게 작성하였습니다. 그리고 body 태그 아래()에 밑에 있는 스크립트를 넣어줍니다. CSS CSS도 HTML과 마찬가지로 간단하게 설정했습니다. 제가 CSS에 취약해서 되는 대로 막 작성하는 편이니.. 이 점은 양해 바랍니다. * { margin: 0; padding: 0; } h4 { mar..',
          commentCount: 0,
          reactionCount: 0,
          published: '2022. 8. 30.',
          thumbnailUrl:
            'https://k.kakaocdn.net/dn/NSyJz/btrKY3Sny91/KpsKj7uvkzNR51N9SGkXO0/img.gif',
          path: '/m/97',
          restrictType: null,
          visibility: 'PUBLIC',
          visibilityLabel: '공개',
        },
      ],
      isLast: true,
      nextPage: null,
      total: 13,
    };

    // 개발 시에만 아래에 있는 주석을 풀고 작업!!
    // TEST Start
    // this.result = result;
    // this.isLast = false;
    // for (const item of result.items) {
    //   this.items.push(item);
    // }
    // TEST End

    this.search(this.$route.params.type, this.$route.params.keyword);

    const that = this;
    $(window).scroll(function () {
      const scrollTop = $(window).scrollTop();
      const innerHeight = $(window).innerHeight();
      const scrollHeight = $('div.search-area')[0].scrollHeight || 0 + 80;

      // console.log(scrollTop, innerHeight, scrollHeight);
      // console.log(that.isLast);
      // console.log(that);

      if (!that.isLast && scrollTop + innerHeight >= scrollHeight) {
        that.showNextIcon = true;
        that.page++;
        that.search(that.$route.params.type, that.$route.params.keyword);

        setTimeout(() => {
          that.showNextIcon = false;
        }, 1000);
      }
    });
  },
  unmounted() {
    $(window).off('scroll');
  },
};
</script>

<style scoped>
div.search-area {
  width: 70%;
  margin-top: 80px;
}
div.tag-item {
  display: flex;
  border-bottom: 1px solid purple;
}
div.tag-item:hover {
  cursor: pointer;
  background-color: rgba(118, 84, 154, 0.3);
}
div.tag-item div {
  display: grid;
  text-align: left;
  align-items: center;
  padding: 0 10px;
}
div.tag-item div div.title {
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
