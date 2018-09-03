"use strict";
const express = require('express')
const app = express()

const SerialPort = require('serialport');
const port = new SerialPort('CNCA0');


app.get('/', (req, res) => {
    res.send('Hello World!');
    port.write('Someone logged in to the micro:Jarvis server\r\n', function (err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('Notify others');
    });
});

app.post('/bot', (req, res) => {
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.send(
        JSON.stringify({
            "fulfillmentText": "This is a text response"
        }));
});


port.on('error', function (err) {
    console.log('Error: ', err.message);
});

port.on('readable', function () {
    console.log('Data:', port.read().toString('utf8'));
});

app.listen(3000, () => console.log('micro:Jarvis is listening on port 3000'))