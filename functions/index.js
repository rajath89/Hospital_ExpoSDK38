const functions = require('firebase-functions');
const admin = require('firebase-admin');


const Expo = require("expo-server-sdk").Expo;


admin.initializeApp();
const fetch = require('node-fetch');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.dbWrite_uComments = functions.database.ref('/users/{userId}/comments').onWrite((change, context) => {
 const beforeData = change.before.val(); // data before the write
 const afterData = change.after.val(); // data after the write

 functions.logger.info("before :", beforeData);
 functions.logger.info("after :", afterData);

 const userName = context.params.userId;

 if(afterData!=="No Comment"){




 	             (async () => {
const snapshott = await admin.database().ref('/tokens').once('value');



if(snapshott!=null){
	functions.logger.info("Hello tokens from async before json!", snapshott.toJSON());
	

}

functions.logger.info("Hello tokens from async after!", snapshott);
var gloV=snapshott.toJSON();

var g=JSON.parse(JSON.stringify(gloV));

var arr=new Array();

Object.keys(g).forEach(function(key) {
    arr.push(g[key]);
});

// Listing all tokens as an array.
functions.logger.info("array", arr);


//change.after.ref.parent.child('uppercase').set(gloV);

      // Notification details.
      const payload = {
        notification: {
          title: 'JHS Notification',
          body: `${userName} commented \"${afterData}\"`
        }
      };

      

      

      // Send notifications to all tokens.
      const response = await admin.messaging().sendToDevice(arr, payload);
      // For each message check if there was an error.
      
      response.results.forEach((result, index) => {
        const error = result.error;
        if (error) {
          console.error('Failure sending notification to', error);
          functions.logger.info("error", error);


        }
      });
})();
 }



return 0;
});







exports.dbWrite_docComments = functions.database.ref('/users/{userId}/doctorsComments').onWrite((change, context) => {
  const beforeData = change.before.val(); // data before the write
  const afterData = change.after.val(); // data after the write
 
  functions.logger.info("before :", beforeData);
  functions.logger.info("after :", afterData);
 
  const userName = context.params.userId;
  const uemail=userName+"@gmail.com";
 
  (async () => {
    const rawResponse = await fetch('https://flask-app47.herokuapp.com/sendNotification', {//exp://192.168.0.104:19000
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"username": uemail,"docComment":afterData})
    });
    const content = await rawResponse.json();
  
    functions.logger.info("response", content);
  })();

 
 
 
  return 0;
 });