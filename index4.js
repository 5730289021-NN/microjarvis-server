"use strict";
const express = require('express');
const bodyParser = require('body-parser');

import { communicator } from './models/communicator/communicator'

import ButtonPerception from './models/perception/button-perception';
import SensePerception from './models/perception/sense-perception';
import TimePerception from './models/perception/time-perception';


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

class Action {
    constructor() {}
    act() {
        communicator.sendCommand("unknown command");
    }
}

class ShowNumberAction extends Action{
    constructor(number) {
        super();
        this.number = number;
    }
    act() {
        communicator.sendCommand("show " + number);
    }
}

class PlayAction extends Action{
    constructor(music) {
        super();
        this.music = music;
    }
    act() {
        communicator.sendCommand("play " + music);
    }
}

class TurnOnAction extends Action{
    constructor(ledString) {
        super();
        if(ledString.includes("red")) {
            this.led = "red";
        } else if(ledString.includes("green")) {
            this.led = "green";
        } else
            this.led = "unknown";
        this.led = led;
    }
    act() {
        communicator.sendCommand("turn on " + led);
    }
}

class TurnOffAction extends Action{
    constructor(ledString) {
        super();
        if(ledString.includes("red")) {
            this.led = "red";
        } else if(ledString.includes("green")) {
            this.led = "green";
        } else
            this.led = "unknown";
        this.led = led;
    }
    act() {
        communicator.sendCommand("turn off " + led);
    }
}


class LoadPool {
    constructor() {
        this.perceptionPool = [];
        this.actionPool = [];
    }
    addPerception(perception) {
        this.perceptionPool.push(perception);
    }
    addAction(action) {
        this.actionPool.push(action);
    }
    checkLoadCondition(communicator){
        this.perceptionPool.forEach((perception, index) => {
            perception.perceive(communicator.checkIncomingTransimission());
            if(perception.isPerceived()){
                actionPool[index].act();
            }
        });
    }
}

const loadPool = new LoadPool();

class WebHandler {
    constructor() {}

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

app.get('/', (req, res) => {
    res.send('Hello World!');
    
});

app.post('/bot', (req, res) => {
    let intent = req.body.intent.displayname;
    let params = req.body.queryResult.parameters;

    switch(intent) {
        case 'time-action':
            webHandler.handleTimePerception(params.time);
            break;
        case 'sense-action':
            webHandler.handleSensePerception();
            break;
        case 'button-action':
            webHandler.handleButtonPerception();
            break;
    }

    switch(params.action) {
        case 'turn on':
            webHandler.handleTurnOnAction(params.light, intent === 'action');
            break;
        case 'turn off':
            webHandler.handleTurnOffAction(params.light, intent === 'action');
            break;
        case 'show number':
            webHandler.handleShowNumberAction(params.number, intent === 'action');
            break;
        case 'play':
            webHandler.handleShowNumberAction(params.music, intent === 'action');
            break;
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(
        JSON.stringify({
            "fulfillmentText": "OK, I got that"
        }));
});


app.listen(3000, () => console.log('micro:Jarvis is listening on port 3000'))