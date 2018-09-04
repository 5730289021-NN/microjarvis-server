"use strict";

const loadPool = require('./../loadpool/loadpool.js');
const { ButtonPerception, SensePerception, TimePerception } = require('./../perception/perception.js');
const { TurnOnAction, TurnOffAction, ShowNumberAction, PlayAction } = require('./../action/action.js');


class WebHandler {
    constructor() {
        console.log(loadPool);
    }

    //Perception
    handleTimePerception(time, text) {
        loadPool.addPerception(new TimePerception(time, text));
    }
    handleSensePerception() {
        loadPool.addPerception(new SensePerception());
    }
    handleButtonPerception() {
        loadPool.addPerception(new ButtonPerception());
    }

    //Action
    handleTurnOnAction(light, immediate) {
        console.log('handleTurnOnAction');
        immediate ? new TurnOnAction(light).act() : loadPool.addAction(new TurnOnAction(light));
    }
    handleTurnOffAction(light, immediate) {
        console.log('handleTurnOffAction');
        immediate ? new TurnOffAction(light).act() : loadPool.addAction(new TurnOffAction(light));
    }
    handleShowNumberAction(number, immediate) {
        console.log('handleShowNumberAction');
        immediate ? new ShowNumberAction(number).act() : loadPool.addAction(new ShowNumberAction(number));
    }
    handlePlayAction(music, immediate) {
        console.log('handlePlayAction');
        immediate ? new PlayAction(music).act() : loadPool.addAction(new PlayAction(music));
    }

}

module.exports = new WebHandler();