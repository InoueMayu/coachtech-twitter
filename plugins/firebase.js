import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyD9EwxW0H8y73k_ools-rdaiMFjN7_wSTY",
      authDomain: "sns-pj-3435f.firebaseapp.com",
      projectId: "sns-pj-3435f",
      storageBucket: "sns-pj-3435f.appspot.com",
      messagingSenderId: "62114205305",
      appId: "1:62114205305:web:98a368daec7190cb084ea8"

    }
  )
}

export default firebase
