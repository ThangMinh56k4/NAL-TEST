import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    user: {
        name: 'Võ Minh Thắng',
        phone: '0342242611',
        email: 'thangminh56k4@gmail.com',
        avata: 'https://www.facebook.com/photo/?fbid=3025568834323042&set=a.1381776862035589&__cft__[0]=AZX9QeZ529A8vE95AUCx9JC4GVbOexMLxcxEQGorjCwN399i2b1RWdNbTNN75H1THczB2kcwCTPKvFcER-BA0XKZzZWfoX_-V5EQYOw-6U4IGM4AnJjREx5Fp3-sx9kWklw&__tn__=EH-R' 
    },
  },
  getters: {
    getUser: (state) => {
      return state.user;
    },
  },
  mutations: {},
  actions: {},
});
