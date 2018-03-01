"use strict";

function triggerTakeBreakNotification() {
    browser.notifications.create({
        "type": "basic",
        "title": "Time to take a break!",
        "message": "Oh boy! Too much time in front of the screen. Time to stretch/go up for a walk!"
    });
}

// By default, duration would be of 1 hour
var intervalDuration = 60;

restartTakeBreakAlarm(intervalDuration);
browser.runtime.onMessage.addListener(handleMessage);

function handleMessage(request, sender, sendResponse) {
    intervalDuration = request["time-interval"];
    restartTakeBreakAlarm(intervalDuration);
}

browser.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.periodInMinutes != null) {
        triggerTakeBreakNotification();
    }
});

function restartTakeBreakAlarm(intervalDuration) {
    localStorage.setItem('time-interval', intervalDuration);
    browser.alarms.clear("takeBreakReminder");
    browser.alarms.create("takeBreakReminder", { periodInMinutes: intervalDuration });
}

browser.menus.create({
    id: "take-break",
    title: 'Take Break',
    contexts: ["all"]
});
