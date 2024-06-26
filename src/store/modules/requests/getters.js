export default {
    getRequest(state, _, _1, rootGetters){
        const loginId = rootGetters.userId;
        return state.requests.filter(x => x.coachId === loginId)
    },
    hasRequest(state, getters){
        return getters.getRequest && getters.getRequest.length > 0;
    }
}