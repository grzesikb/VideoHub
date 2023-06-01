import { initializeApp } from 'firebase/app';
import { collection, getFirestore } from '@firebase/firestore';
import { firebaseConfig } from './firebaseConfig';

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const dbVideo = collection(db, 'video');
