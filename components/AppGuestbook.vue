<template>
  <div class="absolute top-24 w-3/5" ref="guestbook">
    <h2>
      【 Guest Book
      <span class="text-xl align-top" style="color: orangered">
        {{ count }}
      </span>
      】
      <button type="button" class="float-right h-8" @click="addGuestbook">
        <font-awesome-icon icon="fa-solid fa-pen" title="방명록 작성" />
        작성
      </button>
    </h2>
    <div class="mt-8 text-base">
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
              <p class="font-bold">
                {{ item.writer.name }}
                <span v-if="item.isSecret">
                  <font-awesome-icon icon="fa-solid fa-lock" />
                </span>
              </p>
              <p>{{ item.written }}</p>
            </div>
          </div>
          <div
            class="text-left mt-4"
            v-html="handleNewLine(item.content)"
          ></div>
          <hr />
        </div>
      </div>
    </div>

    <!-- Modal -->
    <ModalComment
      :showModal="showModal"
      :type="modalType"
      @closeModal="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';

import ModalComment from './common/ModalComment.vue';
import {
  getGuestbookCount,
  getGuestbookInit,
  getGuestbook,
  postGuestbook,
} from '../api/posts';

const guestbook = ref(null);

// data
const count = ref(0);
const isLast = ref(true);
const gbList = reactive([]);
const reqUserId = ref('');
const reqUserRole = ref('');
// Modal
const showModal = ref(false);
const modalType = ref('guestbook');

// methods
const getCount = async () => {
  const { data } = await getGuestbookCount();
  if (data.code == 'OK') {
    count.value = data.data.count;
  }
};
const getReqUserInfo = async () => {
  const { data } = await getGuestbookInit();
  if (data.code == 200) {
    const reqUser = data.result.requestUser;
    reqUserId.value = reqUser.id;
    reqUserRole.value = reqUser.role;
  }
};
const getData = async () => {
  gbList.length = 0;
  getCount();

  do {
    const { data } = await getGuestbook();
    if (data.code == 'OK') {
      for (const item of data.data.items) {
        gbList.push(item);
      }

      isLast.value = data.data.isLast;
      if (isLast.value) {
        setTimeout(setAppHeight, 100);
      }
    }
  } while (!isLast.value);
};
const handleNewLine = (str) => String(str).replace(/(?:\r\n|\r|\n)/g, '</br>');
const moveUrl = (url) => {
  if (url != '') {
    window.open(url, '_blank');
  }
};
const setAppHeight = () => {
  const top = 100;
  $('#app').css('height', guestbook.value.clientHeight + top + 'px');
};
const addGuestbook = () => {
  const { user } = window.initData;
  if (user == null || user == undefined) {
    alert('로그인이 필요합니다.');
    return;
  }
  showModal.value = true;
};
const closeModal = async (action, objData) => {
  showModal.value = false;

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
        isSecret: objData.secret,
      };

      const { data } = await postGuestbook(postData);
      if (data.code == 'OK') {
        alert('정상적으로 등록되었습니다.');
        getData();
      } else {
        alert('에러가 발생하였습니다.');
      }
    } catch (err) {
      alert('에러가 발생하였습니다.');
    }
  }
};

onMounted(() => {
  getReqUserInfo();
  getData();
});
onUnmounted(() => {
  $('#app').css('height', 'auto');
});
</script>

<style scoped>
div.writer-info {
  display: flex;
  align-items: center;
}
div.writer-info div {
  text-align: left;
  margin-left: 10px;
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
