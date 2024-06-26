import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import BaseCard from './componments/UI/BaseCard.vue';
import BaseButton from './componments/UI/BaseButton.vue';
import BaseBagde from './componments/UI/BaseBagde.vue';

const app = createApp(App);

app.use(router);
app.use(store);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBagde);

app.mount('#app');
