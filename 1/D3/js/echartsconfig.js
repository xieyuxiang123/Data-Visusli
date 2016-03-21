/*----------------------------------------------------
 * 作者:谢雨翔
 * 创建时间:2015/12/18
 * 描述：
 * ------------------修改记录-------------------
 * 修改人      修改日期        修改目的
 ------------------------------------------------------*/

require.config({
    paths: {
        //第三方插件
        jquery: 'plug/jquery-1.9.1',//jquery路径
        //bootstrap: 'plug/bootstrap', //bootstrap路径
        echarts: 'plug/echarts/echarts',
        'echarts/chart/line': 'plug/echarts/echarts',//图表路径
        'echarts/chart/pie': 'plug/echarts/echarts',//图表路径
        'echarts/config': 'plug/echarts/config',//图表配置路径

        //工具
        //utility: 'tool/utility',//常用方法

        echartsdemo: 'echartsdemo',//当前路径下的图表具体代码文件
        echartsinsert: 'echartsinsert'//综合能力测评
    },
    //非AMD规范
    //shim: {
    //    //bootstrap插件
    //    'bootstrap': {
    //        deps: ['jquery']
    //    }
    //}
});

//加载JS 
require(['jquery',
         //'bootstrap',
         //'echarts',
         //'echarts/chart/line',
         //'echarts/chart/pie',
         'echartsdemo',
         'echartsinsert'
]);