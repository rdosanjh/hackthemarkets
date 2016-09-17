angular.module('starter.controllers', ['starter.services'])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };
  })

  .controller('PlaylistsCtrl', function ($scope, detailsService) {
    $scope.details = detailsService.getUserDetails();
    if(!$scope.details.goals){
      $scope.details.goals = [];
    }
    $scope.details.goals.push({
      name: "Funding our startup",
      amount: 100,
      members: [
        {
          imgUrl: "https://static.pexels.com/photos/51969/model-female-girl-beautiful-51969-medium.jpeg"
        },
        {
          imgUrl: "https://static.pexels.com/photos/103123/pexels-photo-103123-medium.jpeg"
        },
        {
          imgUrl: "https://static.pexels.com/photos/7110/desk-office-workspace-coworking-medium.jpg"
        }
        
      ]
    });
    $scope.details.goals.push({
      name: "Buying a rolex",
      amount: 1300
    });
  })
  .controller('SignupCtrl', function ($scope, detailsService, $state) {
    $scope.goal = {};
    $scope.justInvest = function () {
      $scope.goal = {};
    };
    $scope.hasGoal = function () {
      $state.go("signupGoal");
    }
    $scope.goalNext = function () {
      detailsService.addToUserDetails('goals', [$scope.goal])
      $state.go('goalOptions');
    }
  })

  .controller('SpendingCtrl', function ($scope, detailsService, $state) {

        createPie(".pieID.legend", ".pieID.pie");

         /*var margin = {top: 20, right: 20, bottom: 30, left: 50},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

        //$scope.formatDate = ;

        var x = d3.time.scale()
          .range([0, width]);

        var y = d3.scale.linear()
          .range([height, 0]);

        var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

        var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left");

        var line = d3.svg.line()
          .x(function(d) { return x(d.date); })
          .y(function(d) { return y(d.close); });

        var svg = d3.select("#chart").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        $scope.type = function (d) {
            console.log('Starting d') ;
            console.log(d) ;
            console.log(d.data) ;
            d.date = d3.time.format("%d-%b-%y").parse(d.date);

            console.log("Ending d") ;
            console.log(d) ;
            d.close = + d.close;

            
            return d;
        };

        d3.tsv("data.tsv", $scope.type, function(error, data) {

          if (error) console.log('Error');
          console.log('Got data ')
          console.log(data)
          
          x.domain(d3.extent(data, function(d) { return d.date; }));
          y.domain(d3.extent(data, function(d) { return d.close; }));

          svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
              .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Price ($)");

            svg.append("path")
                .datum(data)
                .attr("class", "line")
                .attr("d", line);

        });*/

        var graphData = [{
                // Visits
                data: [ [6, 1300], [7, 1600], [8, 1900], [9, 2100], [10, 2500], [11, 2200], [12, 2000], [13, 1950], [14, 1900], [15, 2000] ],
                color: '#71c73e'
            }, {
                // Returning Visits
                data: [ [6, 500], [7, 600], [8, 550], [9, 600], [10, 800], [11, 900], [12, 800], [13, 850], [14, 830], [15, 1000] ],
                color: '#77b7c5',
                points: { radius: 4, fillColor: '#77b7c5' }
            }
        ];
         

         $.plot($('#graph-lines'), graphData, {
            series: {
                points: {
                    show: true,
                    radius: 5
                },
                lines: {
                    show: true
                },
                shadowSize: 0
            },
            grid: {
                color: '#646464',
                borderColor: 'transparent',
                borderWidth: 20,
                hoverable: true
            },
            xaxis: {
                tickColor: 'transparent',
                tickDecimals: 2
            },
            yaxis: {
                tickSize: 1000
            }
        });
         
        

        $('#lines').on('click', function (e) {
          $('#bars').removeClass('active');
          $('#graph-bars').fadeOut();
          $(this).addClass('active');
          $('#graph-lines').fadeIn();
          e.preventDefault();
        });

        

        // Tooltip #################################################
         $scope.showTooltip = function(x, y, contents) {
          $('<div id="tooltip">' + contents + '</div>').css({
            top: y - 16,
            left: x + 20
          }).appendTo('body').fadeIn();
        }

        var previousPoint = null;

        $('#graph-lines').bind('plothover', function (event, pos, item) {
          if (item) {
            if (previousPoint != item.dataIndex) {
              previousPoint = item.dataIndex;
              $('#tooltip').remove();
              var x = item.datapoint[0],
                y = item.datapoint[1];
                $scope.showTooltip(item.pageX, item.pageY, y + ' visitors at ' + x + '.00h');
            }
          } else {
            $('#tooltip').remove();
            previousPoint = null;
          }
        });


    


  })


  .controller('GoalCtrl', function ($scope, detailsService, $state) {
    var details = detailsService.getUserDetails();
    console.log("details", details);
    if (details && details.goals) {
      $scope.goal = details.goals[0];
      if ($scope.goal.type === "Car") {
        $scope.goal.timeframe = 3;
      }
      if ($scope.goal.type === "Holiday") {
        $scope.goal.timeframe = 1;

      }
      if ($scope.goal.type === "Shopping Spree") {
        $scope.goal.timeframe = 1;

      }
      if ($scope.goal.type === "Treat Yourself") {
        $scope.goal.timeframe = 2;

      }
      if ($scope.goal.type === "Other") {
        $scope.goal.timeframe = 5;
      }
    }

    $scope.getProjection = function () {
      try {
        var growthAmount = 1;
        if ($scope.goal.risk === "low") {
          growthAmount = 1.01;
          return Math.round((($scope.goal.target || 0 - $scope.goal.amount || 0) / $scope.goal.monthly || 1) + 1);
        }
        if ($scope.goal.risk === "moderate") {
          growthAmount = 1.07;
          return Math.round(($scope.goal.target || 0 - $scope.goal.amount || 0) / $scope.goal.monthly || 1);

        }
        if ($scope.goal.risk === "high") {
          growthAmount = 1.2;
          return Math.round((($scope.goal.target || 0 - $scope.goal.amount || 0) / $scope.goal.monthly || 1) - 1);
        }

      } catch (e) {
        return -1;
      }
    }

    $scope.howFar = function () {
      return Math.round($scope.goal.timeframe - $scope.getProjection());
    }

    $scope.correction = function () {
      return Math.round(($scope.goal.target - $scope.goal.amount) / $scope.goal.timeframe);
    }

    $scope.goalOptionsNext = function () {
      var details = detailsService.getUserDetails();
      if (!details.goals) {
        details.goals = [$scope.goal];
        detailsService.setUserDetails(details);
      }
      else {
        details.goals[0] = $scope.goal;
        detailsService.setUserDetails(details);
      }
      $state.go('app.playlists');
    }
  })
  .controller('PlaylistCtrl', function ($scope, $stateParams) {
  });
