define(function (require) {
    var $ = require('jquery'),
        echarts = require('echarts'), //echarts插件
        line = require('echarts/chart/line');
        //utility = require('utility');//常用方法

    //基本参数
    var orderParams = {
        data: {
            data1: [150, 80, 100, 0, 25, '-', 85, 44, 88, 110, 105, 30, 49, 80, 55.6, 25, 55, 89, 45, 105, 120, 100, 40, 30, 55, 66, 23, 44, 66, 80, 110, 89, 97, 55, 130, 22, 56, 88, 108, 40, 150, 80, 100, 0, 150, 80, 100, 0],
            data2: [120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 150, 80, 110, 0, 150, 80, 110, 0, 150, 90, 100, 0],
            orderMerit: [{ 'minScore': 0, 'maxScore': 60, 'meritName': 'E' }, { 'minScore': 60, 'maxScore': 70, 'meritName': 'D' }, { 'minScore': 70, 'maxScore': 80, 'meritName': 'C' }, { 'minScore': 80, 'maxScore': 90, 'meritName': 'B' }, { 'minScore': 90, 'maxScore': 100, 'meritName': 'A' }, { 'minScore': 100, 'maxScore': 150, 'meritName': 'A+' }],//等第列表
            xAxis2: ['2014/1', '2014/2', '2014/3', '2014/4', '2014/5', '2014/6', '2014/7', '2014/8', '2014/9', '2014/10', '2014/11', '2014/12', '2015/1', '2015/2', '2015/3', '2015/4', '2015/5', '2015/6', '2015/7', '2015/8', '2015/9', '2015/10', '2015/11', '2015/12', '2015/1', '2015/2', '2015/3', '2015/4', '2015/5', '2015/6', '2015/7', '2015/8', '2015/9', '2015/10', '2015/11', '2015/12', '2016/1', '2016/2', '2016/3', '2016/4', '2016/5', '2016/6', '2016/7', '2016/8', '2016/9', '2016/10', '2016/11', '2016/12'],

        }
    }, //参数集合
        orderParamsData1 = orderParams.data.data1, //数据列表1
        orderParamsData2 = orderParams.data.data2; //数据列表2

    //初始化参数
    var initParams = function (params) {
        orderParams = params;
        orderParamsData1 = orderParams.data.data1.concat();//数据列表1
        orderParamsData2 = orderParams.data.data2.concat();//数据列表2

    };

    //历史折线图公用参数、方法
    var lineParam = {
        yMax: 60,
        yMin: 0,
        setValues: function (values) {
            //重新计算历史折线图等第位置
            if (values && values.length > 0) {
                $.each(values, function (index, item) {
                    if (item != null) {
                        if (item < 60) {
                            values[index] = item / 6;
                        } else if (item < 100) {
                            values[index] = item - 50;
                        } else {
                            values[index] = (9 * item + 1654) / 50;
                        }
                    }
                });
            }
            return values;
        },

        //将计算过的分数反推为原始分数
        getValues: function (value) {
            if (value && value > 0) {
                if (value < 10) {
                    return value * 6;
                } else if (value < 40) {
                    return value + 50;
                } else {
                    return (50 * value - 1654) / 9;
                }
            }
            return 0;
        },

        //获取测评y轴对应等第名称
        getYAxisForrmat: function (value) {
            var orderMerit = ['E', 'D', 'C', 'B', 'A', 'A+', ''];
            return orderMerit[parseInt(value / 10)];
        },

        //根据分数获取等第
        getOrderMeritByScore: function (score, orderMeritStr) {
            score = lineParam.getValues(score);
            //var meritListObj = $.parseJSON(orderMeritStr);

            var meritListObj = orderMeritStr;
            if (orderMeritStr != null && orderMeritStr.length > 0) {
                //当前分数为150时
                if (score == 150) {
                    return 'A+';
                }

                var orderMerit = $.grep(meritListObj, function (merit) {
                    return merit.maxScore > score && score >= merit.minScore;
                });

                if (orderMerit != null && orderMerit.length >= 0) {
                    if (orderMerit.length > 0) {
                        return orderMerit[0].meritName;
                    }
                };
            }
            return "E";
        }
    };


    var charts = function (dom, abilityData) {
        var myChart = echarts.init(document.getElementById(dom));
        

        orderParamsData1 = lineParam.setValues(orderParamsData1);//遵守纪律
        orderParamsData2 = lineParam.setValues(orderParamsData2);//诚信学习

        var option = {
            color: ["#7DA453", "#34B8F6", "#FACB6D", '#E97B5A', '#41798E', '#4AEE83'],
            tooltip: {
                show: false,
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                padding: 160,
                orient: 'vertical',
                x: 'left',
                data: ['直达', '邮件营销', '联盟广告', '视频广告'],
                formatter: function (name) {
                    return name;
                }
            },
            calculable: false,
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [100, 150],

                    // for funnel
                    //x: '60%',
                    //width: '35%',
                    //funnelAlign: 'left',
                    max: 1048,
                    itemStyle: {
                        normal: {
                            label: {
                                show: false,
                                position: 'outer'
                            },
                            labelLine: {
                                show: false
                            }
                        }
                    },
                    data: [
                        {
                            value: 335, name: '直达',
                            selected: false,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: false,
                                        position: 'outer'
                                    },
                                    labelLine: {
                                        show: false
                                    }
                                }
                            },
                            userData: '111111111'
                        },
                        {
                            value: 310, name: '邮件营销',
                            selected: false,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: false,
                                        position: 'outer'
                                    },
                                    labelLine: {
                                        show: false
                                    }
                                }
                            }
                        },
                        {
                            value: 234, name: '联盟广告'
                            //selected: false,
                            //itemStyle: {
                            //    normal: {
                            //        label: {
                            //            show: false,
                            //            position: 'outer'
                            //        },
                            //        labelLine: {
                            //            show: false
                            //        }
                            //    }
                            //}
                        },
                        {
                            value: 135, name: '视频广告',
                            selected: false,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: false,
                                        position: 'outer'
                                    },
                                    labelLine: {
                                        show: false
                                    }
                                }
                            }
                        }
                    ]
                }
            ]
        };

        //饼图图块的选择
        var ecConfig = require('echarts/config');
        myChart.on(ecConfig.EVENT.PIE_SELECTED, function (param, eCharts) {
            var selected = eCharts._option.series;
            var serparamed = param.selected;
            var serie;
            var str = '当前选择： ';
            for (var idx in selected) {
                serie = option.series[idx];
                for (var i = 0, l = serie.data.length; i < l; i++) {
                    if (serparamed[idx][i]) {
                        itemStyle = {
                            normal: {
                                label: {
                                    show: false,
                                    position: 'outer'
                                },
                                labelLine: {
                                    show: false
                                }
                            }
                        };
                        eval(serie.data[i]).push(itemStyle);
                        serie.data[i].itemStyle.normal.label.show = true;
                        serie.data[i].itemStyle.normal.labelLine.show = true;
                        serie.data[i].selected = true;

                        str += '【系列' + idx + '】' + serie.name + ' : ' +
                            '【数据' + i + '】' + serie.data[i].name + ' ';
                    } else {
                        serie.data[i].itemStyle.normal.label.show = false;
                        serie.data[i].itemStyle.normal.labelLine.show = false;
                        serie.data[i].selected = false;
                    }
                }
            }
            document.getElementById('wrong-message').innerHTML = str;
            myChart.setOption(option);
        });
        //图例开关的选择
        myChart.on(ecConfig.EVENT.LEGEND_SELECTED, function (param, eCharts) {
            var selected = eCharts._option.series;
            var serparamed = param.selected;
            var serie;
            var str = '当前选择： ';
            for (var idx in selected) {
                serie = option.series[idx];
                for (var i = 0, l = serie.data.length; i < l; i++) {
                    if (serparamed[idx][i]) {
                        serie.data[i].itemStyle.normal.label.show = true;
                        serie.data[i].itemStyle.normal.labelLine.show = true;
                        serie.data[i].selected = true;

                        str += '【系列' + idx + '】' + serie.name + ' : ' +
                            '【数据' + i + '】' + serie.data[i].name + ' ';
                    } else {
                        serie.data[i].itemStyle.normal.label.show = false;
                        serie.data[i].itemStyle.normal.labelLine.show = false;
                        serie.data[i].selected = false;
                    }
                }
            }
            document.getElementById('wrong-message').innerHTML = str;
            myChart.setOption(option);
        });

        var option2 = {
            title: {
                text: '',
                subtext: '等第',
                x: 20,
                y: -10
            },
            tooltip: {
                trigger: 'item',
                enterable: true,
                formatter: function (value) {
                    return value[1] + '<br/>综合等第：' + lineParam.getOrderMeritByScore(value[2], orderParams.data.orderMerit);
                }
            },
            legend: {
                show: false,
                data: ['遵守纪律']
            },

            calculable: false,
            grid: {
                x: 50,
                x2: 45,
                y: 40,
                borderColor: '#fff'
            },
            xAxis: [
                 {
                     type: 'category',
                     boundaryGap: false,
                     name: '时间',
                     position: 'bottom',
                     splitLine: {//分隔线
                         show: false,
                         lineStyle: {
                             color: '#eee',
                             type: 'solid',
                             width: 1
                         }
                     },
                     axisTick: {
                         inside: true,
                         interval: 0,
                         lineStyle: {
                             color: '#ccc',
                             width: 1
                         }
                     },
                     data: function () {
                         return orderParams.data.xAxis2;
                     }()
                 }
            ],
            yAxis: [
                {
                    min: 0,
                    max: lineParam.yMax,
                    boundaryGap: false,
                    splitNumber: 6,//分隔 
                    axisLine: {    // 轴线
                        show: true
                    },
                    axisTick: {    // 轴标记
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        margin: 18,
                        formatter: function (value) {
                            //获取历史测评y轴对应等第名称
                            return lineParam.getYAxisForrmat(value);
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#ccc',
                            type: 'dashed',
                            width: 1
                        }
                    }
                }
            ],

            series: [
                 {
                     name: '遵守纪律',
                     type: 'line',
                     xAxisIndex: 0,
                     itemStyle: {
                         normal: {
                             lineStyle: {
                                 color: '#00A0EC'
                             }
                         },
                     },
                     data: orderParamsData1
                 }
            ]
        };

        myChart.setOption(option2);

    };
    
    return function (dom, abilityData) {
        charts(dom, abilityData);
    };
});
