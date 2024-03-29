/** app.js
 *
 * Entry for bundling by webpack.
 * for example, if you have your own script, or plguin,
 * you can import that.
 * ex) import "./bower_components/animate.css/animate.min.css"
 *
 * you are able to include js, css
 * if you want to contain other scripts like .ts, .less, .sass,
 * set the loaders in tidory.config.js
 *
 * after import assets it will be contained in app.js
 */
import { createApp } from 'vue';
import App from '../components/App.vue';
import router from '../router/index';
import store from '../store/index';

// tailwindcss
// npx tailwindcss -i ./assets/app.css -o ./assets/tailwind_output.css --watch
import './tailwind_output.css';

// Gitart Vue Dialog
import 'gitart-vue-dialog/dist/style.css';
import { GDialog } from 'gitart-vue-dialog';

// import the fontawesome core
import { library } from '@fortawesome/fontawesome-svg-core';

// import font awesome icon component
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
  FontAwesomeLayersText,
} from '@fortawesome/vue-fontawesome';

// import specific icons
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

// add icons to the library
library.add(fas, far, fab);

const app = createApp({
  components: {
    App,
  },
});

app
  .use(router)
  .use(store)
  .component('font-awesome-icon', FontAwesomeIcon)
  .component('font-awesome-layers', FontAwesomeLayers)
  .component('font-awesome-layers-text', FontAwesomeLayersText)
  .component('GDialog', GDialog)
  .mount('#app');
