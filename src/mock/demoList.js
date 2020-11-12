let demoList = [{
    id: 1,
    name: 'zs',
    age: '23',
    job: '前端工程师'
}, {
    id: 2,
    name: 'ww',
    age: '24',
    job: '后端工程师'
}]

export default {
    'get|/parameter/query': option => {
        return {
            code: 200,
            message: 'success',
            data: demoList
        };
    },
    demoList: config => {
        return {
            code: 200,
            message: 'success',
            data: demoList
        }
    },
    updateUser: config => {
        console.log("------config------>", config)
        const {id, name, age} = JSON.parse(config.body)
        demoList.some(item => {
            if (item.id === id) {
                item.name = name
                item.age = age
            }
        })
        return {
            code: 200,
            data: config,
            message: '编辑成功'
        }
    }

}