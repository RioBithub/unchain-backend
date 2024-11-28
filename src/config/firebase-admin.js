import firebaseAdmin from "firebase-admin";
import serviceAccount from "../../serviceAccountKey.json" assert { type: 'json' };

export default firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount)
});
