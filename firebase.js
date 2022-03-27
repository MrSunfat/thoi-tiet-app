import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBuCY186vOqKL57q3P4vrx_kMDR77lPCbc',
    authDomain: 'thoi-tiet-app.firebaseapp.com',
    projectId: 'thoi-tiet-app',
    storageBucket: 'thoi-tiet-app.appspot.com',
    messagingSenderId: '422890339883',
    appId: '1:422890339883:web:d3535a5f596c845e90b46e',
    measurementId: 'G-RY9KBL2JS9',
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;
