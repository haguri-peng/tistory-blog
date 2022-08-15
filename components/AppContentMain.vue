<template>
  <div>
    <!-- Content Main -->
    <div v-html="content"></div>
    <!-- <div v-html="modContent"></div> -->
    <!-- <Tweet tweet-id="342107352041922560" /> -->
  </div>
</template>

<script>
import * as htmlparser2 from 'htmlparser2';
import _ from 'lodash';
// import Tweet from 'vue-tweet';

export default {
  //   components: {
  //     Tweet,
  //   },
  props: ['content'],
  //   data() {
  //     return {
  //       isUpdated: false,
  //       modContent: '',
  //     };
  //   },
  watch: {
    content() {
      const dom = htmlparser2.parseDocument(this.content);

      if (dom != null) {
        const children = dom.children;
        const twtrEl = _.filter(children, ['name', 'blockquote']);

        if (twtrEl.length > 0) {
          // Tweet widget 보이게 설정
          twttr.widgets.load();
        }
      }

      //   if (!this.isUpdated && dom != null) {
      //     const children = dom.children;
      //     const twtrEl = _.filter(children, ['name', 'blockquote']);
      //     const twtrIds = [];

      //     twtrEl.forEach((currentValue, index, array) => {
      //       const twtrIdTag = _.filter(
      //         currentValue.children,
      //         (c) => c.name == 'a' && c.attribs.href.indexOf('/status/') > -1
      //       );
      //       if (twtrIdTag.length > 0) {
      //         twtrIds.push(
      //           twtrIdTag[0].attribs.href.split('/status/')[1].split('?')[0]
      //         );
      //       }
      //     });

      //     let modifiedContent = this.content;
      //     modifiedContent = modifiedContent.replace(
      //       /<\s*script[^>]*>(.*?)<\s*\/\s*script>/gm,
      //       ''
      //     );

      //     for (let i = 0; i < twtrIds.length; i++) {
      //       modifiedContent = modifiedContent.replace(
      //         /<blockquote[^>]*>((\n|\r|.)*?)<\/blockquote>/gm,
      //         '<Tweet tweet-id="' + twtrIds[i] + '" />'
      //       );
      //     }

      //     this.isUpdated = true;
      //     this.modContent = modifiedContent;
      //   }
    },
  },
};
</script>

<style scoped></style>
