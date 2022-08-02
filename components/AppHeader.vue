<template>
  <header>
    <!-- <s_sidebar>
      <s_sidebar_element> -->
    <!-- 카테고리 -->
    <div class="category">
      <!-- <h3>카테고리</h3> -->
      <!-- {{ categoryList }} -->
    </div>
    <!-- </s_sidebar_element>
    </s_sidebar> -->
  </header>
</template>

<script>
export default {
  // props: ['categoryList'],
  created() {
    // console.log($('.link_item'));
  },
};
</script>

<style scoped>
div.category {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 200px;
  overflow-x: auto;
}
.tt_category {
  position: absolute;
  /* top: 160px;
  left: 50px; */
  box-sizing: border-box;
  /* list-style: none;
  padding-bottom: 45px;
  overflow: auto; */
}
.tt_category .link_tit {
  display: none;
}
.tt_category .category_list {
  display: inline-flex;
}
.tt_category .category_list .c_cnt {
  display: none;
}
.tt_category .category_list li {
  list-style: none;
  /* padding: 20px 0; */
  font-weight: 400;
  padding-right: 40px;
}
/* .tt_category .category_list li:first-child {
  padding-top: 0;
} */
.tt_category .category_list li:last-child {
  padding-bottom: 0;
}
.tt_category .category_list li .index {
  margin-bottom: 10px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;
}
.tt_category .category_list li .link_item {
  color: rgba(0, 0, 0, 0.8);
  transition-duration: unset;
  font-weight: 300;
}
.tt_category .category_list li .link_item img {
  display: none;
}
.tt_category .category_list li.current .index {
  color: lightcoral;
}
.tt_category .category_list li.current .link_item {
  color: crimson;
  font-weight: 500;
}
</style>
