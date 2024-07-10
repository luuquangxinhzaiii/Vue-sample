import axios from "axios";

let timer;
export default {
  async login(context, payload) {
    context.dispatch('auth', {
      ...payload,
      mode: 'login'
    })
  },

  async signUp(context, payload) {
    context.dispatch('auth', {
      ...payload,
      mode: 'signup'
    })
  },

  async auth(context, payload){
    const mode = payload.mode;
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDClt_nEfc5WAybaacdANvlk1O4xVsr3PI';
    if(mode === 'signup'){
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDClt_nEfc5WAybaacdANvlk1O4xVsr3PI'
    }
    const response = await axios
      .post(
        url,
        {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }
      )
      .catch(function (error) {
        throw new Error(error.response.statusText || "fasle to authen...");
      });

    const responseData = response.data;

    const expiresIn = responseData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', responseData.idToken)
    localStorage.setItem('userId', responseData.localId)
    localStorage.setItem('tokenExpiration', expirationDate)

    timer = setTimeout(function(){
      context.dispatch('autoLogout');
    }, expiresIn)

    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
    });
  },

  autoLogin(context){
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime();

    if(expiresIn < 0){
      return;
    }

    timer = setTimeout(function(){
      context.dispatch('autoLogout');
    }, expiresIn)

    if(token && userId){
      context.commit("setUser", {
        token: token,
        userId: userId,
      });
    }
  },

  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    context.commit("setUser", {
      token: null,
      userId: null,
    });
  },
  autoLogout(context){
    context.dispatch('logout');
    context.commit('didLogout')
  }
};
