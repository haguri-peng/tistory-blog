<template>
  <div class="guestbook" ref="guestbook">
    <h2>
      【 Guest Book
      <span class="count">{{ this.count }}</span>
      】
      <button
        type="button"
        style="float: right; height: 32px"
        @click="addGuestbook"
      >
        <font-awesome-icon icon="fa-solid fa-pen" title="방명록 작성" />
        작성
      </button>
    </h2>
    <div class="gb-list">
      <div v-for="item in gbList" :key="item.id">
        <div v-if="reqUserRole == 'owner' || !item.isSecret">
          <div class="writer-info" :data-id="item.id">
            <img
              :src="item.writer.profileImage"
              alt=""
              style="
                width: 60px;
                height: 60px;
                border-radius: 2rem;
                cursor: pointer;
              "
              @click="moveUrl(item.writer.homepage)"
            />
            <div>
              <p style="font-weight: bold">
                {{ item.writer.name }}
                <span v-if="item.isSecret">
                  <font-awesome-icon icon="fa-solid fa-lock" />
                </span>
              </p>
              <p>{{ item.written }}</p>
            </div>
          </div>
          <div class="content" v-html="handleNewLine(item.content)"></div>
          <hr />
        </div>
      </div>
    </div>

    <!-- Modal -->
    <modal-comment
      :showModal="showModal"
      :type="modalType"
      @closeModal="closeModal"
    />
  </div>
</template>

<script>
import ModalComment from './common/ModalComment.vue';
import {
  getGuestbookCount,
  getGuestbookInit,
  getGuestbook,
  postGuestbook,
} from '../api/posts';

export default {
  components: {
    ModalComment,
  },
  data() {
    return {
      count: 0,
      isLast: true,
      gbList: [],
      reqUserId: '',
      reqUserRole: '',
      // Modal
      showModal: false,
      modalType: 'guestbook',
    };
  },
  methods: {
    async getCount() {
      const { data } = await getGuestbookCount();
      if (data.code == 200) {
        this.count = data.result.count;
      }
    },
    async getReqUserInfo() {
      const { data } = await getGuestbookInit();
      if (data.code == 200) {
        const reqUser = data.result.requestUser;
        this.reqUserId = reqUser.id;
        this.reqUserRole = reqUser.role;
      }
    },
    async getData() {
      const { data } = await getGuestbook();
      if (data.code == 200) {
        for (const item of data.result.items) {
          this.gbList.push(item);
        }

        setTimeout(this.setAppHeight, 100);
      }
    },
    handleNewLine(str) {
      return String(str).replace(/(?:\r\n|\r|\n)/g, '</br>');
    },
    moveUrl(url) {
      if (url != '') {
        window.open(url, '_blank');
      }
    },
    setAppHeight() {
      // const headerHeight = 60;
      // const contentTopMargin = 30;
      // const contentInnerPadding = 20;
      const top = 100;

      $('#app').css(
        'height',
        this.$refs.guestbook.clientHeight +
          // headerHeight +
          // contentTopMargin +
          // contentInnerPadding +
          top +
          'px'
      );
    },
    addGuestbook() {
      const { user } = window.initData;
      if (user == null || user == undefined) {
        alert('로그인이 필요합니다.');
        return;
      }

      this.showModal = true;
    },
    async closeModal(action, objData) {
      this.showModal = false;

      // 방명록 등록
      if (action == 'submit') {
        try {
          const { user } = window.initData;
          if (user == null || user == undefined) {
            alert('로그인이 필요합니다.');
            return;
          }

          const postData = {
            name: user.name,
            replier: user.id,
            comment: objData.comment,
            secret: objData.secret,
          };

          const { data } = await postGuestbook(postData);
          if (data.code == '200') {
            alert('정상적으로 등록되었습니다.');

            this.getData();
          } else {
            // alert(data.message);
            alert('에러가 발생하였습니다.');
          }
          // }
        } catch (err) {
          // alert(err.response.data.message);
          alert('에러가 발생하였습니다.');
        }
      }
    },
  },
  created() {
    this.getCount();
    this.getReqUserInfo();
    this.getData();

    // const objTest = {
    //   id: 9411964,
    //   content:
    //     '1. 하구리\n남원에서 자란 입이 까다로운 청개구리.\n밥종류와 면종류, 콩 같은 것을 잘 먹음. 반면 남들이 좋아하는 육류와 해산물에 익숙치 않아 조금 취약한 특징을 지님.\n라면조차 맛있어야 먹는 까탈스러운 입을 가지고 있으며, 익숙치 않아도 맛이 있으면 육류와 해산물 요리도 클리어 가능.\n가끔 그 입맛 때문에 펭에게 태클을 당함.\n\n2. 펭\n풀떼기, 육류, 해산물, 면, 밥 모두 무난하게 먹는 편이지만 그 안에서도 편식이 심한 펭귄.\n그래도 건강식 안 따지고 자신의 입맛에 맛있으면 ok.\n맛의 기준선이 높지 않기 때문에 어찌보면 가장 만만한 대상인듯.\n싫어하는 것은 가지. (물컹하고 이상한 풀맛나서)\n\n......이런 식으로 소개해보는 건 어떠나굴?',
    //   written: '2018. 2. 19. 23:27',
    //   permalink: '',
    //   restrictType: null,
    //   isSecret: false,
    //   isApproved: true,
    //   parent: null,
    //   children: [],
    //   writer: {
    //     id: 0,
    //     name: '펭여사1',
    //     profileImage:
    //       'https://t1.daumcdn.net/tistory_admin/blog/admin/profile_default_04.png',
    //     homepage: '',
    //     role: 'guest',
    //     canManage: false,
    //     isRequestUser: false,
    //   },
    // };
    // const objTest2 = {
    //   id: 9411964,
    //   content:
    //     '1. 하구리\n남원에서 자란 입이 까다로운 청개구리.\n밥종류와 면종류, 콩 같은 것을 잘 먹음. 반면 남들이 좋아하는 육류와 해산물에 익숙치 않아 조금 취약한 특징을 지님.\n라면조차 맛있어야 먹는 까탈스러운 입을 가지고 있으며, 익숙치 않아도 맛이 있으면 육류와 해산물 요리도 클리어 가능.\n가끔 그 입맛 때문에 펭에게 태클을 당함.\n\n2. 펭\n풀떼기, 육류, 해산물, 면, 밥 모두 무난하게 먹는 편이지만 그 안에서도 편식이 심한 펭귄.\n그래도 건강식 안 따지고 자신의 입맛에 맛있으면 ok.\n맛의 기준선이 높지 않기 때문에 어찌보면 가장 만만한 대상인듯.\n싫어하는 것은 가지. (물컹하고 이상한 풀맛나서)\n\n......이런 식으로 소개해보는 건 어떠나굴?\n\n\n\n\n1\n22\n333\n4444\n55555',
    //   written: '2018. 2. 19. 23:27',
    //   permalink: '',
    //   restrictType: null,
    //   isSecret: false,
    //   isApproved: true,
    //   parent: null,
    //   children: [],
    //   writer: {
    //     id: 0,
    //     name: '펭여사2',
    //     profileImage:
    //       'https://t1.daumcdn.net/tistory_admin/blog/admin/profile_default_04.png',
    //     homepage: 'https://haguri-peng.tistory.com',
    //     role: 'guest',
    //     canManage: false,
    //     isRequestUser: false,
    //   },
    // };
    // this.gbList.push(objTest);
    // this.gbList.push(objTest2);
    // this.count = 2;
    // setTimeout(this.setAppHeight, 100);
  },
  unmounted() {
    $('#app').css('height', 'auto');
  },
};
</script>

<style scoped>
div.guestbook {
  position: absolute;
  top: 100px;
  width: 60%;
}
/* h2 {
  text-align: left;
} */
span.count {
  color: orangered;
  font-size: 1.3rem;
  vertical-align: top;
}
div.gb-list {
  margin-top: 30px;
  font-size: 1.2rem;
}
div.writer-info {
  display: flex;
  align-items: center;
}
div.writer-info div {
  text-align: left;
  margin-left: 10px;
}
div.content {
  text-align: left;
  margin-top: 15px;
}
hr {
  margin: 25px 0;
}
button {
  pointer-events: all;
  padding: 2px 5px;
  cursor: pointer;
  background-color: rgba(118, 84, 154, 0.11);
  border-radius: 3px;
}
button:hover {
  background-color: rgba(118, 84, 154, 0.66);
}
</style>
