'use strict';
angular.module('EventManager', ['DataResource']).factory('EventManager', function (DataResource) {
    var data = {};
    data.events = [];
    data.eventsJson = [];
    //not used
    data.removeEvent = function (index) {
        console.log(index);
        var event = data.events[index];
        var userId = event.user.id;
        //remove it from the user's events
        var user = _.find(DataResource.users, function (o) {
            return o.id === userId;
        });
        var userEventIndex = _.findIndex(users.events, function (o) {
            return o.title == event.title;
        });
        user.events.splice(userEventIndex, 1);
        data.events.splice(index, 1);

    }
    data.processEvent = function (shift) {
        //let's add it to the users
        var activeUserId = DataResource.activeUser.id;
        var user = _.find(DataResource.users, function (o) {
            return o.id === activeUserId;
        });

        // user.shifts.push(shift);
        var shiftTitle = user.name + ' (' + shift.startDate.format('M/D/YY H:mm') + ' to ' + shift.endDate.format('M/D/YY H:mm') + ')';
        var shiftLength = shift.endDate.diff(shift.startDate, 'hours');

        //now lets format it for the event list
        var event = {
            title: shiftTitle,
            startMoment: shift.startDate,
            endMoment: shift.endDate,
            startsAt: shift.startDate.toDate(),
            endsAt: shift.endDate.toDate(),
            color: {
                primary: user.color
            },
            userId: user.id,
            userName: user.name,
            shiftLength: shiftLength
        };
        data.eventsJson.push(event);
        data.events.push(event);
        data.events = _.sortBy(data.events, [function (o) {
            return o.startMoment.unix();
        }
        ]);

    }

    data.importDemoData = function () {
        var events = [];
        _.forEach(data.demoData, function (event) {

            event.startMoment = moment(event.startMoment);
            event.endMoment = moment(event.endMoment);
            event.startsAt = event.startMoment.toDate();
            event.endsAt = event.endMoment.toDate();
            events.push(event);

        });

        data.events = events;
        //if we are not an admin, remove all the other dummy data
        if(DataResource.activeUser.is_admin){

        } else{
            data.events = _.filter(data.events, function (o) {
                return o.userId == DataResource.activeUser.id;
            });
        }

        data.events = _.sortBy(data.events, [function (o) {
            return o.startMoment.unix();
        }
        ]);
    }
    data.updateEvent = function (index, shift) {
        var activeUserId = DataResource.activeUser.id;

        var user = _.find(DataResource.users, function (o) {
            return o.id === activeUserId;
        });
        var shiftTitle = user.name + ' (' + shift.startDate.format('M/D/YY H:mm') + ' to ' + shift.endDate.format('M/D/YY H:mm') + ')';
        var shiftLength = shift.endDate.diff(shift.startDate, 'hours');

        var event = {
            title: shiftTitle,
            startMoment: shift.startDate,
            endMoment: shift.endDate,
            startsAt: shift.startDate.toDate(),
            endsAt: shift.endDate.toDate(),
            color: {
                primary: user.color
            },
            userId: user.id,
            userName: user.name,
            shiftLength: shiftLength
        }
        data.events[index] = event;
        data.events = _.sortBy(data.events, [function (o) {
            return o.startMoment.unix();
        }
        ]);
    }
    //sample data
    data.demoData = [{
        "title": "Dr. Sydnee (11/2/16 9:00 to 11/2/16 17:00)",
        "startMoment": "2016-11-02T14:00:00.000Z",
        "endMoment": "2016-11-02T22:00:00.000Z",
        "startsAt": "2016-11-02T14:00:00.000Z",
        "endsAt": "2016-11-02T22:00:00.000Z",
        "color": {"primary": "#3f1685"},
        "userId": 2,
        "userName": "Dr. Sydnee",
        "shiftLength": 8,
        "$$hashKey": "object:1326",
        "calendarEventId": 0
    }, {
        "title": "Dr. Sydnee (11/4/16 9:00 to 11/4/16 17:00)",
        "startMoment": "2016-11-04T14:00:00.000Z",
        "endMoment": "2016-11-04T22:00:00.000Z",
        "startsAt": "2016-11-04T14:00:00.000Z",
        "endsAt": "2016-11-04T22:00:00.000Z",
        "color": {"primary": "#3f1685"},
        "userId": 2,
        "userName": "Dr. Sydnee",
        "shiftLength": 8,
        "$$hashKey": "object:1884",
        "calendarEventId": 1
    }, {
        "title": "Dr. Sydnee (11/7/16 9:00 to 11/7/16 17:00)",
        "startMoment": "2016-11-07T15:00:00.000Z",
        "endMoment": "2016-11-07T23:00:00.000Z",
        "startsAt": "2016-11-07T15:00:00.000Z",
        "endsAt": "2016-11-07T23:00:00.000Z",
        "color": {"primary": "#3f1685"},
        "userId": 2,
        "userName": "Dr. Sydnee",
        "shiftLength": 8,
        "$$hashKey": "object:2455",
        "calendarEventId": 3
    }, {
        "title": "Dr. Sydnee (11/9/16 9:00 to 11/9/16 18:00)",
        "startMoment": "2016-11-09T15:00:00.000Z",
        "endMoment": "2016-11-10T00:00:00.000Z",
        "startsAt": "2016-11-09T15:00:00.000Z",
        "endsAt": "2016-11-10T00:00:00.000Z",
        "color": {"primary": "#3f1685"},
        "userId": 2,
        "userName": "Dr. Sydnee",
        "shiftLength": 9,
        "$$hashKey": "object:3163",
        "calendarEventId": 4
    }, {
        "title": "Dr. Sydnee (11/11/16 9:00 to 11/11/16 21:00)",
        "startMoment": "2016-11-11T15:00:00.000Z",
        "endMoment": "2016-11-12T03:00:00.000Z",
        "startsAt": "2016-11-11T15:00:00.000Z",
        "endsAt": "2016-11-12T03:00:00.000Z",
        "color": {"primary": "#3f1685"},
        "userId": 2,
        "userName": "Dr. Sydnee",
        "shiftLength": 12,
        "$$hashKey": "object:3996",
        "calendarEventId": 5
    }, {
        "title": "Dr. Sydnee (11/14/16 9:00 to 11/14/16 17:00)",
        "startMoment": "2016-11-14T15:00:00.000Z",
        "endMoment": "2016-11-14T23:00:00.000Z",
        "startsAt": "2016-11-14T15:00:00.000Z",
        "endsAt": "2016-11-14T23:00:00.000Z",
        "color": {"primary": "#3f1685"},
        "userId": 2,
        "userName": "Dr. Sydnee",
        "shiftLength": 8,
        "$$hashKey": "object:4556",
        "calendarEventId": 6
    }, {
        "title": "Dr. Sydnee (11/16/16 9:00 to 11/16/16 21:00)",
        "startMoment": "2016-11-16T15:00:00.000Z",
        "endMoment": "2016-11-17T03:00:00.000Z",
        "startsAt": "2016-11-16T15:00:00.000Z",
        "endsAt": "2016-11-17T03:00:00.000Z",
        "color": {"primary": "#3f1685"},
        "userId": 2,
        "userName": "Dr. Sydnee",
        "shiftLength": 12,
        "$$hashKey": "object:5396",
        "calendarEventId": 7
    },  {
        "title": "Dr. Sydnee (11/23/16 9:00 to 11/23/16 21:00)",
        "startMoment": "2016-11-23T15:00:00.000Z",
        "endMoment": "2016-11-24T03:00:00.000Z",
        "startsAt": "2016-11-23T15:00:00.000Z",
        "endsAt": "2016-11-24T03:00:00.000Z",
        "color": {"primary": "#3f1685"},
        "userId": 2,
        "userName": "Dr. Sydnee",
        "shiftLength": 12,
        "$$hashKey": "object:7068",
        "calendarEventId": 10
    }, {
        "title": "Dr. Sydnee (11/21/16 9:00 to 11/21/16 17:00)",
        "startMoment": "2016-11-21T15:00:00.000Z",
        "endMoment": "2016-11-21T23:00:00.000Z",
        "startsAt": "2016-11-21T15:00:00.000Z",
        "endsAt": "2016-11-21T23:00:00.000Z",
        "color": {"primary": "#3f1685"},
        "userId": 2,
        "userName": "Dr. Sydnee",
        "shiftLength": 8,
        "$$hashKey": "object:7628",
        "calendarEventId": 11
    }, {
        "title": "Dr. Sydnee (11/25/16 9:00 to 11/25/16 17:00)",
        "startMoment": "2016-11-25T15:00:00.000Z",
        "endMoment": "2016-11-25T23:00:00.000Z",
        "startsAt": "2016-11-25T15:00:00.000Z",
        "endsAt": "2016-11-25T23:00:00.000Z",
        "color": {"primary": "#3f1685"},
        "userId": 2,
        "userName": "Dr. Sydnee",
        "shiftLength": 8,
        "$$hashKey": "object:8192",
        "calendarEventId": 12
    }, {
        "title": "Dr. Sydnee (11/28/16 9:00 to 11/28/16 21:00)",
        "startMoment": "2016-11-28T15:00:00.000Z",
        "endMoment": "2016-11-29T03:00:00.000Z",
        "startsAt": "2016-11-28T15:00:00.000Z",
        "endsAt": "2016-11-29T03:00:00.000Z",
        "color": {"primary": "#3f1685"},
        "userId": 2,
        "userName": "Dr. Sydnee",
        "shiftLength": 12,
        "$$hashKey": "object:8752",
        "calendarEventId": 13
    },
        {
            "title": "Dr. Justin (11/1/16 7:00 to 11/1/16 19:00)",
            "startMoment": "2016-11-01T12:00:00.000Z",
            "endMoment": "2016-11-02T00:00:00.000Z",
            "startsAt": "2016-11-01T12:00:00.000Z",
            "endsAt": "2016-11-02T00:00:00.000Z",
            "color": {"primary": "#198215"},
            "userId": 1,
            "userName": "Dr. Justin",
            "shiftLength": 12,
            "$$hashKey": "object:1350",
            "calendarEventId": 0
        }, {
            "title": "Dr. Justin (11/2/16 7:00 to 11/2/16 19:00)",
            "startMoment": "2016-11-02T12:00:00.000Z",
            "endMoment": "2016-11-03T00:00:00.000Z",
            "startsAt": "2016-11-02T12:00:00.000Z",
            "endsAt": "2016-11-03T00:00:00.000Z",
            "color": {"primary": "#198215"},
            "userId": 1,
            "userName": "Dr. Justin",
            "shiftLength": 12,
            "$$hashKey": "object:1915",
            "calendarEventId": 1
        }, {
            "title": "Dr. Justin (11/3/16 7:00 to 11/3/16 19:00)",
            "startMoment": "2016-11-03T12:00:00.000Z",
            "endMoment": "2016-11-04T00:00:00.000Z",
            "startsAt": "2016-11-03T12:00:00.000Z",
            "endsAt": "2016-11-04T00:00:00.000Z",
            "color": {"primary": "#198215"},
            "userId": 1,
            "userName": "Dr. Justin",
            "shiftLength": 12,
            "$$hashKey": "object:2752",
            "calendarEventId": 2
        }, {
            "title": "Dr. Justin (11/8/16 7:00 to 11/8/16 19:00)",
            "startMoment": "2016-11-08T13:00:00.000Z",
            "endMoment": "2016-11-09T01:00:00.000Z",
            "startsAt": "2016-11-08T13:00:00.000Z",
            "endsAt": "2016-11-09T01:00:00.000Z",
            "color": {"primary": "#198215"},
            "userId": 1,
            "userName": "Dr. Justin",
            "shiftLength": 12,
            "$$hashKey": "object:3314",
            "calendarEventId": 3
        }, {
            "title": "Dr. Justin (11/9/16 19:00 to 11/9/16 19:00)",
            "startMoment": "2016-11-10T01:00:00.000Z",
            "endMoment": "2016-11-10T01:00:00.000Z",
            "startsAt": "2016-11-10T01:00:00.000Z",
            "endsAt": "2016-11-10T01:00:00.000Z",
            "color": {"primary": "#198215"},
            "userId": 1,
            "userName": "Dr. Justin",
            "shiftLength": 0,
            "$$hashKey": "object:3890",
            "calendarEventId": 4
        }, {
            "title": "Dr. Justin (11/10/16 7:00 to 11/10/16 19:00)",
            "startMoment": "2016-11-10T13:00:00.000Z",
            "endMoment": "2016-11-11T01:00:00.000Z",
            "startsAt": "2016-11-10T13:00:00.000Z",
            "endsAt": "2016-11-11T01:00:00.000Z",
            "color": {"primary": "#198215"},
            "userId": 1,
            "userName": "Dr. Justin",
            "shiftLength": 12,
            "$$hashKey": "object:4452",
            "calendarEventId": 5
        }, {
            "title": "Dr. Justin (11/15/16 7:00 to 11/15/16 19:00)",
            "startMoment": "2016-11-15T13:00:00.000Z",
            "endMoment": "2016-11-16T01:00:00.000Z",
            "startsAt": "2016-11-15T13:00:00.000Z",
            "endsAt": "2016-11-16T01:00:00.000Z",
            "color": {"primary": "#198215"},
            "userId": 1,
            "userName": "Dr. Justin",
            "shiftLength": 12,
            "$$hashKey": "object:6465",
            "calendarEventId": 6
        }, {
            "title": "Dr. Justin (11/16/16 19:00 to 11/16/16 19:00)",
            "startMoment": "2016-11-17T01:00:00.000Z",
            "endMoment": "2016-11-17T01:00:00.000Z",
            "startsAt": "2016-11-17T01:00:00.000Z",
            "endsAt": "2016-11-17T01:00:00.000Z",
            "color": {"primary": "#198215"},
            "userId": 1,
            "userName": "Dr. Justin",
            "shiftLength": 0,
            "$$hashKey": "object:7027",
            "calendarEventId": 7
        }, {
            "title": "Dr. Justin (11/17/16 7:00 to 11/17/16 19:00)",
            "startMoment": "2016-11-17T13:00:00.000Z",
            "endMoment": "2016-11-18T01:00:00.000Z",
            "startsAt": "2016-11-17T13:00:00.000Z",
            "endsAt": "2016-11-18T01:00:00.000Z",
            "color": {"primary": "#198215"},
            "userId": 1,
            "userName": "Dr. Justin",
            "shiftLength": 12,
            "$$hashKey": "object:7619",
            "calendarEventId": 8
        }, {
            "title": "Dr. Justin (11/22/16 7:00 to 11/22/16 19:00)",
            "startMoment": "2016-11-22T13:00:00.000Z",
            "endMoment": "2016-11-23T01:00:00.000Z",
            "startsAt": "2016-11-22T13:00:00.000Z",
            "endsAt": "2016-11-23T01:00:00.000Z",
            "color": {"primary": "#198215"},
            "userId": 1,
            "userName": "Dr. Justin",
            "shiftLength": 12,
            "$$hashKey": "object:8181",
            "calendarEventId": 9
        }, {
            "title": "Dr. Justin (11/23/16 7:00 to 11/23/16 19:00)",
            "startMoment": "2016-11-23T13:00:00.000Z",
            "endMoment": "2016-11-24T01:00:00.000Z",
            "startsAt": "2016-11-23T13:00:00.000Z",
            "endsAt": "2016-11-24T01:00:00.000Z",
            "color": {"primary": "#198215"},
            "userId": 1,
            "userName": "Dr. Justin",
            "shiftLength": 12,
            "$$hashKey": "object:8743",
            "calendarEventId": 10
        }, {
            "title": "Dr. Justin (11/24/16 7:00 to 11/24/16 19:00)",
            "startMoment": "2016-11-24T13:00:00.000Z",
            "endMoment": "2016-11-25T01:00:00.000Z",
            "startsAt": "2016-11-24T13:00:00.000Z",
            "endsAt": "2016-11-25T01:00:00.000Z",
            "color": {"primary": "#198215"},
            "userId": 1,
            "userName": "Dr. Justin",
            "shiftLength": 44,
            "$$hashKey": "object:9305",
            "calendarEventId": 11
        }
    ];
    return data;
});