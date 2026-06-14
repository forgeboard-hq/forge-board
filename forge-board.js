/* ================================================================
   CONFIG — paste your Apps Script web app URL between the quotes.
   Example: "https://script.google.com/macros/s/AKfy.../exec"
   ================================================================ */
const SCRIPT_URL = 'https://cool-cloud-1221.ash250918.workers.dev';
/* The name shown on the keeper row (fed by the AdminDone column). */
const ADMIN_NAME = 'Keeper';

/* ---------------- wordlists for the dice ---------------- */
const ADJ = [
  'faithful',
  'humble',
  'gentle',
  'patient',
  'gracious',
  'steadfast',
  'righteous',
  'blessed',
  'redeemed',
  'joyful',
  'merciful',
  'devoted',
  'upright',
  'contrite',
  'anointed',
  'beloved',
  'chosen',
  'kind',
  'meek',
  'pure',
  'valiant',
  'watchful',
  'ardent',
  'tender',
  'hopeful',
  'grateful',
  'radiant',
  'abiding',
  'lowly',
  'earnest',
  'fervent',
  'peaceful',
  'holy',
  'mended',
  'ransomed',
  'called',
  'kindled',
  'quiet',
  'sincere',
  'trusting',
  'willing',
  'prayerful',
  'gathered',
  'restored',
  'loving',
  'truthful',
  'honest',
  'worthy',
  'noble',
  'wise',
  'brave',
  'bold',
  'zealous',
  'cheerful',
  'thankful',
  'mighty',
  'shining',
  'golden',
  'crowned',
  'anchored',
  'rooted',
  'ready',
  'awakened',
  'renewed',
  'forgiven',
  'mindful',
  'eternal',
  'living',
  'burning',
  'rising',
  'soaring',
  'blooming',
  'flowing',
  'guarded',
  'guided',
  'sheltered',
  'sealed',
  'promised',
  'graceful',
  'tranquil',
  'serene',
  'cherished',
  'honored',
  'revered',
  'sacred',
  'hallowed',
  'divine',
  'heavenly',
  'saintly',
  'devout',
  'reverent',
  'obedient',
  'yielded',
  'enduring',
  'abounding',
  'overflowing',
  'flourishing',
  'fruitful',
  'bountiful',
  'generous',
  'victorious',
  'triumphant',
];
const NOUN = [
  'lamb',
  'dove',
  'lion',
  'shepherd',
  'vine',
  'olive',
  'cedar',
  'lily',
  'sparrow',
  'eagle',
  'ram',
  'stag',
  'palm',
  'reed',
  'well',
  'lamp',
  'seed',
  'harvest',
  'manna',
  'ark',
  'altar',
  'psalm',
  'scroll',
  'beacon',
  'ember',
  'vessel',
  'branch',
  'fig',
  'wheat',
  'fountain',
  'anchor',
  'banner',
  'raven',
  'dawn',
  'pilgrim',
  'sower',
  'watchman',
  'servant',
  'fold',
  'stream',
  'mantle',
  'candle',
  'fisher',
  'deer',
  'rock',
  'river',
  'mountain',
  'valley',
  'garden',
  'vineyard',
  'orchard',
  'meadow',
  'pasture',
  'spring',
  'brook',
  'oak',
  'myrtle',
  'cypress',
  'almond',
  'pomegranate',
  'honey',
  'bread',
  'oil',
  'wine',
  'salt',
  'light',
  'flame',
  'torch',
  'star',
  'sun',
  'moon',
  'cloud',
  'rain',
  'dew',
  'wind',
  'fire',
  'stone',
  'pearl',
  'crown',
  'robe',
  'sandal',
  'staff',
  'rod',
  'shield',
  'sword',
  'trumpet',
  'harp',
  'cymbal',
  'incense',
  'temple',
  'gate',
  'tower',
  'wall',
  'sanctuary',
  'throne',
  'refuge',
  'haven',
  'shelter',
  'cornerstone',
  'foundation',
];

/* ---------------- state (memory only, by design) ---------------- */
let session = null; // { codename, pin }
let data = { tasks: [], codenames: [], board: [] };
let candidate = '';
const pending = new Set(); // taskIds mid-save
const demoMode = !SCRIPT_URL;

/* ---------------- theme ---------------- */
const root = document.documentElement;
const localTheme = localStorage.getItem('theme');
let theme = localTheme
  ? localTheme
  : window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
applyTheme();
document.getElementById('themeToggle').onclick = () => {
  theme = theme === 'dark' ? 'light' : 'dark';
  applyTheme();
};
function applyTheme() {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

/* ---------------- helpers ---------------- */
const $ = (id) => document.getElementById(id);
const norm = (s) =>
  String(s || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
function esc(s) {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[c]
  );
}
// Escape first, then turn http(s) URLs into safe links (new tab, no opener).
function linkify(text) {
  return esc(text).replace(/https?:\/\/[^\s<]+/g, (url) => {
    const trail = (url.match(/[.,;:!?)\]'"]+$/) || [''])[0];
    const clean = trail ? url.slice(0, -trail.length) : url;
    return `<a href="${clean}" target="_blank" rel="noopener noreferrer">${clean}</a>${trail}`;
  });
}
function setMsg(el, text, kind) {
  el.textContent = text;
  el.className = (el.id === 'gridMsg' ? '' : 'msg') + (text ? ' ' + kind : '');
}
function relTime(iso) {
  if (!iso) return '';
  const m = Math.floor((Date.now() - new Date(iso)) / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return m + 'm ago';
  const h = Math.floor(m / 60);
  if (h < 24) return h + 'h ago';
  return Math.floor(h / 24) + 'd ago';
}

/* ---------------- toasts ---------------- */
function showToast(msg, kind, opts) {
  opts = opts || {};
  const el = document.createElement('div');
  el.className = 'toast' + (kind ? ' ' + kind : '');
  el.innerHTML =
    (opts.spinner ? "<span class='spinner sm'></span>" : '') +
    "<span class='t-msg'></span>";
  el.querySelector('.t-msg').textContent = msg;
  $('toastWrap').appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  if (!opts.sticky) setTimeout(() => dismissToast(el), opts.duration || 2200);
  return el;
}
function dismissToast(el) {
  if (!el || !el.parentNode) return;
  el.classList.remove('show');
  setTimeout(() => el.remove(), 220);
}

/* ---------------- session persistence (localStorage) ----------------
   Stores codename + PIN on this device so the user stays signed in
   across reloads. The PIN is kept in plaintext locally — fine for an
   honor-system board, not a real secret. All access is wrapped so a
   storage-blocked environment just falls back to no persistence.   */
const STORE_KEY = 'forge_session_v1';
function saveSession(s) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(s));
  } catch (e) {}
}
function readStoredSession() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
  } catch (e) {
    return null;
  }
}
function clearStoredSession() {
  try {
    localStorage.removeItem(STORE_KEY);
  } catch (e) {}
}
/* ---------------- gate vs board ---------------- */
function showSignedIn(on) {
  $('gateScreen').style.display = on ? 'none' : 'block';
  $('boardSection').style.display = on ? 'block' : 'none';
}
async function fetchBoard() {
  try {
    const res = await apiGet();
    if (!res.ok) throw new Error(res.error || 'Bad response');
    data = res;
    renderBoard();
    return true;
  } catch (err) {
    $('gridWrap').innerHTML =
      "<p class='empty-state'>Couldn't reach the board. Check your connection and refresh.</p>";
    return false;
  }
}
async function fetchCount() {
  try {
    const res = await apiCount();
    renderGate(res && res.ok ? res.count : null);
  } catch (e) {
    renderGate(null);
  }
}
function renderGate(n) {
  if (n === null || n === undefined) {
    $('gateCount').style.display = 'none';
    $('gateLine').textContent = 'Gathering the disciples…';
    return;
  }
  if (n <= 0) {
    $('gateCount').style.display = 'none';
    $('gateLine').textContent = 'Be the first to set out.';
  } else {
    $('gateCount').style.display = '';
    $('gateCount').textContent = n;
    $('gateLine').textContent =
      n === 1
        ? 'disciple has set out before you.'
        : 'disciples have set out before you.';
  }
}

/* ---------------- API ---------------- */
async function apiGet(params) {
  if (demoMode) return demoData();
  let url = SCRIPT_URL;
  if (params) {
    const sep = url.includes('?') ? '&' : '?';
    url += sep + new URLSearchParams(params).toString();
  }
  const res = await fetch(url);
  return res.json();
}
async function apiCount() {
  if (demoMode) return { ok: true, count: 3 };
  const sep = SCRIPT_URL.indexOf('?') >= 0 ? '&' : '?';
  const res = await fetch(SCRIPT_URL + sep + 'count=1');
  return res.json();
}
async function apiPost(payload) {
  // In demo mode, pretend writes succeed so the full flow is previewable.
  if (demoMode) return { ok: true, codename: payload.codename };
  const res = await fetch(SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // no preflight
    body: JSON.stringify(payload),
  });
  return res.json();
}

/* ---------------- dice ---------------- */
const GLYPHS = 'abcdefghijklmnopqrstuvwxyz';
function rollCodename() {
  const taken = new Set(data.codenames.map(norm));
  let name = '';
  for (let i = 0; i < 80; i++) {
    name =
      ADJ[Math.floor(Math.random() * ADJ.length)] +
      ' ' +
      NOUN[Math.floor(Math.random() * NOUN.length)];
    if (!taken.has(norm(name))) break;
  }
  candidate = name;
  shuffleInto($('codenameDisplay'), name);
  $('codenameDisplay').classList.remove('empty');
  refreshClaimBtn();
}
function shuffleInto(el, finalText) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = finalText;
    return;
  }
  let frame = 0;
  const total = 12;
  const tick = setInterval(() => {
    frame++;
    el.textContent = finalText
      .split('')
      .map((ch, i) =>
        ch === ' '
          ? ' '
          : frame / total > i / finalText.length
            ? ch
            : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      )
      .join('');
    if (frame >= total) {
      clearInterval(tick);
      el.textContent = finalText;
    }
  }, 35);
}

/* ---------------- claim / login / session ---------------- */
function refreshClaimBtn() {
  $('claimBtn').disabled = !(
    candidate &&
    $('nameClaim').value.trim() &&
    /^\d{4,8}$/.test($('pinClaim').value)
  );
}
$('pinClaim').oninput = refreshClaimBtn;
$('nameClaim').oninput = refreshClaimBtn;
$('rollBtn').onclick = rollCodename;

$('claimBtn').onclick = async () => {
  setMsg($('claimMsg'), '', '');
  if (!$('nameClaim').value.trim()) {
    setMsg($('claimMsg'), 'Please add your name first.', 'err');
    return;
  }
  $('claimBtn').disabled = true;

  // B: codenames aren't fetched until sign-in (the gate only pulls a count),
  // so re-check the live roster the moment Claim is tapped. If someone grabbed
  // this codename in the meantime, re-roll against the fresh list and bail —
  // the user just taps Claim again. A network hiccup falls through to register,
  // where the backend's lock + "claimed" check is the final safety net.
  try {
    const fresh = await apiGet();
    if (fresh && fresh.ok) {
      data = fresh;
      if (data.codenames.map(norm).includes(norm(candidate))) {
        rollCodename(); // re-rolls using the refreshed roster
        setMsg(
          $('claimMsg'),
          "That codename was just taken — here's a fresh one. Tap Claim again.",
          'err'
        );
        refreshClaimBtn();
        return;
      }
    }
  } catch (e) {
    /* offline / unreachable — fall through and let the backend arbitrate */
  }

  const res = await apiPost({
    action: 'register',
    codename: candidate,
    pin: $('pinClaim').value,
    name: $('nameClaim').value,
    hp: $('hpField').value,
  });
  if (res.ok) {
    const regKey = res.key || null;
    startSession(res.codename || candidate, $('pinClaim').value, regKey);
    await fetchBoard();
    jumpToNextStep({ silent: true });
    if (regKey) openRecoveryModal(regKey);
  } else {
    setMsg($('claimMsg'), res.error || 'Something went wrong.', 'err');
    if (/claimed/i.test(res.error || '')) rollCodename();
  }
  refreshClaimBtn();
};

/* ---------------- sign-in modal ---------------- */
function openSignInModal() {
  $('signInModal').hidden = false;
  animateModal($('signInModal'));
  document.documentElement.style.overflow = 'hidden';
  $('codenameLogin').focus();
}
function closeSignInModal() {
  $('signInModal').hidden = true;
  document.documentElement.style.overflow = '';
  setMsg($('loginMsg'), '', '');
}
$('showLogin').onclick = openSignInModal;
$('signInCancel').onclick = closeSignInModal;
$('signInClose').onclick = closeSignInModal;
$('signInModal').onclick = (e) => { if (e.target === $('signInModal')) closeSignInModal(); };

$('loginBtn').onclick = async () => {
  setMsg($('loginMsg'), '', '');
  const codename = norm($('codenameLogin').value);
  const pin = $('pinLogin').value;
  if (!codename || !/^\d{4,8}$/.test(pin)) {
    setMsg($('loginMsg'), 'Enter your codename and 4–8 digit PIN.', 'err');
    return;
  }
  $('loginBtn').disabled = true;
  const res = await apiGet();
  $('loginBtn').disabled = false;
  if (!res || !res.ok) {
    setMsg($('loginMsg'), "Couldn't reach the board. Try again.", 'err');
    return;
  }
  data = res;
  if (!data.codenames.map(norm).includes(codename)) {
    setMsg($('loginMsg'), "That codename isn't on the books.", 'err');
    return;
  }
  closeSignInModal();
  startSession(codename, pin);
  jumpToNextStep({ silent: true });
};

/* ---------------- account recovery modal ---------------- */
function openAccountRecoveryModal() {
  $('accountRecoveryModal').hidden = false;
  animateModal($('accountRecoveryModal'));
  document.documentElement.style.overflow = 'hidden';
  $('recoveryKeyInput').focus();
}
function closeAccountRecoveryModal() {
  $('accountRecoveryModal').hidden = true;
  document.documentElement.style.overflow = '';
  setMsg($('recoveryMsg'), '', '');
}
$('showRecovery').onclick = openAccountRecoveryModal;
$('accountRecoveryClose').onclick = closeAccountRecoveryModal;
$('accountRecoveryModal').onclick = (e) => { if (e.target === $('accountRecoveryModal')) closeAccountRecoveryModal(); };

$('recoverySubmitBtn').onclick = async () => {
  setMsg($('recoveryMsg'), '', '');
  const key = $('recoveryKeyInput').value.trim();
  const newPin = $('recoveryNewPin').value;
  if (!key) {
    setMsg($('recoveryMsg'), 'Paste your recovery key.', 'err');
    return;
  }
  if (!/^\d{4,8}$/.test(newPin)) {
    setMsg($('recoveryMsg'), 'Enter a new PIN (4–8 digits).', 'err');
    return;
  }
  $('recoverySubmitBtn').disabled = true;
  const res = await apiPost({ action: 'recover', key, newPin });
  if (res.ok) {
    setMsg($('recoveryMsg'), 'Recovery complete!', 'ok');
    closeAccountRecoveryModal();
    $('claimView').style.display = 'none';
    $('restoringView').style.display = 'flex';
    const board = await apiGet();
    if (board && board.ok) data = board;
    startSession(res.codename, newPin);
    await fetchBoard();
    jumpToNextStep({ silent: true });
    showToast('Welcome back — PIN updated', 'ok');
  } else {
    $('recoverySubmitBtn').disabled = false;
    setMsg($('recoveryMsg'), res.error || 'Recovery failed.', 'err');
  }
};

function startSession(codename, pin, recoveryKey) {
  session = { codename, pin };
  const existing = readStoredSession() || {};
  const toStore = { codename, pin };
  if (recoveryKey !== undefined) {
    toStore.key = recoveryKey;
    toStore.keyAcknowledged = false;
  } else if (existing.key) {
    toStore.key = existing.key;
    toStore.keyAcknowledged = existing.keyAcknowledged;
  }
  saveSession(toStore);
  $('sessionName').textContent = codename;
  $('restoringView').style.display = 'none';
  $('claimView').style.display = 'none';
  $('sessionView').style.display = 'block';
  showSignedIn(true);
  renderBoard();
}
$('signOutBtn').onclick = () => {
  session = null;
  clearStoredSession();
  data = { tasks: [], codenames: [], board: [] };
  $('sessionView').style.display = 'none';
  $('restoringView').style.display = 'none';
  $('claimView').style.display = 'block';
  showSignedIn(false);
  setMsg($('gridMsg'), '', '');
  setMsg($('claimMsg'), '', '');
  // Reset all form fields so stale state isn't visible on re-open
  $('pinClaim').value = '';
  $('codenameLogin').value = '';
  $('pinLogin').value = '';
  $('recoveryKeyInput').value = '';
  $('recoveryNewPin').value = '';
  $('recoverySubmitBtn').disabled = false;
  refreshClaimBtn();
  fetchCount();
};

/* ---------------- board state helpers ---------------- */
let sortSection = ''; // '' = original order (All)
// Earthy, distinguishable category colors that sit well on parchment + black.
const SECTION_COLORS = [
  '#6b7233',
  '#b5892f',
  '#a8623b',
  '#4f6d86',
  '#7c5577',
  '#3f6b4a',
  '#9a8226',
  '#8a6a44',
];
function uniqueSections() {
  const seen = [];
  data.tasks.forEach((t) => {
    const s = (t.section || '').trim();
    if (s && !seen.includes(s)) seen.push(s);
  });
  return seen;
}
function sectionColor(section) {
  const s = (section || '').trim();
  if (!s) return null;
  const i = uniqueSections().indexOf(s);
  return i < 0 ? null : SECTION_COLORS[i % SECTION_COLORS.length];
}
function orderedTasks() {
  if (!sortSection) return data.tasks;
  return data.tasks.filter((t) => (t.section || '').trim() === sortSection);
}
function renderSortControl() {
  const sections = uniqueSections();
  const ctrl = $('sortControl');
  if (!sections.length) {
    ctrl.style.display = 'none';
    return;
  }
  ctrl.style.display = 'inline-flex';
  const sel = $('sortSelect');
  sel.innerHTML =
    "<option value=''>All sections</option>" +
    sections
      .map((s) => `<option value="${esc(s)}">${esc(s)}</option>`)
      .join('');
  sel.value = sortSection;
  sel.onchange = () => {
    sortSection = sel.value;
    renderBoard();
    $('gridWrap').scrollLeft = 0;
  };
}

function isDone(codename, taskId) {
  const e = data.board.find(
    (b) => norm(b.codename) === norm(codename) && b.taskId === taskId
  );
  return e ? e.done : false;
}
function setLocalDone(codename, taskId, done) {
  const e = data.board.find(
    (b) => norm(b.codename) === norm(codename) && b.taskId === taskId
  );
  if (e) {
    e.done = done;
    e.updatedAt = new Date().toISOString();
  } else {
    data.board.push({
      codename,
      taskId,
      done,
      updatedAt: new Date().toISOString(),
    });
  }
}

/* ---------------- surgical cell patch (O(1) per tap) ---------------- */
function patchCell(taskId) {
  const btn = $('gridWrap').querySelector(`.cell-btn[data-task="${CSS.escape(taskId)}"]`);
  if (!btn) return false; // table not yet rendered — caller should fall back to renderBoard
  const done = isDone(session.codename, taskId);
  const isPending = pending.has(taskId);
  btn.className = `cell-btn${isPending ? ' pending' : ''}`;
  btn.setAttribute('aria-pressed', String(done));
  const t = data.tasks.find((x) => x.id === taskId);
  btn.setAttribute('aria-label', `${done ? 'Done' : 'Mark done'}: ${t ? t.label : taskId}`);
  btn.innerHTML = done
    ? "<span class='check'>✓</span>"
    : "<span class='box'>＋</span>";

  // Update this row's steps chip.
  const k = data.tasks.length;
  const nDone = data.tasks.reduce((s, t) => s + (isDone(session.codename, t.id) ? 1 : 0), 0);
  const chip = $('gridWrap').querySelector('.you-row .steps-chip');
  if (chip) chip.textContent = `${nDone} of ${k} steps`;

  updateProgress();
  return true;
}

/* ---------------- toggling your own cell ---------------- */
async function toggleCell(taskId) {
  if (!session || pending.has(taskId)) return;
  const next = !isDone(session.codename, taskId);
  pending.add(taskId);
  setLocalDone(session.codename, taskId, next);
  patchCell(taskId);
  const saving = showToast('Saving…', '', {
    sticky: true,
    spinner: true,
  });

  const res = await apiPost({
    action: 'update',
    codename: session.codename,
    pin: session.pin,
    taskId,
    done: next,
  });
  pending.delete(taskId);
  dismissToast(saving);
  if (res.ok) {
    showToast(next ? 'Marked done ✓' : 'Marked not done', 'ok');
  } else {
    setLocalDone(session.codename, taskId, !next); // revert
    showToast(res.error || "Couldn't save — try again", 'err', {
      duration: 3200,
    });
    if (/wrong codename or pin/i.test(res.error || '')) $('signOutBtn').click();
  }
  patchCell(taskId);
}

/* Restart the modal-card animation each time a modal opens. Without this the
   animation only fires on first paint (elements stay in the DOM when hidden). */
function animateModal(el) {
  const card = el.querySelector('.modal-card');
  if (!card) return;
  card.style.animation = 'none';
  void card.offsetHeight; // force reflow so removing the property is noticed
  card.style.animation = '';
}

/* ---------------- task description modal ---------------- */
function openTask(taskId) {
  const t = data.tasks.find((x) => x.id === taskId);
  if (!t) return;
  $('dtLabel').textContent = t.label;
  $('dtBody').innerHTML = t.description
    ? linkify(t.description)
    : 'No description provided.';
  $('modal').hidden = false;
  animateModal($('modal'));
  document.documentElement.style.overflow = 'hidden';
  $('dtClose').focus();
}
function closeModal() {
  $('modal').hidden = true;
  document.documentElement.style.overflow = '';
}
$('dtClose').onclick = closeModal;
$('modal').onclick = (e) => {
  if (e.target === $('modal')) closeModal();
};
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (!$('modal').hidden) closeModal();
  else if (!$('confirmModal').hidden) closeConfirm();
  else if (!$('signInModal').hidden) closeSignInModal();
  else if (!$('accountRecoveryModal').hidden) closeAccountRecoveryModal();
  // recoveryModal is intentionally NOT closeable via Escape
});

/* ---------------- confirm modal (generic) ---------------- */
let confirmCb = null;
function openConfirm(opts) {
  $('confirmEyebrow').textContent = opts.eyebrow || 'Confirm';
  $('confirmTitle').textContent = opts.title || 'Are you sure?';
  $('confirmMsg').textContent = opts.message || '';
  $('confirmOk').textContent = opts.okText || 'Confirm';
  confirmCb = opts.onConfirm || null;
  $('confirmModal').hidden = false;
  animateModal($('confirmModal'));
  $('confirmCancel').focus();
  document.documentElement.style.overflow = 'hidden';
}
function closeConfirm() {
  $('confirmModal').hidden = true;
  confirmCb = null;
  document.documentElement.style.overflow = '';
}
$('confirmCancel').onclick = closeConfirm;
$('confirmModal').onclick = (e) => {
  if (e.target === $('confirmModal')) closeConfirm();
};
$('confirmOk').onclick = () => {
  const cb = confirmCb;
  closeConfirm();
  if (cb) cb();
};

/* ---------------- recovery key modal ---------------- */
function openRecoveryModal(key) {
  $('recoveryKeyText').textContent = key;
  $('recoveryAckCheck').checked = false;
  $('recoveryCloseBtn').disabled = true;
  $('recoveryModal').hidden = false;
  animateModal($('recoveryModal'));
  document.documentElement.style.overflow = 'hidden';
  $('copyKeyBtn').focus();
}
async function closeRecoveryModal() {
  $('recoveryModal').hidden = true;
  document.documentElement.style.overflow = '';
  const stored = readStoredSession() || {};
  delete stored.key;
  stored.keyAcknowledged = true;
  saveSession(stored);
  if (session) {
    try {
      await apiPost({
        action: 'acknowledgeKey',
        codename: session.codename,
        pin: session.pin,
      });
    } catch (e) {}
  }
}
$('recoveryAckCheck').onchange = () => {
  $('recoveryCloseBtn').disabled = !$('recoveryAckCheck').checked;
};
$('recoveryCloseBtn').onclick = closeRecoveryModal;
$('copyKeyBtn').onclick = () => {
  const key = $('recoveryKeyText').textContent;
  navigator.clipboard
    .writeText(key)
    .then(() => {
      showToast('Key copied', 'ok');
    })
    .catch(() => {
      showToast('Copy failed — select and copy manually', 'err', {
        duration: 3200,
      });
    });
};
$('downloadKeyBtn').onclick = () => {
  const key = $('recoveryKeyText').textContent;
  const codename = session ? session.codename : 'unknown';
  const blob = new Blob(
    [
      `The Forge — Recovery Key\nCodename: ${codename}\nKey: ${key}\n\nKeep this somewhere safe. It cannot be retrieved from The Forge.`,
    ],
    { type: 'text/plain' }
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'forge-secret.txt';
  a.click();
  URL.revokeObjectURL(url);
};

/* ---------------- jump to next incomplete step ---------------- */
function jumpToNextStep(opts) {
  opts = opts || {};
  const youRow = $('gridWrap').querySelector('.you-row');
  if (!youRow) return;
  const btn = youRow.querySelector('.cell-btn[aria-pressed="false"]');
  if (!btn) {
    if (!opts.silent) showToast('All steps complete!', 'ok');
    return;
  }
  const td = btn.closest('td');
  const stickyCol = youRow.querySelector('.who');
  const stickyWidth = stickyCol ? stickyCol.offsetWidth : 0;
  $('gridWrap').scrollTo({ left: Math.max(0, td.offsetLeft - stickyWidth - 8), behavior: opts.silent ? 'instant' : 'smooth' });
}
$('nextStepBtn').onclick = () => jumpToNextStep();

/* ---------------- clear my progress ---------------- */
$('clearBtn').onclick = () => {
  openConfirm({
    eyebrow: 'Clear progress',
    title: 'Clear your progress?',
    message:
      "This unticks every step on your row. Your codename stays — only your checkmarks are wiped, and this can't be undone.",
    okText: 'Clear it',
    onConfirm: doReset,
  });
};
async function doReset() {
  if (!session) return;
  const saving = showToast('Clearing…', '', {
    sticky: true,
    spinner: true,
  });
  const res = await apiPost({
    action: 'reset',
    codename: session.codename,
    pin: session.pin,
  });
  dismissToast(saving);
  if (res.ok) {
    data.board = data.board.filter(
      (b) => norm(b.codename) !== norm(session.codename)
    );
    renderBoard();
    showToast('Progress cleared', 'ok');
  } else {
    showToast(res.error || "Couldn't clear — try again", 'err', {
      duration: 3200,
    });
    if (/wrong codename or pin/i.test(res.error || '')) $('signOutBtn').click();
  }
}

/* ---------------- board rendering ---------------- */
function renderBoard() {
  const wrap = $('gridWrap');
  if (!data.tasks.length) {
    wrap.innerHTML =
      "<p class='empty-state'>No steps yet. The keeper adds them in the sheet's Tasks tab.</p>";
    return;
  }

  renderSortControl();
  const cols = orderedTasks();

  // Row order: you first (if signed in, pinned under admin), then everyone else alphabetically.
  const youName = session ? session.codename : null;
  const others = data.codenames
    .filter((c) => !youName || norm(c) !== norm(youName))
    .sort((a, b) => norm(a).localeCompare(norm(b)));
  const rows = youName ? [youName, ...others] : others;

  const head = `
    <thead>
      <tr>
        <th class="corner"><div class="corner-label">codename ╲ task</div></th>
        ${cols
          .map((t) => {
            const col = sectionColor(t.section);
            const stripe = col ? ` style="border-top:3px solid ${col}"` : '';
            return `
          <th class="task-th"${stripe} data-task="${esc(t.id)}">
            <button type="button" title="Tap for description">
              <span>${esc(t.label)}</span><span class="info-dot">i</span>
            </button>
          </th>`;
          })
          .join('')}
      </tr>
    </thead>`;

  const k = data.tasks.length;
  const chip = (n) => `<span class="steps-chip">${n} of ${k} steps</span>`;

  const adminDoneN = data.tasks.reduce((s, t) => s + (t.adminDone ? 1 : 0), 0);
  const adminCells = cols
    .map(
      (t) =>
        `<td>${t.adminDone ? "<span class='check'>✓</span>" : "<span class='blank'>·</span>"}</td>`
    )
    .join('');
  const adminRow = `
    <tr class="admin-row">
      <th class="who"><div class="who-name">${esc(ADMIN_NAME)}<span class="admin-tag">KEEPER</span></div>${chip(adminDoneN)}</th>
      ${adminCells}
    </tr>`;

  const bodyRows = rows
    .map((code) => {
      const you = youName && norm(code) === norm(youName);
      const nDone = data.tasks.reduce(
        (s, t) => s + (isDone(code, t.id) ? 1 : 0),
        0
      );
      const cells = cols
        .map((t) => {
          const done = isDone(code, t.id);
          if (you) {
            const isPending = pending.has(t.id);
            const inner = isPending
              ? "<span class='spinner' aria-hidden='true'></span>"
              : done
                ? "<span class='check'>✓</span>"
                : "<span class='box'>＋</span>";
            return `<td><button class="cell-btn${isPending ? ' pending' : ''}" type="button" data-task="${esc(t.id)}"
                   aria-pressed="${done}" aria-label="${done ? 'Done' : 'Mark done'}: ${esc(t.label)}">${inner}</button></td>`;
          }
          return `<td>${done ? "<span class='check'>✓</span>" : "<span class='blank'>·</span>"}</td>`;
        })
        .join('');
      return `<tr class="${you ? 'you-row' : ''}">
      <th class="who"><div class="who-name">${esc(code)}${you ? "<span class='you-tag'>YOU</span>" : ''}</div>${chip(nDone)}</th>${cells}</tr>`;
    })
    .join('');

  wrap.innerHTML = `<table class="grid">${head}<tbody>${adminRow}${bodyRows || ''}</tbody></table>`;
  if (!rows.length) {
    // still show admin row; add a gentle nudge under the grid
    setMsg(
      $('gridMsg'),
      "No one's joined yet — cast a codename to take the first row.",
      'ok'
    );
  }

  wrap
    .querySelectorAll('.task-th button')
    .forEach(
      (b) => (b.onclick = () => openTask(b.closest('.task-th').dataset.task))
    );
  wrap
    .querySelectorAll('.cell-btn')
    .forEach((b) => (b.onclick = () => toggleCell(b.dataset.task)));
  updateProgress();
}

/* ---------------- signed-in progress bar ---------------- */
function updateProgress() {
  if (!session) return;
  const k = data.tasks.length;
  const n = data.tasks.reduce(
    (s, t) => s + (isDone(session.codename, t.id) ? 1 : 0),
    0
  );
  const pct = k ? Math.round((n / k) * 100) : 0;
  $('progFill').style.width = pct + '%';
  $('progText').textContent = `${n} of ${k} steps`;
  let note = '';
  if (k === 0) note = '';
  else if (n === 0) note = 'the first step awaits';
  else if (n === k) note = 'every step complete — well done';
  else note = `${k - n} to go`;
  $('progNote').textContent = note;
}

/* ---------------- load ---------------- */
/* ---------------- startup ---------------- */
function init() {
  const stored = readStoredSession();
  if (stored && stored.codename && stored.pin) {
    // Returning visitor: show "Gathering you in…" while we fetch the board.
    $('claimView').style.display = 'none';
    $('sessionView').style.display = 'none';
    $('restoringView').style.display = 'flex';
    $('gateScreen').style.display = 'none';
    $('boardSection').style.display = 'none';
    apiGet({ codename: stored.codename })
      .then((res) => {
        if (!res || !res.ok) throw new Error(res.error || '');
        data = res;
        startSession(stored.codename, stored.pin);
        jumpToNextStep({ silent: true });
        if (stored.key && !stored.keyAcknowledged) {
          openRecoveryModal(stored.key);
        }
      })
      .catch((err) => {
        clearStoredSession();
        $('restoringView').style.display = 'none';
        $('claimView').style.display = 'block';
        showSignedIn(false);
        if (err && err.message === 'account_removed') {
          setMsg($('claimMsg'), 'Account does not exist. Kindly create a new one.', 'err');
        }
        fetchCount();
      });
  } else {
    // New visitor: gate screen + join count only. The board stays unfetched.
    if (demoMode) $('setupBanner').classList.add('show');
    $('claimView').style.display = 'block';
    showSignedIn(false);
    fetchCount();
  }
}

/* ---------------- demo data (until SCRIPT_URL is set) ---------------- */
function demoData() {
  $('setupBanner').classList.add('show');
  return {
    ok: true,
    tasks: [
      {
        id: 't1',
        label: 'Read ch. 1–4',
        description:
          "First four chapters plus the end-of-chapter exercises. No skimming — we'll know.\n\nReference: https://example.com/handbook",
        adminDone: true,
        section: 'Study',
      },
      {
        id: 't2',
        label: 'Build demo',
        description:
          'Anything that runs counts. Polish optional, shipping mandatory.',
        adminDone: false,
        section: 'Practice',
      },
      {
        id: 't3',
        label: 'Write tests',
        description: 'At least one test per module. Red-green-refactor.',
        adminDone: false,
        section: 'Practice',
      },
      {
        id: 't4',
        label: 'Deploy',
        description: 'Ship it somewhere with a public URL.',
        adminDone: false,
        section: 'Study',
      },
    ],
    codenames: ['faithful lamb', 'humble dove', 'gentle shepherd'],
    board: [
      {
        codename: 'faithful lamb',
        taskId: 't1',
        done: true,
        updatedAt: new Date(Date.now() - 36e5).toISOString(),
      },
      {
        codename: 'faithful lamb',
        taskId: 't2',
        done: true,
        updatedAt: new Date(Date.now() - 36e5).toISOString(),
      },
      {
        codename: 'humble dove',
        taskId: 't1',
        done: true,
        updatedAt: new Date(Date.now() - 864e5).toISOString(),
      },
      {
        codename: 'gentle shepherd',
        taskId: 't3',
        done: true,
        updatedAt: new Date(Date.now() - 72e5).toISOString(),
      },
    ],
  };
}

init();
