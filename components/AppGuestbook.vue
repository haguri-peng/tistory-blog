<template>
  <div class="guestbook">
    <h2>
      ◎ Guest Book
      <span class="count">{{ this.count }}</span>
    </h2>
    <div></div>
  </div>
</template>

<script>
import { getGuestbookCount } from '../api/posts';

export default {
  data() {
    return {
      count: 0,
      isLast: true,
      gbList: [],
      reqUserId: '',
      reqUserRole: '',
    };
  },
  methods: {
    async getCount() {
      const { data } = await getGuestbookCount();
      //   console.log(data);
      if (data.code == 200) {
        this.count = data.result.count;
      }
    },
  },
  created() {
    console.log('Guest Book loading!!');

    this.getCount();
  },
};
</script>

<style scoped>
div.guestbook {
  position: absolute;
  top: 100px;
  width: 60%;
}
h2 {
  text-align: left;
}
span.count {
  color: orangered;
  font-size: 1.3rem;
  vertical-align: top;
}
</style>
