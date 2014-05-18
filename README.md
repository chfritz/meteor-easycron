meteor-easycron
===============

Meteor package for specifing cron like recurring jobs easily.

The usage is very simple

```javascript
var recurrence = new Cron(function, schedule);
```

where `schedule` is an object that for each of `minute`, `hour`, and `day` either specifies a specific value, or none at all which implies "every". So for instance, the empty object `{}` means every minute of every hour of every day. On the other hand `{day: 12}` means every minute of every hour of every 12th of the month.


Examples
--------

```javascript
var everyMinute = new Cron(function() {
    console.log("another minute has passed!");
}, {});

var everyHour = new Cron(function() {
    console.log("it is 24 minutes past the hour");
}, {
    minute: 24
});

var everyMinuteBetween8and9 = new Cron(function() {
    console.log("a minute has passed and it is between 8am and 9am");
}, {
    hour: 8
});

var onceEveryMonth = new Cron(function() {
    console.log("it is high-noon on the 13th of the month, see you next month");
}, {
    minute: 0,
    hour: 12,
    day: 13
});
```
