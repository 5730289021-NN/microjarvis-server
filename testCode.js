class Trigger {
    constructor(){}
    trigger () {}
    isTriggered(){
        return false;
    }
}

class TimeTrigger extends Trigger{
    constructor(triggerTime){
        super();
        this.triggerTime = moment(triggerTime);
    }
    isTriggered () {
        return (moment().valueOf() - this.triggerTime()) > 0;
    }
}

class ButtonTrigger extends Trigger{
    constructor(){
        super();
        this.buttonPressed = false;
    }
    trigger () {
        this.buttonPressed = true;
    }
    isTriggered () {
        return this.buttonPressed;
    }
}

class SenseTrigger extends Trigger{
    constructor(){
        super();
        this.sensed = false;
    }
    trigger () {
        this.sensed = true;
    }
    isTriggered () {
        return this.sensed;
    }
}
