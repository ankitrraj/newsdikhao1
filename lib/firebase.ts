import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyAnwFsBaJPUblGxLU85fpoHDtvYmDbEc9Y",
  authDomain: "news-dikhao.firebaseapp.com",
  databaseURL: "https://news-dikhao-default-rtdb.firebaseio.com",
  projectId: "news-dikhao",
  storageBucket: "news-dikhao.firebasestorage.app",
  messagingSenderId: "1038910067745",
  appId: "1:1038910067745:web:89594e8046a42986ff7f60",
  measurementId: "G-PZM8H7QQTB",
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { db };

// Analytics को client-side पर initialize करें
export const initAnalytics = () => {
  if (typeof window !== "undefined") {
    try {
      return getAnalytics(app);
    } catch (error) {
      console.error("Analytics initialization error:", error);
      return null;
    }
  }
  return null;
}
