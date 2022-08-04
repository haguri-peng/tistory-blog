<template>
  <header>
    <!-- 카테고리 -->
    <div class="category">
      <ul>
        <li
          v-for="category in categoryList"
          :key="category.id"
          :class="{ active: activeCategory == category.name }"
          @click="clickCategory(category.name)"
        >
          <span class="menu"> {{ category.name }}</span>
          <span class="cnt"> [{{ category.entries }}] </span>
          <!-- <span class="newFlag"> {{ showFlag(category.newFlag) }} </span> -->
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  props: ['categoryList'],
  data() {
    return {
      activeCategory: '',
    };
  },
  methods: {
    // showFlag(bNewFlag) {
    //   if (bNewFlag) {
    //     return 'N';
    //   }
    // },
    clickCategory(name) {
      this.activeCategory = name;
      this.$emit('moveCategory', name);
    },
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
  /* padding-right: 40px; */
  padding: 0 20px;
  cursor: pointer;
  align-self: center;
  transition: 0.2s;
}
div.category ul li.active {
  color: lightcoral;
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
div.category span.newFlag {
  color: red;
  font-weight: 500;
}
</style>
