angular.module('starter.services', [])
    .factory('detailsService', function () {
        var service = {
            setUserDetails: setUserDetails,
            addToUserDetails: addToUserDetails,
            getUserDetails: getUserDetails
        }
        var userDetails = {};
        function addToUserDetails(key, value) {
            userDetails[key] = value;
        }
        function setUserDetails(details) {
            console.log("setting details ...");
            console.log(details);
            userDetails = details;
        }
        function getUserDetails(details) {
            return userDetails;
        }

        return service;
    })