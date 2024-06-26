import axios from "axios";

export default {
    async registerCoach(context, data){
        const userId = context.rootGetters.userId;
        const coachData = {
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas
        };

        await axios.put(
            `https://vue-firebase-demo-application-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${userId}.json`,
            {
                body: JSON.stringify(coachData)
            }
          );

        context.commit('registerCoach', {
            ...coachData,
            id: userId
        });
    }
};