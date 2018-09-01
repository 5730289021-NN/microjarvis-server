"use strict";
const { WebhookClient } = require('dialogflow-fulfillment');
const functions = require('firebase-functions');

const SerialPort = require('serialport');
const port = new SerialPort('CNCA0');

port.on('error', err => console.log('Error: ', err.message));
port.on('readable', () => console.log('Data:', port.read().toString('utf8')));

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

    function senseAction(agent){
        console.log(agent.parameters);
        agent.add('Action will happened after sense');
    }
    function timeAction(agent){
        console.log(agent.parameters);
        agent.add('Action will happened when the time arrived');
    }
    let intentMap = new Map()
    intentMap.set('sense-action', senseAction);
    intentMap.set('time-action', timeAction);
    agent.handleRequest(intentMap);
});


