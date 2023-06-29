<template>
  <!-- <div v-html="content"></div> -->
  <div v-html="modContent" class="contentMain"></div>
</template>

<script setup>
import { ref, toRefs, watch, onMounted, onUpdated } from 'vue';

import * as htmlparser2 from 'htmlparser2';
import _ from 'lodash';
import loadScript from '../utils/load-script';

const emit = defineEmits(['refreshAside']);
const props = defineProps(['content']);

const { content } = toRefs(props);

// data
const isUpdated = ref(false);
const modContent = ref('');

// watch
watch(content, (val) => {
  const dom = htmlparser2.parseDocument(val);

  if (dom != null && !isUpdated.value) {
    let modifiedContent = val;

    // 광고 adfit
    const ads = _.filter(
      dom.children,
      (c) => c.name == 'figure' && c.attribs.class == 'ad-wp'
    );
    // console.log(ads);
    if (ads.length > 0) {
      for (let i = 0; i < ads.length; i++) {
        if (ads[i].attribs['data-ad-vendor'] == 'adfit') {
          const regex = new RegExp(
            '<figure[^>]*.data-ad-id-pc="(' +
              ads[i].attribs['data-ad-id-pc'] +
              ').*><\/figure>'
          );
          modifiedContent = modifiedContent.replace(regex, getAdfitHtml());
        }
      }
    }

    isUpdated.value = true;
    modContent.value = modifiedContent;
  }
});
watch(modContent, (val) => {
  const dom = htmlparser2.parseDocument(val);

  if (dom != null) {
    // Twitter Widget이 있으면 로딩
    const twtrEl = _.filter(dom.children, ['name', 'blockquote']);
    if (twtrEl.length > 0) {
      // Tweet widget 보이게 설정
      twttr.widgets.load();
    }

    // 코드 구문 강조
    setTimeout(() => {
      hljs.highlightAll();
      $('code[class^=hljs]').css('font-family', "'Monaco'");
      $('code[class^=hljs] span').css('font-family', "'Monaco'");
    }, 100);

    // load AdFit
    adfitLoader().then(() => {
      adfit();
    });
  }
});

onMounted(() => {
  window.onload = () => {
    emit('refreshAside');
  };

  twttr.ready((twttr) => {
    // At this point the widget.js file had been loaded.
    // We can now make use of the twttr events
    twttr.events.bind('loaded', (event) => {
      // At this point all tweets have been fully loaded
      // and rendered and you we can proceed with our Javascript

      // console.log('Created widget', event);
      if (event.widgets.length > 0) {
        // Tweet이 로딩되면서 content 영역이 변경됨에 따라 Aside 영역을 재설정한다.
        emit('refreshAside');
      }
    });
  });

  // highlight.js
  // 블로그 내에서 설정한 스타일을 해제하고 다른 스타일로 적용
  $('link[href*=atom]').attr('disabled', 'disabled');

  let link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href =
    'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/night-owl.min.css';
  document.head.appendChild(link);
});
onUpdated(() => {
  $('pre').css('font-size', '0.9rem').css('line-height', '21px');

  // 별도로 CSS 설정
  $('div.contentMain ul, div.contentMain ol').css('padding-left', '30px');
  $('div.contentMain p').css('margin', '5px 0');
});

// function
function adfitLoader() {
  if (typeof window['adfit'] === 'function') {
    return Promise.resolve();
  } else {
    return loadScript('//t1.daumcdn.net/kas/static/ba.min.js', 'async');
  }
}
function getAdfitHtml() {
  const adfitMiddleId = 'DAN-OrpQV5Dh13ppgSiy';
  const width = '728';
  const height = '90';

  return `<ins class="kakao_ad_area" data-ad-unit="${adfitMiddleId}" data-ad-width="${width}" data-ad-height="${height}"></ins>`;
}
</script>

<style scoped>
div {
  font-size: 1.2rem;
  text-align: initial;
  padding: 0 50px;
  width: 80%;
}
</style>
