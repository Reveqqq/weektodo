```js
import Vue from 'vue';
import Vuex from 'vuex';

import tasks from './modules/tasks';
import settings from './modules/settings';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    tasks,
    settings,
  },
  strict: process.env.NODE_ENV !== 'production',
});
```