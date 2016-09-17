angular.module('starter.Summary', ['starter.services'])
    .controller('SummaryCtrl', function ($scope, $stateParams, detailsService, $timeout) {
        createPie(".pieID.legend", ".pieID.pie");

        var details = detailsService.getUserDetails();
        $scope.goal = details.goals.filter(function (goal) {
            return goal.name === $stateParams.name;
        })[0];

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

                var data = d3.range(11).map(function () { return Math.random() * 10 })
                var x = d3.scale.linear().domain([0, 10]).range([0, 700]);
                var y = d3.scale.linear().domain([0, 10]).range([10, 290]);
                var line = d3.svg.line()
                    .interpolate("cardinal")
                    .x(function (d, i) { return x(i); })
                    .y(function (d) { return y(d); })

                var path = svg.append("path")
                    .attr("d", line(data))
                    .attr("stroke", "steelblue")
                    .attr("stroke-width", "2")
                    .attr("fill", "none");

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

