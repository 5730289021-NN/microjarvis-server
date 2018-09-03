"use strict";
const { communicator } = require('./../communicator/communicator.js');

class LoadPool {
    constructor() {
        this.perceptionPool = [];
        this.actionPool = [];
        this.communicator = communicator;
    }
    addPerception(perception) {
        this.perceptionPool.push(perception);
    }
    addAction(action) {
        this.actionPool.push(action);
    }
    checkLoadCondition(){
        this.perceptionPool.forEach((perception, index) => {
            perception.perceive(this.communicator.checkIncomingTransimission());
            if(perception.isPerceived()){
                this.actionPool[index].act();
            }
        });
    }
}

module.exports = new LoadPool();
