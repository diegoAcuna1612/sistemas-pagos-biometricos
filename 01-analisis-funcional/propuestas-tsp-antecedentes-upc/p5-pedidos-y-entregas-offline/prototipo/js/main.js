/* Arranque, enrutador y marco del prototipo */
(function () {
  'use strict';
  var App = window.App, U = App.U, UI = App.UI, ic = App.ic;
  App.views = App.views || {};

  App.brandMark = function (cls) {
    return '<svg class="' + (cls || 'cyl-mark') + '" viewBox="0 0 32 44" aria-hidden="true"><path d="M12 3h8M13 3v3M19 3v3" stroke="#fff" stroke-width="2.2" stroke-linecap="round" fill="none"/><path d="M8 17a8 8 0 0 1 16 0v18a5 5 0 0 1-5 5h-6a5 5 0 0 1-5-5z" fill="none" stroke="#fff" stroke-width="2.4"/><path d="M8.6 27h14.8v8a4.6 4.6 0 0 1-4.6 4.6h-5.6A4.6 4.6 0 0 1 8.6 35z" fill="#eb6834"/></svg>';
  };

  var TABS = [
    ['inicio', 'Inicio', null], ['s1', 'Repartidor', 'S1'], ['s2', 'Distribuidor', 'S2'], ['s3', 'Plataforma', 'S3'], ['s4', 'Consola SaaS', 'S4'], ['recorrido', 'Recorrido guiado', null], ['cobertura', 'Cobertura', null]
  ];
  var DEFAULTS = { inicio: '', s1: '', s2: 'panel', s3: 'resumen', s4: 'empresas', recorrido: '', cobertura: 'rf' };

  App.parseRoute = function () {
    var h = (location.hash || '#/inicio').replace(/^#\/?/, '').split('/');
    var sys = h[0] || 'inicio';
    if (!App.views[sys]) sys = 'inicio';
    return { sys: sys, page: h[1] || DEFAULTS[sys], sub: h[2] || '', rest: h.slice(3) };
  };
  App.go = function (hash) { if (location.hash === hash) App.render(); else location.hash = hash; };

  App.shellHtml = function () {
    var S = App.S, r = App.route;
    var tabs = TABS.map(function (t) {
      return '<a href="#/' + t[0] + '" class="' + (r.sys === t[0] ? 'on' : '') + '">' + (t[2] ? '<span class="sid">' + t[2] + '</span>' : '') + t[1] + '</a>';
    }).join('');
    return '<a class="brand" href="#/inicio">' + App.brandMark() + 'Retorna<small>prototipo P5-V6</small></a><nav class="sys-tabs" aria-label="Sistemas">' + tabs + '</nav>' +
      '<div class="shell-tools"><span class="lbl" data-tip="Fase a mostrar">Fase</span>' + UI.seg('fase', [['todo', 'Todas'], ['mvp', 'MVP', 'Solo los 56 requerimientos «Debe»'], ['piloto', 'MVP + piloto', 'Agrega los 22 «Debería»']], S.fase, 'shell.fase') +
      '<label class="tg" data-tip="Muestra la etiqueta de requerimiento en cada elemento"><span class="switch"><input type="checkbox" ' + (S.showRF ? 'checked' : '') + ' data-chg="shell.rf"><i></i></span>Requerimientos</label>' +
      '<button class="btn btn-sm" data-act="shell.sim">' + ic('clock', 15) + '<span id="clk">' + App.clock.hhmm() + '</span></button></div>';
  };
  App.renderShell = function () {
    document.getElementById('shell').innerHTML = App.shellHtml();
    document.body.classList.toggle('no-rf', !App.S.showRF);
  };

  var lastKey = null;
  App.render = function () {
    var host = document.getElementById('view'), r = App.route, key = r.sys + '/' + r.page + '/' + r.sub;
    var sc = key === lastKey ? host.scrollTop : 0; lastKey = key;
    host.dataset.theme = r.sys === 's3' ? 'dark' : 'light';
    host.innerHTML = '';
    App.views[r.sys].render(r, host);
    UI.mountTables(host); UI.decorate(host);
    host.scrollTop = sc;
    App.renderShell();
    if (App.views[r.sys].after) App.views[r.sys].after(r, host);
  };
  App.safeRender = function () {
    // no interrumpir un formulario abierto ni un modal
    var host = document.getElementById('view'), ae = document.activeElement;
    if (document.querySelector('.overlay')) return;
    if (App.route.sys !== 's1' && ae && host.contains(ae) && /^(input|textarea|select)$/i.test(ae.tagName)) return;
    App.render();
  };
  window.addEventListener('hashchange', function () { App.route = App.parseRoute(); App.render(); });
  App.on('change', function () { App.safeRender(); });
  App.on('device', function () { if (App.route.sys === 's1' && App.s1) App.s1.onDevice(); else if (App.route.sys !== 's1') App.safeRender(); });

  /* ---- controles del marco ---- */
  App.acts['shell.fase'] = function (el) { App.S.fase = el.dataset.v; App.render(); };
  App.chg['shell.rf'] = function (el) { App.S.showRF = el.checked; App.render(); };
  App.acts['shell.sim'] = function (el) {
    var ex = document.getElementById('simpop'); if (ex) { ex.remove(); return; }
    var pop = document.createElement('div'); pop.className = 'sim-pop'; pop.id = 'simpop';
    pop.innerHTML = '<h4>Simulación de la demostración</h4><p class="mut" style="margin-top:4px">Todo es simulado: personas, precios, mensajes y resultados.</p>' +
      '<div class="field mt-s"><label>Hora simulada (Lima)</label><div class="row"><input class="input" type="time" id="simtime" value="' + App.clock.hhmm() + '"><button class="btn" data-act="shell.settime">Aplicar</button></div><small>Los avisos solo pueden enviarse entre ' + App.S.config.horaIni + ' y ' + App.S.config.horaFin + ' (RN-03). Pruebe con 21:30.</small></div>' +
      '<div class="divider"></div><button class="btn btn-danger btn-block" data-act="shell.reset">' + ic('refresh', 15) + 'Restablecer la demostración</button>';
    document.body.appendChild(pop);
    setTimeout(function () { document.addEventListener('click', function f(e) { if (!pop.contains(e.target) && !e.target.closest('[data-act="shell.sim"]')) { pop.remove(); document.removeEventListener('click', f); } }); }, 0);
  };
  App.acts['shell.settime'] = function () {
    var v = document.getElementById('simtime').value; if (!v) return;
    App.clock.set(v); document.getElementById('simpop').remove(); UI.toast('Hora simulada: ' + v, 'ok'); App.render();
  };
  App.acts['shell.reset'] = function () { var p = document.getElementById('simpop'); if (p) p.remove(); App.resetAll(); UI.toast('Demostración restablecida', 'ok'); };

  App.resetAll = function () {
    var prev = App.S ? { fase: App.S.fase, showRF: App.S.showRF } : { fase: 'todo', showRF: true };
    App.seed(); App.srv.resetSeq(); App.initSim(); App.srv.sembrar();
    App.S.fase = prev.fase; App.S.showRF = prev.showRF;
    if (App.s1 && App.s1.reset) App.s1.reset();
    if (App.s3 && App.s3.reset) App.s3.reset();
    if (App.tour && App.tour.reset) App.tour.reset();
    App.route = App.parseRoute(); App.render();
  };

  document.addEventListener('DOMContentLoaded', function () {
    App.seed(); App.srv.resetSeq(); App.srv.sembrar();
    App.S.showRF = true;
    UI.init();
    App.route = App.parseRoute();
    App.render();
  });
})();
