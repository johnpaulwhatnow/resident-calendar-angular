'use strict';
angular.module('DataResource', []).factory('DataResource', function() {
    var data = {};
    data.users = [
        {
            name:"Dr. Justin",
            id:1,
            is_admin: false,
            password:"taako",
            color:'#198215',
            shifts:[]
        },
        {
            name:"Dr. Sydnee",
            id:2,
            is_admin: true,
            password:'sawbones',
            color:'#3f1685',
            shifts:[]
        },
        {
            name:"Dr. Griffin",
            id:3,
            is_admin: false,
            password:'angus',
            color:'#8a174d',
            shifts:[]
        }
    ];
    data.validationObj = {};
    data.activeUser = null;

    return data;
});
