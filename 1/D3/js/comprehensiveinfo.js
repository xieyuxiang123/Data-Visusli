/*----------------------------------------------------
 * 作者:陈小会
 * 创建时间:2015/12/18
 * 描述：学生综合测评详情
 * ------------------修改记录-------------------
 * 修改人      修改日期        修改目的
 ------------------------------------------------------*/

require.config({
    paths: {
        //第三方插件
        jquery: 'plug/jquery-1.9.1',//jquery路径
        bootstrap: 'plug/bootstrap', //bootstrap路径
        comprehensiveInfo: '../html/comprehensiveinfo'//测评图表详情
    },
    //非AMD规范
    shim: {
        //pagintion插件
        'bootstrap': {
            deps: ['jquery']
        }
    }
});

//加载JS 
require(['jquery',
         'bootstrap',
         'echarts',
         'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
]);