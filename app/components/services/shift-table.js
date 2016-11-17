/**
 * Created by johnpaul on 11/15/2016.
 */
angular.module('ShiftTable', [

    'DataResource',
    'EventManager'
]).directive("shiftTable", function() {
    return {

        templateUrl:'templates/shift-table.html',
        link: function(scope, elem, attrs) {
            //var buttons = elem.find('button');


        }
    }
});