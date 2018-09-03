import Perception from './perception.js'

export default class ButtonPerception extends Perception{
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