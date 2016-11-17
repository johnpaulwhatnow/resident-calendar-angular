/**
 * Created by johnpaul on 11/15/2016.
 */
angular.module('ShiftDateTimePickers', [

    'DataResource',
    'EventManager',
    'Messenger'
]).directive("shiftDateTimePickers", function(Messenger,EventManager, $state) {
    return {

        templateUrl:'templates/shift-datetime-pickers.html',
        link: function(scope, elem, attrs) {
           // console.log(attrs);
            //var buttons = elem.find('button');
            //fired after a date has been set
            scope.onStartTimeSet = function (newDate, oldDate) {

                scope.data.startDate = newDate;
            }

            //fired after a date has been set
            scope.onEndTimeSet = function (newDate, oldDate) {

                scope.data.endDate = newDate;
            }
            scope.processShift = function(){
               // console.log('process')
                if(attrs.context == 'add'){

                    //required validation
                    if (scope.data.startDate === null || scope.data.startDate === null) {
                        //add a message
                        Messenger.broadcast(
                            "Please fill out a shift starting time and ending time",
                            "danger"
                        );
                        return false;
                    }
                    //next, is our end date before our start date?
                    if (scope.data.endDate.isBefore(scope.data.startDate)) {
                        Messenger.broadcast(
                            "The ending of the shift cannot be before the start of the shift.",
                            "danger",
                            true
                        );
                        return false;
                    }

                    //if we are this far, it means we have a valid shit, let's add it to the current user
                    EventManager.processEvent(scope.data);
                    scope.events = EventManager.events;
                    Messenger.broadcast(
                        "Shift Added!.",
                        "success",
                        false
                    );
                    scope.isShiftFormShown = false;
                } else if(attrs.context == 'edit'){
                    var index = scope.shiftId;
                    EventManager.updateEvent(index,scope.data);
                    Messenger.broadcast(
                        "Shift Updated!.",
                        "success",
                        false
                    );
                    $state.go('app.basic-calendar');
                }
            }

        }
    }
});