angular.module('starter.services', [])
    .factory('detailsService', function () {
        var service = {
            setUserDetails: setUserDetails,
            addToUserDetails: addToUserDetails,
            getUserDetails: getUserDetails
        }
        var _this = this;
        this.userDetails = {};
        function addToUserDetails(key, value) {
            console.log("setting details ...");
            console.log("key",key);
            console.log("value",value);
            _this.userDetails[key] = value;
        }
        function setUserDetails(details) {
            console.log("setting details ...");
            console.log(details);
            _this.userDetails = details;
        }
        function getUserDetails(details) {
            return _this.userDetails;
        }

        return service;
    })