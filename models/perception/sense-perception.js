import Perception from './perception.js'

export class SensePerception extends Perception{
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