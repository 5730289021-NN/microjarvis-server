const moment = require('moment');

import Perception from './perception.js'

moment().format();

export class TimePerception extends Perception{
    constructor(perceiveTime){
        super();
        this.perceiveTime = moment(perceiveTime);
    }
    isPerceived() {
        return (moment().valueOf() - this.perceiveTime()) > 0;
    }
}