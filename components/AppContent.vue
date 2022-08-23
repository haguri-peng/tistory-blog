<template>
  <div class="content" ref="content">
    <h1 class="title">{{ title }}</h1>

    <!-- <div v-html="content"></div> -->
    <app-content-main :content="content"></app-content-main>

    <div class="tags">
      <span class="tag" v-for="(tag, index) in tags" :key="index">
        <span class="title" v-if="index === 0">
          Tags
          <font-awesome-icon
            icon="fa-solid fa-tags"
            style="margin-right: 20px"
          />
        </span>
        #{{ tag }}
      </span>
    </div>

    <div class="comments">
      <!-- <p v-show="comments.length > 0"> -->
      <p>
        {{ comments.length }} Comments
        <font-awesome-icon icon="fa-solid fa-comments" />
        <button type="button" style="float: right" @click="addComment">
          <font-awesome-icon icon="fa-solid fa-pen" title="댓글 등록" />
          등록
        </button>
      </p>
      <div
        v-for="comment in comments"
        :key="comment.id"
        :class="{ hide: comment.open == 'N' }"
      >
        <div class="name">
          <div
            class="left"
            :class="{
              noAuth: comment.homepage != $parent.$parent.loginUserUrl,
            }"
          >
            <font-awesome-icon
              icon="fa-solid fa-house-user"
              :title="comment.name"
              style="cursor: pointer; margin-right: 5px"
              @click="openCommenterPage(comment.homepage)"
            />
            <span>{{ comment.name }}</span>
            <span style="margin-left: 30px; font-size: small">
              {{ comment.date }}
            </span>
          </div>
          <div
            class="comment-mod-del"
            style="float: right; width: 5%"
            :class="{
              noAuth: comment.homepage != $parent.$parent.loginUserUrl,
            }"
            @mouseleave="commentModDelOut($event.target)"
          >
            <font-awesome-icon
              icon="fa-solid fa-ellipsis"
              style="cursor: pointer"
              @click="toggleCommentModDelBtn($event.target)"
            />
            <ul style="list-style: none; display: none">
              <li
                @click="
                  modComment(comment.id, comment.parentId, comment.comment)
                "
              >
                수정
              </li>
              <li @click="delComment(comment.id)">삭제</li>
            </ul>
          </div>
        </div>
        <div class="comment" v-if="comment.visibility == '0'">
          승인 대기중인 댓글입니다.
        </div>
        <div class="comment" v-else>
          {{ comment.comment }}
        </div>
      </div>
    </div>

    <div class="top-down" v-show="isContent">
      <div @click="gotoTop">
        <font-awesome-icon
          icon="fa-solid fa-circle-up"
          size="lg"
          title="top"
          bounce
          style="cursor: pointer"
        />
      </div>
      <div @click="gotoComments" style="margin-top: 10px">
        <font-awesome-icon
          icon="fa-solid fa-comment"
          size="lg"
          title="comments"
          flip
          style="cursor: pointer; --fa-animation-duration: 3s"
        />
      </div>
    </div>

    <!-- Modal -->
    <app-comment :showModal="showModal" @closeModal="hideModal"></app-comment>
  </div>
</template>

<script>
import AppContentMain from './AppContentMain.vue';
import AppComment from './AppComment.vue';
import {
  fetchPost,
  fetchComments,
  insertComment,
  modifyComment,
  deleteComment,
} from '../api/index';

export default {
  components: {
    AppContentMain,
    AppComment,
  },
  data() {
    return {
      postId: '',
      categoryId: '',
      title: '',
      content: '',
      tags: [],
      comments: [],
      intervalId: '',
      showModal: false,
    };
  },
  computed: {
    isContent() {
      return this.content == '' ? false : true;
    },
  },
  methods: {
    async getContent() {
      const { data } = await fetchPost(this.$route.params.id);
      // console.log(data);

      if (data.tistory.status == '200') {
        this.postId = this.$route.params.id;
        this.categoryId = data.tistory.item.categoryId;
        this.title = data.tistory.item.title;
        this.content = data.tistory.item.content;
        this.tags = data.tistory.item.tags.tag;
      }
    },
    async getComments() {
      const { data } = await fetchComments(this.$route.params.id);
      // console.log(data);

      if (data.tistory.status == '200') {
        if (
          data.tistory.item.comments != null &&
          data.tistory.item.comments.length > 0
        ) {
          this.comments = data.tistory.item.comments;
        } else {
          this.comments = [];
        }
      }
    },
    addComment() {
      if (this.$parent.$parent.loginUserUrl == '') {
        alert('로그인이 필요합니다.');
        return;
      }

      this.showModal = true;
    },
    async hideModal(action, objData) {
      this.showModal = false;

      // 댓글 등록 및 수정
      if (action == 'submit') {
        objData.postId = this.postId;
        objData.blogName = this.$parent.$parent.loginUserUrl
          .split('//')[1]
          .split('.')[0];
        // console.log(objData);

        try {
          if (
            objData.commentId != null &&
            objData.commentId != undefined &&
            objData.commentId != ''
          ) {
            // 수정
            const { data } = await modifyComment(objData);
            if (data.tistory.status == '200') {
              alert('댓글이 수정되었습니다.');
              this.getComments();
            } else {
              alert(data.tistory.error_message);
            }
          } else {
            // 등록
            const { data } = await insertComment(objData);
            if (data.tistory.status == '200') {
              alert('댓글이 등록되었습니다.');

              this.getComments();
              setTimeout(this.setAppHeight, 100);
            } else {
              alert(data.tistory.error_message);
            }
          }
        } catch (err) {
          alert(err.response.data.tistory.error_message);
        }
      }
    },
    modComment(commentId, parentCommentId, comment) {
      // vuex 댓글 부분 세팅
      const commentInfo = {
        parentCommentId,
        commentId,
        comment,
      };
      // console.log(commentInfo);

      this.$store.dispatch('setCommentInfo', commentInfo);
      this.showModal = true;
    },
    async delComment(commentId) {
      if (confirm('댓글을 삭제하시겠습니까?')) {
        const objData = {
          blogName: this.$parent.$parent.loginUserUrl
            .split('//')[1]
            .split('.')[0],
          postId: this.postId,
          commentId,
        };
        // console.log(objData);

        try {
          const { data } = await deleteComment(objData);
          if (data.tistory.status == '200') {
            alert('댓글이 삭제되었습니다.');

            this.getComments();
            setTimeout(this.setAppHeight, 100);
          }
        } catch (err) {
          // console.error(err);
          alert(err.response.data.tistory.error_message);
        }
      }
    },
    gotoTop() {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    },
    gotoComments() {
      const commentsEl = document.querySelector('div.comments');
      commentsEl.scrollIntoView({ behavior: 'smooth' });
    },
    openCommenterPage(url) {
      window.open(url, '_blank');
    },
    toggleCommentModDelBtn(el) {
      $(el).parent().find('ul').toggle();
    },
    commentModDelOut(el) {
      // console.log('test');
      $(el).parent().find('ul').hide();
    },
    setAppHeight() {
      const headerHeight = 60;
      const contentTopMargin = 30;
      const contentInnerPadding = 20;

      $('#app').css(
        'height',
        this.$refs.content.clientHeight +
          headerHeight +
          contentTopMargin +
          contentInnerPadding +
          'px'
      );
    },
  },
  created() {
    // console.log(this.$route.params.id);

    this.getContent();
    this.getComments();

    this.intervalId = setInterval(this.setAppHeight, 100);

    setTimeout(() => {
      clearInterval(this.intervalId);
    }, 10000);
  },
  unmounted() {
    $('#app').css('height', 'auto');
    clearInterval(this.intervalId);
  },
};
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    transform: TranslateY(30px);
    opacity: 0;
  }
  to {
    transform: TranslateX(0);
    opacity: 1;
  }
}
div.content {
  position: absolute;
  margin-top: 30px;
  padding: 10px;
  top: 60px;
  width: 65%;
  /* background-color: rgba(144, 200, 172, 0.3); */
  animation-name: fadeInUp;
  animation-duration: 1.1s;
}
div.top-down {
  position: sticky;
  float: right;
  bottom: 15px;
  /* right: 20px; */
}
h1.title {
  margin-bottom: 59px;
  color: #df7861;
}
div.tags {
  /* background-color: rgba(118, 84, 154, 0.22); */
  color: #76549a;
  margin-top: 20px;
}
div.tags span.tag {
  margin-right: 5px;
}
div.comments {
  margin-top: 59px;
  width: 80%;
  color: darkslategray;
}
div.comments p {
  text-align: left;
  border-bottom: 3px solid #76549a;
  padding-bottom: 4px;
}
div.comments > div {
  padding: 15px;
  border-bottom: 1px solid #76549a;
}
div.comments > div.hide {
  display: none;
}
div.comments > div > div.name {
  /* display: flex; */
  display: contents;
  align-items: center;
  margin-bottom: 5px;
  padding-left: 40px;
}
div.comments > div > div.name > div.left {
  float: left;
  width: 95%;
  text-align: initial;
}
div.comments > div > div.name > div.left.noAuth {
  width: 100%;
}
div.comment-mod-del.noAuth {
  display: none;
}
div.comment-mod-del svg:hover {
  color: #76549a;
}
div.comment-mod-del li {
  font-size: 0.8rem;
}
div.comment-mod-del li:hover {
  font-size: 0.8rem;
  font-weight: bold;
  color: #76549a;
  cursor: pointer;
}
div.comments > div > div.comment {
  text-align: left;
  padding-left: 80px;
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
