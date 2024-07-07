import axios from "axios";

export default {
    async contactCoach(context, payload){
        const newRequest = {
            userEmail: payload.email,
            message: payload.message
        };

        const response = await axios.post(
            `https://vue-firebase-demo-application-default-rtdb.asia-southeast1.firebasedatabase.app/request/${payload.coachId}.json`,
            {
              body: JSON.stringify(newRequest),
            }
          ).catch(function (error){
              throw new Error(error.response.statusText || 'false to contact')
          });

        const responseData = response.data;

        newRequest.id = responseData.name;
        newRequest.coachId = payload.coachId;
        context.commit('addRequest', newRequest)
    },

    async fetchRequest(context){
        const coachId = context.rootGetters.userId;
        const response =  await axios.get(
            `https://vue-firebase-demo-application-default-rtdb.asia-southeast1.firebasedatabase.app/request/${coachId}.json`,
        ).catch(function (error){
            throw new Error(error.response.statusText || 'false to fetch contact!')
        });

        const responseData = response.data;
        const requestCoachs = [];

        for(const key in responseData){
            const requestCoach = {
                id: key,
                coachId: coachId,
                userEmail: JSON.parse(responseData[key].body).userEmail,
                message: JSON.parse(responseData[key].body).message,
            }
            requestCoachs.push(requestCoach)
        }

        context.commit("setRequest", requestCoachs);
    }
}