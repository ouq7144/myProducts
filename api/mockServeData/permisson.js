import Mock from 'mockjs'
export default {
    getMenu: config => {
        const { username, password } = JSON.parse(config.body)
        if (username === 'admin' && password === 'admin') {
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: '/',
                            name: 'Home',
                            label: '首页',
                            icon: 's-home',
                            url: 'Home/index'
                        },
                        {
                            path: '/Mall',
                            name: 'Mall',
                            label: '商品管理',
                            icon: 'video-play',
                            url: 'Mall/index'
                        },
                        {
                            path: '/User',
                            name: 'User',
                            label: '用户管理',
                            icon: 'user',
                            url: 'User/index'
                        },
                        {
                            label: '其他',
                            icon: 'location',
                            children: [
                                {
                                    path: '/Other/PageOne',
                                    name: 'PageOne',
                                    label: '页面1',
                                    icon: 'setting',
                                    url: '/Other/PageOne'
                                },
                                {
                                    path: '/Other/PageTwo',
                                    name: 'PageTwo',
                                    label: '页面2',
                                    icon: 'setting',
                                    url: '/Other/PageTwo'
                                }
                            ]
                        }
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else {
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: '/',
                            name: 'Home',
                            label: '首页',
                            icon: 's-home',
                            url: 'Home/index'
                        },
                        {
                            path: '/Mall',
                            name: 'Mall',
                            label: '商品管理',
                            icon: 'video-play',
                            url: 'Mall/index'
                        }
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        }
    }
}