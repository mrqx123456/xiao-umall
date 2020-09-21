import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

// 导出
export default  new Vuex.Store({
    state:{

    },
    mutations:{
        setUser(state,user){
            state.user = user
        }
    },
    plugins:[createPersistedState()]
    
})