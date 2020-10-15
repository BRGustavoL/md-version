import { initializeApp } from 'firebase'

const app = initializeApp({
	apiKey: "AIzaSyD1iqRPdYj9xhajZmkRDdX8dkmRhC8uq14",
  authDomain: "md-version.firebaseapp.com",
  databaseURL: "https://md-version.firebaseio.com",
  projectId: "md-version",
  storageBucket: "md-version.appspot.com",
  messagingSenderId: "771921514926",
  appId: "1:771921514926:web:fc07c363dfac4b101c383f",
  measurementId: "G-7DF4XG9NR3"
})
  
export const db = app.firestore()
export const usersRef = db.collection('users')
