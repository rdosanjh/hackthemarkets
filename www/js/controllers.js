angular.module('starter.controllers', ['starter.services', 'starter.Summary'])
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

    if (!$scope.details.goals) {
      $scope.details.goals = [];
    }

    var hasSamples = $scope.details.goals.filter(function (goal) {
      return goal.name === "Funding our startup";
    }).length > 0;

    if (!hasSamples) {
      $scope.details.goals.push({
        name: "Funding our startup",
        amount: 100,
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
        amount: 1300
      });
      detailsService.setUserDetails($scope.details);
    }

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