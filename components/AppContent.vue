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
      <p v-show="comments">
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
          <font-awesome-icon
            icon="fa-solid fa-house-user"
            :title="comment.name"
          />
          <span>{{ comment.name }}</span>
          <span style="margin-left: 30px; font-size: small">
            {{ comment.date }}
          </span>
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
  </div>
</template>

<script>
import AppContentMain from './AppContentMain.vue';
import { fetchPost, fetchComments } from '../api/index';

export default {
  components: {
    AppContentMain,
  },
  data() {
    return {
      title: '',
      content: '',
      tags: [],
      comments: [],
      intervalId: '',
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
        this.title = data.tistory.item.title;
        this.content = data.tistory.item.content;
        this.tags = data.tistory.item.tags.tag;
      }
    },
    async getComments() {
      const { data } = await fetchComments(this.$route.params.id);
      // console.log(data);

      if (data.tistory.status == '200') {
        this.comments = data.tistory.item.comments;
      }
    },
    addComment() {
      alert('작업중입니다!!');
    },
    gotoTop() {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    },
    gotoComments() {
      const commentsEl = document.querySelector('div.comments');
      commentsEl.scrollIntoView({ behavior: 'smooth' });
    },
  },
  created() {
    // console.log(this.$route.params.id);

    this.getContent();
    this.getComments();

    const headerHeight = 60;
    const contentTopMargin = 30;
    const contentInnerPadding = 20;

    this.intervalId = setInterval(() => {
      $('#app').css(
        'height',
        this.$refs.content.clientHeight +
          headerHeight +
          contentTopMargin +
          contentInnerPadding +
          'px'
      );
    }, 100);

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
  width: 70%;
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
  margin-bottom: 20px;
  color: #df7861;
}
div.tags {
  /* background-color: rgba(118, 84, 154, 0.22); */
  color: #76549a;
  margin-top: 30px;
}
div.tags span.tag {
  margin-right: 5px;
}
div.comments {
  margin-top: 30px;
  width: 80%;
  color: darkslategray;
}
div.comments p {
  text-align: left;
  border-bottom: 3px solid #76549a;
  padding-bottom: 4px;
}
div.comments > div {
  padding: 10px;
  border-bottom: 1px solid #76549a;
}
div.comments > div.hide {
  display: none;
}
div.comments > div > div.name {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  padding-left: 40px;
}
div.comments > div > div.comment {
  text-align: left;
  padding-left: 80px;
}
button {
  pointer-events: all;
  padding: 2px 5px;
  cursor: pointer;
  background-color: rgba(118, 84, 154, 0.5);
  border-radius: 3px;
}
button:hover {
  background-color: rgba(223, 120, 97, 0.5);
}
</style>
