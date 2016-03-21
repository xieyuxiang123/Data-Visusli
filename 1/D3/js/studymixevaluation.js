/*----------------------------------------------------
 * 作者:陈小会
 * 创建时间:2015/12/18
 * 描述：学习情况复杂图形测评
 * ------------------修改记录-------------------------
 * 修改人      修改日期        修改目的
 ------------------------------------------------------*/

define(function(require) {
    var $ = require('jquery'),
        echarts = require('echarts'), //echarts插件
        line = require('echarts/chart/line'),//折线图
        bar = require('echarts/chart/bar');//柱状图

    //基本参数
    var domPara = null, //参数集合
        chartData = null;

    //初始化参数
    var initParams = function (dom, chartDataList) {
        domPara = dom;
        chartData = chartDataList;
    };

    //获取作业图表数据
    var getHomeworkSeriesData = function () {
        var dataArr = [];

        $.each(chartData.SeriesData, function (index, item) {
            var data = null;
            
            if (index == 0) {
                data = {
                    name: item.name,
                    type:  'bar',
                    smooth: 'true',
                    data: item.data
                };

            } else {
                data = {
                    name: item.name,
                    type:'line',
                    yAxisIndex: 1,
                    smooth: 'true',
                    data: item.data
                };
            }
           
            dataArr.push(data);
        });

        return dataArr;
    };

    //获取作业图表图例
    var getHomeworkLegendData = function () {
        var dataArr = [];

        $.each(chartData.SeriesData, function (index, item) {
            dataArr.push(item.name);
        });

        return dataArr;
    };

    //获取考试图表数据
    var getExamSeriesData = function () {
        var dataArr = [];

        $.each(chartData.SeriesData2, function (index, item) {
            var data = null;
            
            if (index == 0) {
                data = {
                    name: item.name,
                    type:  'bar',
                    smooth: 'true',
                    data: item.data
                };

            } else {
                data = {
                    name: item.name,
                    type:'line',
                    yAxisIndex: 1,
                    smooth: 'true',
                    data: item.data
                };
            }
           
            dataArr.push(data);
        });

        return dataArr;
    };

    //获取考试图表图例
    var getExamLegendData = function () {
        var dataArr = [];

        $.each(chartData.SeriesData2, function (index, item) {
            dataArr.push(item.name);
        });

        return dataArr;
    };

    //初始化多图联动图表
    var initMixCharts = function () {
        var myChart = null,
            myChart2 = null,
            option = null,
            option2 = null,
            loadingEle = $('#' + domPara.containerId1).siblings('.u-loading'), //loading效果 
            loadingTicket = null;//时间Id

        option = {
            color: ['#87CCFF', '#FF7474', '#6B6BFF', '#00FF80', '#80FF00', '#FFD700', '#FF8000'],
            tooltip: {
                trigger: 'axis',
                formatter: function (value) {
                    var date = value[0][1].split('/')[0] + '年' + value[0][1].split('/')[1] + '月';

                    return date + '<br/>' + value[0][0] + ':' + value[0][2] + '<br/>' + value[1][0] + ':' + value[1][2] + '%';
                }
            },
            legend: {
                data: getHomeworkLegendData()
            },
            dataZoom: {
                show: false,
            },
            grid: {
                x: 40,
                x2: 65,
                y: 40,
                y2: 40,
                borderColor: '#fff'
            },
            xAxis: [
                 {
                     type: 'category',
                     splitLine: {//分隔线
                         show: false,
                         lineStyle: {
                             color: '#eee',
                             type: 'solid',
                             width: 1
                         }
                     },
                     data: function () {
                         return chartData.Categories;
                     }()
                 }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLine: {    // 轴线
                        show: true
                    },
                    axisTick: {    // 轴标记
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#eee',
                            type: 'dashed',
                            width: 1
                        }
                    }
                },
                {
                    type: 'value',
                    min: 0,
                    max: 100,
                    splitNumber: 5,//分隔 
                    axisLabel: {
                        formatter: function (value) {
                            return value + ' %';
                        }
                    },
                    splitLine: {
                        show: false
                    }
                }
            ],
            series: getHomeworkSeriesData()
        };
        
        myChart = echarts.init(document.getElementById(domPara.containerId1), 'macarons');

        option2 = {
            color: ['#87CCFF', '#FF7474', '#6B6BFF', '#00FF80', '#80FF00', '#FFD700', '#FF8000'],
            tooltip: {
                trigger: 'axis',
                formatter: function (value) {
                    return value[0][1] + '<br/>' + value[0][0] + ':' + value[0][2] + '<br/>' + value[1][0] + ':' + value[1][2]+'%';
                }
            },
            legend: {
                data:getExamLegendData()
            },
            dataZoom: {
                show: true,
                realtime: true,
                start: 50,
                end: 100
            },
            grid: {
                x: 40,
                x2: 65, 
                y: 40,
                borderColor: '#fff'
            },
            xAxis: [
                 {
                     type: 'category',
                     splitLine: {//分隔线
                         show: false,
                         lineStyle: {
                             color: '#eee',
                             type: 'solid',
                             width: 1
                         }
                     },
                     data: function () {
                         return chartData.Categories;
                     }()
                 }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLine: {    // 轴线
                        show: true
                    },
                    axisTick: {    // 轴标记
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#eee',
                            type: 'dashed',
                            width: 1
                        }
                    }
                },
                {
                    type: 'value',
                    min: 0,
                    max: 100,
                    splitNumber: 5,//分隔 
                    axisLabel: {
                        formatter: function (value) {
                            return value + ' %';
                        }
                    },
                    splitLine: {
                        show: false
                    }
                }
            ],
            series: getExamSeriesData()

        };
        myChart2 = echarts.init(document.getElementById(domPara.containerId2), 'macarons');


        myChart.connect([myChart2]);
        myChart2.connect([myChart]);
        
        setTimeout(function () {
            window.onresize = function () {
                myChart.resize();
                myChart2.resize();
            };
        }, 200);

        clearTimeout(loadingTicket);
        loadingTicket = setTimeout(function () {
            $(loadingEle).is(':visible') && $(loadingEle).hide();
            myChart.setOption(option);
            myChart2.setOption(option2);
        }, 2200);
    };

    return function (dom, chartDataList) {
        initParams(dom, chartDataList);//初始化参数
        initMixCharts();//初始化多图联动图表
    };
});