import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD6Y4kHtPELN4ZmE0Dw3qLDKnF4jDFtCLU",
    authDomain: "biopass-c068e.firebaseapp.com",
    projectId: "biopass-c068e",
    storageBucket: "biopass-c068e.appspot.com",
    messagingSenderId: "305634871393",
    appId: "1:305634871393:web:2f25f511d0d4eb96ed8220",
    measurementId: "G-HSP8JBDC8V"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
