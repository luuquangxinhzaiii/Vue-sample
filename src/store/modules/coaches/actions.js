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
    },

    async loadCoach(context){
        const response = await axios.get(
            `https://vue-firebase-demo-application-default-rtdb.asia-southeast1.firebasedatabase.app/coaches.json`
        )

        const responseData = await response.json();

        const coaches = [];

        for(const key in responseData){
            const coach = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                areas: responseData[key].areas
            }
            coaches.push(coach);
        }

        context.commit('appendCoach', coaches);
    }
};