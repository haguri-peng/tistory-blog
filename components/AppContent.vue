<template>
  <div class="content">
    <div v-html="content"></div>
    <div class="top-down">
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
  </div>
</template>

<script>
import { fetchPost } from '../api/index';

export default {
  data() {
    return {
      title: '',
      content: '',
      tags: [],
      comments: [],
    };
  },
  methods: {
    async getContent() {
      const { data } = await fetchPost(this.$route.params.id);
      // console.log(data);

      if (data.tistory.status == '200') {
        this.content = data.tistory.item.content;

        setTimeout(() => {
          console.log($('div.content').css('height'));
        }, 300);
      }
    },
    gotoTop() {
      window.scrollTo(0, 0);
    },
  },
  created() {
    // console.log(this.$route.params.id);
    this.getContent();
  },
};
</script>

<style scoped>
div.content {
  position: absolute;
  margin-top: 30px;
  top: 60px;
  width: 88%;
  /* background-color: rgba(144, 200, 172, 0.3); */
}
div.content > div > div {
  padding: 10px;
}
div.top-down {
  position: sticky;
  float: right;
  bottom: 20px;
  right: 20px;
}
</style>
