const getters = {
    token: state => state.user.token,
    username: state => state.user.username,
    roles: state => state.user.roles,
    user: state => state.user.user,
    menus: state => state.user.menus,
    menu: state => state.permission.routers,
    apiRouters: state => state.permission.apiRouters,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    rightNav: state => state.tagsView.rightNav,
    sidebar: state => state.app.sidebar,

}
export default getters