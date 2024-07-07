import axios from "axios";

export default {
  login() {},
  async signUp(context, payload) {
    const response = await axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDClt_nEfc5WAybaacdANvlk1O4xVsr3PI",
        {
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          })
          
        }
      )
  
      const responseData = response.data;

      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: response.expiresIn
      })
  },
};
