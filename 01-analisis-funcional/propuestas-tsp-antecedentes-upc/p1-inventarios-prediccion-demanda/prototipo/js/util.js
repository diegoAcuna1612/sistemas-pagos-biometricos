/* Tuerca (nombre de trabajo) — prototipo P1-V7
   Utilidades. TODO el prototipo es simulado: no hay comercios, precios ni resultados reales. */
(function (root) {
  'use strict';
  var App = (root.App = root.App || {});
  var pad = function (n) { return String(n).padStart(2, '0'); };

  var U = (App.U = {
    pad: pad,
    parse: function (iso) { var p = iso.split('-').map(Number); return Date.UTC(p[0], p[1] - 1, p[2]); },
    fmt: function (ms) { var d = new Date(ms); return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()); },
    addDays: function (iso, n) { return U.fmt(U.parse(iso) + n * 864e5); },
    diff: function (a, b) { return Math.round((U.parse(a) - U.parse(b)) / 864e5); },
    dmy: function (iso) { return iso ? iso.slice(8, 10) + '/' + iso.slice(5, 7) + '/' + iso.slice(0, 4) : ''; },
    dm: function (iso) { return iso ? iso.slice(8, 10) + '/' + iso.slice(5, 7) : ''; },
    dow: function (iso) { return new Date(U.parse(iso)).getUTCDay(); },
    dowName: function (iso) { return ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'][U.dow(iso)]; },
    DOWS: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    mean: function (a) { if (!a.length) return 0; var s = 0; for (var i = 0; i < a.length; i++) s += a[i]; return s / a.length; },
    sum: function (a) { var s = 0; for (var i = 0; i < a.length; i++) s += a[i]; return s; },
    median: function (a) {
      if (!a.length) return null;
      var s = a.slice().sort(function (x, y) { return x - y; }), m = s.length >> 1;
      return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
    },
    money: function (n) {
      var neg = n < 0; n = Math.abs(n);
      var s = n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return (neg ? '−' : '') + 'S/ ' + s;
    },
    money0: function (n) {
      var neg = n < 0; n = Math.abs(Math.round(n));
      return (neg ? '−' : '') + 'S/ ' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    num: function (n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ','); },
    dec: function (n, d) { return (n == null || isNaN(n)) ? '—' : Number(n).toFixed(d == null ? 1 : d).replace('.', ','); },
    pct: function (x, d) { return (x == null || isNaN(x)) ? '—' : (x * 100).toFixed(d == null ? 0 : d).replace('.', ',') + '%'; },
    clamp: function (v, a, b) { return Math.max(a, Math.min(b, v)); },
    rng: function (seed) {
      var a = seed >>> 0;
      return function () {
        a |= 0; a = (a + 0x6d2b79f5) | 0;
        var t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    },
    esc: function (s) {
      return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    },
    hash: function (str) {
      var h = 2166136261;
      for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
      h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b); h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35); h ^= h >>> 16;
      return (h >>> 0) / 4294967296;
    },
    hashHex: function (str) {
      var h = 2166136261, h2 = 5381;
      for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); h2 = (Math.imul(h2, 33) + str.charCodeAt(i)) | 0; }
      return ((h >>> 0).toString(16).padStart(8, '0') + (h2 >>> 0).toString(16).padStart(8, '0'));
    },
    initials: function (n) { return String(n).split(' ').slice(0, 2).map(function (x) { return x[0]; }).join('').toUpperCase(); },
    uuid: function () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0; return (c === 'x' ? r : (r & 3) | 8).toString(16);
      });
    },
    deacc: function (s) { return String(s).normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  });

  App.views = App.views || {};
  App.HOY = '2026-11-06';   // viernes
  App.D0 = '2026-05-04';    // lunes, inicio del historial de 186 días
  App.NDIAS = U.diff(App.HOY, App.D0) + 1;
})(typeof window !== 'undefined' ? window : globalThis);
