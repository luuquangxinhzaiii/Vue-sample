<template>
  <section>
    <coach-filter @change-filter="setFilters"></coach-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh</base-button>
        <base-button link to="/register" v-if="!isCoach">Register as Coach</base-button>
      </div>
      <ul v-if="hasCoaches">
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
</template>

<script>
import CoachItem from '@/componments/coaches/CoachItem.vue'
import CoachFilter from '@/componments/coaches/CoachFilter.vue'

export default {
  components: { CoachItem, CoachFilter },
  data() {
    return {
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
      return this.$store.getters['coaches/hasCoaches']
    },
    isCoach(){
      return this.$store.getters['coaches/isCoach'];
    }
  },
  methods: {
    setFilters(updatedFilters){
      this.activeFilters = updatedFilters;
    }
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