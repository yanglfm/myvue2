// dev.env.js下的配置。


//设置开发环境和线上环境的区别，详见： D:\Users\wang.ry\IdeaProjects\spring\dynamicRouter
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    MOCK: true //开发环境使用mock
})