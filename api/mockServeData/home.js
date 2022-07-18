import Mock from 'mockjs'

let List = []
export default {
    getStatisticalData: () => {
        for( let i = 0; i < 7; i++ ) {
            List.push(
                Mock.mock({
                    苹果: Mock.Random.float(100, 8000, 0, 0),
                    vivo: Mock.Random.float(100, 8000, 0, 0),
                    oppo: Mock.Random.float(100, 8000, 0, 0),
                    魅族: Mock.Random.float(100, 8000, 0, 0),
                    三星: Mock.Random.float(100, 8000, 0, 0),
                    小米: Mock.Random.float(100, 8000, 0, 0)
                })
            )
        }
        return {
            code: 20000,
            data: {
                videoData: [
                    {
                        name: '小米',
                        value: 2888
                    },
                    {
                        name: '苹果',
                        value: 5999
                    },
                    {
                        name: 'vivo',
                        value: 1500
                    },
                    {
                        name: 'oppo',
                        value: 1888
                    },
                    {
                        name: '魅族',
                        value: 2200
                    },
                    {
                        name: '三星',
                        value: 3699
                    }
                ],
                // 柱状图
                userData: [
                    {
                        data: '周一',
                        new: 5,
                        active: 200
                    },
                    {
                        data: '周二',
                        new: 10,
                        active: 500
                    },
                    {
                        data: '周三',
                        new: 12,
                        active: 550
                    },
                    {
                        data: '周四',
                        new: 60,
                        active: 800
                    },
                    {
                        data: '周五',
                        new: 65,
                        active: 550
                    },
                    {
                        data: '周六',
                        new: 53,
                        active: 770
                    },
                    {
                        data: '周日',
                        new: 33,
                        active: 170
                    }
                ],
                // 折线图
                orderData: {
                    date: ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007'],
                    data: List
                },
                // 表格数据
                tableData: [
                    {
                        name: '小米',
                        todayBuy: 100,
                        monthBuy: 300,
                        totalBuy: 800
                    },
                    {
                        name: '苹果',
                        todayBuy: 100,
                        monthBuy: 300,
                        totalBuy: 800
                    },
                    {
                        name: 'vivo',
                        todayBuy: 100,
                        monthBuy: 300,
                        totalBuy: 800
                    },
                    {
                        name: 'oppo',
                        todayBuy: 100,
                        monthBuy: 300,
                        totalBuy: 800
                    }, {
                        name: '魅族',
                        todayBuy: 100,
                        monthBuy: 300,
                        totalBuy: 800
                    },
                    {
                        name: '三星',
                        todayBuy: 100,
                        monthBuy: 300,
                        totalBuy: 800
                    }
                ],
                countData: [
                    {
                        name: '今日支付订单',
                        value: 210,
                        icon: 'circle-check',
                        color: '#22B8CC'
                    },
                    {
                        name: '今日收藏订单',
                        value: 210,
                        icon: 'star-off',
                        color: '#ffb980'
                    },
                    {
                        name: '今日未支付订单',
                        value: 210,
                        icon: 'goods',
                        color: '#51ADF1'
                    },
                    {
                        name: '本月支付订单',
                        value: 210,
                        icon: 'circle-check',
                        color: '#22B8CC'
                    },
                    {
                        name: '本月收藏订单',
                        value: 210,
                        icon: 'star-off',
                        color: '#ffb980'
                    },
                    {
                        name: '本月未支付订单',
                        value: 210,
                        icon: 'goods',
                        color: '#51ADF1'
                    }
                ]
            }
        }
    }
}