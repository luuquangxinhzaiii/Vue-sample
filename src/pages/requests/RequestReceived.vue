<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <header>
          <h2>Request received</h2>
        </header>
        <div v-if="isLoading">
          <base-spinner></base-spinner>      
        </div>
        <ul v-else-if="hasRequest && !isLoading">
          <request-item v-for="(req) in receivedRequest" :key="req.id" :email="req.userEmail" :message="req.message"></request-item>
        </ul>
        <h3 v-else>You have not received ant request</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import RequestItem from '../../componments/requests/RequestItem.vue'

export default {
  data() {
    return {
      isLoading: false,
      error: null
    }
  },
  components: {
    RequestItem
  },  
  computed: {
    receivedRequest(){
      return this.$store.getters['requests/getRequest'];
    },
    hasRequest (){
      return this.$store.getters['requests/hasRequest'];
    }
  },
  created() {
    this.loadCoachRequest();
  },
  methods: {
    async loadCoachRequest(){
      this.isLoading = true;
      try{
        await this.$store.dispatch('requests/fetchRequest')
      }catch(error){
        this.error = error.message || 'something failed!';
      }
      this.isLoading = false;
    },
    handleError(){
      this.error = null;
    }
  },
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>