// sw.js — Service Worker · Nomen

const CACHE = 'anion-quiz-v1';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './data.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap',
];

const NOTIF_DELAY_MS = 20 * 60 * 60 * 1000; // 20 horas
const NOTIF_MESSAGES = [
  { title: '🔥 ¡Tu racha está en riesgo!', body: 'Practicá Nomen hoy y no pierdas tu racha.' },
  { title: '⚗️ Nomen te espera', body: '5 minutos de nomenclatura y mantenés la racha.' },
  { title: '🧪 ¿SO₄²⁻ o SO₃²⁻?', body: 'Abrí Nomen y repasá antes de que se acabe el día.' },
  { title: '📖 Hora de repasar', body: 'No dejes que los aniones se te olviden. Abrí Nomen.' },
];

let notifTimer = null;

function scheduleNotification() {
  if (notifTimer) clearTimeout(notifTimer);
  notifTimer = setTimeout(async () => {
    const msg = NOTIF_MESSAGES[Math.floor(Math.random() * NOTIF_MESSAGES.length)];
    self.registration.showNotification(msg.title, {
      body: msg.body,
      icon: './icon-192.png',
      badge: './icon-192.png',
      tag: 'nomen-racha',
      renotify: true,
      data: { url: './' },
    });
  }, NOTIF_DELAY_MS);
}

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => {
      return Promise.allSettled(ASSETS.map(url => cache.add(url)));
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res && res.status === 200 && res.type === 'basic') {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => cached || new Response('Offline'));
    })
  );
});

// Mensaje desde la app para resetear el temporizador
self.addEventListener('message', e => {
  if (e.data === 'app-opened') {
    scheduleNotification();
  }
});

// Al hacer click en la notificación, abre la app
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      if (clientList.length > 0) return clientList[0].focus();
      return clients.openWindow('./');
    })
  );
});
