'use strict';
angular.module('Security', []).factory('Security', function() {
    var data = {};
    data.userRoutes = [
        'app.basic-calendar',
        'app.validator',
        'app.errors'
    ];
    data.adminRoutes = [

    ];
    data.defaultRoute = 'app.users';
    return data;
});
