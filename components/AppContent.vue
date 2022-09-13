<template>
  <!-- Left -->
  <div class="nav">
    <div class="category">
      [Category]
      <div class="category-name" @click="moveCategory">
        {{ categoryName }}
      </div>
    </div>
    <!-- AdFit tistory sidebar 광고 -->
    <div class="adfit">
      <ins
        class="kakao_ad_area"
        data-ad-unit="DAN-pm2qlQF9u7DdI0BL"
        data-ad-width="160"
        data-ad-height="600"
      ></ins>
    </div>
  </div>

  <!-- Right -->
  <div class="aside">
    <div class="list">
      <ul></ul>
    </div>
    <div class="image">
      <img
        src="../images/fat_haguri.png"
        alt=""
        style="width: 150px; height: 200px; margin-top: 50px; float: left"
      />
    </div>
    <div class="recentTagData">
      <font-awesome-icon icon="fa-solid fa-tags" />
      <span v-for="tag in recentTagData"> #{{ tag }} </span>
    </div>
  </div>

  <div class="content" ref="content">
    <div class="title">
      <h1>{{ title }}</h1>
      <p class="date">작성일시: {{ date }}</p>
    </div>

    <app-content-main
      :content="content"
      @refreshAside="setAsideSection"
    ></app-content-main>

    <div class="tags">
      Tags
      <font-awesome-icon icon="fa-solid fa-tags" style="margin-right: 20px" />
      <span
        class="tag"
        v-for="(tag, index) in tags"
        :key="index"
        @click="searchTag(tag)"
      >
        <!-- <span class="title" v-if="index === 0"> </span> -->
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
              noAuth: comment.homepage != $parent.$parent.loginId,
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
              noAuth: comment.homepage != $parent.$parent.loginId,
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
              <li @click="delComment(comment.id, comment.homepage)">삭제</li>
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
  fetchCategoryList,
  fetchPostList,
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
      date: '',
      comments: [],
      categoryName: '',
      recentTagData: '',
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
        this.date = data.tistory.item.date;

        // 카테고리 목록 조회
        this.getCategoryList();

        // 최근글 5개에서 태그 정보를 가져온다.
        this.getTagList();

        // aside 영역 세팅
        // content 부분을 세팅하는 딜레이가 있어서 적정한 timeout을 줘서 처리(0.3초)
        this.setAsideSection();

        // 스크롤 Event 설정
        // 스크롤 위치에 따라 어느 영역에 있는지 확인하여 색상을 변경
        $(window).scroll(function () {
          const top = $(window).scrollTop();
          // console.log('top >> ' + top);

          let bFind = false;
          $('div.aside ul li').each(function (idx, item) {
            if (
              !bFind &&
              parseInt($(this).data('offsetTop')) <= top + 1 &&
              ($(this).next().length > 0
                ? parseInt($(this).next().data('offsetTop'))
                : top + 1) >=
                top + 1
            ) {
              $(this).css('color', '#df7861');
              bFind = true;
            } else {
              $(this).css('color', '');
            }
          });
        });
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
      if (this.$parent.$parent.loginId == '') {
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
        // objData.blogName = this.$parent.$parent.loginId;
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
    async delComment(commentId, homepage) {
      if (confirm('댓글을 삭제하시겠습니까?')) {
        const objData = {
          blogName: homepage.split('//')[1].split('.')[0],
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
    async getCategoryList() {
      const { data } = await fetchCategoryList();

      if (data.tistory.status == '200') {
        const currentCategory = _.find(data.tistory.item.categories, [
          'id',
          this.categoryId,
        ]);
        // console.log(currentCategory);

        if (currentCategory != null && currentCategory != undefined) {
          this.categoryName = currentCategory.label.replace(/\//g, ' > ');
        }
      }
    },
    async getTagList() {
      const { data } = await fetchPostList();
      // console.log(data);

      if (data.tistory.status == '200') {
        // 최근글 5개만
        const postList = _.take(data.tistory.item.posts, 5);

        let tagList = [];
        for (const post of postList) {
          const { data } = await fetchPost(post.id);
          if (data.tistory.status == '200') {
            tagList = _.flatten([
              ...tagList,
              ...(data.tistory.item.tags.tag || []),
            ]);
          }
        }

        tagList = _.uniq(tagList);
        this.recentTagData = tagList;
      }
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
    setAsideSection() {
      $('div.aside ul li').remove();
      $('div.aside').hide();

      setTimeout(() => {
        let sAsideHtml = '';
        $('div.content')
          .find('h2,h3,h4')
          .each(function (idx, item) {
            const tagName = item.tagName.toLowerCase();
            // let fontSize = '';
            // if (tagName == 'h2') {
            //   fontSize = '1rem;';
            // } else if (tagName == 'h3') {
            //   fontSize = '0.9rem;';
            // } else if (tagName == 'h4') {
            //   fontSize = '0.8rem;';
            // }
            sAsideHtml +=
              '<li class="' +
              tagName +
              '" style="font-size: 1rem' +
              // fontSize +
              ' margin: 2px 0">' +
              $(this).text() +
              '</li>';
          });
        $('div.aside ul').append(sAsideHtml);
        $('div.aside ul li')
          .hover(
            // hover
            function () {
              $(this)
                // .css('color', '#76549a')
                .css('text-decoration', 'underline')
                .css('cursor', 'pointer');
            },
            function () {
              $(this)
                // .css('color', '')
                .css('text-decoration', '')
                .css('cursor', '');
            }
          )
          .click(function () {
            // 클릭 시 해당 영역으로 스크롤 이동
            const asideTag = $(this).attr('class');
            const asideText = $(this).text();

            const clickEl = $('div.content')
              .find(asideTag)
              .filter(function () {
                return $(this).text() == asideText;
              });
            // console.log(clickEl);

            if (clickEl.length > 0) {
              clickEl[0].scrollIntoView({ behavior: 'smooth' });
            }
          })
          .each(function (idx, item) {
            const asideTag = $(this).attr('class');
            const asideText = $(this).text();

            const el = $('div.content')
              .find(asideTag)
              .filter(function () {
                return $(this).text() == asideText;
              });
            // console.log(el);

            if (el.length > 0) {
              const headerHeight = 60;
              const contentTopMargin = 30;

              $(this).attr(
                'data-offset-top',
                el[0].offsetTop + headerHeight + contentTopMargin
              );
            }
          });
        $('div.aside').fadeIn();
      }, 500);
    },
    moveCategory() {
      this.$router.push(`/category/${this.categoryId}`);
    },
    searchTag(tag) {
      // console.log(tag);
      // 작업중..
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
  margin-right: 20px;
  z-index: 110;
}
div.title {
  margin-bottom: 59px;
}
div.title h1 {
  color: #df7861;
}
div.title p.date {
  color: #76549a;
  font-size: 0.9rem;
}
div.tags {
  color: #76549a;
  margin-top: 20px;
  padding: 0 50px;
}
div.tags span.tag {
  margin-right: 5px;
}
div.tags span.tag:hover {
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
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
div.nav {
  position: fixed;
  left: 0;
  top: 150px;
  bottom: 0;
  width: 20%;
  text-align: right;
  z-index: 100;
}
div.nav div.category {
  color: #76549a;
}
div.nav div.category div.category-name {
  margin-left: 5px;
}
div.nav div.category div.category-name:hover {
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}
div.nav div.adfit {
  position: absolute;
  bottom: 0;
  right: 0;
}
div.aside {
  position: fixed;
  right: 0;
  top: 100px;
  width: 20%;
  z-index: 100;
  display: inline-grid;
}
div.aside > div.list {
  text-align: left;
  border-left: 2px solid #df7861;
}
div.aside ul {
  padding-left: 10px;
  list-style: none;
}
div.aside div.recentTagData {
  margin-top: 80px;
  width: 90%;
  text-align: left;
  font-size: 0.8rem;
}
div.aside div.recentTagData span:hover {
  text-decoration: underline;
  font-weight: bold;
  cursor: pointer;
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
