'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngAnimate',
    'ui.bootstrap',
    'ui.router',
    'ui.bootstrap.navbar',
    'ui.bootstrap.customAlert',

    'angularMoment',

    'DataResource',
    'Calendar',
    'User',
    'Security',
    'Messenger',
    'Validator',
]).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    // home states and nested views using UI Router
        .state('app', {
            url: '/',
            views: {
                'nav': {templateUrl: 'templates/nav.html'},
                'messenger':{templateUrl: 'templates/messenger.html'},
                'content': {
                    templateUrl: 'templates/home.html',
                    controller: function ($state) {
                        console.log('hello w ord');
                    }
                },
            },

        });

    //if we  do not hit any of  the above routes,then use this route
    $urlRouterProvider.otherwise('/');
}).run(myAppRun);


function myAppRun($rootScope, $state, DataResource, Security,Messenger){
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        //console.log(toState);
        //is this route a basic route?
        var isUserRoute = _.findIndex(Security.userRoutes, function(route) { return route == toState.name; });
        if(isUserRoute !== -1){
            //if our route was found in the list of user routes, we need to verifiy that this user has access to be here
            if( _.isEmpty(DataResource.activeUser) ){
                event.preventDefault();
                //if this is empty, then the user hasn't been authenticated.
                //add a message
                Messenger.broadcast(
                    "You do not have permission to view this page",
                    "danger"
                );
                //redirect to the default state (defined in Security)
               $state.go(Security.defaultRoute);
            }
        }

    });

}

