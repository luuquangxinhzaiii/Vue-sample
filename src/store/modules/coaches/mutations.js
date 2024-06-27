export default {
    registerCoach(state, payload){
        state.coaches.push(payload)
    },

    appendCoach(state, payload){
        state.coaches = payload
    }
};