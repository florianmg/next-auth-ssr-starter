import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const config = {
  credential: cert({
    privateKey: process.env.FIREBASE_ADMIN_SDK_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_ADMIN_SDK_CLIENT_EMAIL,
    projectId: process.env.FIREBASE_ADMIN_SDK_PROJECT_ID,
  }),
  databaseURL: process.env.FIREBASE_ADMIN_SDK_DATABASE_URL
}

const appAdmin = initializeApp(config)
const authAdmin = getAuth();

export { appAdmin, getAuth }