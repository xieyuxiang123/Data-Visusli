/*----------------------------------------------------
 * 作者:陈小会
 * 创建时间:2015/12/18
 * 描述："智"综合测评配置
 * ------------------修改记录-------------------
 * 修改人      修改日期        修改目的
 ------------------------------------------------------*/

require.config({
    paths: {
        //第三方插件
        jquery: 'plug/jquery-1.9.1',//jquery路径
        bootstrap: 'plug/bootstrap', //bootstrap路径
        echarts: 'plug/echarts/echarts',
        'echarts/chart/line': 'plug/echarts/echarts',
        'echarts/chart/bar': 'plug/echarts/echarts',
        'echarts/config': 'plug/echarts/config',
        
        //工具
        utility: 'tool/utility',//常用方法

        studymixevaluation: 'studymixevaluation',//学习情况复杂图形测评
        ordermeritlinechart: 'ordermeritlinechart',//等第测评折表图表
        wisdomevaluation: 'wisdomevaluation'//智测评图表详情
    },
    //非AMD规范
    shim: {
        //bootstrap插件
        'bootstrap': {
            deps: ['jquery']
        }
    }
});

//加载JS 
require(['jquery',
         'bootstrap',
         'echarts',
         'echarts/chart/line',
         'echarts/chart/bar',
         'wisdomevaluation'
]);