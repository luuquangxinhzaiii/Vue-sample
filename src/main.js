import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import BaseCard from './componments/UI/BaseCard.vue';
import BaseButton from './componments/UI/BaseButton.vue';
import BaseBagde from './componments/UI/BaseBagde.vue';
import BaseSpinner from './componments/UI/BaseSpinner.vue'
import BaseDialog from './componments/UI/BaseDialog.vue';

const app = createApp(App);

app.use(router);
app.use(store);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBagde);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);

app.mount('#app');
