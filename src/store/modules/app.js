import Cookies from 'js-cookie'

const app = {

    state: {
        sidebar: {
            opened: !+Cookies.get('opened'),
        }
    },
    mutations: {
        SHOW_NAV_BAR: state => {
            console.log("state---opened---->",state.sidebar.opened)
            if (state.sidebar.opened) {
                Cookies.set('opened', 1)
            } else {
                Cookies.set('opened', 0)
            }
            state.sidebar.opened = !state.sidebar.opened
        }
    },
    actions: {
        showNavBar({commit}) {
            commit('SHOW_NAV_BAR')
        }
    }

}
export default app


