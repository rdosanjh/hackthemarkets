angular.module('starter.Summary', ['starter.services'])
    .controller('SummaryCtrl', function ($scope, $stateParams, detailsService, $timeout) {
        createPie(".pieID2.legend", ".pieID2.pie");

        var details = detailsService.getUserDetails();
        $scope.goal = details.goals.filter(function (goal) {
            return goal.name === $stateParams.name;
        })[0];

        var margin = { top: 30, right: 20, bottom: 30, left: 50 },
            width = 400 - margin.left - margin.right,
            height = 270 - margin.top - margin.bottom;

        // Parse the date / time
        var parseDate = d3.time.format("%d-%b-%y").parse;

        // Set the ranges
        var x = d3.time.scale().range([0, width]);
        var y = d3.scale.linear().range([height, 0]);

        // Define the axes
        var xAxis = d3.svg.axis().scale(x)
            .orient("bottom").ticks(5);

        var yAxis = d3.svg.axis().scale(y)
            .orient("left").ticks(5);

        // Define the line
        var valueline = d3.svg.line()
            .x(function (d) { return x(d.date); })
            .y(function (d) { return y(d.close); });

        // Adds the svg canvas
        var svg = d3.select("#chart1")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Get the data
        d3.csv("data.csv", function (error, data) {
            data.forEach(function (d) {

                d.date = parseDate(d.date);
                d.close = (800 - d.close);
            });

            x.domain(d3.extent(data, function (d) { return d.date; }));
            y.domain([0, d3.max(data, function (d) { return d.close; })]);

            var path = svg.append("path")
                .attr("class", "line")
                .attr("d", valueline(data));

            var totalLength = path.node().getTotalLength();


            path
                .attr("stroke-dasharray", totalLength + " " + totalLength)
                .attr("stroke-dashoffset", totalLength)
                .transition()
                .duration(1000)
                .ease("linear")
                .attr("stroke-dashoffset", 0);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis);


            var margin_tabs = { top: 5, right: 20, bottom: 20, left: 20 },
                width_tabs = 400 - margin_tabs.left - margin_tabs.right,
                height_tabs = 50 - margin_tabs.top - margin_tabs.bottom;

            var chart = d3.bullet()
                .width(width_tabs)
                .height(height_tabs);

            d3.json("bullets.json", function (error, data) {
                if (error) throw error;

                var svg = d3.select("#bullets").selectAll("svg")
                    .data(data)
                    .enter().append("svg")
                    .attr("class", "bullet")
                    .attr("width", width_tabs + margin_tabs.left + margin_tabs.right)
                    .attr("height", 80)
                    .append("g")
                    .attr("transform", "translate(" + margin_tabs.left + "," + margin_tabs.top + ")")
                    .call(chart);

                var title = svg.append("g")
                    .style("text-anchor-tabs", "end")
                    .attr("transform", "translate(10," + height / 4 + ")");

                title.append("text")
                    .attr("class", "title")
                    .text(function (d) { return d.title; });

                title.append("text")
                    .attr("class", "subtitle")
                    .attr("dy", "1em")
                    .text(function (d) { return d.subtitle; });

                d3.selectAll("button").on("click", function () {
                    svg.datum(randomize).call(chart.duration(1000)); // TODO automatic transition
                });
            });

        });

    })
    .directive('linechart', function () {
        return {
            link: function () {
                var w = 700;
                var h = 300;

                var svg = d3.select("#line")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h)
                    .attr("id", "visualization")
                    .attr("xmlns", "http://www.w3.org/2000/svg");
                var i = 21;
                var data = d3.range(21).map(function () {
                    i--;
                    return ((i / 10) * Math.random()) * 10
                })
                var x = d3.scale.linear().domain([0, 21]).range([0, 700]);
                var y = d3.scale.linear().domain([0, 21]).range([10, 290]);
                var line = d3.svg.line()
                    .interpolate("cardinal")
                    .x(function (d, i) { return x(i); })
                    .y(function (d) { return y(d); })

                var axis = d3.svg.axis()
                    .scale(x);

                var path = svg.append("path")
                    .attr("d", line(data))
                    .attr("stroke", "steelblue")
                    .attr("stroke-width", "2")
                    .attr("fill", "none")
                    .call(axis);

                var totalLength = path.node().getTotalLength();

                path
                    .attr("stroke-dasharray", totalLength + " " + totalLength)
                    .attr("stroke-dashoffset", totalLength)
                    .transition()
                    .duration(2000)
                    .ease("linear")
                    .attr("stroke-dashoffset", 0);

                svg.on("click", function () {
                    path
                        .transition()
                        .duration(2000)
                        .ease("linear")
                        .attr("stroke-dashoffset", totalLength);
                })

            }
        }
    })

