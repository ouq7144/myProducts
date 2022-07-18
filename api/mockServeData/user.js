import Mock from 'mockjs'

function param2Obj (url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"'+
        decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') + 
        '"}'
    )
}

const List = []
const count = 200

for(let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            id: Mock.Random.guid(),
            name: Mock.Random.cname(),
            addr: Mock.mock('@county(true)'),
            'age|18-60': 1,
            birth: Mock.Random.date(),
            sex: Mock.Random.integer(0, 1)
        })
    )
}

export default {
    // 获取数据
    getTableData: () => {
        return {
            code: 20000,
            data: {
                tableData: List
            }
        }
    },

    // 新增
    createUser: config => {
        const { name, addr, birth, sex } = JSON.parse(config.body)
        console.log(JSON.parse(config.body))
        List.unshift({
            id: Mock.Random.guid(),
            name: name,
            addr: addr,
            birth: birth,
            sex: sex
        })
        return {
            code: 20000,
            data: {
                message: '添加成功'
            }
        }
    },
    // 删除
    deleteUser: config => {
        if (!config.body) {
            return {
                code: -999,
                message: '参数不正确'
            }
        } else {
            let index = List.findIndex((item) => {
                return item.id === config.body
              })
              //假设没有找到
              if(index === -1){
                return console.log('删除失败')
              }
              //删除元素
              List.splice(index,1)

            // List = List.filter(u => u.id == id)
            return {
                code: 20000,
                message: '删除成功'
            }
        }
    },
    // 批量删除
    batchremove: config => {
        let { ids } = param2Obj(config.url)
        ids = ids.split(',')
        List = List.filter(u => !ids.includes(u.id))
        return {
            code: 20000,
            message: '批量删除成功'
        }
    },
    // 修改用户
    updateUser: config => {
        const { id, name, addr, birth, sex } = JSON.parse(config.body)
        console.log(config.body, '所修改的数据')
        console.log(id, '数据id')
        const sex_num = parseInt(sex)
        console.log(sex_num, '性别')
        List.some(u => {
            if (u.id === id) {
                u.name = name
                u.addr = addr
                u.birth = birth
                u.sex = sex_num
                return true
            }
        })
        return {
            code: 20000,
            data: {
                message: '编辑成功'
            }
        }
    },
    // 搜索用户
    searchUser: config => {
        const target = config.body
        const searchResults = []
        searchResults.push(...List.filter(item => item.id.includes(target)))
        searchResults.push(...List.filter(item => item.name.includes(target)))
        searchResults.push(...List.filter(item => item.birth.includes(target)))
        if (target === '男') {
            searchResults.push(...List.filter(item => item.sex === 0))
        }
        if (target === '女') {
            if (target === '男') {
            searchResults.push(...List.filter(item => item.sex === 1))
        }
        }
        return {
            code: 20000,
            data: {
                searchResults
            }
        }
    }
}