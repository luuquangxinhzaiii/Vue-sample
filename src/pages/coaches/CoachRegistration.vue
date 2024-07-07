<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <h2>Register as a coach now!</h2>
        <coach-form @save-data="saveData"></coach-form>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachForm from '@/componments/coaches/CoachForm.vue'

export default {
  components: {
    CoachForm
  },
  data() {
    return {
      error: null,
    }
  },
  methods: {
    async saveData(data){
      try{
        await this.$store.dispatch('coaches/registerCoach', data);
        this.$router.push('/coaches')
      }catch(error){
        this.error = error || 'fail to registration';
      }  
    },
    handleError(){
      this.error = null;
    }
  },
}
</script>

<style></style>