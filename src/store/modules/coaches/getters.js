export default {
    coaches(state){
        return state.coaches;
    },
    hasCoaches(state){
        return state.coaches && state.coaches.length > 0;
    },
    isCoach(_, getters, _1, rootGetters){
        const coaches = getters.coaches;
        const userId = rootGetters.userId; 
        return coaches.some(obj => obj.id === userId);
    }
};