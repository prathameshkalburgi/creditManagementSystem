// firebase CDN configuration it will not work on node.js and its not at all related to package.json and package-lock.json or
// node-module
// const firebaseconfig is copied from firebase project
const firebaseConfig = {
  apiKey: "AIzaSyAWNCnWc3mmJOnBMvfogKXYpGPmNz4j3Ow",
    authDomain: "craditmanagement.firebaseapp.com",
    projectId: "craditmanagement",
    storageBucket: "craditmanagement.appspot.com",
    messagingSenderId: "231052238336",
    appId: "1:231052238336:web:2948999c1557f4d8b242e5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
