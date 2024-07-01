import { axios } from "axios";

export default {
    async contactCoach(context, payload){
        const newRequest = {
            //id: new Date().toISOString(), --dont use because firebase will generate it
            coachId: payload.coachId,
            userEmail: payload.email,
            message: payload.message
        };

        const response = await axios.put(
            `https://vue-firebase-demo-application-default-rtdb.asia-southeast1.firebasedatabase.app/request/${newRequest.coachId}.json`,
            {
              body: JSON.stringify(newRequest),
            }
          ).catch(function (error){
              throw new Error(error.response.statusText || 'false to contact')
          });

        const responseData = response.data;
        
        newRequest.id = responseData.name;

        context.commit('addRequest', newRequest)
    }
}