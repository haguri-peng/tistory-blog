<template>
  <GDialog v-model="dialogState" max-width="500" persistent>
    <div class="wrapper">
      <div class="content">
        <div class="title">댓글 작성</div>
        <textarea
          v-model="comment"
          name="text"
          rows="5"
          placeholder="댓글을 작성해주세요."
          style="width: 100%; resize: none"
        ></textarea>
        <label for="check">
          <input type="checkbox" id="check" v-model="arrChk" value="secret" />
          비밀댓글
        </label>
      </div>
      <div class="actions">
        <button class="btn submit" @click="submit">등록</button>
        <button class="btn close" @click="close">닫기</button>
      </div>
    </div>
  </GDialog>
</template>

<script>
export default {
  props: ['showModal'],
  data() {
    return {
      dialogState: false,
      comment: '',
      arrChk: [],
    };
  },
  methods: {
    submit() {
      const objData = {
        secret: this.arrChk.length > 0 ? 1 : 0, // 1: 비밀댓글, 0: 공개댓글
        content: this.comment,
      };

      this.resetData();
      this.$emit('closeModal', 'submit', objData);
    },
    close() {
      this.resetData();
      this.$emit('closeModal', 'close');
    },
    resetData() {
      this.dialogState = false;
      this.comment = '';
      this.arrChk = [];
    },
  },
  watch: {
    showModal() {
      this.dialogState = this.showModal;
    },
  },
};
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
  padding: 0 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}
.actions button.btn:hover {
  font-weight: 500;
  background-color: #76549a;
}
</style>
