import firebaseAdmin from "firebase-admin";

export default firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.applicationDefault()
});
