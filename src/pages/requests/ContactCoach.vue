<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <div v-if="isLoading">
      <base-spinner></base-spinner>      
    </div>
    <form @submit.prevent="submitForm" v-else>
      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" id="email" v-model.trim="email">
      </div>
      <div>
        <label for="message">Message</label>
        <textarea name="message" id="message" cols="10" rows="5" v-model.trim="message"></textarea>
      </div>
      <p class="error" v-if="!formIsValid">Invalid form value</p>
      <div class="action">
        <base-button>Contact</base-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      error: null, 
      email: '',
      message: '',
      formIsValid: true,
    }
  },
  methods: {
    submitForm(){
      this.isLoading = true;
      this.formIsValid = true;
      if(this.email === '' || !this.email.includes('@') || this.message === ''){
        this.formIsValid = false;
        return;
      }
      try{
        this.$store.dispatch('requests/contactCoach', {
          coachId: this.$route.params.id,
          email: this.email,
          message: this.message
        });

        this.isLoading = false;
        this.$router.replace('/coaches')
      }catch(error){
        this.error = error;
        this.isLoading = false;
      }
    },
    handleError(){
      this.error = null;
    }
  },
}
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>