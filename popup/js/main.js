"use strict";

window.onload = function () {
    if (localStorage.getItem('time-interval') == "undefined") {
        // Unless changed, there will be notification every hour
        localStorage.setItem('time-interval', 60);
        document.getElementById("time-interval-60").checked = true;
    } else {
        var lastCheckedItem = "time-interval-" + localStorage.getItem('time-interval');
        document.getElementById(lastCheckedItem).checked = true;
    }
};

var radioButtons = document.forms["time-form"].elements;
var max = radioButtons.length;

var _loop = function _loop(i) {
    radioButtons[i].onclick = function () {
        localStorage.setItem('time-interval', radioButtons[i].value);
        // send time-interval to `background.js` ;)
        browser.runtime.sendMessage({
            "time-interval": parseInt(radioButtons[i].value)
        });
    };
};

for (var i = 0; i < max; i++) {
    _loop(i);
}
