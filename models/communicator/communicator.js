const SerialPort = require('serialport');

class Communicator {
    constructor() {
        const port = new SerialPort('CNCA0');
        port.on('error', function (err) {
            console.log('Error: ', err.message);
        });        
        port.on('readable', function () {
            this.incomingTransmission = port.read().toString('utf8');
            console.log('Data: ', this.incomingTransmission);
        });
        this.incomingTransmission = "";
    }
    sendCommand(signal) {
        port.write(signal + '.\r\n', function (err) {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            console.log('Notify others');
        });
    }
    checkIncomingTransimission(){
        return this.incomingTransmission;
    }
}

let communicator = new Communicator();
export default communicator;




