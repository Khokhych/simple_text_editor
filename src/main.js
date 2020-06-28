import Vue from 'vue'
// import Vuex from 'vuex'
import App from './App.vue'

// Vue.use(Vuex)
// const store = new Vuex.Store({
//     state: {
//         elem: [{
//                 text: 'My lovely',
//                 fontSize: '12px',
//                 color: 'red'
//             },
//             {
//                 text: 'little',
//                 fontSize: '16px',
//                 color: 'pink'
//             }
//         ]
//     },
//     mutations: {
//         increment(state) {
//             // state.count++
//         }
//     }
// })

new Vue({
    render: h => h(App),
    // store: store
}).$mount('#app')