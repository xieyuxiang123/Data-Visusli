﻿define(function (require) {
    var $ = require('jquery'),
        //bootstrap = require('bootstrap'), //bootstrap插件
        echarts = require('echarts'),//'echarts'
        echartsdemo = require('echartsdemo'),//
        echartspie = require('echarts/chart/pie');

    //默认参数设置
    var dom = '';

    //综合能力 
    var abilityData = null//测评数据

    //获取综合等第数据
    var getAbilityData = function () {
        return {
            Categories: ['2014/1', '2014/2', '2014/3', '2014/4', '2014/5', '2014/6', '2014/7', '2014/8', '2014/9', '2014/10', '2014/11', '2014/12', '2015/1', '2015/2', '2015/3', '2015/4', '2015/5', '2015/6', '2015/7', '2015/8', '2015/9', '2015/10', '2015/11', '2015/12', '2015/1', '2015/2', '2015/3', '2015/4', '2015/5', '2015/6', '2015/7', '2015/8', '2015/9', '2015/10', '2015/11', '2015/12', '2016/1', '2016/2', '2016/3', '2016/4', '2016/5', '2016/6', '2016/7', '2016/8', '2016/9', '2016/10', '2016/11', '2016/12'],
            SeriesData: [{ name: '识记能力', data: [150, 80, 100, 0, 150, 60, 85, 44, 88, 110, 105, 30, 49, 80, 55.6, 25, 55, 89, 45, 105, 120, 100, 40, 30, 55, 66, 23, 44, 66, 80, 110, 89, 97, 55, 130, 22, 56, 88, 108, 40, 150, 80, 100, 0, 150, 80, 100, 0] },
                         { name: '逻辑思维', data: [120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 150, 80, 110, 0, 150, 80, 110, 0, 150, 90, 100, 0] },
                         { name: '空间想象', data: [150, 80, 100, 0, 150, 60, 85, 44, 88, 110, 105, 30, 49, 80, 55.6, 25, 55, 89, 45, 105, 120, 100, 40, 30, 55, 66, 23, 44, 66, 80, 110, 89, 97, 55, 130, 22, 56, 88, 108, 40, 150, 80, 100, 0, 150, 80, 100, 0] },
                         { name: '推理分析', data: [120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 150, 80, 110, 0, 150, 80, 110, 0, 150, 90, 100, 0] },
                         { name: '数据分析', data: [120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 150, 80, 110, 0, 150, 80, 110, 0, 150, 90, 100, 0] },
                         { name: '探究实践', data: [150, 80, 100, 0, 150, 60, 85, 44, 88, 110, 105, 30, 49, 80, 55.6, 25, 55, 89, 45, 105, 120, 100, 40, 30, 55, 66, 23, 44, 66, 80, 110, 89, 97, 55, 130, 22, 56, 88, 108, 40, 150, 80, 100, 0, 150, 80, 100, 0] },
                         { name: '综合运用', data: [120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 120, 0, 50, 60, 150, 80, 110, 0, 150, 80, 110, 0, 150, 90, 100, 0] }],
            monthCount: 47//总月数
        };
    };

    //初始化测评
    var init = function () {
        //初始化德参数
        abilityData = getAbilityData();//综合能力-测评数据
        dom = 'container';//综合能力-容器
        echartsdemo(dom, abilityData);//初始化综合能力-图表
    };

    init();//初始化综合测评
});