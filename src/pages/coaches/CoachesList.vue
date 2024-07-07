<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
          <base-button link to="/register" v-if="!isCoach && !isLoading">Register as Coach</base-button>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>      
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item 
            v-for="coach in filteredCoaches" 
            :key="coach.id" 
            :id="coach.id" 
            :firstName="coach.firstName"
            :lastName="coach.lastName" 
            :rate="coach.hourlyRate" 
            :areas="coach.areas">
          </coach-item>
        </ul>
        <h3 v-else>No coaches found</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from '@/componments/coaches/CoachItem.vue'
import CoachFilter from '@/componments/coaches/CoachFilter.vue'

export default {
  components: { CoachItem, CoachFilter },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      }
    }
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];

      return coaches.filter(x => {
        if(this.activeFilters.frontend && x.areas.includes('frontend')){
          return true;
        }
        if(this.activeFilters.backend && x.areas.includes('backend')){
          return true;
        }
        if(this.activeFilters.career && x.areas.includes('career')){
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches']
    },
    isCoach(){
      return this.$store.getters['coaches/isCoach'];
    }
  },
  methods: {
    setFilters(updatedFilters){
      this.activeFilters = updatedFilters;
    },
    async loadCoaches(refresh = false){
      this.isLoading = true;
      try{
        await this.$store.dispatch('coaches/loadCoach', {
          forceReload: refresh
        });
      }catch(error){
        this.error = error.message || 'something went wrong!';
      }
      this.isLoading = false;
    },
    handleError(){
      this.error = null;
    }
  },
  created() {
      this.loadCoaches()
    },
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>