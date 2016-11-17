'use strict';
angular.module('ui.bootstrap.navbar', ['ngAnimate', 'ui.bootstrap']);
angular.module('ui.bootstrap.navbar').controller('navbar', function ($scope) {
    $scope.isCollapsed = true;
});

angular.module('ui.bootstrap.customAlert', ['ngAnimate', 'ui.bootstrap']);
angular.module('ui.bootstrap.customAlert').controller('AlertCtrl', function ($scope, $timeout) {
    $scope.alerts = [];
    $scope.$on('handleMessage', function(event, msgObj) {
        $scope.alerts.push(msgObj);
        if(msgObj.isPersistent){

        } else{
            var alertIndex = $scope.alerts.length -1;
            $timeout( function(){
                $scope.alerts.splice(alertIndex, 1);
            },2000);
        }


    });


    $scope.addAlert = function () {
        $scope.alerts.push({msg: 'Another alert!'});

    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };
});