/* Componentes de interfaz compartidos (base tomada del prototipo de P5, sin las partes de reparto) */
(function () {
  'use strict';
  var App = window.App, U = App.U, esc = U.esc, ic = App.ic;
  var UI = (App.UI = {});
  App.acts = {}; App.chg = {}; App.inp = {};

  var PRIO = { debe: { label: 'MVP', long: 'Debe (MVP y TSP)', fase: 'Fase 1' }, deberia: { label: 'Piloto', long: 'Debería (piloto pagado)', fase: 'Fase 2' }, podria: { label: 'Futuro', long: 'Podría (después)', fase: 'Fase 3' } };
  UI.PRIO = PRIO;
  App.rf = function (id) { return ' data-rf="' + id + '"'; };

  UI.gated = function (prio) {
    var f = App.S.fase;
    return (f === 'mvp' && prio !== 'debe') || (f === 'piloto' && prio === 'podria');
  };

  /* ---------- toasts ---------- */
  UI.toast = function (msg, kind) {
    var host = document.getElementById('toasts'); if (!host) return;
    var t = document.createElement('div');
    t.className = 'toast ' + (kind || '');
    t.innerHTML = ic(kind === 'bad' ? 'alert' : kind === 'ok' ? 'checkc' : 'info', 18) + '<span></span>';
    t.querySelector('span').textContent = msg;
    host.appendChild(t);
    while (host.children.length > 2) host.removeChild(host.firstChild);
    setTimeout(function () { t.classList.add('out'); setTimeout(function () { t.remove(); }, 250); }, 3200);
  };

  /* ---------- modal / drawer ---------- */
  UI.modal = function (o) {
    var ov = document.createElement('div');
    ov.className = 'overlay' + (o.drawer ? ' drawer-ov' : '');
    var acts = (o.actions || []).map(function (a, i) {
      return '<button class="btn ' + (a.kind || 'btn-ghost') + '" data-i="' + i + '">' + (a.label) + '</button>';
    }).join('');
    ov.innerHTML = '<div class="modal ' + (o.drawer ? 'drawer' : '') + ' ' + (o.wide ? 'wide' : '') + '" role="dialog" aria-modal="true" aria-label="' + esc(o.title || '') + '">' +
      '<div class="modal-h"><h3>' + (o.title || '') + '</h3><button class="btn btn-icon btn-ghost" data-close aria-label="Cerrar">' + ic('x', 18) + '</button></div>' +
      '<div class="modal-b">' + (o.body || '') + '</div>' +
      (acts ? '<div class="modal-f">' + acts + '</div>' : '') + '</div>';
    document.body.appendChild(ov);
    var api = {
      el: ov.querySelector('.modal'),
      close: function () { ov.remove(); document.removeEventListener('keydown', onKey); },
      val: function (name) { var e = ov.querySelector('[name="' + name + '"]'); if (!e) return null; return e.type === 'checkbox' ? e.checked : e.value; },
      q: function (s) { return ov.querySelector(s); }
    };
    function onKey(e) { if (e.key === 'Escape') api.close(); }
    document.addEventListener('keydown', onKey);
    ov.addEventListener('click', function (e) {
      if (e.target === ov || e.target.closest('[data-close]')) { api.close(); return; }
      var b = e.target.closest('[data-i]');
      if (b && o.actions) {
        var a = o.actions[+b.dataset.i];
        if (a.onClick && a.onClick(api, e) === false) return;
        if (!a.keep) api.close();
      }
    });
    if (o.onOpen) o.onOpen(api);
    UI.decorate(ov);
    var first = ov.querySelector('input,select,textarea'); if (first && !o.noFocus) setTimeout(function () { first.focus(); }, 30);
    return api;
  };
  UI.confirm = function (title, text, label, kind, fn) {
    UI.modal({ title: title, body: '<p class="lead">' + text + '</p>', actions: [{ label: 'Cancelar' }, { label: label, kind: kind || 'btn-primary', onClick: function () { fn(); } }] });
  };

  /* ---------- tooltip global ---------- */
  var tip;
  UI.initTip = function () {
    tip = document.createElement('div'); tip.className = 'tip'; tip.setAttribute('role', 'tooltip'); tip.hidden = true; document.body.appendChild(tip);
    function show(el, x, y) {
      var t = el.getAttribute('data-tip'); if (!t) return;
      tip.textContent = t; tip.hidden = false;
      var w = tip.offsetWidth, h = tip.offsetHeight;
      var nx = Math.min(window.innerWidth - w - 8, Math.max(8, x + 12)), ny = y + 16 + h > window.innerHeight ? y - h - 12 : y + 16;
      tip.style.left = nx + 'px'; tip.style.top = ny + 'px';
    }
    document.addEventListener('mousemove', function (e) {
      var el = e.target.closest ? e.target.closest('[data-tip]') : null;
      if (el) show(el, e.clientX, e.clientY); else tip.hidden = true;
    });
    document.addEventListener('focusin', function (e) {
      var el = e.target.closest ? e.target.closest('[data-tip]') : null;
      if (el) { var r = el.getBoundingClientRect(); show(el, r.left, r.bottom - 12); }
    });
    document.addEventListener('focusout', function () { tip.hidden = true; });
    document.addEventListener('scroll', function () { tip.hidden = true; }, true);
  };

  /* ---------- píldoras y campos ---------- */
  UI.pill = function (kind, text, icon) {
    return '<span class="pill st-' + kind + '">' + (icon ? ic(icon, 13) : '') + esc(text) + '</span>';
  };
  UI.field = function (label, input, hint, extra) {
    return '<div class="field ' + (extra || '') + '"><label>' + label + '</label>' + input + (hint ? '<small>' + hint + '</small>' : '') + '</div>';
  };
  UI.avatar = function (name) { return '<span class="avatar">' + esc(U.initials(name)) + '</span>'; };
  UI.empty = function (title, text) {
    return '<div class="empty"><div class="empty-ic">' + ic('inbox', 26) + '</div><b>' + title + '</b><p>' + (text || '') + '</p></div>';
  };
  UI.seg = function (name, opts, val, act) {
    return '<div class="seg" role="group">' + opts.map(function (o) {
      return '<button type="button" class="' + (o[0] === val ? 'on' : '') + '" data-act="' + act + '" data-v="' + o[0] + '"' + (o[2] ? ' data-tip="' + esc(o[2]) + '"' : '') + '>' + o[1] + '</button>';
    }).join('') + '</div>';
  };
  UI.tabs = function (items, active, base) {
    return '<nav class="tabs" role="tablist">' + items.map(function (t) {
      return '<a role="tab" href="#' + base + '/' + t[0] + '" class="' + (t[0] === active ? 'on' : '') + '"' + (t[2] ? ' data-rf="' + t[2] + '"' : '') + '>' + t[1] + (t[3] != null ? '<span class="count">' + t[3] + '</span>' : '') + '</a>';
    }).join('') + '</nav>';
  };
  /* ---------- tablas ---------- */
  var tbls = {}, ts = {};
  UI.table = function (id, cfg) {
    tbls[id] = cfg; ts[id] = ts[id] || { q: '', sort: null, dir: 1, page: 0, f: {}, sel: {} };
    return '<div class="tbl" data-tbl="' + id + '"></div>';
  };
  UI.tstate = function (id) { return ts[id]; };
  function tblHtml(id) {
    var cfg = tbls[id], st = ts[id], rows = cfg.rows();
    var q = st.q.trim().toLowerCase();
    if (q && cfg.search) rows = rows.filter(function (r) { return String(cfg.search(r)).toLowerCase().indexOf(q) >= 0; });
    (cfg.filters || []).forEach(function (f) { var v = st.f[f.k]; if (v && v !== 'todos') rows = rows.filter(function (r) { return f.test(r, v); }); });
    if (st.sort != null) {
      var c = cfg.cols[st.sort], fn = c.sort || function (r) { return c.render(r).replace(/<[^>]+>/g, ''); };
      rows = rows.slice().sort(function (a, b) { var x = fn(a), y = fn(b); return (x > y ? 1 : x < y ? -1 : 0) * st.dir; });
    }
    var total = rows.length, ps = cfg.pageSize || 12, pages = Math.max(1, Math.ceil(total / ps));
    st.page = Math.min(st.page, pages - 1);
    var view = rows.slice(st.page * ps, st.page * ps + ps);
    var h = '<div class="tbl-bar">';
    if (cfg.search) h += '<label class="search">' + ic('search', 16) + '<input type="search" data-tq="' + id + '" placeholder="' + (cfg.placeholder || 'Buscar') + '" value="' + esc(st.q) + '"></label>';
    (cfg.filters || []).forEach(function (f) {
      h += '<select class="select sm" data-tf="' + id + '" data-k="' + f.k + '" aria-label="' + esc(f.label) + '"><option value="todos">' + f.label + ': todos</option>' + f.options.map(function (o) { return '<option value="' + o[0] + '"' + (st.f[f.k] === o[0] ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('') + '</select>';
    });
    h += '<span class="tbl-count">' + total + (total === 1 ? ' resultado' : ' resultados') + '</span>' + (cfg.bar ? cfg.bar() : '') + '</div>';
    h += '<div class="tbl-wrap"><table><thead><tr>' + cfg.cols.map(function (c, i) {
      var sorted = st.sort === i;
      return '<th' + (c.align ? ' class="' + c.align + '"' : '') + (c.w ? ' style="width:' + c.w + '"' : '') + ' ' + (c.nosort ? '' : 'data-ts="' + id + '" data-i="' + i + '" tabindex="0" aria-sort="' + (sorted ? (st.dir > 0 ? 'ascending' : 'descending') : 'none') + '"') + '>' + c.label + (sorted ? ic(st.dir > 0 ? 'chevu' : 'chevd', 12) : '') + '</th>';
    }).join('') + '</tr></thead><tbody>';
    if (!view.length) h += '<tr><td colspan="' + cfg.cols.length + '" class="tbl-empty">' + (cfg.empty || 'Sin resultados con estos filtros.') + '</td></tr>';
    view.forEach(function (r) {
      var rid = cfg.rowId ? cfg.rowId(r) : '';
      h += '<tr' + (cfg.rowAct ? ' class="click" data-act="' + cfg.rowAct + '" data-id="' + esc(rid) + '" tabindex="0"' : '') + (cfg.rowRf ? ' data-rf="' + cfg.rowRf + '" data-rf-pos="none"' : '') + '>' + cfg.cols.map(function (c) { return '<td' + (c.align ? ' class="' + c.align + '"' : '') + '>' + c.render(r) + '</td>'; }).join('') + '</tr>';
    });
    h += '</tbody></table></div>';
    if (pages > 1) h += '<div class="tbl-pg"><button class="btn btn-ghost btn-sm" data-tpg="' + id + '" data-d="-1"' + (st.page === 0 ? ' disabled' : '') + '>' + ic('chevl', 14) + 'Anterior</button><span>Página ' + (st.page + 1) + ' de ' + pages + '</span><button class="btn btn-ghost btn-sm" data-tpg="' + id + '" data-d="1"' + (st.page >= pages - 1 ? ' disabled' : '') + '>Siguiente' + ic('chevr', 14) + '</button></div>';
    return h;
  }
  UI.mountTables = function (root) {
    (root || document).querySelectorAll('[data-tbl]').forEach(function (el) {
      el.innerHTML = tblHtml(el.dataset.tbl);
      UI.decorate(el);
    });
  };
  UI.refreshTable = function (id) {
    var el = document.querySelector('[data-tbl="' + id + '"]'); if (!el) return;
    var focusQ = document.activeElement && document.activeElement.hasAttribute && document.activeElement.hasAttribute('data-tq');
    var pos = focusQ ? document.activeElement.selectionStart : 0;
    el.innerHTML = tblHtml(id); UI.decorate(el);
    if (focusQ) { var i = el.querySelector('[data-tq]'); i.focus(); try { i.setSelectionRange(pos, pos); } catch (e) { /* noop */ } }
  };

  /* ---------- etiquetas de requerimiento y control de fases ---------- */
  UI.decorate = function (root) {
    var S = App.S, fase = S.fase, show = S.showRF;
    var all = (root.querySelectorAll ? root.querySelectorAll('[data-rf]') : []);
    all.forEach(function (el) {
      if (el.dataset.rfDone) return;
      el.dataset.rfDone = '1';
      var ids = el.dataset.rf.split(',');
      var main = App.REQ[ids[0]];
      if (!main) { console.warn('Requerimiento desconocido: ' + ids[0]); return; }
      var prio = main.prio;
      ids.forEach(function (id) { var r = App.REQ[id]; if (r && r.prio === 'debe') prio = prio === 'debe' ? 'debe' : prio; });
      el.classList.add('rf-el'); el.dataset.prio = prio;
      var gated = UI.gated(prio);
      if (gated) {
        el.classList.add('rf-gated');
        el.querySelectorAll('button,input,select,textarea').forEach(function (c) { c.disabled = true; });
        if (/^(button|input|select|textarea)$/i.test(el.tagName)) el.disabled = true;
        el.setAttribute('aria-disabled', 'true');
      }
      if (show && el.dataset.rfPos !== 'none' && !/^(input|select|textarea|img|tr|td|th)$/i.test(el.tagName)) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'rfchip prio-' + prio; b.dataset.act = 'rf.info'; b.dataset.id = ids.join(',');
        b.setAttribute('data-tip', ids.map(function (i) { return i + ': ' + (App.REQ[i] ? App.REQ[i].text : ''); }).join('\n').slice(0, 220));
        b.innerHTML = '<i></i>' + PRIO[prio].label + ' ' + ids[0] + (ids.length > 1 ? ' +' + (ids.length - 1) : '');
        el.appendChild(b);
      }
    });
  };
  document.addEventListener('click', function (e) {
    var g = e.target.closest && e.target.closest('.rf-gated');
    if (g && !e.target.closest('.rfchip')) {
      e.preventDefault(); e.stopPropagation();
      var r = App.REQ[g.dataset.rf.split(',')[0]];
      UI.toast('Disponible en la ' + PRIO[g.dataset.prio].fase + ' (' + PRIO[g.dataset.prio].label.toLowerCase() + '): ' + (r ? r.id : ''), 'info');
    }
  }, true);

  App.acts['rf.info'] = function (el) {
    var ids = el.dataset.id.split(',');
    var body = ids.map(function (id) {
      var r = App.REQ[id]; if (!r) return '';
      var w = (App.WHERE[id] || {});
      return '<section class="rfdoc"><div class="rfdoc-h"><b>' + r.id + '</b><span class="pill prio-' + r.prio + '">' + PRIO[r.prio].long + '</span></div>' +
        '<p>' + esc(r.text) + '</p><dl><dt>Sistemas</dt><dd>' + esc(r.sys) + '</dd><dt>Criterio de aceptación</dt><dd>' + esc(r.crit) + '</dd>' +
        '<dt>Nivel en este prototipo</dt><dd>' + esc(w.nivelTxt || '') + '</dd>' +
        (w.donde ? '<dt>Dónde verlo</dt><dd>' + w.donde.map(function (d) { return '<a href="#' + d[0] + '">' + esc(d[1]) + '</a>'; }).join(', ') + '</dd>' : '') + '</dl></section>';
    }).join('');
    UI.modal({ title: 'Requerimiento', body: body, drawer: true, actions: [{ label: 'Cerrar', kind: 'btn-primary' }] });
  };

  /* ---------- delegación de eventos ---------- */
  UI.init = function () {
    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-act]');
      if (t && App.acts[t.dataset.act]) { App.acts[t.dataset.act](t, e); return; }
      var ths = e.target.closest('[data-ts]');
      if (ths) { var id = ths.dataset.ts, i = +ths.dataset.i, st = ts[id]; if (st.sort === i) st.dir = -st.dir; else { st.sort = i; st.dir = 1; } UI.refreshTable(id); return; }
      var pg = e.target.closest('[data-tpg]');
      if (pg) { ts[pg.dataset.tpg].page += +pg.dataset.d; UI.refreshTable(pg.dataset.tpg); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var t = e.target; if (!t.closest) return;
      var tr = t.closest('tr.click, th[data-ts]');
      if (tr && (t === tr)) { e.preventDefault(); tr.click(); }
    });
    document.addEventListener('input', function (e) {
      var t = e.target;
      if (t.dataset && t.dataset.tq) { ts[t.dataset.tq].q = t.value; ts[t.dataset.tq].page = 0; UI.refreshTable(t.dataset.tq); return; }
      if (t.dataset && t.dataset.inp && App.inp[t.dataset.inp]) App.inp[t.dataset.inp](t, e);
    });
    document.addEventListener('change', function (e) {
      var t = e.target;
      if (t.dataset && t.dataset.tf) { var st = ts[t.dataset.tf]; st.f[t.dataset.k] = t.value; st.page = 0; UI.refreshTable(t.dataset.tf); return; }
      if (t.dataset && t.dataset.chg && App.chg[t.dataset.chg]) App.chg[t.dataset.chg](t, e);
    });
    UI.initTip();
  };
})();
