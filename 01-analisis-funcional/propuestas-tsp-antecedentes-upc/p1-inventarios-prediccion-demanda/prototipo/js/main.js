/* Arranque, estado, enrutador y marco del prototipo */
(function () {
  'use strict';
  var App = window.App, U = App.U, UI = App.UI, ic = App.ic, E = App.E;
  App.views = App.views || {};
  var handlers = {};
  App.on = function (ev, fn) { (handlers[ev] = handlers[ev] || []).push(fn); };
  App.emit = function (ev) { (handlers[ev] || []).forEach(function (f) { f(); }); };

  App.ROLES = {
    dueno: { n: 'Dueño', who: 'Luis Paredes', ini: 'LP' },
    compras: { n: 'Encargado de compras', who: 'Marta Quispe', ini: 'MQ' },
    ayudante: { n: 'Ayudante de tienda', who: 'Jhon Rojas', ini: 'JR' }
  };
  /* permisos de ../14 §4 */
  App.can = function (acc) {
    var r = App.S.rol;
    var t = {
      config: ['dueno'], fuentes: ['dueno', 'compras'], emparejar: ['dueno', 'compras'], contar: ['dueno', 'compras', 'ayudante'],
      stock: ['dueno', 'compras'], lista: ['dueno', 'compras'], costos: App.D && App.D.cfg.verCostos ? ['dueno', 'compras'] : ['dueno'],
      consentir: ['dueno'], pedido: ['dueno', 'compras']
    };
    return (t[acc] || []).indexOf(r) >= 0;
  };
  App.S = { fase: 'todo', showRF: true, rol: 'dueno', flags: {} };
  App.flag = function (n) { App.S.flags[n] = true; };
  App.changed = function () { E.touch(App.D); App.render(); };

  App.nut = function (cls) {
    return '<svg class="' + (cls || 'nut') + '" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 2.5l11.7 6.75v13.5L16 29.5 4.3 22.75V9.25z" fill="#eb6834"/><circle cx="16" cy="16" r="5.6" fill="#1d1c1a"/><path d="M16 2.5l11.7 6.75-11.7 6.75L4.3 9.25z" fill="#fff" opacity=".16"/></svg>';
  };

  var TABS = [['inicio', 'Inicio', null], ['s1', 'Comercio', 'S1'], ['s2', 'Plataforma', 'S2'], ['s3', 'Consola SaaS', 'S3'], ['s4', 'Marca', 'S4'], ['recorrido', 'Recorrido guiado', null], ['cobertura', 'Cobertura', null]];
  var DEFAULTS = { inicio: '', s1: 'panel', s2: 'pipeline', s3: 'empresas', s4: 'marca', recorrido: '', cobertura: 'rf' };

  App.parseRoute = function () {
    var h = (location.hash || '#/inicio').replace(/^#\/?/, '').split('/');
    var sys = h[0] || 'inicio';
    if (!App.views[sys]) sys = 'inicio';
    return { sys: sys, page: h[1] || DEFAULTS[sys], sub: h[2] || '', rest: h.slice(3) };
  };
  App.go = function (hash) { if (location.hash === hash) App.render(); else location.hash = hash; };

  App.shellHtml = function () {
    var S = App.S, r = App.route;
    var tabs = TABS.map(function (t) { return '<a href="#/' + t[0] + '" class="' + (r.sys === t[0] ? 'on' : '') + '">' + (t[2] ? '<span class="sid">' + t[2] + '</span>' : '') + t[1] + '</a>'; }).join('');
    var rol = r.sys === 's1' ? '<span class="lbl">Rol</span><select data-chg="shell.rol" aria-label="Rol del usuario">' + Object.keys(App.ROLES).map(function (k) { return '<option value="' + k + '"' + (S.rol === k ? ' selected' : '') + '>' + App.ROLES[k].n + '</option>'; }).join('') + '</select>' : '';
    return '<a class="brand" href="#/inicio">' + App.nut() + 'Tuerca<small>prototipo P1-V7</small></a><nav class="sys-tabs" aria-label="Sistemas">' + tabs + '</nav>' +
      '<div class="shell-tools">' + rol + '<span class="lbl">Fase</span>' + UI.seg('fase', [['todo', 'Todas'], ['mvp', 'MVP', 'Solo los 52 requerimientos «Debe»'], ['piloto', 'MVP + piloto', 'Agrega los 17 «Debería»']], S.fase, 'shell.fase') +
      '<label class="tg" data-tip="Muestra la etiqueta de requerimiento en cada elemento"><span class="switch"><input type="checkbox" ' + (S.showRF ? 'checked' : '') + ' data-chg="shell.rf"><i></i></span>Requerimientos</label>' +
      '<button class="btn btn-sm" data-act="shell.sim" data-tip="Restablecer la demostración">' + ic('refresh', 15) + '<span>Reiniciar</span></button></div>';
  };
  App.renderShell = function () {
    document.getElementById('shell').innerHTML = App.shellHtml();
    document.body.classList.toggle('no-rf', !App.S.showRF);
  };

  var lastKey = null;
  App.render = function () {
    var host = document.getElementById('view'), r = App.route, key = r.sys + '/' + r.page + '/' + r.sub;
    var sc = key === lastKey ? host.scrollTop : 0; lastKey = key;
    host.dataset.theme = r.sys === 's2' ? 'dark' : 'light';
    host.innerHTML = '';
    try { App.views[r.sys].render(r, host); }
    catch (e) { host.innerHTML = '<div class="page"><div class="note bad"><b>Error al dibujar la pantalla.</b> ' + U.esc(e.message) + '</div></div>'; console.error(e); }
    UI.mountTables(host); UI.decorate(host);
    host.scrollTop = sc;
    App.renderShell();
    if (App.views[r.sys].after) App.views[r.sys].after(r, host);
  };
  App.safeRender = function () {
    var host = document.getElementById('view'), ae = document.activeElement;
    if (document.querySelector('.overlay')) return;
    if (ae && host.contains(ae) && /^(input|textarea|select)$/i.test(ae.tagName)) return;
    App.render();
  };
  window.addEventListener('hashchange', function () { App.route = App.parseRoute(); App.render(); document.getElementById('view').scrollTop = 0; });

  App.acts['shell.fase'] = function (el) { App.S.fase = el.dataset.v; App.render(); };
  App.chg['shell.rf'] = function (el) { App.S.showRF = el.checked; App.render(); };
  App.chg['shell.rol'] = function (el) {
    App.S.rol = el.value;
    if (el.value === 'ayudante' && App.route.sys === 's1' && App.route.page !== 'conteo') { App.go('#/s1/conteo'); return; }
    App.render(); UI.toast('Ahora ve el portal como: ' + App.ROLES[el.value].n, 'info');
  };
  App.acts['shell.sim'] = function () {
    UI.confirm('Reiniciar la demostración', 'Se vuelven a generar los datos simulados con la semilla original y se borran los comprobantes, conteos y pedidos que haya registrado.', 'Reiniciar', 'btn-primary', function () { App.resetAll(); UI.toast('Demostración restablecida', 'ok'); });
  };
  App.resetAll = function () {
    var prev = { fase: App.S.fase, showRF: App.S.showRF };
    App.D = App.generate(); App.D.rev = 1; App.S = { fase: prev.fase, showRF: prev.showRF, rol: 'dueno', flags: {} };
    if (App.s1 && App.s1.reset) App.s1.reset();
    App.route = App.parseRoute(); App.render();
  };

  document.addEventListener('DOMContentLoaded', function () {
    App.D = App.generate();
    UI.init(); App.Charts.init();
    App.route = App.parseRoute();
    App.render();
  });
})();
