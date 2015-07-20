 function InitChart() {

                    

                    var data = [ {
                        "certaintiy": "0",
                        "year": "2005"
                    }, {
                        "certaintiy": "0",
                        "year": "2006"
                    }, {
                        "certaintiy": "50",
                        "year": "2007"
                    }, {
                        "certaintiy": "50",
                        "year": "2008"
                    }, {
                        "certaintiy": "50",
                        "year": "2009"
                    },{
                        "certaintiy": "0",
                        "year": "2010"
                    }, {
                        "certaintiy": "20",
                        "year": "2011"
                    }, {
                        "certaintiy": "30",
                        "year": "2012"
                    }, {
                        "certaintiy": "0",
                        "year": "2013"
                    }, {
                        "certaintiy": "50",
                        "year": "2014"
                    }, {
                        "certaintiy": "60",
                        "year": "2015"
                    }];
                    var data2 = [{
                        "certaintiy": "20",
                        "year": "2005"
                    }, {
                        "certaintiy": "30",
                        "year": "2006"
                    }, {
                        "certaintiy": "0",
                        "year": "2007"
                    }, {
                        "certaintiy": "50",
                        "year": "2008"
                    }, {
                        "certaintiy": "60",
                        "year": "2009"
                    },{
                        "certaintiy": "0",
                        "year": "2010"
                    }, {
                        "certaintiy": "20",
                        "year": "2011"
                    }, {
                        "certaintiy": "30",
                        "year": "2012"
                    }, {
                        "certaintiy": "0",
                        "year": "2013"
                    }, {
                        "certaintiy": "50",
                        "year": "2014"
                    }, {
                        "certaintiy": "0",
                        "year": "2015"
                    }];
                    var vis = d3.select("#visualisation"),
                        margin = {
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 50
                        };
                        width = 1070 - margin.left - margin.right,
                        height = 240 - margin.top - margin.bottom;

                    var xScale = d3.scale.linear().range([margin.left, width - margin.right]).domain([2005, 2015]);
                    var yScale = d3.scale.linear().range([height - margin.top, margin.bottom])
                        .domain([0, 100]);

                    var xAxis = d3.svg.axis()
                        .scale(xScale)
                        .tickFormat(d3.format("d"));                        ;
                    var yAxis = d3.svg.axis()
                        .scale(yScale)
                        .ticks(0)
                        .orient("left");
                    var  area = d3.svg.area()
                        .x(function(d) { return xScale(d.year); })
                        .y0(height-margin.top)
                        .y1(function(d) { return yScale(d.certaintiy); })
                        .interpolate("monotone");

                    /*d3.csv("data/data.csv", function(error, data) {
                        data.forEach(function(d) {
                            d.certaintiy = +d.certaintiy;
                            d.year = +d.year;
                        });
                    d3.csv("data/data2.csv", function(error, data2) {
                        data2.forEach(function(d) {
                            d.certaintiy = +d.certaintiy;
                            d.year = +d.year;
                        });*/

                    var lineGen = d3.svg.line()
                        .x(function(d) {
                            return xScale(d.year);
                        })
                        .y(function(d) {
                            return yScale(d.certaintiy);
                        })
                        .interpolate("monotone");

//x-axis y-axis
                    vis.append("svg:g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + (height - margin.bottom) + ")")
                        .call(xAxis);
                    vis.append("svg:g")
                        .attr("class", "y axis")
                        .attr("transform", "translate(" + (margin.left) + ",0)")
                        .call(yAxis);
//area under the curve
                    vis.append("path")
                        .datum(data)
                        .attr("class", "area1")
                        .attr("d", area);

                    vis.append("path")
                        .datum(data2)
                        .attr("class", "area2")
                        .attr("d", area);
//line
                    vis.append("path")
                        .datum(data)
                        .attr("d", lineGen)
                        .attr("stroke", "black")
                        .attr("stroke-width", 1)
                        .attr("fill","none")
                        ;

                   vis.append("path")
                        .attr("d", lineGen(data2))
                        .attr("stroke", "grey")
                        .attr("stroke-width", 1)
                        .attr("fill", "none")
                        ;
//y axis lable
                    vis.append("text")
                        .attr("class", "y label")
                        .attr("text-anchor", "end")

                        .attr("dy", "30px")
                        .attr("dx", "-80px")
                        .attr("transform", "rotate(-90)")
                        .attr("font-size", "20px")
                        .text("certaintiy");

                    vis.append("text")
                    .attr("text-anchor", "middle")
                    .attr("y", 10)
                    .attr("dy","20px")
                    .attr("x", width / 2)
                    .attr("font-size", "24px")
                    .text("What I Thought I Would Do");
                }
                InitChart();