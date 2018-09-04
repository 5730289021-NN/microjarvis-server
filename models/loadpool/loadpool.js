"use strict";
const communicator = require('./../communicator/communicator.js');
const Poller = require('./../poller/poller.js');

class LoadPool {
    constructor() {
        this.poller = new Poller(); 
        this.poller.onPoll(() => {
            this.checkLoadCondition();
            this.poller.poll(); // Go for the next poll
        });
        this.poller.poll();
        this.perceptionPool = [];
        this.actionPool = [];
    }
    addPerception(perception) {
        this.perceptionPool.push(perception);
        console.log('Perception added: ', perception);
    }
    addAction(action) {
        this.actionPool.push(action);
        console.log('Action added: ', action);
    }
    checkLoadCondition(){
        this.perceptionPool.forEach((perception, index) => {
            perception.perceive(communicator.checkIncomingTransimission());
            if(perception.isPerceived()){
                this.actionPool[index].act();
                this.perceptionPool.splice(index, 1);
                this.actionPool.splice(index, 1);
            }
        });
        communicator.resetIncomingTransimission();
    }
}

module.exports = new LoadPool();
