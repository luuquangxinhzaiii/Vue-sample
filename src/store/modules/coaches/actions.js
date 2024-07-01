import axios from "axios";

export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    await axios.put(
      `https://vue-firebase-demo-application-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${userId}.json`,
      {
        body: JSON.stringify(coachData),
      }
    ).catch(function (error){
        throw new Error(error.response.statusText || 'false to registration')
    });

    context.commit("registerCoach", {
      ...coachData,
      id: userId,
    });
  },

  async loadCoach(context) {
    const response = await axios.get(
      `https://vue-firebase-demo-application-default-rtdb.asia-southeast1.firebasedatabase.app/coaches.json`
    ).catch(function (error){
        throw new Error(error.response.statusText || 'fail to fetch!')
    });

    const responseData = response.data;
    const coaches = [];

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: JSON.parse(responseData[key].body).firstName,
        lastName: JSON.parse(responseData[key].body).lastName,
        description: JSON.parse(responseData[key].body).description,
        hourlyRate: JSON.parse(responseData[key].body).hourlyRate,
        areas: JSON.parse(responseData[key].body).areas,
      };
      coaches.push(coach);
    }

    context.commit("appendCoach", coaches);
  },
};
