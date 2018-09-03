"use strict";
const express = require('express');
const bodyParser = require('body-parser');

const webHandler = require('./models/web-handler/web-handler.js')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Welcome to micro:Jarvis AI');
});

app.post('/bot', (req, res) => {
    let intent = req.body.queryResult.intent.displayName;
    let params = req.body.queryResult.parameters;

    switch(intent) {
        case 'time-action':
            webHandler.handleTimePerception(params.time);
            break;
        case 'sense-action':
            webHandler.handleSensePerception();
            break;
        case 'button-action':
            webHandler.handleButtonPerception();
            break;
    }

    switch(params.action) {
        case 'turn on':
            webHandler.handleTurnOnAction(params.light, intent === 'action');
            break;
        case 'turn off':
            webHandler.handleTurnOffAction(params.light, intent === 'action');
            break;
        case 'show number':
            webHandler.handleShowNumberAction(params.number, intent === 'action');
            break;
        case 'play':
            webHandler.handleShowNumberAction(params.music, intent === 'action');
            break;
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(
        JSON.stringify({
            "fulfillmentText": "OK, I got that"
        }));
});


app.listen(3000, () => console.log('micro:Jarvis is listening on port 3000'))