/**
 * Created by johnpaul on 11/15/2016.
 */

angular.module('User', ['DataResource', 'Messenger'])
    .config(userConfig)
    .controller('usersCtrl', usersCtrl);

function userConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
    // home states and nested views using UI Router
        .state('app.users',{
            url:'users',
            views:{
                'content@':{
                    templateUrl: 'components/user/users.html',
                    controller:'usersCtrl'
                }
            }

        });

    //if we  do not hit any of  the above routes,then use this route
    $urlRouterProvider.otherwise('/');
}
/*
*
* Controllers
*
 */
function usersCtrl($scope, $state, DataResource, Messenger){
    //set up the scope variables
    $scope.data = {};
    $scope.data.users = DataResource.users;
    $scope.data.selectedUser = null;
    $scope.showValidationMessage = false;
    $scope.validationMessage = '';
    $scope.data.password = null;


    $scope.chooseUser = function(){
        /*
        if($scope.data.selectedUser === null) {
            $scope.data.showValidationMessage = true;
            $scope.data.validationMessage = 'Please Select a valid user';
        } else{
            $scope.data.showValidationMessage = false;
            $scope.data.validationMessage ='';

        }*/

        if($scope.data.selectedUser.password == $scope.data.password){
            //this is not a production-ready way to authenticate a user, but for the purpose of this example, this will suffice.
            DataResource.activeUser = $scope.data.selectedUser;
            Messenger.broadcast(
                "Login Successful",
                "success"
            );
            $state.go('app.basic-calendar');
        } else{
            Messenger.broadcast(
                "Password is incorrect",
                "danger"
            );

            DataResource.activeUser = null;
        }
        //console.log( $scope.data.selectedUser );
    }



}