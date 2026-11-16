(function () {
  'use strict';

  var D = window.SOC2_MAP;
  if (!D) { document.body.textContent = 'Content failed to load (data.js).'; return; }

  var state = { q: '', role: 'all' };
  var open = {};                       // doc id -> true when its card is expanded
  var byId = {};
  D.docs.forEach(function (d) { byId[d.id] = d; });

  function $(sel) { return document.querySelector(sel); }

  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === 'text') n.textContent = attrs[k];
      else if (k === 'class') n.className = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }

  function docChip(id) {
    var d = byId[id];
    return d ? el('a', { 'class': 'chip', href: '#doc-' + id, text: d.title }) : null;
  }

  function matches(d) {
    var q = state.q.trim().toLowerCase();
    if (!q) return true;
    var g = D.groups.filter(function (x) { return x.id === d.group; })[0];
    var hay = [d.title, d.what, d.when, d.criteria.join(' '), g ? g.title : ''].join(' ').toLowerCase();
    return q.split(/\s+/).every(function (t) { return hay.indexOf(t) !== -1; });
  }

  function isStart(d) {
    var g = D.roleGuides[state.role];
    return !!(g && g.start.indexOf(d.id) !== -1);
  }

  /* ---------- toolbar ---------- */
  function renderRoles() {
    var box = $('#roles');
    box.textContent = '';
    var all = [{ id: 'all', label: 'Everyone' }].concat(D.roles);
    all.forEach(function (r) {
      var b = el('button', { type: 'button', 'aria-pressed': String(state.role === r.id), text: r.label });
      b.addEventListener('click', function () { state.role = r.id; render(); });
      box.appendChild(b);
    });
  }

  function renderGuide() {
    var box = $('#role-guide');
    var g = D.roleGuides[state.role];
    box.textContent = '';
    if (!g) { box.hidden = true; return; }
    box.hidden = false;
    box.appendChild(el('h2', { text: g.title }));
    box.appendChild(el('p', { text: g.intro }));
    var ul = el('ul');
    g.tips.forEach(function (t) { ul.appendChild(el('li', { text: t })); });
    box.appendChild(ul);
    var row = el('div', { 'class': 'chips' }, [el('span', { 'class': 'start-label', text: 'Start with:' })]);
    g.start.forEach(function (id) { row.appendChild(docChip(id)); });
    box.appendChild(row);
  }

  function renderSituations() {
    var box = $('#situations');
    box.textContent = '';
    D.situations.forEach(function (s) {
      var chips = el('div', { 'class': 'chips' });
      s.docs.forEach(function (id) { chips.appendChild(docChip(id)); });
      box.appendChild(el('div', { 'class': 'sit' }, [el('p', { text: s.q }), chips]));
    });
  }

  /* ---------- cards ---------- */
  function renderCard(d) {
    var det = el('details', { 'class': 'card', id: 'doc-' + d.id });
    if (open[d.id]) det.setAttribute('open', '');
    det.addEventListener('toggle', function () { open[d.id] = det.open; });

    var meta = el('div', { 'class': 'meta' });
    if (isStart(d)) meta.appendChild(el('span', { 'class': 'star', text: 'Start here' }));
    d.criteria.forEach(function (c) { meta.appendChild(el('span', { 'class': 'crit', text: c })); });
    if (d.updated) meta.appendChild(el('span', { 'class': 'upd', text: 'Updated ' + d.updated }));

    det.appendChild(el('summary', null, [
      el('span', { 'class': 'card-title', text: d.title }),
      meta
    ]));

    var body = el('div', { 'class': 'body' });
    body.appendChild(el('h3', { text: 'What it is' }));
    body.appendChild(el('p', { text: d.what }));
    body.appendChild(el('h3', { text: 'When to use it' }));
    body.appendChild(el('p', { text: d.when }));
    body.appendChild(el('h3', { text: 'SOC 2 criteria' }));
    body.appendChild(el('p', { text: d.criteria.join(', ') }));

    if (d.related && d.related.length) {
      body.appendChild(el('h3', { text: 'Related documents' }));
      var chips = el('div', { 'class': 'chips' });
      d.related.forEach(function (id) { chips.appendChild(docChip(id)); });
      body.appendChild(chips);
    }

    if (state.role !== 'all' && d.roles && d.roles[state.role]) {
      var rl = D.roles.filter(function (r) { return r.id === state.role; })[0];
      body.appendChild(el('div', { 'class': 'role-hint' }, [
        el('b', { text: 'For a ' + rl.label + ': ' }),
        document.createTextNode(d.roles[state.role])
      ]));
    }
    det.appendChild(body);
    return det;
  }

  function renderMap() {
    var box = $('#map');
    box.textContent = '';
    var shown = 0;
    D.groups.forEach(function (g) {
      var list = D.docs.filter(function (d) { return d.group === g.id && matches(d); });
      if (!list.length) return;
      shown += list.length;
      var cards = el('div', { 'class': 'cards' });
      list.forEach(function (d) { cards.appendChild(renderCard(d)); });
      box.appendChild(el('section', { 'class': 'group', 'aria-labelledby': 'g-' + g.id }, [
        el('h2', { id: 'g-' + g.id, text: g.title }),
        el('p', { text: g.desc }),
        cards
      ]));
    });
    $('#count').textContent = shown + ' of ' + D.docs.length + ' documents';
    $('#empty').hidden = shown !== 0;
  }

  function render() {
    renderRoles();
    renderGuide();
    renderMap();
  }

  /* ---------- deep links: #doc-<id> ---------- */
  function goToHash() {
    var m = /^#doc-([a-z0-9_-]+)$/i.exec(location.hash);
    if (!m || !byId[m[1]]) return;
    var id = m[1];
    open[id] = true;
    if (!matches(byId[id])) { state.q = ''; $('#q').value = ''; }
    render();
    var node = document.getElementById('doc-' + id);
    if (node) {
      node.scrollIntoView({ block: 'start' });
      node.classList.add('flash');
      setTimeout(function () { node.classList.remove('flash'); }, 1700);
    }
  }

  /* ---------- init ---------- */
  document.title = D.title;
  $('#title').textContent = D.title;
  $('#subtitle').textContent = D.subtitle;
  $('#asof').textContent = 'Content as of ' + D.asOf + '.';
  renderSituations();

  $('#q').addEventListener('input', function (e) { state.q = e.target.value; renderMap(); });

  render();
  window.addEventListener('hashchange', goToHash);
  goToHash();
})();
