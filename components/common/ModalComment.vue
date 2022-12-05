<template>
  <GDialog
    v-model="dialogState"
    max-width="500"
    persistent
    @update:modelValue="onClose"
  >
    <div class="wrapper">
      <div class="content">
        <div class="title">【Comment】</div>
        <input
          type="text"
          v-if="modalType === 'comment'"
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
          name="text"
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
        <button class="btn submit" @click="submit">Add</button>
        <button class="btn close" @click="close">Close</button>
      </div>
    </div>
  </GDialog>
</template>

<script>
import { ref, toRefs, watch, defineComponent } from 'vue';

export default defineComponent({
  emits: ['closeModal'],
  props: ['showModal', 'type'],
  setup(props, context) {
    const { emit } = context;
    const { showModal, type } = toRefs(props);

    const dialogState = ref(showModal);
    const modalType = ref(type);
    const blogName = ref('');
    const comment = ref('');
    const arrChk = ref([]);

    const clearModal = () => {
      blogName.value = '';
      comment.value = '';
      arrChk.value = [];
    };
    const submit = () => {
      const objData = {
        blogName: blogName.value,
        comment: comment.value,
        secret: arrChk.value.length > 0 ? 1 : 0,
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

    // watch props.showModal
    watch(showModal, () => {
      dialogState.value = showModal;
    });

    return {
      dialogState,
      modalType,
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
