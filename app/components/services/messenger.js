'use strict';
angular.module('Messenger',[]).factory('Messenger', function ($rootScope) {
    var data = {};
    data.broadcast = function (message, messageType, isPersistent) {
        isPersistent = isPersistent || false;
        var msgObj = {
            msg: message,
            type: messageType,
            isPersistent:isPersistent
        };
        $rootScope.$broadcast('handleMessage', msgObj);
    }


    return data;
});
