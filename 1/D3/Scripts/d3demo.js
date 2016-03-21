////选择标签
//var p = d3.select("body").selectAll("p").text("用D3来替换文本");
//p.style("color", "red").style("font-size", "72px");

//////数据的绑定
//var span = d3.select("body").selectAll("span");
//var dataset = ["I like dog", "I like cat", "I like snake"];
//span.data(dataset).text(function (d,i) {
//    return d;
//});

//插入和删除元素
//var body = d3.select("body");
//body.append("p").text("append在在选择集末尾插入元素");
//body.insert("p", "#a").text("insertssssss");
//删除元素body.select("p").remove();
(function ($) {
    $(function () {

        var data = [
          { inits: '0%-25%', value: 10 },
          { inits: '25%-50%', value: 12 },
          { inits: '50%-75%', value: 6 },
          { inits: '75%-100%', value: 10 }, { inits: '100%-125%', value: 3 }, { inits: '125%-150%', value: 0.2 }
        ];

        var category = ['0%-25%', '25%-50%', '50%-75%', '75%-100%', '100%-125%', '125%-150%'],
        cateColor = ["#7DA453", "#34B8F6", "#FACB6D", '#E97B5A', '#41798E', '#4AEE83'];

        $.action4();
        //$.action6();
        //$.action7();
        $.annularPie(data, "#ddd", category, cateColor);
    });
    $.extend({
        action1: function () {
            //简单条形图
            var width = 1024; //画布的宽度
            var height = 1024; //画布的高度

            var svg = d3.select("body")				//选择文档中的body元素
                .append("svg")				//添加一个svg元素
                .attr("width", width)		//设定宽度
                .attr("height", height); //设定高度

            var dataset = [3, 2, 1.7, 2.2, 1, 0];//矩形的长度
            var min = d3.min(dataset);
            var max = d3.max(dataset);
            var linear = d3.scale.linear()//线性比例尺
                .domain([min, max])//定义域
                .range([0, 900]);//值域

            var axis = d3.svg.axis()//刻度
                 .scale(linear)      //指定比例尺
                 .orient("bottom")   //指定刻度的方向
                 .ticks(7);          //指定刻度的数量

            var rectHeight = 45; //每个矩形所占的像素高度(包括空白)
            svg.selectAll("rect")
                .data(dataset)
                .enter()
                .append("rect")
                .attr("x", 20)//每个条距离右边距的距离（字面意思理解即可）
                .attr("y", function (d, i) {
                    return (i + 1) * rectHeight; //每个条距离上边距的距离
                })
                .attr("width", function (d) { //宽度，条行的长度，可以用来表示数据
                    return linear(d);//使用线性比例尺
                })
                .attr("height", rectHeight - 28)//饼图柱子之间的间距（每个柱子的高度都是23，前面的y给了25，就会出现间隔）
                .attr("fill", "steelblue"); //填充色

            svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(20,250)")
                .call(axis);

        },

        //完整的柱形图表
        action2: function () {
            var width = 600;
            var height = 600;
            var dataset = [];
            var num = 15;  //数组的数量

            for (var i = 0; i < num ; i++) {
                var tempnum = Math.floor(Math.random() * 50);   // 返回 0~49 整数
                if (tempnum == 0) {
                    continue;
                }
                dataset.push(tempnum);
            }

            var svg = d3.select("body").append("svg")
                                    .attr("width", width)
                                    .attr("height", height);

            var xAxisScale = d3.scale.ordinal()//X轴刻度的比例尺
                            .domain(d3.range(dataset.length))
                            .rangeRoundBands([0, 500]);

            var yAxisScale = d3.scale.linear()//Y轴刻度的比例尺
                            .domain([0, d3.max(dataset)])
                            .range([500, 0]);

            var xAxis = d3.svg.axis()//X轴
                            .scale(xAxisScale)
                            .orient("bottom");

            var yAxis = d3.svg.axis()//Y轴
                            .scale(yAxisScale)
                            .orient("left");

            var xScale = d3.scale.ordinal()//x的柱子的比例尺
                            .domain(d3.range(dataset.length))
                            .rangeRoundBands([0, 500], 0.05);

            var yScale = d3.scale.linear()//Y的柱子的比例尺
                            .domain([0, d3.max(dataset)])
                            .range([0, 500]);

            svg.selectAll("rect")//柱子插入
               .data(dataset)
               .enter()
               .append("rect")
               .attr("y", function (d, i) {
                   return 50 + 500;
               })
               .attr("height", 0)
               .attr("fill", "red")//动态

               .transition()//启动转变
               .duration(3000)//转变过程的时间
               .ease("bounce")//转变方式为弹跳
               .delay(function (d, i) {//指定延迟的时间
                   return 200 * i;
               })
               .attr("x", function (d, i) {//注入比例尺
                   return 30 + xScale(i);
               })
               .attr("y", function (d, i) {
                   return 50 + 500 - yScale(d);
               })
               .attr("width", function (d, i) {
                   return xScale.rangeBand();
               })
               .attr("height", yScale)
               .attr("fill", "steelblue");

            svg.selectAll("text")//文字
                .data(dataset)
                .enter()//当对应的元素不足时 （ 绑定数据数量 > 对应元素 ）要添加元素，使之与绑定数据的数量相等。后面跟 append 函数添   exit()当对应的元素过多时，通常要删除元素，使之与绑定数据的数量相等。后面跟 remove 函数删除元素。
                .append("text")
                .attr("x", function (d, i) {//注入比例尺设置文字所处的宽度和高度
                    return 30 + xScale(i);
                })
               .attr("y", function (d, i) {
                   return 50 + 500 - yScale(d);
               })
                .attr("dx", function (d, i) {
                    return xScale.rangeBand() / 3;
                })
                .attr("dy", 15)
                .attr("text-anchor", "begin")
                .attr("font-size", 14)
                .attr("fill", "white")
                .text(function (d, i) {
                    return d;
                });

            svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(30,550)")
                .call(xAxis);

            svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(30,50)")
                .call(yAxis);

        },

        //图表的交互
        action3: function () {
            var width = 600;
            var height = 600;
            var dataset = [];
            var num = 15;  //数组的数量

            for (var i = 0; i < num ; i++) {
                var tempnum = Math.floor(Math.random() * 50);   // 返回 0~49 整数
                if (tempnum == 0) {
                    continue;
                }
                dataset.push(tempnum);
            }

            var svg = d3.select("body").append("svg")
                                    .attr("width", width)
                                    .attr("height", height);

            var xAxisScale = d3.scale.ordinal()//X轴刻度的比例尺
                            .domain(d3.range(dataset.length))
                            .rangeRoundBands([0, 500]);

            var yAxisScale = d3.scale.linear()//Y轴刻度的比例尺
                            .domain([0, d3.max(dataset)])
                            .range([500, 0]);

            var xAxis = d3.svg.axis()//X轴
                            .scale(xAxisScale)
                            .orient("bottom");

            var yAxis = d3.svg.axis()//Y轴
                            .scale(yAxisScale)
                            .orient("left");

            var xScale = d3.scale.ordinal()//x的柱子的比例尺
                            .domain(d3.range(dataset.length))
                            .rangeRoundBands([0, 500], 0.05);

            var yScale = d3.scale.linear()//Y的柱子的比例尺
                            .domain([0, d3.max(dataset)])
                            .range([0, 500]);

            svg.selectAll("rect")//柱子插入
               .data(dataset)
               .enter()
               .append("rect")
               .attr("y", function (d, i) {
                   return 50 + 500;
               })
               .attr("height", 0)
               .attr("fill", "red")
                .on("click", function (d, i) {//鼠标的事件
                    d3.select(this).attr("fill", "green");
                })
                .on("mouseover", function (d, i) {
                    d3.select(this).attr("fill", "yellow");
                })
                .on("mouseout", function (d, i) {
                    d3.select(this).transition().duration(500).attr("fill", "red");
                })
               .attr("x", function (d, i) {//注入比例尺
                   return 30 + xScale(i);
               })
               .attr("y", function (d, i) {
                   return 50 + 500 - yScale(d);
               })
               .attr("width", function (d, i) {
                   return xScale.rangeBand();
               })
               .attr("height", yScale)
               .attr("fill", "red");

            svg.selectAll("text")//文字
                .data(dataset)
                .enter()//当对应的元素不足时 （ 绑定数据数量 > 对应元素 ）要添加元素，使之与绑定数据的数量相等。后面跟 append 函数添   exit()当对应的元素过多时，通常要删除元素，使之与绑定数据的数量相等。后面跟 remove 函数删除元素。
                .append("text")
                .attr("x", function (d, i) {//注入比例尺设置文字所处的宽度和高度
                    return 30 + xScale(i);
                })
               .attr("y", function (d, i) {
                   return 50 + 500 - yScale(d);
               })
                .attr("dx", function (d, i) {
                    return xScale.rangeBand() / 3;
                })
                .attr("dy", 15)
                .attr("text-anchor", "begin")
                .attr("font-size", 14)
                .attr("fill", "white")
                .text(function (d, i) {
                    return d;
                });

            svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(30,550)")
                .call(xAxis);

            svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(30,50)")
                .call(yAxis);
        },

        //饼图的绘制
        action4: function () {
            var width = 300; //画布的宽度
            var height = 300; //画布的高度

            var svg = d3.select("#a")				//选择文档中的body元素
                .append("svg")				//添加一个svg元素
                .attr("width", width)		//设定宽度
                .attr("height", height).attr("style", "margin-bottom:18px;margin-right:-17px"); //设定高度

            var dataset = [55, 28, 17, 72, 60];//矩形的长度
            var pie = d3.layout.pie();
            var outerRadius = width / 2;
            var innerRadius = width / 3;
            var arc = d3.svg.arc()//画弧线
                .innerRadius(innerRadius)//弧线内外的粗细
				.outerRadius(outerRadius);
            var color = d3.scale.category20();//颜色
            var arcs = svg.selectAll("g")//为弧线添加数据
                .data(pie(dataset))
                .enter()
                .append("g")
                .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

            arcs.append("path").attr("fill", function (d, i) {
                return color(i);
            }).attr("d", function (d) {
                return arc(d);//svg 中的路径属性是 d。将其赋值为 arc(d) ，即将绑定的数据作为 arc 函数的参数。
            });
            arcs.append("text")
                .attr("transform", function (d) {
                    return "translate(" + arc.centroid(d) + ")";//arc.centroid(d) 能算出弧线的中心
                })
                .attr("text-anchor", "middle")
                .text(function (d) {
                    return d.value;
                });
            //线条
            var width1 = 335; //画布的宽度
            var height1 = 335; //画布的高度

            var svg1 = d3.select("#a")				//选择文档中的body元素
                .append("svg")				//添加一个svg元素
                .attr("width", width1)		//设定宽度
                .attr("height", height1).attr("style", "margin-left:-300px"); //设定高度

            var dataset1 = [55, 28, 17, 72, 60];//矩形的长度
            var pie1 = d3.layout.pie();
            var outerRadius1 = width1 / 2;
            var innerRadius1 = width1 / 2.02;
            var arc1 = d3.svg.arc()//画弧线
                .innerRadius(innerRadius1)//弧线内外的粗细
				.outerRadius(outerRadius1);
            var color1 = d3.scale.category20();//颜色
            var arcs1 = svg1.selectAll("g")//为弧线添加数据
                .data(pie1(dataset1))
                .enter()
                .append("g")
                .attr("transform", "translate(" + 167 + "," + 167 + ")");

            arcs1.append("path").attr("fill", function (d, i) {
                return "#dfdfdf";
            }).attr("d", function (d) {
                return arc1(d);//svg 中的路径属性是 d。将其赋值为 arc(d) ，即将绑定的数据作为 arc 函数的参数。
            });

        },

        //力图
        action5: function () {
            var nodes = [{ name: "GuiLin" },
					  { name: "GuangZhou" },
					  { name: "XiaMen" },
					  { name: "HangZhou" },
					  { name: "ShangHai" },
					  { name: "QingDao" },
					  { name: "TianJin" },
					  { name: "BeiJing" },
					  { name: "ChangChun" },
					  { name: "XiAn" },
					  { name: "WuluMuQi" },
					  { name: "LaSa" },
					  { name: "ChengDu" }];

            var edges = [{ source: 0, target: 1 },
                           { source: 1, target: 2 },
                           { source: 2, target: 3 },
                           { source: 3, target: 4 },
                           { source: 4, target: 5 },
                           { source: 5, target: 6 },
                           { source: 6, target: 7 },
                           { source: 7, target: 8 },
                           { source: 8, target: 9 },
                           { source: 9, target: 10 },
                           { source: 10, target: 11 },
                           { source: 11, target: 12 },
                           { source: 12, target: 0 }];

            var width = 1000;
            var height = 1000;

            console.log(edges);

            var svg = d3.select("body").append("svg")
                                    .attr("width", width)
                                    .attr("height", height);

            var force = d3.layout.force()//是力学图 Layout 的函数
                                .nodes(nodes)//里放入顶点的数组
                                .links(edges)//里放入边的数组
                                .size([width, height])//是作用域的大小
                                .linkDistance(200)//用于设定两个顶点之间的长度
                                .charge([-200])//设定相互吸引（+）还是排斥（-），以及大小
                                .start();//开始计算

            var svg_edges = svg.selectAll("line")//绘制线
                                .data(edges)
                                .enter()
                                .append("line")
                                .style("stroke", "#ccc")
                                .style("stroke-width", 1);

            var color = d3.scale.category20();

            var svg_nodes = svg.selectAll("circle")//绘制点
                                .data(nodes)
                                .enter()
                                .append("circle")
                                .attr("r", 10)
                                .style("fill", function (d, i) {
                                    return color(i);
                                })
                                .call(force.drag);//设定我们可以拖动顶点。这个 call 函数前面说过，用于将当前选择的元素传到 force.drag 函数中。

            force.on("tick", function () {//tick 指的是时间间隔，也就是每一个时间间隔之后就刷新一遍画面，刷新的内容写在后面的无名函数 function 中，函数中写上更新的内容即可。

                svg_edges.attr("x1", function (d) { return d.source.x; });
                svg_edges.attr("y1", function (d) { return d.source.y; });
                svg_edges.attr("x2", function (d) { return d.target.x; });
                svg_edges.attr("y2", function (d) { return d.target.y; });

                svg_nodes.attr("cx", function (d) { return d.x; });
                svg_nodes.attr("cy", function (d) { return d.y; });
            });
        },

        //饼图鼠标移过放大
        action6: function () {
            var data = [15, 25, 35, 25];

            var width = 660,
                height = 340;

            var outerRadius = height / 2 - 30,
                innerRadius = outerRadius / 3 + 30,
                cornerRadius = 10;
            var color = d3.scale.category20();//颜色
            var pie = d3.layout.pie();
            //.padAngle(.01);//弧与弧之间的距离

            var arc = d3.svg.arc()
                .padRadius(outerRadius)//外弧
                .innerRadius(innerRadius);//内弧

            var svgg = d3.select("body").append("svg")
                .attr("width", width)
                .attr("height", height);

            var svg = svgg.selectAll('g')
            .data(pie(data))
                .enter()
              .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            svg.append("path").attr("fill", function (d, i) {
                return color(i);
            }).each(function (d) { d.outerRadius = outerRadius - 20; })
                .attr("d", arc)
                .on("mouseover", arcTween(outerRadius + 20, 0))//鼠标移入移出效果
                .on("mouseout", arcTween(outerRadius - 20, 150));

            //svgg.selectAll("g").append("text")
            //    .attr("transform", function (d) {
            //        return "translate(" + arc.centroid(d) + ")";//arc.centroid(d) 能算出弧线的中心
            //    })
            //    .attr("text-anchor", "middle")
            //    .text(function (d) {
            //        return d.value;
            //    });

            function arcTween(outerRadius, delay) {
                return function () {
                    d3.select(this).transition().delay(delay).attrTween("d", function (d) {
                        var i = d3.interpolate(d.outerRadius, outerRadius);
                        //pie.padAngle(.02);
                        return function (t) { d.outerRadius = i(t); return arc(d); };
                    });
                };
            }
        },
        action7: function () {
            //创建一个SVG容器
            var width = 200, height = 200;

            var outlineArc = d3.svg.arc()
                    .startAngle(100)
                    .endAngle(360)
                    .innerRadius(0)
                    .outerRadius(height - 20);
            var svgContainer = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);

            //画圆形
            //var circle = svgContainer.append("circle")
            //.attr("cx", 100)
            //.attr("cy", 100)
            //.attr("r", 99)
            //.style("fill", function (d) { return '#ccc'; });
            var path = svgContainer.append("path")
                .attr("transform", "translate(" + (width * 15 / 32) + "," + height + ")")
                    .attr("class", "moniOutlineArc")
                    .attr("d", outlineArc);
        },

        //action8: function (data, id) {
        //    var category = ['0%-25%', '25%-50%', '50%-75%', '75%-100%'],
        //    cateColor = ["#7DA453", "#34B8F6", "#FACB6D", '#E97B5A'];

        //    var margin = { top: 20, right: 0, bottom: 40, left: 0 },
        //        width = $(id).width() - margin.left - margin.right,
        //        height = $(id).height() - margin.top - margin.bottom;

        //    var radius = Math.min(width, height) / 2,
        //        innerRadius = radius * 0.25 + 35,
        //        outerRadius = radius * 0.75;

        //    var legendRectSize = radius / 8,
        //        legendSpacing = radius / 5;

        //    var color = d3.scale.ordinal()//--构造一个序数比例尺
        //        .domain(category)
        //        .range(cateColor);

        //    //var formatPercent = d3.format(".0%");

        //    var pie = d3.layout.pie()//图表为饼图
        //        .value(function (d) { return d.value; })
        //        .sort(null);

        //    var arc = d3.svg.arc()//--饼的内半径和外半径
        //        .innerRadius(innerRadius)
        //        .outerRadius(outerRadius);

        //    var svgX = (width + margin.right + margin.left) / 2,//所在页面位置
        //        svgY = (radius * 2 + margin.top * 2) / 2;

        //    var svg = d3.select(id).append("svg").attr("class", "svgdata")//--添加画布
        //        .attr("width", width + margin.right + margin.left)
        //        .attr("height", height + margin.top + margin.bottom)
        //        .append("g")
        //        .attr("transform", "translate(" + svgX + "," + svgY + ")")
        //        .attr("class", "gbig");

        //    svg.append("svg:text")//--在环形中心添加文字
        //                .attr("class", "donutCenterText")
        //                .attr("dy", ".2em")
        //                .attr("text-anchor", "middle")
        //                .transition().duration(200)
        //                .text("经济的发展");

        //    path = svg.datum(data).selectAll(".solidArc")//--为图绑定数据
        //        .data(pie)
        //        .enter()
        //        .append("path")
        //        .attr("fill", function (d) {//--根据比例尺填充颜色
        //            return color(d.data.inits);
        //        })
        //        .attr("class", "solidArc")
        //        .attr("stroke", "none")
        //        .attr("d", arc)//path中的d的路径坐标画图
        //        .each(function (d) {
        //            this._current = d;
        //        })
        //        .on('mouseover', function (d) {//鼠标移入移出事件
        //            //console.log(d);
        //            arc.padAngle(.02);
        //            d3.select(this).transition().duration(200).attr("d", arc.innerRadius(innerRadius).outerRadius(outerRadius / 0.75 * 0.9 + 15));
        //            var curColor = d3.select(this).attr('fill');
        //            var outG = d3.selectAll("g.outG path")[0];
        //            $.each(outG, function (j, item) {
        //                if (item._current.data.inits == d.data.inits) {
        //                    d3.select(item).attr("fill", curColor);
        //                }
        //            });
        //            //count the sum
        //            var count = 0;
        //            for (var i = 0; i < category.length; i++) {
        //                count += data[i]['value'];
        //            }

        //        })
        //        .on('mouseout', function (d) {
        //            arc.padAngle(.0);
        //            var outG = d3.selectAll("g.outG path")[0];
        //            $.each(outG, function (j, item) {
        //                if (item._current.data.inits == d.data.inits) {
        //                    d3.select(item).attr("fill", "#ccc");
        //                }
        //            });
        //            d3.select(this).transition().duration(200).attr("d", arc.innerRadius(innerRadius).outerRadius(outerRadius));

        //        });

        //    //legend rendering图例
        //    var legend = svg.selectAll('.legend')
        //        .data(color.domain())
        //        .enter()
        //        .append('g')
        //        .attr("id", function (d) {
        //            return "legend-" + d;
        //        })
        //        .attr('class', 'legend')
        //        .attr('transform', function (d, i) {
        //            var horz = (i - 2.0) * (legendSpacing + 20 + legendRectSize + 20);
        //            var vert = radius + margin.bottom / 4;
        //            return 'translate(' + horz + ',' + vert + ')';
        //        });

        //    legend.append('rect')//图例的小标示
        //        .attr('width', legendRectSize)
        //        .attr('height', legendRectSize)
        //        .style('fill', color)
        //        .style('stroke', color);

        //    legend.append('text')//图例的文字
        //        .data(data)
        //        .attr('x', legendRectSize * 1.2)
        //        .attr('y', legendRectSize / 1.3)
        //        .text(function (d) {
        //            return d.inits;
        //        });
        //    //添加第一个外圆线
        //    var htmls = "<div class='reduridiv'></div>";
        //    $(id).append(htmls);

        //    var arc2 = d3.svg.arc()//--饼的内半径和外半径
        //        .innerRadius(159)
        //        .outerRadius(160.5);
        //    var svg2 = d3.select(id).select("svg")
        //        .append("g")
        //        .attr("transform", "translate(" + svgX + "," + svgY + ")")
        //        .attr("class", "outG");

        //    var path = svg2.datum(data).selectAll(".solidArc")//--为图绑定数据
        //        .data(pie)
        //        .enter()
        //        .append("path")
        //        .attr("fill", function (d) { //--根据比例尺填充颜色
        //            return "#ccc";
        //        })
        //        .attr("class", "solidArc")
        //        .attr("stroke", "none")
        //        .attr("d", arc2)//path中的d的路径坐标画图
        //        .each(function (d) {
        //            this._current = d;
        //        });

        //    this.getPath = function () {
        //        return path;
        //    };

        //    this.getArc = function () {
        //        return d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius);
        //    };
        //}
    });
})(jQuery);

