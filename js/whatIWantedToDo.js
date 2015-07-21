 function InitChart() {

                    
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
                    var data = [{
                        "certaintiy": "0",
                        "year": "2007"
                    }, {
                        "certaintiy": "0",
                        "year": "2008"
                    }, {
                        "certaintiy": "10",
                        "year": "2009"
                    }, {
                        "certaintiy": "30",
                        "year": "2011"
                    }, {
                        "certaintiy": "50",
                        "year": "2012.5"
                    }, {
                        "certaintiy": "0",
                        "year": "2013.5"
                    }, {
                        "certaintiy": "0",
                        "year": "2014.5"
                    }, {
                        "certaintiy": "75",
                        "year": "2015"
                    },{
                        "certaintiy": "80",
                        "year": "2015.5"
                    }];
                    var data2 = [{
                        "certaintiy": "0",
                        "year": "2007"
                    }, {
                        "certaintiy": "0",
                        "year": "2008"
                    }, {
                        "certaintiy": "0",
                        "year": "2009.5"
                    },{
                        "certaintiy": "60",
                        "year": "2010.5"
                    }, {
                        "certaintiy": "0",
                        "year": "2011"
                    }, {
                        "certaintiy": "0",
                        "year": "2012"
                    }, {
                        "certaintiy": "0",
                        "year": "2013"
                    }, {
                        "certaintiy": "80",
                        "year": "2014"
                    }, 
                    {
                        "certaintiy": "75",
                        "year": "2015"
                    },
                    {
                        "certaintiy": "75",
                        "year": "2015.5"
                    }];

                     var data3 = [{
                        "certaintiy": "0",
                        "year": "2012"
                    },{"certaintiy": "10",
                        "year": "2013"
                    },{"certaintiy": "10",
                        "year": "2015.5"
                    }];
                    var svg = d3.select("#visualisation"),
                        margin = {
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 50
                        };
                        width = 1070 - margin.left - margin.right,
                        height = 280 - margin.top - margin.bottom;

                    var xScale = d3.scale.linear().range([margin.left, width - margin.right]).domain([2007, 2015.5]);
                    var yScale = d3.scale.linear().range([height - margin.top, margin.bottom])
                        .domain([0, 100]);

                    var xAxis = d3.svg.axis()
                        .scale(xScale)
                        .tickFormat(d3.format("d"));                       
                    var yAxis = d3.svg.axis()
                        .scale(yScale)
                        .ticks(0)
                        .orient("left");
                    var  area = d3.svg.area()
                        .x(function(d) { return xScale(d.year); })
                        .y0(height-margin.top)
                        .y1(function(d) { return yScale(d.certaintiy); })
                        .interpolate("monotone");

                    var lineGen = d3.svg.line()
                        .x(function(d) {
                            return xScale(d.year);
                        })
                        .y(function(d) {
                            return yScale(d.certaintiy);
                        })
                        .interpolate("monotone");

//area under the curve
                    svg.append("path")
                        .datum(data)
                        .attr("class", "area1")
                        .attr("d", area);

                    svg.append("path")
                        .datum(data2)
                        .attr("class", "area2")
                        .attr("d", area);
                    svg.append("path")
                        .datum(data3)
                        .attr("class", "area3")
                        .attr("d", area);
//line
                    svg.append("path")
                        .datum(data)
                        .attr("d", lineGen)
                        .attr("stroke", "blue")
                        .attr("stroke-width", 1)
                        .attr("fill","none")
                        ;

                   svg.append("path")
                        .attr("d", lineGen(data2))
                        .attr("stroke", "black")
                        .attr("stroke-width", 1)
                        .attr("fill", "none")
                        ;
                    svg.append("path")
                        .datum(data3)
                        .attr("d", lineGen)
                        .attr("stroke", "yellow")
                        .attr("stroke-width", 1)
                        .attr("fill","none")
                        ;
//y axis lable
                    svg.append("text")
                        .attr("class", "y label")
                        .attr("text-anchor", "end")

                        .attr("dy", "30px")
                        .attr("dx", "-80px")
                        .attr("transform", "rotate(-90)")
                        .attr("font-size", "20px")
                        .text("certaintiy");
//label on the graph
var labeldata = [  {
                        "height": "5",
                        "year": "2008", "text":"No Idea"
                    }, {
                        "height": "10",
                        "year": "2007", "text":"No Idea"
                    }, 
                    {
                        "height": "20",
                        "year": "2008", "text":"Mechnical Engineer"
                    }, 
                    {
                        "height": "65",
                        "year": "2010", "text":"Architect"
                    },{
                        "height": "20",
                        "year": "2012", "text":"Coffee Shop owner"
                    },{
                        "height": "82",
                        "year": "2013", "text":"Software Engineer"
                    },{
                        "height": "90",
                        "year": "2014.5", "text":"Data Scientist"
                    }];
                    svg.selectAll("text")
                        .data(labeldata)
                        .enter()
                        .append("text")
                        .text( function(d) {
                             return (d.text);})
                        .attr("x", function(d) {
                             return xScale(d.year);
                        })
                        .attr("y", function(d) {
                             return yScale(d.height);
                        })
                        .attr("font-family", "sans-serif")
                        .attr("font-size", "18px")
                        .attr("fill", "black");
//title
                    /*svg.append("text")
                        .attr("text-anchor", "middle")
                        .attr("y", 10)
                        .attr("dy","10px")
                        .attr("x", width / 2)
                        .attr("font-size", "24px")
                        .text("What I Thought I Would Do");*/


            //x-axis y-axis
                    svg.append("svg:g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + (height - margin.bottom) + ")")
                        .call(xAxis);
                    svg.append("svg:g")
                        .attr("class", "y axis")
                        .attr("transform", "translate(" + (margin.left) + ",0)")
                        .call(yAxis);

                                }

                
                InitChart();