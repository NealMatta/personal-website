import { cert, getApps, initializeApp } from 'firebase-admin/app';
import {
  getFirestore,
  initializeFirestore,
  type Firestore,
} from 'firebase-admin/firestore';

/*
The one door into Firestore.

The Admin SDK signs in as the service account, so it works from the server
only and walks past the security rules — which is why the rules can deny
everything and the browser never needs a Firebase key of its own.
*/

export function db(): Firestore {
  if (!getApps().length) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    /* Vercel stores the key on one line, with its newlines written out. */
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!projectId || !clientEmail || !privateKey) {
      throw new Error('Firebase credentials are missing');
    }

    const app = initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
    });
    /* REST skips the gRPC handshake, which is most of a cold start. */
    initializeFirestore(app, { preferRest: true });
  }

  return getFirestore();
}
