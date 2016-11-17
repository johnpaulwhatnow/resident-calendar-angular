Resident Calendar Angular

# Installation

This project is built so that your website is tied to the "app" directory listed in this repository.  All the bower components have been included, you you can also build them yourself using the bower file included in this repository. 

# Usage

This small web app allows users to do the following:

* Log in with either user or admin credentials

* Add their shift schedule

* Validate their shift schedule in accordance to set rules. 

## Login

* When a user tries to visit this app, they will be prompted to log in

* Passwords can be found /app/components/services/data-resource.js

* The admin for this application is "Dr. Sydnee" with the password ```sawbones```

![Alt text](/screenshots/login.png?raw=true "Login View")

## Calendar

* Once logged in, the calendar view will allow you to enter start and end times for shifts

* This view has some basic validation, such as that the end shift time cannot be before the beginning shift time. 

* After a time is submitted, the time will appear in both the calendar view and the table view. 

* **Data Import:** In order to test the validation rules, an Import Demo Data has been provided on this view. If you are logged in as Dr. Sydnee, this button will bring in some sample shifts for both Dr. Sydnee and Dr. Justin. If you are logged in as Dr. Justin, this button will only bring in Dr. Justin’s shifts.

![Alt text](/screenshots/calendar.png?raw=true "Calendar View")

## Edit Shifts

* After a shift has been created, it can be edited using the "Edit" button found in the table view.

![Alt text](/screenshots/edit-shift.png?raw=true "Edit Shift View")

## Validate Schedule

* After all shifts have been added, one can validate schedules here. 

* The below screenshot represents an admin view, as the admin can select which users to validate. 

* To validate schedules, the user must select a starting date. The date range will be determined automatically (28 days later).

![Alt text](/screenshots/validate.png?raw=true "Validate Shifts View")

## Errors

* After a schedule is validated, the user is taken to the errors view, which shows errors by residents. 

![Alt text](/screenshots/errors.png?raw=true "Errors View")

# Application Architecture

## Custom Components

### User (/app/components/user)

This folder contains the route, controller and templating for the basic login page. 

### Calendar (/app/components/calendar)

This folder contains the controllers and routes for both the calendar and shift-editing functionality. 

### Validate (/app/components/validate)

This folder houses the routes, html and controllers for both the validation and error display functionality.

## Services

All of these are located in ```/app/components/services```

### DataResource

This is a small data layer that would eventually connect to a database of some sort. At this time, it is responsible for passing around most of the data used in the application between services and controllers. 

### EventManager

EventManager is an expanded version of a DataResource that solely works with events. Because both controllers and directives work with event (shift) data, the EventManager service keeps the code in one place. 

### Messenger

Messenger is is an application utility. The app uses several bootstrap-based angular directives, and Messenger is the service that handles all the rootscope broadcasting. This way, only one service needs to depend on rootscope. 

### Security

Security is a small module designed to hold security information. In this case. It holds a list of routes one must be authenticated to access. Authentication is checked in the ```run()``` method of our main app.js. 

### Shift Datetime Pickers

This is a little directive for the Datetime pickers used in both the calendar and edit shift view. This was abstracted out of the html since it is used in multiple locations.

### Shift Table

This directive lives on both calendar and the validate views. Again, this was abstracted to a directive. 

