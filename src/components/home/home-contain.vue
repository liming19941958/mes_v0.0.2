<template>


    <div class="main-content-table-page">

            <div class="home-page-box">
<!--                 设备运行状态-->
                <div id="equipment-operating-status" ref="EquipmentOperatingStatus"></div>
<!--                 今日不良-->
                <div id="bad-today" ref="BadToday"></div>
<!--                 设备利用率及预警信息-->
                <div id="equipment-utilization">
<!--                    利用率仪表盘-->
                    <div class="equipment-utilization-firstLine">
                       <div class="utilization-dashboard-text">设备利用率</div>
<!--                    利用率仪表盘-->
                       <div id="utilization-dashboard" ref="UtilizationDashboard">
<!--                           <div class="utilization-dashboard-first"></div>-->
<!--                           <div class="utilization-dashboard-second"></div>-->
<!--                           <div class="utilization-dashboard-third"></div>-->
                       </div>
<!--                    合格率-->
                       <div class="pass-rate">
                           <p>合格率(%)</p>
                           <p>20%</p>
                       </div>
                    </div>
                    <div class="equipment-utilization-secondLine">
                        <div>
                            <div>
                                <div>
                                    <p class="first-p">8</p>
                                    <p>生产预警</p>
                                </div>
                                <el-divider direction="vertical" class="divider"></el-divider>
                            </div>
                            <div>
                                <div>
                                    <p class="second-p">15</p>
                                    <p>质量预警</p>
                                </div>
                            <el-divider direction="vertical"></el-divider>
                            </div>
                            <div>
                                <div>
                                    <p class="third-p">85</p>
                                    <p>工艺预警</p>
                                </div>
                            <el-divider direction="vertical"></el-divider>
                            </div>
                            <div>
                                <div>
                                    <p class="fourth-p">56</p>
                                    <p>设备预警</p>
                                </div>
                            <el-divider direction="vertical"></el-divider>
                            </div>
                            <div>
                                <div>
                                    <p class="fifth-p">75</p>
                                    <p>模具预警</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
<!--                 设备利用率走势图-->
                <div id="Equipment-utilization-trend-chart" ref="EquipmentUtilizationTrendChart"></div>
<!--                 预警提示框-->
                <div id="qarning-box" >
                    <ul v-for="item in tableData" :key="item.date">
                        <li><i class="el-icon-warning-outline"></i></li>
                        <span>{{item.name}}</span>
                    </ul>
                </div>
<!--                 生产状况-->
                <div id="production-status" ref="ProductionStatus"></div>
<!--                 合格率走势图-->
                <div id="qualification-rate-chart" ref="QualificationRateChart"></div>
            </div>

    </div>


</template>

<script>
    // 引入基本模板
    let echarts = require('echarts/lib/echarts')
    // 1、引入饼图组件
    require('echarts/lib/chart/pie')
    // 1.1引入提示框和title组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
    // 引入饼图注释组件
    require('echarts/lib/component/legend')

    //2、引入雷达图组件
    require('echarts/lib/chart/radar')
    //3、引入仪表盘组件（radar）
    require('echarts/lib/chart/gauge')

    //4、引入折线图组件
    require('echarts/lib/chart/line')
    //5、引入柱状图图组件
    require('echarts/lib/chart/bar')
    //5、引入marker组件
    require('echarts/lib/component/markLine')
    require('echarts/lib/component/markArea')
    require('echarts/lib/component/markPoint')
    require('echarts/lib/component/toolbox')


    export default {
        name: 'hello',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                tableData: [{
                    date: '2016-05-01',
                    name: '生产预警',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    name: '质量预警',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-03',
                    name: '工艺预警',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '设备预警',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-05',
                    name: '模具预警',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '设备预警',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '工艺预警',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '生产预警',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-09',
                    name: '工艺预警',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-10',
                    name: '质量预警',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-11',
                    name: '模具预警',
                    address: '上海市普陀区金沙江路 1518 弄'
                }
                    , {
                        date: '2016-05-12',
                        name: '欢乐海岸',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }
                    , {
                        date: '2016-05-13',
                        name: '质量预警',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }
                    , {
                        date: '2016-05-14',
                        name: '生产预警',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }
                    , {
                        date: '2016-05-15',
                        name: '模具预警',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }]
            }
        },
        // created(){this.drawLine();},
        mounted() {
            this.drawLine();
        },
        methods: {
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let EquipmentOperatingStatus = echarts.init(this.$refs.EquipmentOperatingStatus);
                let BadToday = echarts.init(this.$refs.BadToday);
                let UtilizationDashboard = echarts.init(this.$refs.UtilizationDashboard);
                let EquipmentUtilizationTrendChart = echarts.init(this.$refs.EquipmentUtilizationTrendChart);
                let ProductionStatus = echarts.init(this.$refs.ProductionStatus);
                let QualificationRateChart = echarts.init(this.$refs.QualificationRateChart);
                // 绘制设备运行状态图表
                EquipmentOperatingStatus.setOption({
                    title: {
                        top:2,
                        left: 10,
                        text: '设备运行状态' },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        itemWidth:40,
                        itemHeight:15,
                        top:25,
                        left: 10,
                        data: ['生产', '试模/打样', '维修', '待单', '待料','修模'],

                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            top:15,
                            left:100,
                            color: ['#11dd1c','#ff8b25','#e60f12','#7e7e7e','#357BDD','#FFA1E3'],
                            radius: ['55%', '80%'],
                            avoidLabelOverlap: false,
                            label: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data: [
                                {value: 335, name: '生产'},
                                {value: 310, name: '试模/打样'},
                                {value: 234, name: '维修'},
                                {value: 135, name: '待单'},
                                {value: 1548, name: '待料'},
                                {value: 195, name: '修模'}
                            ]
                        }
                    ]
                });
                // 绘制设备运行状态图表
                BadToday.setOption({
                    title: {
                        left:10,
                        text: '今日不良'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 10,
                        top:25,
                        data: ['A班','B班']
                    },
                    radar: [
                        {
                            indicator: [
                                {text: '品牌', max: 200},
                                {text: '内容', max: 200},
                                {text: '可用性', max: 200},
                                {text: '功能', max: 200},
                                {text:'基霸',max:200},
                                {text:'基霸',max:200}
                            ],
                            center: ['50%', '45%'],
                            radius: ['25%', '68%'],
                        },

                    ],
                    series: [
                        {
                            type: 'radar',
                            color: ['#3797dd','#ffbecb'],
                            tooltip: {
                                trigger: 'item'
                            },
                            areaStyle: {},
                            data: [
                                   {
                                    value: [110, 0, 85, 90,185,182],
                                    name: 'A班'
                                },
                                {
                                    value: [25, 30, 35, 42, 29,10],
                                    name: 'B班'
                                }
                            ]
                        },
                    ]
                });
                UtilizationDashboard.setOption({
                    tooltip: {
                        formatter: "{a} <br/>{b} : {c}%",
                    },
                    series: [
                        {
                            type: 'gauge',
                            name: '数据指标',
                            center:['20%','50%'],
                            radius: '100%',  //仪表盘半径，可以是相对于容器高宽中较小的一项的一半的百分比，也可以是绝对的数值
                            axisLine: {      //仪表盘轴线相关配置
                                show:true,
                                lineStyle: {
                                    color: [  //仪表盘背景颜色渐变
                                        [1,new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                            {
                                                offset: 1,
                                                color: "#fd2100"
                                            },
                                            {
                                                offset: 0.3,
                                                color: "#d09f00"
                                            },
                                            {
                                                offset: 0.1,
                                                color: "#26fd00"
                                            }
                                        ])
                                        ]
                                    ],
                                    width:15,  //轴线宽度
                                },
                            },
                            splitLine: {  //分隔线样式。
                                show: true,
                                interval:0,
                                length:15,//默认会采用标签不重叠的策略间隔显示标签。可以设置成 0 强制显示所有标签。
                                lineStyle:{   //分割线样式
                                    width:1,
                                    length:10
                                }
                            },
                            axisLabel: {  // 刻度标签
                                show:true,
                                color: '#000',
                                radius:200,
                                fontSize:8,   //改变仪表盘内刻度数字的大小
                                shadowColor : '#000000', //默认透明
                            },
                            title: {	//仪表盘标题。
                                show: false,				//是否显示标题,默认 true。
                                offsetCenter: [0,"60%"],//相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
                                color: '#000',
                                fontWeight: '100',
                                fontSize: '18',
                            },

                            detail: {				// 仪表盘详情，用于显示数据。
                                show: true,				// 是否显示详情,默认 true。
                                offsetCenter: [1,"65%"],// 相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
                                color: '#797979',
                                fontWeight: '400',
                                fontSize: '20',
                                formatter: "{value}%",	// 格式化函数或者字符串
                            },
                            data: [{ value: 25, name: '本月' }],
                            markPoint:{  //图表标注
                                symbol:'rect', //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
                                symbolSize:5,
                                data:[
                                    //跟你的仪表盘的中心位置对应上，颜色可以和画板底色一样
                                    {x:'center',y:'center',itemStyle:{color:'#FFF'}}
                                ]
                            },
                        },
                        {
                            type: 'gauge',
                            name: '数据指标',
                            center:['55%','50%'],
                            radius: '100%',  //仪表盘半径，可以是相对于容器高宽中较小的一项的一半的百分比，也可以是绝对的数值
                            axisLine: {      //仪表盘轴线相关配置
                                show:true,
                                lineStyle: {
                                    color: [  //仪表盘背景颜色渐变
                                        [1,new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                            {
                                                offset: 1,
                                                color: "#fd2100"
                                            },
                                            {
                                                offset: 0.3,
                                                color: "#d09f00"
                                            },
                                            {
                                                offset: 0.1,
                                                color: "#26fd00"
                                            }
                                        ])
                                        ]
                                    ],
                                    width:15,  //轴线宽度
                                },
                            },
                            splitLine: {  //分隔线样式。
                                show: true,
                                interval:0,
                                length:15,//默认会采用标签不重叠的策略间隔显示标签。可以设置成 0 强制显示所有标签。
                                lineStyle:{   //分割线样式
                                    width:1,
                                    length:10
                                }
                            },
                            axisLabel: {  // 刻度标签
                                show:true,
                                color: '#000',
                                radius:200,
                                fontSize:8,   //改变仪表盘内刻度数字的大小
                                shadowColor : '#000000', //默认透明
                            },
                            title: {	//仪表盘标题。
                                show: false,				//是否显示标题,默认 true。
                                offsetCenter: [0,"60%"],//相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
                                color: '#000',
                                fontWeight: '100',
                                fontSize: '18',
                            },

                            detail: {				// 仪表盘详情，用于显示数据。
                                show: true,				// 是否显示详情,默认 true。
                                offsetCenter: [1,"65%"],// 相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
                                color: '#797979',
                                fontWeight: '400',
                                fontSize: '20',
                                formatter: "{value}%",	// 格式化函数或者字符串
                            },
                            data: [{ value: 70, name: '本月' }],
                            markPoint:{  //图表标注
                                symbol:'rect', //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
                                symbolSize:5,
                                data:[
                                    //跟你的仪表盘的中心位置对应上，颜色可以和画板底色一样
                                    {x:'center',y:'center',itemStyle:{color:'#FFF'}}
                                ]
                            },
                        },
                        {
                            type: 'gauge',
                            name: '数据指标',
                            center:['86%','50%'],
                            radius: '100%',  //仪表盘半径，可以是相对于容器高宽中较小的一项的一半的百分比，也可以是绝对的数值
                            axisLine: {      //仪表盘轴线相关配置
                                show:true,
                                lineStyle: {
                                    color: [  //仪表盘背景颜色渐变
                                        [1,new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                            {
                                                offset: 1,
                                                color: "#fd2100"
                                            },
                                            {
                                                offset: 0.3,
                                                color: "#d09f00"
                                            },
                                            {
                                                offset: 0.1,
                                                color: "#26fd00"
                                            }
                                        ])
                                        ]
                                    ],
                                    width:15,  //轴线宽度
                                },
                            },
                            splitLine: {  //分隔线样式。
                                show: true,
                                interval:0,
                                length:15,//默认会采用标签不重叠的策略间隔显示标签。可以设置成 0 强制显示所有标签。
                                lineStyle:{   //分割线样式
                                    width:1,
                                    length:10
                                }
                            },
                            axisLabel: {  // 刻度标签
                                show:true,
                                color: '#000',
                                radius:200,
                                fontSize:8,   //改变仪表盘内刻度数字的大小
                                shadowColor : '#000000', //默认透明
                            },
                            title: {	//仪表盘标题。
                                show: false,				//是否显示标题,默认 true。
                                offsetCenter: [0,"60%"],//相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
                                color: '#000',
                                fontWeight: '100',
                                fontSize: '18',
                            },

                            detail: {				// 仪表盘详情，用于显示数据。
                                show: true,				// 是否显示详情,默认 true。
                                offsetCenter: [1,"65%"],// 相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
                                color: '#797979',
                                fontWeight: '400',
                                fontSize: '20',
                                formatter: "{value}%",	// 格式化函数或者字符串
                            },
                            data: [{ value: 85, name: '本月' }],
                            markPoint:{  //图表标注
                                symbol:'rect', //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
                                symbolSize:5,
                                data:[
                                    //跟你的仪表盘的中心位置对应上，颜色可以和画板底色一样
                                    {x:'center',y:'center',itemStyle:{color:'#FFF'}}
                                ]
                            },
                        }
                    ]
                });
                EquipmentUtilizationTrendChart.setOption({
                    title: {
                        text: '设备利用率走势图'

                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['最高气温', '最低气温']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} °C'
                        }
                    },
                    series: [
                        {
                            name: '最高气温',
                            type: 'line',
                            radius:['10%','10%'],
                            data: [11, 11, 15, 13, 12, 13, 10],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name: '最低气温',
                            type: 'line',
                            data: [1, -2, 2, 5, 3, 2, 0],
                            markPoint: {
                                data: [
                                    {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'},
                                    [{
                                        symbol: 'none',
                                        x: '95%',
                                        yAxis: 'max'
                                    }, {
                                        symbol: 'circle',
                                        label: {
                                            position: 'start',
                                            formatter: '最大值'
                                        },
                                        type: 'max',
                                        name: '最高点'
                                    }]
                                ]
                            }
                        }
                    ]
                })
                ProductionStatus.setOption({
                    title: {
                        text: '生存状况'

                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['最高气温', '最低气温']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} °C'
                        }
                    },
                    series: [
                        {
                            name: '最高气温',
                            type: 'line',
                            radius:['10%','10%'],
                            data: [11, 11, 15, 13, 12, 13, 10],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name: '最低气温',
                            type: 'line',
                            data: [1, -2, 2, 5, 3, 2, 0],
                            markPoint: {
                                data: [
                                    {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'},
                                    [{
                                        symbol: 'none',
                                        x: '95%',
                                        yAxis: 'max'
                                    }, {
                                        symbol: 'circle',
                                        label: {
                                            position: 'start',
                                            formatter: '最大值'
                                        },
                                        type: 'max',
                                        name: '最高点'
                                    }]
                                ]
                            }
                        }
                    ]
                })
                QualificationRateChart.setOption({
                    title: {
                        text: '合格率走势图'

                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['最高气温', '最低气温']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} °C'
                        }
                    },
                    series: [
                        {
                            name: '最高气温',
                            type: 'line',
                            radius:['10%','10%'],
                            data: [11, 11, 15, 13, 12, 13, 10],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name: '最低气温',
                            type: 'line',
                            data: [1, -2, 2, 5, 3, 2, 0],
                            markPoint: {
                                data: [
                                    {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'},
                                    [{
                                        symbol: 'none',
                                        x: '95%',
                                        yAxis: 'max'
                                    }, {
                                        symbol: 'circle',
                                        label: {
                                            position: 'start',
                                            formatter: '最大值'
                                        },
                                        type: 'max',
                                        name: '最高点'
                                    }]
                                ]
                            }
                        }
                    ]
                })

            }
        }
    }
</script>

<style scoped lang="scss">

    .main-content-table-page{
        overflow: scroll;
        position: absolute;
        font-size: 15px;
        /*color: red;*/
        width: 100%;
        height: 100%;
        /*padding-right: 150px;*/
        .home-page-box{
            position: relative;
            width: 100%;
            height: 100%;
            #equipment-operating-status{
                float: left;
                width: 450px;
                height: 280px;
                /*background-color: #ffe9e8;*/
            }
            #bad-today{
                position: absolute;
                left: 480px;
                width: 450px;
                height:280px;
                /*background-color: #ffe9e8;*/
            }
            #equipment-utilization{
                position: absolute;
                left:960px;
                width: 610px;
                height:280px;
                border-bottom: 1px solid #c4c4c4;
                /*background-color: #ffe9e8;*/
                .equipment-utilization-firstLine{
                    width: 100%;
                    height: 50%;
                    /*background-color: #42ffcb;*/
                    padding: 15px 10px 15px 0;
                    .utilization-dashboard-text{
                        position: absolute;
                        top: 0px;
                        left: 28px;
                        line-height: 30px;
                        text-align: center;
                        font-size: 18px;
                        width: 18px;
                        height: 50%;
                        z-index: 1;
                    }
                    #utilization-dashboard{
                        padding-top: 12px;
                        position: absolute;
                        text-align: center;
                        margin-left: 25px;
                        width: 510px;
                        height: 150px;
                        /*background-color: #baf5ff;*/
                    }
                    .pass-rate{
                        padding-top: 22px;
                        padding-left: 15px;
                        position: absolute;
                        right: 0;
                        line-height: 30px;
                        text-align: center;
                        width: 90px;
                        height: 120px;
                        p:nth-child(2){
                            font-size:35px;
                            color: #ff6e14;
                        }
                    }
                }
                .equipment-utilization-secondLine{
                    display: flex;
                    width: 100%;
                    height: 50%;
                    /*background-color: #fff6ec;*/
                    padding: 15px 10px 15px 15px;
                    div:first-child{
                        /*position: absolute;*/
                        margin-left: 13px;
                        /*background-color: #55eeff;*/

                        div{
                            padding: 17px 0 0 0;
                            /*background-color: #55eeff;*/
                            /*height:100px;*/
                            line-height: 30px;
                            flex: 1;
                            text-align: center;
                            float: left;
                            p:first-child{
                                font-size: 45px;
                            }
                            p:last-child{
                                color: rgba(0,0,0,0.65);
                            }
                            .first-p{
                                color: #CC00CC;
                            }
                            .second-p{
                                color: #3300ff;
                            }
                            .third-p{
                                color: #00cc99;
                            }
                            .fourth-p{
                                color: #ff9933;
                            }
                            .fifth-p{
                                color: #cc0000;
                            }

                        }
                    }

                }
            }
            #Equipment-utilization-trend-chart{
                position: absolute;
                top:280px;
                /*float: left;*/
                width: 895px;
                height: 500px;
                /*background-color: #fff6d4;*/
            }
            #qarning-box{
                overflow: scroll;
                position: absolute;
                right: 145px;
                left:960px;
                top:280px;
                /*float: left;*/
                width: 610px;
                height: 490px;
                /*background-color: #5fd6ff;*/
                line-height: 41px;
                border-left: 1px solid #dcdcdc;
                ul {
                    padding-left: 10px;
                    margin-bottom: 0;
                    line-height: 40px;

                    border-bottom: 1px solid #e2e2e2;
                    li{
                        float: left;
                        list-style: none;
                        margin-right: 15px;
                        i{
                            color:rgb(235,181,29)
                        }
                    }
                }
                ul:nth-last-child(1){
                    border-bottom: none;

                }
            }
            #production-status{
                position: absolute;
                top:780px;
                /*float: left;*/
                width: 895px;
                height: 500px;
                /*background-color: #ff2dcc;*/
                margin-top: 10px;
                margin-bottom: 55px;
            }
            #qualification-rate-chart{
                position: absolute;
                right: 150px;
                top:780px;
                /*float: left;*/
                width: 610px;
                height: 500px;
                /*background-color: #ffa5b2;*/
                margin-top: 10px;
                margin-bottom: 55px;
            }
        }

    }

</style>