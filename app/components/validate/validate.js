/**
 * Created by johnpaul on 11/15/2016.
 */
angular.module('Validator', [
    'DataResource',
    'EventManager',
    'ShiftTable'
])
    .config(validatorConfig)
    .controller('validatorCtrl', validatorCtrl)
    .controller('errorsCtrl', errorsCtrl);

function validatorConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
    // home states and nested views using UI Router
        .state('app.validator', {
            url: 'validator',
            views: {
                'content@': {
                    templateUrl: 'components/validate/validator.html',
                    controller: 'validatorCtrl'
                }
            }

        })
        .state('app.errors', {
            url: 'errors',
            views: {
                'content@': {
                    templateUrl: 'components/validate/errors.html',
                    controller: 'errorsCtrl'
                }
            }

        });

    //if we  do not hit any of  the above routes,then use this route
    $urlRouterProvider.otherwise('/');
}
function validatorCtrl($scope, $state, Messenger, DataResource, EventManager) {
    $scope.data = {};
    $scope.data.validateDate = null;
    //do we have events? if not this is a no go.
    if (_.isEmpty(EventManager.events)) {
        Messenger.broadcast(
            "Please add some shifts first.",
            "danger"
        );
        $state.go('app.basic-calendar');
    }

    $scope.events = EventManager.events;

    $scope.onValidateDateSet = function (newDate, oldDate) {
        $scope.data.validateDate = newDate;
    }

    //are we an admin? if so, then let the user choose users
    $scope.user = DataResource.activeUser;
    if (DataResource.activeUser.is_admin) {
        $scope.users = DataResource.users;
    } else {
        $scope.users = [];
    }

    $scope.validateSchedule = function () {

        //did the user choose a date?
        if ($scope.data.validateDate === null) {
            Messenger.broadcast(
                "Please select a start date",
                "danger",
                false
            );
            return false;
        }
        //first lefts define the valation period
        var validStart = $scope.data.validateDate;
        var temp = moment(validStart);
        var validEnd = moment(temp.add(2419200 + 3540 + 59, 'seconds'));

        //is the person using this an admin?
        if (DataResource.activeUser.is_admin) {
            //let's get the schedules for each user

            //do we have users?
            if (_.isEmpty($scope.data.selectedUsers)) {
                Messenger.broadcast(
                    "Please select at least one user!",
                    "danger",
                    true
                );
                return false;
            }

            //get user ids
            var selectedUserIds = [];
            var validationObj = {};
            var hasErrors = false;
            validationObj.users = [];
            _.forEach($scope.data.selectedUsers, function (user, index) {
                var u = user;
                //get valid events
                var validEvents = _.filter(EventManager.events, function (o) {
                        if (validStart.isBefore(o.startMoment) && validEnd.isAfter(o.endMoment) && o.userId == u.id) {
                            return o;
                        }
                    }
                );

                //sort events
                validEvents = _.sortBy(validEvents, [function (o) {
                    return o.startMoment.unix();
                }
                ]);

                console.log(validEvents);
                //run the service
                u.validationErrors = validatorService(validEvents);
                if (u.validationErrors.length > 0) {
                    hasErrors = true;
                }
                validationObj.users.push(u);
                DataResource.validationObj = validationObj;

            });

            $state.go('app.errors');

        } else {
            var validationObj = {};
            validationObj.users = [];
            //get valid events
            var validEvents = _.filter(EventManager.events, function (o) {
                    if (validStart.isBefore(o.startMoment) && validEnd.isAfter(o.endMoment)) {
                        return o;
                    }
                }
            );

            //sort events
            validEvents = _.sortBy(validEvents, [function (o) {
                return o.startMoment.unix();
            }
            ]);
            //run the service
            var validationErrors = validatorService(validEvents);

            DataResource.activeUser.validationErrors = validationErrors
            validationObj.users.push(DataResource.activeUser);
            DataResource.validationObj = validationObj;

            $state.go('app.errors');


        }


    }
}
function errorsCtrl(DataResource, $state, Messenger, $scope) {
    /*
     if(DataResource.validationErrors.length < 1){

     $state.go('app.validator');
     } else{
     Messenger.broadcast(
     "See the errors below",
     "danger",
     false
     );
     }
     */
    $scope.users = DataResource.validationObj.users;
}

function validatorService(validEvents) {
    var validationErrors = [];
    if (_.isEmpty(validEvents)) {
        return validationErrors;
    }


    //first rule, the shifts didn't total over 80hrs / week------------------------------------------
    var totalHours = 0;
    var overageShifts = [];
    var hourLimit = 320;
    _.forEach(validEvents, function (shift, index) {

        totalHours = totalHours + shift.shiftLength;
        if (totalHours > hourLimit) {
            overageShifts.push(shift);
        }
    });

    if (totalHours > hourLimit) {
        var error = {
            title: "Duty Hours must be limited to 80 hour/week averaged over a  four-week period.",
            errantShifts: overageShifts
        }
        validationErrors.push(error);
    }

    //second rule-----------------------------------------------------------------------
    var longRests = [];
    _.forEach(validEvents, function (shift, index) {
        //the first shift doesn't need this check
        if (index != 0) {
            var endOfLastShift = moment(validEvents[index - 1].endMoment);

            var diff = shift.startMoment.diff(endOfLastShift, 'hours');
            // console.log(diff);
            if (diff >= 24) {

                longRests.push(shift);
            } else {

            }
        }

    });
    //we need an average of 1 or grater
    var averageLongRest = longRests.length / 4;
    //console.log(averageLongRest);
    if (averageLongRest < 1) {
        var error = {
            title: "Residents must have a 24-hour day off each week averaged over a four-week period.",
            errantShifts: null
        }
        validationErrors.push(error);
    }

    //third rule---------------------------------------------------------------------------
    var longestShift = 24;
    var tooLongShifts = [];
    _.forEach(validEvents, function (shift, index) {

        if (shift.shiftLength > longestShift) {
            tooLongShifts.push(shift);
        }
    });
    if (tooLongShifts.length > 0) {
        var error = {
            title: "A resident’s individual shift must not exceed 24 hours of continuous duty.",
            errantShifts: tooLongShifts
        }
        validationErrors.push(error);
    }

    //forth rule-------------------------------------------------------------------------------------
    var restBetweenShifts = 8;
    var tooSoonShifts = [];
    _.forEach(validEvents, function (shift, index) {
        //the first shift doesn't need this check
        if (index != 0) {
            var endOfLastShift = moment(validEvents[index - 1].endMoment);
            //   console.log(endOfLastShift.format("dddd, MMMM Do YYYY, h:mm:ss a"));
            var eightHoursLater = moment(endOfLastShift).add(8, 'hours');
            if (eightHoursLater.isAfter(shift.startMoment)) {

                tooSoonShifts.push(shift);
            } else {

            }
        }

    });

    if (tooSoonShifts.length > 0) {
        var error = {
            title: "A resident must have a minimum of 8 hours off between shifts. The following shifts start too soon after their preceding shifts.",
            errantShifts: tooSoonShifts
        }
        validationErrors.push(error);
    }
    return validationErrors;
}