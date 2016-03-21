(function ($) {
    $.extend({
        annularPie: function (data, id, category, cateColor) {//数据[{ inits: '0%-25%', value: 10 },{ inits: '25%-50%', value: 12 }]，容器ID:#ddd，分类['0%-25%', '25%-50%']，分类颜色["#7DA453", "#34B8F6"]
            var margin = { top: 40, right: 20, bottom: 60, left: 20 },
                width = $(id).width() - margin.left - margin.right,
                height = $(id).height() - margin.top - margin.bottom;
            var radius = Math.min(width, height) / 2,
                innerRadius = radius * 0.48,
                outerRadius = radius * 0.75;
            var legendRectSize = radius / 8,
                legendSpacing = radius / 5;
            var color = d3.scale.ordinal()//--构造一个序数比例尺
                .domain(category)
                .range(cateColor);
            //var formatPercent = d3.format(".0%");
            var pie = d3.layout.pie()//图表为饼图
                .value(function (d) { return d.value; })
                .sort(null);
            var arc = d3.svg.arc()//--饼的内半径和外半径
                .innerRadius(innerRadius)
                .outerRadius(outerRadius);
            var svgX = (width + margin.right + margin.left) / 2,//所在页面位置
                svgY = (radius * 2 + margin.top * 2) / 2;
            var svg = d3.select(id).append("svg").attr("class", "svgdata")//--添加画布
                .attr("width", width + margin.right + margin.left)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + svgX + "," + svgY + ")")
                .attr("class", "gbig");
            svg.append("svg:text")//--在环形中心添加文字
                .attr("class", "donutCenterText")
                .attr("dy", ".2em")
                .attr("text-anchor", "middle")
                .transition().duration(200)
                .text("展涛志超两神头");

            var svgG = svg.datum(data).selectAll(".solidArc")//--为图绑定数据---用G包裹每一个path为了在图上显示数值
                .data(pie)
                .enter()
                .append("g");
            svgG.append("path")
                .attr("fill", function (d) {//--根据比例尺填充颜色
                    return color(d.data.inits);
                })
                .attr("class", "solidArc")
                .attr("stroke", "none")
                .attr("d", arc)//path中的d的路径坐标画图
                .each(function (d) {
                    this._current = d;
                })
                .on('mouseover', function (d) {//鼠标移入移出事件
                    //arc.padAngle(.02);
                    d3.select(this).transition().duration(200).attr("d", arc.innerRadius(innerRadius).outerRadius(outerRadius / 0.75));
                    var curColor = d3.select(this).attr('fill');
                    var outG = d3.selectAll("g.outG path")[0];
                    var svgtxt = d3.selectAll("g.gbig .svgtxt")[0];
                    var svgcic = d3.selectAll("g.gbig .svgcic")[0];
                    $.each(outG, function (j, item) {
                        if (item._current.data.inits == d.data.inits) {
                            d3.select(item).attr("fill", curColor);
                            d3.select(svgtxt[j]).attr("fill", curColor);
                            d3.select(svgtxt[j]).attr("opacity", 1);
                            d3.select(svgcic[j]).attr("fill", curColor);
                        }
                    });
                })
                .on('mouseout', function (d) {
                    //arc.padAngle(.0);
                    var outG = d3.selectAll("g.outG path")[0];
                    var svgtxt = d3.selectAll("g.gbig .svgtxt")[0];
                    var svgcic = d3.selectAll("g.gbig .svgcic")[0];
                    $.each(outG, function (j, item) {
                        if (item._current.data.inits == d.data.inits) {
                            d3.select(item).attr("fill", "#ccc");
                            d3.select(svgtxt[j]).attr("fill", "#ccc");
                            d3.select(svgtxt[j]).attr("opacity", 0);
                            d3.select(svgcic[j]).attr("fill", "#ccc");
                        }
                    });
                    d3.select(this).transition().duration(200).attr("d", arc.innerRadius(innerRadius).outerRadius(outerRadius));
                });

            svgG.append("text")//添加文字
                .attr("transform", function (d) {
                    return "translate(" + (arc.centroid(d)[0] * 1.9) + "," + (arc.centroid(d)[1] * 1.9) + ")";//arc.centroid(d) 能算出弧线的中心
                })
                .attr("text-anchor", "middle").attr("fill", "#ccc").attr("class", "svgtxt").attr("opacity", 0)
                .text(function (d) {
                    return d.value + "人";
                });

            svgG.append("circle")//添加小圆球
                .attr("cx", function (d) {
                    return arc.centroid(d)[0] * 1.67;
                })
                .attr("cy", function (d) {
                    return arc.centroid(d)[1] * 1.67;
                })
                .attr("r", 4).attr("fill", "#ccc").attr("class", "svgcic");

            //legend rendering图例
            //var legend = svg.selectAll('.legend')
            //    .data(color.domain())
            //    .enter()
            //    .append('g')
            //    .attr("id", function (d) {
            //        return "legend-" + d;
            //    })
            //    .attr('class', 'legend')
            //    .attr('transform', function (d, i) {
            //        var horz = (i - 2.0) * (legendSpacing + 20 + legendRectSize + 20);
            //        var vert = radius + margin.bottom / 4;
            //        return 'translate(' + horz + ',' + vert + ')';
            //    });
            //legend.append('rect')//图例的小标示
            //    .attr('width', legendRectSize)
            //    .attr('height', legendRectSize)
            //    .style('fill', color)
            //    .style('stroke', color);
            //legend.append('text')//图例的文字
            //    .data(data)
            //    .attr('x', legendRectSize * 1.2)
            //    .attr('y', legendRectSize / 1.3)
            //    .text(function (d) {
            //        return d.inits;
            //    });
            //添加第一个外圆线
            var radiusWidth = width - 122,
                radiusHeight = height - 34;
            var htmls = "<div style='width: " + radiusWidth + "px;height: " + radiusHeight + "px;border: 1px solid #CCC;border-radius: " + radiusHeight + "px;position: absolute;top: 50%;left: 50%;margin-top: -" + (radiusHeight / 2 + 11) + "px;margin-left: -" + (radiusWidth / 2 + 1) + "px;z-index: 0;'></div>";
            $(id).append(htmls);
            //外围最大的圆圈
            var arc2 = d3.svg.arc()//--饼的内半径和外半径
                .innerRadius(innerRadius * 2.13)
                .outerRadius(outerRadius * 1.38);
            var svg2 = d3.select(id).select("svg")
                .append("g")
                .attr("transform", "translate(" + svgX + "," + svgY + ")")
                .attr("class", "outG");
            var path = svg2.datum(data).selectAll(".solidArc")//--为图绑定数据
                .data(pie)
                .enter()
                .append("path")
                .attr("fill", function (d) { //--根据比例尺填充颜色
                    return "#ccc";
                })
                .attr("class", "solidArc")
                .attr("stroke", "none")
                .attr("d", arc2)//path中的d的路径坐标画图
                .each(function (d) {
                    this._current = d;
                });

            this.getPath = function () {
                return path;
            };

            this.getArc = function () {
                return d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius);
            };
        }
    });
})(jQuery);