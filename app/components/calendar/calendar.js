/**
 * Created by johnpaul on 11/15/2016.
 */
angular.module('Calendar', [
    'mwl.calendar',
    'ui.bootstrap.datetimepicker',
    'DataResource',
    'EventManager',
    'ShiftDateTimePickers'
])
    .config(calendarConfig)
    .controller('calendarCtrl', calendarCtrl)
    .controller('editShiftCtrl', editShiftCtrl);


function calendarConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
    // home states and nested views using UI Router
        .state('app.basic-calendar', {
            url: 'calendar',
            views: {
                'content@': {
                    templateUrl: 'components/calendar/calendar.html',
                    controller: 'calendarCtrl'
                }
            }

        })
        //detail view for a repo
        .state('app.edit-shift', {
            url: 'edit-shift/:id',
            views: {
                'content@': {
                    templateUrl: 'components/calendar/edit-shift.html',
                    controller: 'editShiftCtrl'
                }
            }
        })
    ;

    //if we  do not hit any of  the above routes,then use this route
    $urlRouterProvider.otherwise('/');
}

function calendarCtrl($scope, $state, Messenger, DataResource, EventManager) {
    $scope.viewDate = moment();
    $scope.calendarTitle = $scope.viewDate.format('MMMM');
    $scope.calendarView = 'month';

    $scope.data = {};
    $scope.data.startDate = null;
    $scope.data.endDate = null;

    //this will be used to add a new shift
    $scope.isShiftFormShown = false;

    //get events from the event manager
    $scope.events = EventManager.events;


    $scope.editShift = function (index) {
        $scope.data.startDate = EventManager.events[index].startMoment;
        $scope.data.endDate = EventManager.events[index].endMoment;
    }
    $scope.stringify = function () {
        var json = JSON.stringify(EventManager.eventsJson);
        console.log(json);
    }
    $scope.importDemoData = function () {
        EventManager.importDemoData();
        $scope.events = EventManager.events;


    }

    $scope.showShiftForm = function () {
        $scope.isShiftFormShown = true;
    }
}

function editShiftCtrl($scope, $state, Messenger, DataResource, EventManager, $stateParams){

    $scope.events = EventManager.events;
    var event = EventManager.events[$stateParams.id];

    $scope.shiftId = $stateParams.id;
    $scope.data = {};
    $scope.data.startDate = event.startMoment;
    $scope.data.endDate =  event.endMoment;

}
