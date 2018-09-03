"use strict";

const moment = require('moment');
moment().format();

class Perception {
    constructor() {}
    perceive(signal) {}
    isPerceived() {
        return true;
    }
}

class ButtonPerception extends Perception{
    constructor(){
        super();
        this.buttonPressed = false;
    }
    perceive(signal) {
        this.buttonPressed = (signal == "button pressed");
    }
    isPerceived() {
        return this.buttonPressed;
    }
}

class SensePerception extends Perception{
    constructor(){
        super();
        this.sensed = false;
    }
    perceive(signal) {
        this.sensed = (signal = "sensed");
    }
    isPerceived() {
        return this.sensed;
    }
}

class TimePerception extends Perception{
    constructor(perceiveTime){
        super();
        this.perceiveTime = moment(perceiveTime);
    }
    isPerceived() {
        return (moment().valueOf() - this.perceiveTime()) > 0;
    }
}

module.exports = { Perception, ButtonPerception, SensePerception, TimePerception};