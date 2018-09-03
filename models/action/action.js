const { communicator } = require('./../communicator/communicator.js');

class Action {
    constructor() {}
    act() {
        communicator.sendCommand("default action");
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

module.exports = { Action, TurnOnAction, TurnOffAction, ShowNumberAction, PlayAction }