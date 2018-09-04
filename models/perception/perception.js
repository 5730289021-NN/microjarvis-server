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
        this.buttonPressed = (signal == "b");
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
        this.sensed = (signal == "s");
    }
    isPerceived() {
        return this.sensed;
    }
}

class TimePerception extends Perception{
    constructor(perceiveTime, queryText){
        super();
        if(queryText.toLowerCase().includes("second"))
        {
            //There is a bug that dialogflow wrongly interplete the time in second
            let secondIndex = queryText.toLowerCase().indexOf('second');
            let secondAdd = queryText.substring(secondIndex - 3, secondIndex - 1);
            this.perceiveTime = moment().add(parseInt(secondAdd), 'seconds');
        } else {
            this.perceiveTime = moment(perceiveTime);
        }
        
    }
    isPerceived() {
        return (moment().valueOf() - this.perceiveTime) > 0;
    }
}

module.exports = { ButtonPerception, SensePerception, TimePerception };