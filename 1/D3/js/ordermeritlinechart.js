/*----------------------------------------------------
 * 作者:陈小会
 * 创建时间:2015/12/26
 * 描述：等第、排名测评折表图表 
 * ------------------修改记录-------------------------
 * 修改人      修改日期        修改目的
 ------------------------------------------------------*/
define(function (require) {
    var $ = require('jquery'),
        echarts = require('echarts'), //echarts插件
        line = require('echarts/chart/line'),
        utility = require('utility');//常用方法

    //基本参数
    var domPara = null, //参数集合
        chartData = null, //指标相关参数
        orderMeritDate = null,//等第运算
        orderParamsData1 = null, //数据列表1
        orderParamsData2 = null, //数据列表2
        dataZoomType = null, //数据缩放类型
        isFilterClick = false;//是否触发筛选点击事件

    //默认dom元素
    var domDef = {
        container: '.m-ceval-info',//容器
        comprehensive: '[data-opt="comprehensive"]',//综合等第
        classRank: '[data-opt="classRank"]',//班级排名
        provinceRank: '[data-opt="provinceRank"]',//全省排名

        //时间
        timeType: '[data-opt="time"]'
    };

    //默认参数设置
    var paramsDef = {
        timeType: { 'fourMonth': 0, 'oneYear': 1, 'all': 2 },//时间筛选
        onClass: 'on',//高亮样式
        //对向集合
        dom: {
            fourMonth: '[data-timetype="fourMonth"]',//前4月
            oneYear: '[data-timetype="oneYear"]',//一年
            all: '[data-timetype="all"]'//全部
        },
        yaxisType:'merit'//排名类型
    };

    //获取Y轴
    var getYAxisData = function () {
        switch (yaxisType) {
        case 'merit':
            return {
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
                        color: '#eee',
                        type: 'dashed',
                        width: 1
                    }
                }
            };
            case 'order':
              return {
                    min:5 ,
                    max: 50,
                    boundaryGap: false,
                    splitNumber:9,//分隔 
                    axisLine: {    // 轴线
                        show: true
                    },
                    axisTick: {    // 轴标记
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        margin:15,
                        formatter: function (value) {
                            //获取历史测评y轴对应等第名称
                            return (55-value) + '%';
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#eee',
                            type: 'dashed',
                            width: 1
                        }
                    }
                }
        }
    }

    //初始化参数
    var initParams = function (dom, chartDataList, orderMeritList) {
        domPara = dom;//默认图表参数
        chartData = chartDataList;//图表私有参数
        orderMeritDate = orderMeritList;//等第运算
        dataZoomType = {
            'fourMonth': 100 - (400 / chartData.monthCount),
            'oneYear': 100 - (1200 / chartData.monthCount),
            'all': 0
        };
        yaxisType = 'merit';//排名类型

        //重新计算折线图等第位置
        $.each(chartData.SeriesData, function(index,item) {
            lineParam.setValues(item.data);
        });
    };

    //历史折线图公用参数、方法
    var lineParam = {
        yMax: 60,
        yMin: 0,
        setValues: function (values) {
            //重新计算折线图等第位置
            if (values && values.length > 0) {
                $.each(values, function (index, item) {
                    if (item != null) {
                        if (item < 60) {
                            values[index] = item / 6;
                        } else if (item < 100) {
                            values[index] = item - 50;
                        } else {
                            values[index] =item/5 + 30;
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
                    return (value - 30) * 5;
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

    //设置时间区间
    var setDataZoom = function () {
        switch (paramsDef.timeType) {
            //前4月
            case 'fourMonth':
                return dataZoomType.fourMonth;
                //前一年
            case 'oneYear':
                return dataZoomType.oneYear;
                //所有
            case 'all':
                return dataZoomType.all;
        }
        return 0;
    };

    //获取图表数据
    var getSeriesData = function () {
        var dataArr = [];

        $.each(chartData.SeriesData, function (index, item) {
            var data = {
                name: item.name,
                type: 'line',
                symbol: 'circle',
                smooth: 'true',
                data: item.data
            };
            dataArr.push(data);
        });
        
        return dataArr;
    };
    
    //获取图表图例
    var getLegendData = function() {
        var dataArr = [];

        $.each(chartData.SeriesData, function (index, item) {
            dataArr.push(item.name);
        });

        return dataArr;
    };

    //初始化折线图表
    var initLineCharts = function () {
        // 基于准备好的dom，初始化echarts图表
        var myChart = echarts.init(document.getElementById(domPara), 'macarons'),
            loadingEle = $('#' + domPara).siblings('.u-loading'), //loading效果 
            loadingTicket = null;//时间Id

        isFilterClick = true;//已触发筛选点击事件
        $(loadingEle).show();//显示loading

        //图表选项
        var option = {
            color: ['#87CCFF', '#FF7474', '#6B6BFF', '#00FF80', '#80FF00', '#FFD700', '#FF8000'],
            tooltip: {
                trigger: 'item',
                formatter: function (value) {
                    if (value) {
                        var date = value[1].split('/')[0] + '年' + value[1].split('/')[1] + '月';

                        return date + '<br/>综合等第：' + lineParam.getOrderMeritByScore(value[2], orderMeritDate);
                    }
                    return null;
                }
            },
            legend: {
                data: getLegendData()
            },

            calculable: true,
            dataZoom: {
                show: true,
                realtime: true,
                start: setDataZoom(),//默认前4月
                end: 100
            },
            grid: {
                x: 40,
                x2: 40,
                y: 40,
                borderColor: '#fff'
            },
            xAxis: [
                 {
                     type: 'category',
                     boundaryGap: false,
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
            yAxis: getYAxisData(),
            series: getSeriesData()
        };

        myChart.setOption(option);

        clearTimeout(loadingTicket);
        loadingTicket = setTimeout(function () {
            $(loadingEle).is(':visible') && $(loadingEle).hide();
            myChart.setOption(option);
        }, 2200);
    };

    //获取班级排名数据
    var getClassRankData = function () {
        return;
    };

    //获取全省排名数据
    var getProvinceRankData = function () {
        return;
    };

    //综合等第
    var setComprehensive = function () {
        $(domDef.container).on('click', domDef.comprehensive, function () {
            var $this = $(this);

            if ($this.hasClass(paramsDef.onClass)) return;

            //获取参数
            paramsDef.timeType = $this.closest('.opt-box').data('time');//指标筛选
            domPara = $this.closest('.opt-box').data('container');//指标筛选
            initLineCharts();//初始化折线图表
            $this.addClass(paramsDef.onClass).siblings().removeClass(paramsDef.onClass);
        });
    };

    //班级排名
    var setClassRank = function () {
        $(domDef.container).on('click', domDef.classRank, function () {
            var $this = $(this);

            if ($this.hasClass(paramsDef.onClass)) return;

            //获取参数
            paramsDef.timeType = $this.closest('.opt-box').data('time');//指标筛选
            domPara = $this.closest('.opt-box').data('container');//指标筛选
            yaxisType = 'order';//排名类型
            initLineCharts();//初始化折线图表
            $this.addClass(paramsDef.onClass).siblings().removeClass(paramsDef.onClass);
        });
    };

    //全省排名
    var setProvinceRank = function () {
        $(domDef.container).on('click', domDef.provinceRank, function () {
            var $this = $(this);

            if ($this.hasClass(paramsDef.onClass)) return;

            //获取参数
            paramsDef.timeType = $this.closest('.opt-box').data('time');//指标筛选
            domPara = $this.closest('.opt-box').data('container');//指标筛选
            yaxisType = 'order';//排名类型
            initLineCharts();//初始化折线图表
            $this.addClass(paramsDef.onClass).siblings().removeClass(paramsDef.onClass);
        });
    };

    //根据时间筛选测评数据
    var getDataByTimeType = function () {
        $(domDef.container).on('click', domDef.timeType, function () {
            var $this = $(this);

            if ($this.hasClass(paramsDef.onClass)) return;
            paramsDef.timeType = $this.data('timetype');//时间筛选
            domPara = $this.closest('.opt-box').data('container');//指标筛选
            $this.closest('.opt-box').attr('time', paramsDef.timeType);

            initLineCharts();//初始化折线图表
            $this.addClass(paramsDef.onClass).siblings().removeClass(paramsDef.onClass);
        });
    };

    //初始化等第排名
    var initOrderMerit = function () {
        paramsDef.timeType = 'fourMonth';
        initLineCharts();//初始化折线图表

        setComprehensive();//综合等第
        setClassRank();//班级排名
        setProvinceRank();//全省排名
        getDataByTimeType();//根据时间筛选测评数据
    };

    return function (dom, chartDataList, orderMeritList) {
        initParams(dom, chartDataList, orderMeritList);//初始化参数
        initOrderMerit();//初始化等第排名
    };
});
