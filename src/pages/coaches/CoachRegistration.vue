<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '@/componments/coaches/CoachForm.vue'

export default {
  components: {
    CoachForm
  },
  methods: {
    async saveData(data){
      await this.$store.dispatch('coaches/registerCoach', data);
      this.$router.push('/coaches')
    }
  },
}
</script>

<style></style>