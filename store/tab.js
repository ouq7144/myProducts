export default {
    state: {
        isCollapse: false
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
            console.log(111)
        }
    }
}