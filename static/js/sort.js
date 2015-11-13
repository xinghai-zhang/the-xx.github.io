var w = 700, h = 300, num = 30, dataset,timer,
    padding = 2,
    states = {"default": 0, "finished": 1, "current": 2, "compare": 3, "minimal": 4, "hide": 5},
    colors = ["#B7C4CF", "#3565A1", "#D55511", "#74A82A", "#A42F11", "#fff"],
    color_default = "#6A6BCD", color_highlight = "#C24787", svg;



// init the graph
setDataset(num);
setRects(dataset);
setCount();
setLabel();
function swap(i, j) {
    var temp = dataset[i];
    dataset[i] = dataset[j];
    dataset[j] = temp;
}
function setLabel(){
    var barWidth = w/dataset.length;
    var label = ["unsorted","sorted","current","compare"];
    var datas =[{"y":0, "color":0},{"y":20, "color":1},
    {"y":40, "color":2},{"y":60, "color":3}];
    for (i = 0; i < datas.length; i++) { 
        svg.append("rect")
            .attr("y", function(){return i*15 + 180})
            .attr("x", 0)
            .attr("width", 50)
            .attr("height",12)
            .attr("fill",function(){return colors[datas[i].color]});
            svg.append("text")
            .attr("x",60)
            .attr("y", function(){return i*16 + 190})
            .text(function(){return label[i]});
    }
}
// generate random dataset
function setDataset(len) {
    len = len || 20;
    var i = 0;
    dataset = [];
    for (; i < len; i++) {
        dataset[i] = { num: (Math.random() * len * 2) | 0, 
                       state: states.default };
    }
    dataset[0].state = states.hide;   
    scale = d3.scale.linear()
                .domain([0, d3.max(dataset, function(d) { return d.num; })])
                .range([9, h-150]);
}
function redrawRects(set) {
    var rects = svg.selectAll("rect")
                    .data(set)
                    .transition()
                    .duration(speed / 2 | 0)
            .attr("y", function(d, i) {
                return h -150 - scale(d.num);})
            .attr("width", function(d, i) {
                return (w / set.length) - padding;})
            .attr("height", function(d, i) {
                return scale(d.num);})
            .attr("fill", function(d, i) {
                return colors[d.state];});
}

// create rect in svg
function setRects(set) {
    document.getElementById("graph").innerHTML = "";
    
    svg = d3.select("#graph")
            .append("svg")
            .attr("width", w)
            .attr("height", h-50);


    
    var rects = svg.selectAll("rect")
                    .data(set)
                    .enter()
                    .append("rect");
    
    rects.attr("x", function(d, i) {
            return i * (w / set.length);})
        .attr("y", function(d, i) {
            return h -150 - scale(d.num);})
        .attr("width", function(d, i) {
            return (w / set.length) - padding;})
        .attr("height", function(d, i) {
            return scale(d.num);})
        .attr("fill", function(d, i) {
            return colors[d.state];});
}

function setCount(){
    text = svg.append("text");
    svg.append("text").attr("x", w/2)
            .attr("y",200)
            .text(  "Number of comparison:");

     count = text.attr("x", w/2+20)
         .attr("y",230)
         .text(  "0");
}
var algos = {};
algos.insertion = function(){
    var i = 1, j = 2, len = dataset.length, inI = false;
    var it = 0;
    dataset[0].state = states.hide;
    dataset[1].state = states.finished;
    timer = setInterval(function(){
        if (j < len) {
            if (!inI) {
                dataset[j].state = states.current;
                i = j - 1;
                inI = true;
            }
            if (i > 0) {
                it++;
                count.text(function(){return it});
                dataset[i].state = states.finished;
                if (dataset[i].num > dataset[i + 1].num) {

                    swap(i, i + 1);
                    if(i>1){
                         dataset[i-1].state = states.compare;
                    };
                } else {
                    dataset[i].state = states.finished;   
                    dataset[i + 1].state = states.finished;                  
                    j++;
                    inI = false;
                    
                }                
                i--;
            } else {
                dataset[1].state = states.finished;               
                j++;
                inI = false;
            }           
        } else {
            clearInterval(timer);
        }    

        redrawRects(dataset);
        
    }, speed);


};
//reset
document.getElementById("reset").addEventListener("click", function() {
    clearInterval(timer);
    
    speed = document.getElementById("speed").value;
    
    setDataset(num);
    setRects(dataset);
    setCount();
    setLabel();
});

// play

document.getElementById("play").addEventListener("click", function() {
    clearInterval(timer);
    
    for (var i = dataset.length - 1; i >= 0; i--){
        dataset[i].state = states.default;    
    }
    
    algos.insertion();
});