"use strict";

const SerialPort = require('serialport');

class Communicator {
    constructor() {
        this.port = new SerialPort('COM5',{
            baudRate: 115200
          });
        this.port.on('error', function (err) {
            console.log('Error: ', err.message);
        });        
        this.port.on('readable', () => {
            this.incomingTransmission = this.port.read().toString('utf8');
            console.log('Receive:', this.incomingTransmission);
        });
        this.incomingTransmission = "";
    }
    sendCommand(signal) {
        this.port.write(signal + '.', function (err) {
            if (err) {
                return console.log('Error on write:', err.message);
            }
            console.log('\'' + signal +  '\' sent');
        });
    }
    checkIncomingTransimission(){
        return this.incomingTransmission;
    }
    resetIncomingTransimission(){
        this.incomingTransmission = '';
    }
}

module.exports = new Communicator();




