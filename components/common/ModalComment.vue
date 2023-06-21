<template>
  <GDialog
    v-model="dialogState"
    max-width="500"
    persistent
    @update:modelValue="onClose"
  >
    <div class="wrapper">
      <div class="content">
        <div class="title">【{{ title }}】</div>
        <input
          v-if="modalType === 'comment'"
          type="text"
          v-model="blogName"
          placeholder="Enter your blog's name"
          style="
            width: 97%;
            margin-bottom: 5px;
            font-size: 1rem;
            padding: 0 5px;
          "
        />
        <textarea
          v-model="comment"
          rows="5"
          placeholder="Insert your comment"
          style="font-size: 1rem; width: 97.4%; resize: none; padding: 5px"
        ></textarea>
        <label for="check">
          <input type="checkbox" id="check" v-model="arrChk" value="secret" />
          secret
        </label>
      </div>
      <div class="actions">
        <button class="btn submit bg-violet-300" @click="submit">등록</button>
        <button class="btn close bg-violet-300" @click="close">닫기</button>
      </div>
    </div>
  </GDialog>
</template>

<script>
import { ref, toRefs, watch, watchEffect, defineComponent } from 'vue';

export default defineComponent({
  emits: ['closeModal'],
  props: ['showModal', 'type'],
  setup(props, context) {
    const { emit } = context;
    const { showModal, type } = toRefs(props);

    // data
    const dialogState = ref(false);
    const modalType = ref(type);

    const title = ref('');
    const blogName = ref('');
    const comment = ref('');
    const arrChk = ref([]);

    // set title
    if (modalType.value == 'comment') {
      title.value = '댓글';
    } else if (modalType.value == 'guestbook') {
      title.value = '방명록';
    }

    // method
    const clearModal = () => {
      blogName.value = '';
      comment.value = '';
      arrChk.value = [];
    };
    const submit = () => {
      // input validation
      if (modalType.value == 'comment' && blogName.value == '') {
        alert('블로그 주소는 필수입니다.');
        return;
      }
      if (comment.value == '') {
        alert('입력된 내용이 없습니다.');
        return;
      }

      const objData = {
        blogName: blogName.value,
        comment: comment.value,
        secret: arrChk.value.length > 0 ? true : false,
      };

      clearModal();
      emit('closeModal', 'submit', objData);
    };
    const close = () => {
      clearModal();
      emit('closeModal', 'close');
    };
    const onClose = () => {
      close();
    };

    // watch
    // props.showModal
    watch(showModal, (val) => {
      dialogState.value = val;
    });
    // watchEffect
    watchEffect(() => {
      // console.log('dialogState >> ' + dialogState.value);
    });

    return {
      dialogState,
      modalType,
      title,
      blogName,
      comment,
      arrChk,
      submit,
      close,
      onClose,
    };
  },
});
</script>

<style scoped>
.wrapper {
  color: #000;
  background-color: rgba(118, 84, 154, 0.11);
  border: 3px solid #76549a;
}
.content {
  padding: 20px;
}
.title {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
}
.actions {
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}
.actions button.btn {
  pointer-events: all;
  margin: 0 4px;
  padding: 5px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}
.actions button.btn:hover {
  font-weight: 500;
  background-color: #76549a;
}
</style>
