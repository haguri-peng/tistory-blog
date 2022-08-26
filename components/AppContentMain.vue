<template>
  <div v-html="content"></div>
</template>

<script>
import * as htmlparser2 from 'htmlparser2';
import _ from 'lodash';

export default {
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
        const twtrEl = _.filter(dom.children, ['name', 'blockquote']);

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
  created() {
    // const $that = this;
    twttr.ready((twttr) => {
      // At this point the widget.js file had been loaded.
      // We can now make use of the twttr events
      twttr.events.bind('loaded', (event) => {
        // At this point all tweets have been fully loaded
        // and rendered and you we can proceed with our Javascript

        // console.log('Created widget', event);
        if (event.widgets.length > 0) {
          // Tweet이 로딩되면서 content 영역이 변경됨에 따라 Aside 영역을 재설정한다.
          this.$emit('refreshAside');
        }
      });
    });
  },
};
</script>

<style scoped>
div {
  font-size: 1.2rem;
  text-align: initial;
  padding: 0 50px;
  width: 80%;
}
</style>
