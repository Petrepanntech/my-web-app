
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Parse the service account key from the environment variable.
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : null;

// Initialize the Firebase Admin SDK only once.
if (!getApps().length) {
  if (serviceAccount) {
    initializeApp({
      credential: cert(serviceAccount),
    });
  } else {
    // In a server-side environment, credentials are required.
    // If they are missing, we should throw an error to prevent the app
    // from running in a broken state.
    throw new Error('Firebase Admin SDK service account key is not available. Set the FIREBASE_SERVICE_ACCOUNT_KEY environment variable.');
  }
}

// Get the instances of the services using the default initialized app.
const adminAuth = getAuth();
const adminDb = getFirestore();

export { adminAuth, adminDb };
