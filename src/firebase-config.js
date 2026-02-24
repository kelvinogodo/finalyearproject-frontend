import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// ⚠️ Replace with your actual Firebase project configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const requestForToken = () => {
    return getToken(messaging, { vapidKey: "YOUR_VAPID_KEY" })
        .then((currentToken) => {
            if (currentToken) {
                console.log("🚀 FCM Token:", currentToken);
                // In a production app, you'd send this token to your backend
                return currentToken;
            } else {
                console.log("❌ No registration token available. Request permission to generate one.");
            }
        })
        .catch((err) => {
            console.log("❌ An error occurred while retrieving token.", err);
        });
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log("📨 Foreground message received:", payload);
            resolve(payload);
        });
    });
