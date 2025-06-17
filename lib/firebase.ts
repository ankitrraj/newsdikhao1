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

// Initialize Firebase only on client-side
let app;
let db;

if (typeof window !== "undefined" && !getApps().length) {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
}

export { db };

// Analytics को client-side पर initialize करें
export const initAnalytics = () => {
  if (typeof window !== "undefined" && app) {
    return getAnalytics(app)
  }
  return null
}
