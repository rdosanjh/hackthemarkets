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

  .controller('PlaylistsCtrl', function ($scope) {
    $scope.playlists = [
      { title: 'Reggae', id: 1 },
      { title: 'Chill', id: 2 },
      { title: 'Dubstep', id: 3 },
      { title: 'Indie', id: 4 },
      { title: 'Rap', id: 5 },
      { title: 'Cowbell', id: 6 }
    ];
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

  })
  .controller('PlaylistCtrl', function ($scope, $stateParams) {
  });
