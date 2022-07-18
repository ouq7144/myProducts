<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="7">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <!-- <span>卡片名称</span> -->
                        <img src="../../resources/userImg.jpg" class="userImg">
                        <div class="names">
                            <p class="rootname">Admin</p>
                            <p class="nickname">超级管理员</p>
                        </div>
                    </div>
                    <div class="userhistory">
                        <p class="historytag">上次登录时间：<span>2021-7-19</span></p>
                        <p class="historytag">上次登录地点：<span>成都</span></p>
                    </div>
                </el-card>
                <el-table :data="tableData" class="tablelist">
                    <el-table-column v-for="(item, index) in tableLabel" :key="index" :prop="index" :label="item">
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="17" class="ordercards">
                <el-card shadow="hover" v-for="item in countData" :key="item.name"
                    :body-style="{ display: 'flex', padding: 0, width: '320px', height: '90px', alignItems: 'center', justifyContent: 'left' }"
                    class="eachordercard">
                    <i :class="'el-icon-' + item.icon"
                        :style="{ background: item.color, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30%', fontSize: '30px' }"></i>
                    <div class="names">
                        <p style="font-size: 24px">{{ `¥${item.value}` }}</p>
                        <p style="font-size: 12px">{{ item.name }}</p>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="17">
                <div style="margin-left: 20px;">
                    <el-card class="linechart"
                        :body-style="{ padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }">
                        <div id="main" style="width:600px; height:230px;"></div>
                    </el-card>
                    <div class="bottomcharts">
                        <el-card class="columnchart"
                            :body-style="{ padding: 0}"
                        >
                            <div id="chart2" style="width:inherit; height:240px;"></div>
                        </el-card>
                        <el-card class="piechart"
                            :body-style="{ padding: 0}"
                        >
                            <div id="chart3" style="width:inherit; height:240px;"></div>
                        </el-card>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getData } from '../../api/data'
import * as echarts from 'echarts'
export default {
    name: 'Home',
    data() {
        return {
            tableData: [],
            tableLabel: {
                name: '型号',
                todayBuy: '今日购买',
                monthBuy: '本月购买',
                totalBuy: '总共购买'
            },
            countData: []
        }
    },
    mounted() {
        getData().then(res => {
            const { code, data } = res.data
            if (code === 20000) {
                // 左侧表格数据
                this.tableData = data.tableData
                // 右侧标签数据
                this.countData = data.countData
                // 右侧折线图数据
                const keyArray = Object.keys(data.orderData.data[0])
                const series = []
                keyArray.forEach((key) => {
                    series.push({
                        name: key,
                        data: data.orderData.data.map(item => item[key]),
                        type: 'line'
                    })
                })
                const lineOption = {
                    xAxis: {
                        data: data.orderData.date
                    },
                    yAxis: {},
                    legend: {
                        data: keyArray
                    },
                    series
                }
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('main'))
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(lineOption)
                // 右侧柱形图数据
                const barArray = data.userData
                const barSeriesData1 = []
                const barSeriesData2 = []
                const barXAxis = []
                barArray.forEach((key) => {
                    barSeriesData1.push(key.active)
                    barSeriesData2.push(key.new)
                    barXAxis.push(key.data)
                })
                const barSeries = [
                    {
                        data: barSeriesData2,
                        type: 'bar'
                    },
                    {
                        data: barSeriesData1,
                        type: 'bar'
                    }
                ]
                const barOption = {
                    xAxis: {
                        data: barXAxis
                    },
                    yAxis: {},
                    series: barSeries
                }
                var barChart = echarts.init(document.getElementById('chart2'))
                // 使用刚指定的配置项和数据显示图表。
                barChart.setOption(barOption)
                // 右侧饼状图数据
                const pieArray = data.videoData
                console.log(pieArray, '1121')
                const pieOption = {
                    series: [
                        {
                            type: 'pie',
                            data: pieArray
                        }
                    ]
                }
                var pieChart = echarts.init(document.getElementById('chart3'))
                // 使用刚指定的配置项和数据显示图表。
                pieChart.setOption(pieOption)
                console.log(pieOption, 'aaaa')
            }
        }).catch()
    }
}
</script>

<style>
.clearfix {
    display: flex;
    align-items: center;
}

.userImg {
    border-radius: 50%;
    height: 100px;
    width: 100px;
}

.names {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 40px;
}

.rootname {
    font-size: 30px;
}

.nickname {
    font-size: 14px;
    color: #808080;
}

.userhistory {
    display: flex;
    flex-direction: column;
}

.historytag {
    text-align: left;
    font-size: 14px;
    color: #808080;
}

.historytag span {
    color: #000;
    margin-left: 40px;
}

.tablelist {
    margin-top: 20px;
    height: 500px;
    padding: 20px;
    overflow: hidden;
}

.ordercards {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    max-height: 225px;
    overflow: auto;
}

.ordercards::after {
    content: '';
    width: 200px;
    height: 1px;
}

.eachordercard {
    margin: 0 20px 20px 20px;
}

.linechart {
    height: 250px;
}

.bottomcharts {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
}

.columnchart {
    height: 240px;
    width: 48%;
}

.piechart {
    height: 240px;
    width: 48%;
}
</style>