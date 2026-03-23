// firebase.js — Nomen · sincronización con Firestore

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDOe-FEKErq7F4h8PR7dxRy8Qu3gind0X0",
  authDomain: "nomen-app.firebaseapp.com",
  projectId: "nomen-app",
  storageBucket: "nomen-app.firebasestorage.app",
  messagingSenderId: "298185354477",
  appId: "1:298185354477:web:717913ab9dce10712270e4"
};

const app  = initializeApp(firebaseConfig);
const db   = getFirestore(app);

// ID fijo para usuario único — si en el futuro querés multi-usuario
// se puede cambiar por un login con Google
const USER_ID = 'mina';
const docRef  = doc(db, 'progress', USER_ID);

// ── Guardar estado en Firestore ────────────────────────
export async function saveToCloud(state) {
  try {
    await setDoc(docRef, {
      ...state,
      // Convertir objeto learned a array para Firestore
      learnedIds: Object.keys(state.learned).map(Number),
      learned: null, // no guardar el objeto directamente
      updatedAt: Date.now(),
    });
  } catch (e) {
    console.warn('Cloud save failed:', e);
  }
}

// ── Cargar estado desde Firestore ──────────────────────
export async function loadFromCloud() {
  try {
    const snap = await getDoc(docRef);
    if (!snap.exists()) return null;
    const data = snap.data();
    // Reconstruir objeto learned desde array
    const learned = {};
    (data.learnedIds || []).forEach(id => { learned[id] = true; });
    return { ...data, learned };
  } catch (e) {
    console.warn('Cloud load failed:', e);
    return null;
  }
}

// ── Escuchar cambios en tiempo real ────────────────────
// Se llama cada vez que otro dispositivo guarda progreso
export function subscribeToCloud(callback) {
  return onSnapshot(docRef, (snap) => {
    if (!snap.exists()) return;
    const data = snap.data();
    const learned = {};
    (data.learnedIds || []).forEach(id => { learned[id] = true; });
    callback({ ...data, learned });
  });
}
