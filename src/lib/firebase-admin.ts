
import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

let app: App;
let adminAuth: Auth;
let adminDb: Firestore;

try {
  // Parse the service account key from the environment variable.
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
    : null;

  if (!getApps().length) {
    if (serviceAccount) {
      app = initializeApp({
        credential: cert(serviceAccount),
      });
    } else {
      // In a server-side environment where credentials might not be available (like local dev without env var),
      // we can initialize without credentials, though some admin actions will be limited.
      // This prevents the app from crashing on startup.
      console.warn("Firebase Admin SDK is being initialized without credentials. Functionality will be limited.");
      app = initializeApp();
    }
  } else {
    app = getApps()[0];
  }

  adminAuth = getAuth(app);
  adminDb = getFirestore(app);

} catch (error: any) {
    console.error("Failed to initialize Firebase Admin SDK:", error);
    // Create mock instances to prevent app from crashing when functionality is accessed
    adminAuth = {} as Auth;
    adminDb = {} as Firestore;
}


export { adminAuth, adminDb };
