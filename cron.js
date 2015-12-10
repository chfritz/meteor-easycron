
var units = [{unit: "minute",
              set: "setMinutes",
              get: "getMinutes",
              ms: 60 * 1000,
              max: 60},
             {unit: "hour",
              set: "setHours",
              get: "getHours",
              ms: 60 * 60 * 1000,
              max: 24},
             {unit: "day",
              set: "setDate",
              get: "getDate",
              ms: 24 * 60 * 60 * 1000},
             {set: "setMonth",
              get: "getMonth"}
            ];

/** given the schedule, determine the next occurence after now */
function getNext(schedule) {

    function isDef(x) {
        return (typeof(x) != 'undefined');
    }

    var now = new Date();
    var next = new Date();
    // default: next minute
    next.setSeconds(0);
    _.each(units, function(value) {
        if (value.unit) {
            if (isDef(schedule[value.unit])) {
                next[value.set](schedule[value.unit]);
            }
        }
    });

    // Step 2: push it into the future
    var diff = next - now;
    if (diff <= 0) {
        // go incrementally from minutes to months. if they are
        // flexible, use them to reach the future, or set them to zero
        _.each(units, function(value, index, list) {
            if (next <= now
                && (!value.unit 
                    || !isDef(schedule[value.unit]))) {

                if (now - next > value.ms * value.max) {
                    // the difference is greater than what this unit
                    // can bridge: set to zero and kick the bucket
                    // down the road
                    next[value.set](0);
                } else {
                    next[value.set](next[value.get]()+1);
                }
            }
        });

    }

    // Step 3: pull back as close as possible
    _.each(units, function(value) {
        if (value.unit) {
            if (!isDef(schedule[value.unit])
                && Math.abs(now - next) > value.ms) {
                next[value.set](0);
            }
        }
    });


    return next;
}

/** recursive function for scheduling the timeouts */
function sched(fn, schedule) {
    var next = getNext(schedule);

    // assert: next is now the next desired occurrence
    // console.log("setting timer for: ", next);
    var diff = next - new Date();

    // We need to make sure not to overrun the 32-bit buffer storing
    // the timeout:
    // https://developer.mozilla.org/en-US/docs/Web/API/Window.setTimeout
    if (diff < 2147483647) {
        // the next time is close enough: schedule it
        Meteor.setTimeout(
            function() {
                fn();
                sched(fn, schedule);
            }, 
            diff
        );
    } else {
        // the next occurrence is too far out: check back in 14 days
        Meteor.setTimeout(
            function() {
                sched(fn, schedule);
            }, 
            1209600000
            // 3000
        );
    }
}

Cron = function(fn, schedule) {
    sched(fn, schedule);
};
