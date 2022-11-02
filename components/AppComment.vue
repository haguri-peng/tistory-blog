<template>
  <GDialog v-model="dialogState" max-width="500" persistent>
    <div class="wrapper">
      <div class="content">
        <div class="title">댓글 작성</div>
        <input
          type="text"
          v-model="blogName"
          placeholder="작성자의 블로그 주소를 입력해주세요. Ex) 'haguri-peng.tistory.com'에서 'haguri-peng'만"
          style="
            width: 97%;
            margin-bottom: 5px;
            font-size: 1rem;
            padding: 0 5px;
          "
          readonly
        />
        <textarea
          v-model="comment"
          name="text"
          rows="5"
          placeholder="댓글을 작성해주세요."
          style="font-size: 1rem; width: 97.4%; resize: none; padding: 5px"
        ></textarea>
        <label for="check">
          <input type="checkbox" id="check" v-model="arrChk" value="secret" />
          비밀댓글
        </label>
        <span style="margin-left: 20px; color: blue" v-if="mode == 'M'">
          *댓글 수정은 한 번만 가능합니다.
        </span>
      </div>
      <div class="actions">
        <button class="btn submit" @click="submit">
          <template v-if="mode == 'M'">수정</template>
          <template v-else>등록</template>
        </button>
        <button class="btn close" @click="close">닫기</button>
      </div>
    </div>
  </GDialog>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['showModal'],
  data() {
    return {
      dialogState: false,
      blogName: '',
      comment: '',
      arrChk: [],
      mode: '', // 'M' 값인 경우 수정모드
    };
  },
  computed: {
    ...mapGetters(['getParentCommentId', 'getCommentId', 'getModComment']),
  },
  methods: {
    submit() {
      if (this.blogName == '') {
        alert('블로그 주소는 필수입니다.');
        return;
      }
      if (this.comment == '') {
        alert('댓글이 입력되지 않았습니다.');
        return;
      }

      const objData = {
        blogName: this.blogName,
        content: this.comment.replace(/\n/g, '  '), // 개행문자는 공백 2칸으로 치환
        secret: this.arrChk.length > 0 ? 1 : 0, // 1: 비밀댓글, 0: 공개댓글
        parentId: this.getParentCommentId,
      };

      // 댓글 수정인 경우
      if (this.mode == 'M') {
        objData.commentId = this.getCommentId;
      }

      this.resetData();
      this.$emit('closeModal', 'submit', objData);
    },
    close() {
      this.resetData();
      this.$emit('closeModal', 'close');
    },
    resetData() {
      this.dialogState = false;
      this.blogName = '';
      this.comment = '';
      this.arrChk = [];
      this.mode = '';

      this.$store.dispatch('clearCommentInfo');
    },
  },
  watch: {
    showModal() {
      this.dialogState = this.showModal;

      if (this.showModal) {
        const { user } = window.initData;
        this.blogName = user.loginId;
      }
    },
    getModComment() {
      // console.log('htytest');

      this.mode = 'M';
      this.comment = this.getModComment;
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
