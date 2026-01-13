import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCKODIvSMSeLRH_I7LrEy6RaMI-3LA088w",
    authDomain: "cv-builder-9ec5c.firebaseapp.com",
    databaseURL: "https://cv-builder-9ec5c-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getDatabase(app);

export function verifyAuth(callback) {
    onAuthStateChanged(auth, (user) => {
        callback(user || null);
    });
}
export async function logout() {
    await signOut(auth);
}
verifyAuth((user) => {
    const accountEl = document.getElementById("account");
    if (accountEl) {
        if (user) {
            accountEl.innerHTML = `
            <img 
                src="${user.photoURL}" 
                alt="${user.email}" 
                title="${user.email}" 
                class="w-24 h-24 rounded-full object-cover flex-shrink-0 cursor-default"
            />
        `;
        } else {
            accountEl.innerHTML = `
            <div 
                class="w-24 h-24 rounded-full bg-gray-100 flex-shrink-0 cursor-pointer border-2 border-gray-400"
                title="Sign in"
            ></div>

        `;
        }
    }
});
