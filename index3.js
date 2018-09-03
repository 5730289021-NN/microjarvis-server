const functions = require('firebase-functions');
const {WebhookClient, Card, Suggestion} = require('dialogflow-fulfillment');

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((req, res) => {
  const agent = new WebhookClient({ req, res });
  
  function intentHandler(agent) {
    agent.add('This message is from Dialogflow\'s Cloud Functions for Firebase editor!');
    agent.add(new Card({
        title: 'Title: this is a card title',
        imageUrl: 'https://developers.google.com/actions/assistant.png',
        text: 'This is the body text of a card.  You can even use line\n  breaks and emoji! 💁',
        buttonText: 'This is a button',
        buttonUrl: 'https://assistant.google.com/'
      })
    );
    agent.add(new Suggestion('Quick Reply'));
    agent.add(new Suggestion('Suggestion'));
  }

  agent.handleRequest(intentHandler);
});