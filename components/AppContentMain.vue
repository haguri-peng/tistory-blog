<template>
  <div v-html="content"></div>
</template>

<script>
import * as htmlparser2 from 'htmlparser2';
import _ from 'lodash';
import loadScript from '../utils/load-script';

import 'vue-code-highlight/themes/prism-tomorrow.css';
import 'vue-code-highlight/themes/window.css';

function adfitLoader() {
  if (typeof window['adfit'] === 'function') {
    return Promise.resolve();
  } else {
    return loadScript('https://t1.daumcdn.net/kas/static/ba.min.js', 'defer');
  }
}

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
        // Twitter Widget이 있으면 로딩
        const twtrEl = _.filter(dom.children, ['name', 'blockquote']);
        if (twtrEl.length > 0) {
          // Tweet widget 보이게 설정
          twttr.widgets.load();
        }

        // 코드 영역이 있으면 구문 강조
        const codeEl = _.filter(
          dom.children,
          (c) => c.name == 'div' && c.attributes[0].name == 'v-highlight'
        );
        if (codeEl.length > 0) {
          setTimeout(() => {
            Prism.highlightAll();
          }, 500);
        }

        // 광고 adfit
        const ads = _.filter(
          dom.children,
          (c) => c.name == 'figure' && c.attribs.class == 'ad-wp'
        );
        console.log(ads);
        if (ads.length > 0) {
          adfitLoader().then(() => {
            adfit();
          });
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
  updated() {
    $('div pre[class*="language-"]')
      .css('padding', '30px 0 10px 10px')
      .css('font-size', '1rem');
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
div ul {
  padding-left: 30px;
}
</style>
