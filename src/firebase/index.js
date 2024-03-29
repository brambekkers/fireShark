import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const firebaseApp = initializeApp({
  apiKey: 'AIzaSyARlHFKECd13m74eDj_E73onypikdyKbYI',
  authDomain: 'fireshark-18578.firebaseapp.com',
  projectId: 'fireshark-18578',
  storageBucket: 'fireshark-18578.appspot.com',
  messagingSenderId: '898056794460',
  appId: '1:898056794460:web:20c660896b2bbf32849199',
});


const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log('User is signed in', uid)
  } else {
    console.log('User is signed out')
  }
});


export default firebaseApp;
