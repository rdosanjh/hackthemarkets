angular.module('starter.controllers', ['starter.services', 'starter.Summary'])
  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    // $scope.loginData = {};

    // // Create the login modal that we will use later
    // $ionicModal.fromTemplateUrl('templates/login.html', {
    //   scope: $scope
    // }).then(function (modal) {
    //   $scope.modal = modal;
    // });

    // // Triggered in the login modal to close it
    // $scope.closeLogin = function () {
    //   $scope.modal.hide();
    // };

    // // Open the login modal
    // $scope.login = function () {
    //   $scope.modal.show();
    // };

    // // Perform the login action when the user submits the login form
    // $scope.doLogin = function () {
    //   console.log('Doing login', $scope.loginData);

    //   // Simulate a login delay. Remove this and replace with your login
    //   // code if using a login system
    //   $timeout(function () {
    //     $scope.closeLogin();
    //   }, 1000);
    // };
  })

  .controller('PlaylistsCtrl', function ($scope, detailsService) {
    $scope.details = detailsService.getUserDetails();

    if (!$scope.details.goals) {
      $scope.details.goals = [];
    }

    var hasSamples = $scope.details.goals.filter(function (goal) {
      return goal.name === "Funding our startup";
    }).length > 0;

    if (!hasSamples) {
      $scope.details.goals.push({
        name: "Croatia Summer 2017",
        amount: 7432.73,
        percentage: 155,
        members: [
          {
            name: 'Angela Dunkleman',
            imgUrl: "https://static.pexels.com/photos/51969/model-female-girl-beautiful-51969-medium.jpeg"
          },
          {
            name: 'Freddy Eagles',
            imgUrl: "https://static.pexels.com/photos/103123/pexels-photo-103123-medium.jpeg"
          },
          {
            name: 'Chris Patel',
            imgUrl: "https://static.pexels.com/photos/7110/desk-office-workspace-coworking-medium.jpg"
          }

        ]
      });
      $scope.details.goals.push({
        name: "Buying a Rolex",
        amount: 1300,
        percentage: 234
      });
      detailsService.setUserDetails($scope.details);
    }

  })
  .controller('SignupCtrl', function ($scope, detailsService, $state, $ionicModal, $timeout) {


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
        $state.go('app.playlists');
      }, 1000);
    };



    $scope.goal = {};
    $scope.justInvest = function () {
      $scope.goal = {};
    };
    $scope.hasGoal = function () {
      $state.go("signupGoal");
    }
    $scope.goalNext = function () {
      detailsService.addToUserDetails('goals', [$scope.goal]);
      $state.go('goalOptions');
    }
  })

  .controller('SpendingCtrl', function ($scope, detailsService, $state) {

    $scope.randomize = function (d) {
      if (!d.randomizer) d.randomizer = randomizer(d);
      d.ranges = d.ranges.map(d.randomizer);
      d.markers = d.markers.map(d.randomizer);
      d.measures = d.measures.map(d.randomizer);
      return d;
    }

    $scope.randomizer = function (d) {
      var k = d3.max(d.ranges) * .2;
      return function (d) {
        return Math.max(0, d + k * (Math.random() - .5));
      };
    }

    createPie(".pieID.legend", ".pieID.pie");

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
    var svg = d3.select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Get the data
    d3.csv("data.csv", function (error, data) {
      data.forEach(function (d) {
        d.date = parseDate(d.date);
        d.close = +d.close;
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

    ////////////////////////////








  })




  .controller('GoalCtrl', function ($scope, detailsService, $state) {

    $scope.setSecondPhase = function () {
      $scope.nextPhase = true;
    }
    var details = detailsService.getUserDetails();
    console.log("details", details);
    if (details && details.goals) {
      $scope.goal = details.goals[0];
      $scope.goal.risk = 'moderate';
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
      $state.go('register');
    }
  })
  .controller('PlaylistCtrl', function ($scope, $stateParams) {
  });