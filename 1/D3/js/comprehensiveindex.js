/*----------------------------------------------------
 * 作者:陈小会
 * 创建时间:2015/12/16
 * 描述：学生综合测评首页
 * ------------------修改记录-------------------------
 * 修改人      修改日期        修改目的
 ------------------------------------------------------*/
var ceval = '.m-ceval-lst', //综合测评列表
    orderMerit = '.order-merit',//排序
    chartTip = '.chart-tip .icon-question',//光谱图提示图标
    capacityLevelName = '.capacity-bg .level-name',//光谱图测评
    tooltip = '.u-tooltip';//提示框

$(function () {
    //饼图百分比
    $('.pie-chart').each(function () {
        $(this).easyPieChart({
            barColor: '#288C66',//百分比颜色
            trackColor: $(this).attr('data-null') == 1 ? '#ccc' : '#A2D266',//弧度颜色
            scaleColor: false,//刻度线颜色
            lineCap: 'butt',//结束动画时线效果 butt, round and square
            lineWidth: 10,
            animate: 1000,//动画播放时间
            size: 75//大小
        });
    });

    //排序点击事件
    $(ceval).on('click', orderMerit, function (e) {
        showToolTip(this, e);
    });

    //光谱图名称点击事件
    $(ceval).on('click', capacityLevelName, function (e) {
        showToolTip(this, e);
    });

    //光谱图提示图标
    $(ceval).on('click', chartTip, function (e) {
        showToolTip(this, e);
    });

    $(document).click(function () {
        $(tooltip).is(':visible') && $(tooltip).hide();
    });
});

//显示提示框
var showToolTip = function (dom, e) {
    var $this = $(dom),
        thisTooltip = $this.children(tooltip);

    thisTooltip.is(':hidden') && thisTooltip.show();//显示提示框
    e.stopPropagation();
};