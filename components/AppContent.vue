<template>
  <div class="content" ref="content">
    <h1 class="title">{{ title }}</h1>
    <!-- <div v-html="content"></div> -->
    <app-content-main :content="content"></app-content-main>
    <div class="top-down" v-show="isContent">
      <div @click="gotoTop">
        <font-awesome-icon
          icon="fa-solid fa-arrow-up"
          size="2x"
          title="top"
          bounce
          style="cursor: pointer"
        />
      </div>
      <!-- <div style="margin-top: 10px">
        <font-awesome-icon
          icon="fa-solid fa-rotate-left"
          size="2x"
          title="back"
          style="cursor: pointer"
        />
      </div> -->
    </div>
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
    <div class="comments"></div>
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
    gotoTop() {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    },
  },
  created() {
    // console.log(this.$route.params.id);

    this.getContent();
    this.getComments();
  },
  updated() {
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
  width: 80%;
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
</style>
