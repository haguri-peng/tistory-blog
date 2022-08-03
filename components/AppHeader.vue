<template>
  <header>
    <!-- 카테고리 -->
    <div class="category">
      <ul>
        <li
          v-for="item in categoryList"
          :key="item.menuNm"
          :class="{ active: activeMenu == item.menuNm }"
          @click="clickMenu(item.menuNm, item.link)"
        >
          <span class="menu"> {{ item.menuNm }}</span>
          <span class="cnt"> [{{ item.contentCnt }}] </span>
          <span class="link"> {{ item.link }} </span>
          <span class="newFlag"> {{ showFlag(item.newFlag) }} </span>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  props: ['category'],
  data() {
    return {
      categoryList: [],
      activeMenu: '',
    };
  },
  methods: {
    setCategoryList() {
      if (this.categoryList.length == 0) {
        const arrTmp = JSON.parse(this.category);
        for (let i = 0; i < arrTmp.length; i++) {
          if (arrTmp[i].contentCnt == 0) continue;
          this.categoryList.push(arrTmp[i]);
          if (i == arrTmp.length - 1) {
            this.$forceUpdate();
          }
        }
      }
    },
    showFlag(bNewFlag) {
      if (bNewFlag) {
        return 'N';
      }
    },
    clickMenu(menuNm, link) {
      this.activeMenu = menuNm;
      this.$emit('moveMenu', menuNm, link);
    },
  },
  updated() {
    this.setCategoryList();
  },
};
</script>

<style scoped>
div.category {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  /* overflow-x: auto; */
  /* background-color: #c4dfaa; */
}
div.category ul {
  display: inline-flex;
  height: 100%;
}
div.category ul li {
  list-style: none;
  font-weight: 400;
  padding-right: 40px;
  cursor: pointer;
  align-self: center;
  transition: 0.2s;
}
div.category ul li.active {
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: underline;
}
div.category ul li:hover {
  color: #73a9ad;
  transform: scale(1.05, 1.05);
}
div.category span.cnt {
  font-weight: lighter;
}
div.category span.link {
  display: none;
}
div.category span.newFlag {
  color: red;
  font-weight: 500;
}
</style>
