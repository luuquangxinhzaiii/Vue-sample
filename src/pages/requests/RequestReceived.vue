<template>
  <section>
    <base-card>
      <header>
        <h2>Request received</h2>
      </header>
      <ul v-if="hasRequest">
        <request-item v-for="(req) in receivedRequest" :key="req.id" :email="req.userEmail" :message="req.message"></request-item>
      </ul>
      <h3 v-else>You have not received ant request</h3>
    </base-card>
  </section>
</template>

<script>
import RequestItem from '../../componments/requests/RequestItem.vue'

export default {
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
  }
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