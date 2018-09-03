"use strict";

const { loadPool } = require('./../loadpool/loadpool.js');
const { TimePerception, SensePerception, ButtonPerception } = require('./../perception/perception.js');
const { TurnOnAction, TurnOffAction, ShowNumberAction, PlayAction } = require('./../action/action.js');


class WebHandler {
    constructor() {
        console.log(loadPool);
    }

    //Perception
    handleTimePerception(time) {
        loadPool.addPerception(new TimePerception(time));
    }
    handleSensePerception() {
        loadPool.addPerception(new SensePerception());
    }
    handleButtonPerception() {
        loadPool.addPerception(new ButtonPerception());
    }

    //Action
    handleTurnOnAction(light, immediate) {
        immediate ? new TurnOnAction(light).act() : loadPool.addAction(new TurnOnAction(light));
    }
    handleTurnOffAction(light, actNow) {
        immediate ? new TurnOffAction(light).act() : loadPool.addAction(new TurnOffAction(light));
    }
    handleShowNumberAction(number, actNow) {
        immediate ? new ShowNumberAction(number).act() : loadPool.addAction(new ShowNumberAction(number));
    }
    handlePlayAction(music, actNow) {
        immediate ? new PlayAction(music).act() : loadPool.addAction(new PlayAction(music));
    }

}

const webHandler = new WebHandler();
module.exports = webHandler;