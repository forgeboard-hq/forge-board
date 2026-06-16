/* ================================================================
   CONFIG — paste your Apps Script web app URL between the quotes.
   Example: "https://script.google.com/macros/s/AKfy.../exec"
   ================================================================ */
const SCRIPT_URL = 'https://cool-cloud-1221.ash250918.workers.dev';
/* The name shown on the keeper row (fed by the AdminDone column). */
const ADMIN_NAME = 'The Keeper';

const INFO_ICON = `<svg class="info-svg" viewBox="0 0 416.979 416.979" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z"/></svg>`;

/* ---------------- username list for the dice ---------------- */
const USERNAMES = [
  'broken vessel', 'glad pilgrim', 'quiet heart', 'burning coal', 'tender shoot',
  'living stone', 'faithful remnant', 'lowly servant', 'still waters', 'hidden manna',
  'gentle flame', 'rooted oak', 'morning star', 'sealed ember', 'humble seeker',
  'bright anchor', 'chosen reed', 'willing lamb', 'steady rock', 'graced wanderer',
  'free sparrow', 'mended branch', 'called exile', 'rising dawn', 'golden harvest',
  'devout pilgrim', 'tender vine', 'joyful cedar', 'guided stream', 'noble soldier',
  'pure fountain', 'loyal shepherd', 'brave herald', 'mighty fortress', 'ardent flame',
  'clean vessel', 'sure foundation', 'royal priesthood', 'risen heir', 'loving kindness',
  'meek inheritor', 'bold witness', 'holy remnant', 'just servant', 'true shepherd',
  'wise builder', 'good steward', 'calm waters', 'free captive', 'saved sinner',
  'eager laborer', 'ready bride', 'sealed saint', 'rooted tree', 'golden lamp',
  'gentle spirit', 'joyful noise', 'living water', 'rising tide', 'dawn seeker',
  'hidden pearl', 'morning dew', 'still flame', 'bright torch', 'humble clay',
  'faithful vine', 'tender mercy', 'steady anchor', 'graced pilgrim', 'chosen vessel',
  'burning reed', 'mended heart', 'called pilgrim', 'glad servant', 'quiet spring',
  'noble vine', 'loyal stone', 'brave remnant', 'guided lamb', 'holy seeker',
  'just pilgrim', 'true remnant', 'wise servant', 'good shepherd', 'calm seeker',
  'free remnant', 'sure pilgrim', 'royal heir', 'risen pilgrim', 'loving servant',
  'meek pilgrim', 'bold remnant', 'holy pilgrim', 'just remnant', 'true pilgrim',
  'broken alabaster', 'glad exile', 'quiet refuge', 'burning altar', 'tender mercy',
  'living bread', 'faithful sojourner', 'lowly heart', 'still haven', 'hidden spring',
  'gentle rain', 'rooted cedar', 'morning light', 'sealed remnant', 'humble clay',
  'bright flame', 'chosen branch', 'willing heart', 'steady vine', 'graced exile',
  'free captive', 'mended spirit', 'called sojourner', 'rising star', 'golden vessel',
  'devout sojourner', 'tender heart', 'joyful spring', 'guided exile', 'noble remnant',
  'pure heart', 'loyal remnant', 'brave sojourner', 'mighty shield', 'ardent seeker',
  'clean heart', 'sure remnant', 'royal servant', 'risen saint', 'loving heart',
  'meek servant', 'bold sojourner', 'holy heart', 'just sojourner', 'true heart',
  'wise heart', 'good heart', 'calm heart', 'free heart', 'saved heart',
  'eager heart', 'ready heart', 'sealed heart', 'rooted heart', 'golden heart',
  'gentle heart', 'joyful heart', 'living heart', 'rising heart', 'dawn heart',
  'hidden heart', 'morning heart', 'still heart', 'bright heart', 'humble heart',
  'faithful heart', 'tender branch', 'steady heart', 'graced heart', 'chosen heart',
  'burning heart', 'mended exile', 'called heart', 'glad heart', 'quiet heart',
  'noble heart', 'loyal heart', 'brave heart', 'guided heart', 'holy sojourner',
  'broken spirit', 'glad spirit', 'quiet spirit', 'burning spirit', 'tender spirit',
  'living spirit', 'faithful spirit', 'lowly spirit', 'still spirit', 'hidden spirit',
  'gentle seeker', 'rooted spirit', 'morning spirit', 'sealed spirit', 'humble spirit',
  'bright spirit', 'chosen spirit', 'willing spirit', 'steady spirit', 'graced spirit',
  'free spirit', 'mended pilgrim', 'called spirit', 'rising spirit', 'golden spirit',
  'devout spirit', 'tender exile', 'joyful spirit', 'guided spirit', 'noble spirit',
  'pure spirit', 'loyal spirit', 'brave spirit', 'mighty spirit', 'ardent spirit',
  'clean spirit', 'sure spirit', 'royal spirit', 'risen spirit', 'loving spirit',
  'meek spirit', 'bold spirit', 'holy spirit', 'just spirit', 'true spirit',
  'wise pilgrim', 'good pilgrim', 'calm pilgrim', 'free pilgrim', 'saved pilgrim',
  'eager pilgrim', 'ready pilgrim', 'sealed pilgrim', 'rooted pilgrim', 'golden pilgrim',
  'gentle pilgrim', 'joyful pilgrim', 'living pilgrim', 'rising pilgrim', 'dawn pilgrim',
  'hidden pilgrim', 'morning pilgrim', 'still pilgrim', 'bright pilgrim', 'humble pilgrim',
  'faithful pilgrim', 'tender pilgrim', 'steady pilgrim', 'graced vessel', 'chosen pilgrim',
  'burning pilgrim', 'mended vessel', 'called vessel', 'glad vessel', 'quiet vessel',
  'noble vessel', 'loyal vessel', 'brave vessel', 'guided vessel', 'holy vessel',
  'just vessel', 'true vessel', 'wise vessel', 'good vessel', 'calm vessel',
  'free vessel', 'saved vessel', 'eager vessel', 'ready vessel', 'sealed vessel',
  'rooted vessel', 'golden vessel', 'gentle vessel', 'joyful vessel', 'living vessel',
  'rising vessel', 'dawn vessel', 'hidden vessel', 'morning vessel', 'still vessel',
  'bright vessel', 'humble vessel', 'faithful vessel', 'tender vessel', 'steady vessel',
  'chosen exile', 'burning exile', 'glad exile', 'quiet exile', 'noble exile',
  'loyal exile', 'brave exile', 'guided exile', 'holy exile', 'just exile',
  'true exile', 'wise exile', 'good exile', 'calm exile', 'free exile',
  'saved exile', 'eager exile', 'ready exile', 'sealed exile', 'rooted exile',
  'golden exile', 'gentle exile', 'joyful exile', 'living exile', 'rising exile',
  'dawn exile', 'hidden exile', 'morning exile', 'still exile', 'bright exile',
  'humble exile', 'faithful exile', 'tender sojourner', 'steady exile', 'graced sojourner',
  'burning sojourner', 'glad sojourner', 'quiet sojourner', 'noble sojourner', 'loyal sojourner',
  'brave sojourner', 'guided sojourner', 'holy sojourner', 'true sojourner', 'wise sojourner',
  'good sojourner', 'calm sojourner', 'free sojourner', 'saved sojourner', 'eager sojourner',
  'ready sojourner', 'sealed sojourner', 'rooted sojourner', 'golden sojourner',
  'gentle sojourner', 'joyful sojourner', 'living sojourner', 'rising sojourner',
  'dawn sojourner', 'hidden sojourner', 'morning sojourner', 'still sojourner',
  'bright sojourner', 'humble sojourner', 'faithful sojourner', 'steady sojourner',
  'broken wanderer', 'glad wanderer', 'quiet wanderer', 'burning wanderer', 'tender wanderer',
  'living wanderer', 'faithful wanderer', 'lowly wanderer', 'still wanderer', 'hidden wanderer',
  'gentle wanderer', 'rooted wanderer', 'morning wanderer', 'sealed wanderer', 'humble wanderer',
  'bright wanderer', 'chosen wanderer', 'willing wanderer', 'steady wanderer', 'free wanderer',
  'mended wanderer', 'called wanderer', 'rising wanderer', 'golden wanderer', 'devout wanderer',
  'joyful wanderer', 'guided wanderer', 'noble wanderer', 'pure wanderer', 'loyal wanderer',
  'brave wanderer', 'mighty wanderer', 'ardent wanderer', 'clean wanderer', 'sure wanderer',
  'royal wanderer', 'risen wanderer', 'loving wanderer', 'meek wanderer', 'bold wanderer',
  'holy wanderer', 'just wanderer', 'true wanderer', 'wise wanderer', 'good wanderer',
  'calm wanderer', 'saved wanderer', 'eager wanderer', 'ready wanderer', 'sealed wanderer',
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
let theme = localTheme ? localTheme : 'light';
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
async function fetchCodenames() {
  const res = await apiGet({ action: 'codenames' });
  if (res && res.ok && Array.isArray(res.codenames)) {
    data.codenames = res.codenames;
  }
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
  const eyebrow = document.querySelector('.gate-eyebrow');
  if (n === null || n === undefined) {
    if (eyebrow) eyebrow.style.display = 'none';
    $('gateCount').style.display = 'none';
    $('gateLine').textContent = 'Gathering the disciples…';
    return;
  }
  if (eyebrow) eyebrow.style.display = '';
  if (n <= 0) {
    $('gateCount').style.display = 'none';
    $('gateLine').textContent = 'Be the first to set out.';
  } else {
    $('gateCount').style.display = '';
    $('gateCount').textContent = n;
    $('gateLine').textContent =
      n === 1
        ? 'other disciple on this journey.'
        : 'other disciples on this journey.';
  }
}

/* ---------------- API ---------------- */
const NETWORK_ERR = { ok: false, error: 'network' };

function apiError(btn, origHTML) {
  if (btn) { btn.disabled = false; btn.innerHTML = origHTML; }
  showToast('Something went wrong. Please try again.', 'err', { duration: 3200 });
}

async function apiGet(params) {
  if (demoMode) return demoData();
  try {
    let url = SCRIPT_URL;
    if (params) {
      const sep = url.includes('?') ? '&' : '?';
      url += sep + new URLSearchParams(params).toString();
    }
    const res = await fetch(url);
    return res.json();
  } catch (e) { return NETWORK_ERR; }
}
async function apiCount() {
  if (demoMode) return { ok: true, count: 3 };
  try {
    const sep = SCRIPT_URL.indexOf('?') >= 0 ? '&' : '?';
    const res = await fetch(SCRIPT_URL + sep + 'count=1');
    return res.json();
  } catch (e) { return NETWORK_ERR; }
}
async function apiPost(payload) {
  // In demo mode, pretend writes succeed so the full flow is previewable.
  if (demoMode) return { ok: true, codename: payload.codename };
  try {
  const res = await fetch(SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // no preflight
    body: JSON.stringify(payload),
  });
  return res.json();
  } catch (e) { return NETWORK_ERR; }
}

/* ---------------- dice ---------------- */
const GLYPHS = 'abcdefghijklmnopqrstuvwxyz';
function rollCodename() {
  clearTypewriter();
  $('codenameDisplay').innerHTML = '';
  const taken = new Set(data.codenames.map(norm));
  const available = USERNAMES.filter(n => !taken.has(norm(n)));
  const pool = available.length ? available : USERNAMES;
  const name = pool[Math.floor(Math.random() * pool.length)];
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
      $('codenameAnnounce').textContent = finalText;
    }
  }, 35);
}

/* ---------------- typewriter placeholder ---------------- */
let twTimers = [];
function clearTypewriter() {
  twTimers.forEach((id) => { clearInterval(id); clearTimeout(id); });
  twTimers = [];
}

function typewriterPlaceholder() {
  clearTypewriter();
  const el = $('codenameDisplay');
  el.classList.remove('empty');
  el.innerHTML = '';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = 'draw your username';
    return;
  }

  const textSpan = document.createElement('span');
  const cursor = document.createElement('span');
  cursor.className = 'tw-cursor';
  el.appendChild(textSpan);
  el.appendChild(cursor);

  const phrase = 'draw your username';

  const taken = new Set(data.codenames.map(norm));
  const available = USERNAMES.filter(n => !taken.has(norm(n)));
  const twPool = available.length >= 5 ? available : USERNAMES;
  const namePool = Array.from({ length: 5 }, () =>
    twPool[Math.floor(Math.random() * twPool.length)]
  );
  let nameIndex = 0;
  function nextName() {
    const name = namePool[nameIndex];
    nameIndex = (nameIndex + 1) % namePool.length;
    return name;
  }

  function type(text, speed, reverse, pause, onDone) {
    let i = reverse ? text.length : 0;
    const id = setInterval(() => {
      i += reverse ? -1 : 1;
      textSpan.textContent = text.slice(0, i);
      const done = reverse ? i <= 0 : i >= text.length;
      if (done) {
        clearInterval(id);
        twTimers = twTimers.filter((x) => x !== id);
        if (onDone) {
          const tid = setTimeout(onDone, pause);
          twTimers.push(tid);
        }
      }
    }, speed);
    twTimers.push(id);
  }

  function loop() {
    type(phrase, 70, false, 900, () =>
      type(phrase, 75, true, 200, () => {
        const name = nextName();
        type(name, 80, false, 1000, () =>
          type(name, 75, true, 250, loop)
        );
      })
    );
  }

  loop();
}
setTimeout(typewriterPlaceholder, 400);

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
  const claimBtn = $('claimBtn');
  claimBtn.disabled = true;
  const origClaimText = claimBtn.textContent;
  claimBtn.innerHTML = "<span class='spinner sm btn-spinner'></span>Joining…";

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
          "That username was just taken — here's a fresh one. Tap Claim again.",
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
    if (regKey) openRecoveryModal(regKey);
    await fetchBoard();
    jumpToNextStep({ silent: true });
  } else {
    if (res.error === 'network') { apiError(claimBtn, origClaimText); return; }
    claimBtn.textContent = origClaimText;
    setMsg($('claimMsg'), res.error || 'Something went wrong.', 'err');
    if (/claimed/i.test(res.error || '')) rollCodename();
  }
  refreshClaimBtn();
};

/* ---------------- sign-in modal ---------------- */
let _signInTrigger = null;
function openSignInModal() {
  _signInTrigger = document.activeElement;
  $('signInModal').hidden = false;
  animateModal($('signInModal'));
  document.documentElement.style.overflow = 'hidden';
  $('codenameLogin').focus();
}
function closeSignInModal() {
  $('signInModal').hidden = true;
  document.documentElement.style.overflow = '';
  setMsg($('loginMsg'), '', '');
  if (_signInTrigger) { _signInTrigger.focus(); _signInTrigger = null; }
}
$('showLogin').onclick = openSignInModal;
$('signInCancel').onclick = closeSignInModal;
$('signInClose').onclick = closeSignInModal;
$('pinLogin').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') $('loginBtn').click();
});
$('signInModal').onclick = (e) => { if (e.target === $('signInModal')) closeSignInModal(); };

$('loginBtn').onclick = async () => {
  setMsg($('loginMsg'), '', '');
  const codename = norm($('codenameLogin').value);
  const pin = $('pinLogin').value;
  if (!codename || !pin) {
    setMsg($('loginMsg'), 'Enter your username and PIN.', 'err');
    return;
  }
  const loginBtn = $('loginBtn');
  const origLoginText = loginBtn.textContent;
  loginBtn.disabled = true;
  loginBtn.innerHTML = "<span class='spinner sm btn-spinner'></span>Signing in…";

  // Keeper login — separate auth path, no Users sheet involved.
  if (codename === norm(ADMIN_NAME)) {
    const res = await apiPost({ action: 'keeperLogin', pin });
    loginBtn.disabled = false;
    loginBtn.textContent = origLoginText;
    if (!res.ok) {
      if (res.error === 'network') { apiError(loginBtn, origLoginText); return; }
      setMsg($('loginMsg'), res.error || 'Wrong PIN.', 'err'); return;
    }
    const board = await apiGet();
    if (board && board.ok) data = board;
    closeSignInModal();
    startSession(ADMIN_NAME, pin, undefined, true);
    return;
  }

  // Regular user login.
  if (!/^\d{4,8}$/.test(pin)) {
    loginBtn.disabled = false;
    loginBtn.textContent = origLoginText;
    setMsg($('loginMsg'), 'Enter your username and 4–8 digit PIN.', 'err');
    return;
  }
  const res = await apiGet();
  loginBtn.disabled = false;
  loginBtn.textContent = origLoginText;
  if (!res || !res.ok) {
    if (res && res.error === 'network') { apiError(loginBtn, origLoginText); return; }
    setMsg($('loginMsg'), "Couldn't reach the board. Try again.", 'err');
    return;
  }
  data = res;
  if (!data.codenames.map(norm).includes(codename)) {
    setMsg($('loginMsg'), "That username isn't on the books.", 'err');
    return;
  }
  closeSignInModal();
  startSession(codename, pin);
  jumpToNextStep({ silent: true });
};

/* ---------------- account recovery modal ---------------- */
let _recoveryTrigger = null;
function openAccountRecoveryModal() {
  _recoveryTrigger = document.activeElement;
  $('accountRecoveryModal').hidden = false;
  animateModal($('accountRecoveryModal'));
  document.documentElement.style.overflow = 'hidden';
  $('recoveryKeyInput').focus();
}
function closeAccountRecoveryModal() {
  $('accountRecoveryModal').hidden = true;
  document.documentElement.style.overflow = '';
  setMsg($('recoveryMsg'), '', '');
  if (_recoveryTrigger) { _recoveryTrigger.focus(); _recoveryTrigger = null; }
}
$('showRecovery').onclick = openAccountRecoveryModal;
$('accountRecoveryClose').onclick = closeAccountRecoveryModal;
$('recoveryNewPin').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') $('recoverySubmitBtn').click();
});
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
  const recoveryBtn = $('recoverySubmitBtn');
  const origRecoveryText = recoveryBtn.textContent;
  recoveryBtn.disabled = true;
  recoveryBtn.innerHTML = "<span class='spinner sm btn-spinner'></span>Restoring…";
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
    if (res.error === 'network') { apiError(recoveryBtn, origRecoveryText); return; }
    recoveryBtn.disabled = false;
    recoveryBtn.textContent = origRecoveryText;
    setMsg($('recoveryMsg'), res.error || 'Recovery failed.', 'err');
  }
};

function startSession(codename, pin, recoveryKey, isAdmin) {
  session = { codename, pin, isAdmin: !!isAdmin };
  const existing = readStoredSession() || {};
  const toStore = { codename, pin, isAdmin: !!isAdmin };
  if (recoveryKey !== undefined) {
    toStore.key = recoveryKey;
    toStore.keyAcknowledged = false;
  } else if (existing.key) {
    toStore.key = existing.key;
    toStore.keyAcknowledged = existing.keyAcknowledged;
  }
  saveSession(toStore);
  $('sessionName').textContent = codename;
  $('identityHeading').textContent = session.isAdmin ? 'Keeper dashboard' : 'Your JOURNEY';
  $('restoringView').style.display = 'none';
  $('claimView').style.display = 'none';
  $('sessionView').style.display = 'block';
  const gifEl = $('keeperGif');
  if (session.isAdmin) {
    if (!gifEl.src) gifEl.src = './assets/jesus.gif';
    gifEl.style.display = 'block';
  } else {
    gifEl.style.display = 'none';
  }
  $('nextStepBtn').style.display = session.isAdmin ? 'none' : '';
  $('clearBtn').style.display = session.isAdmin ? 'none' : '';
  showSignedIn(true);
  renderBoard();
  if (session.isAdmin) {
    if (!$('adminPanel')) {
      const ap = document.createElement('section');
      ap.className = 'panel';
      ap.id = 'adminPanel';
      $('identityPanel').insertAdjacentElement('afterend', ap);
    }
    renderAdminPanel();
  }
}
$('signOutBtn').onclick = () => {
  openConfirm({
    eyebrow: 'Sign out',
    title: 'Want to sign out?',
    message: 'Sign back in with your USERNAME and PIN anytime.',
    okText: 'Sign out',
    onConfirm: doSignOut,
  });
};
function doSignOut() {
  session = null;
  clearStoredSession();
  data = { tasks: [], codenames: [], board: [] };
  $('sessionView').style.display = 'none';
  $('restoringView').style.display = 'none';
  $('claimView').style.display = 'block';
  const ap = $('adminPanel');
  if (ap) ap.remove();
  $('keeperGif').style.display = 'none';
  $('identityHeading').textContent = 'Claim your username';
  showSignedIn(false);
  setMsg($('gridMsg'), '', '');
  setMsg($('claimMsg'), '', '');
  $('pinClaim').value = '';
  $('codenameLogin').value = '';
  $('pinLogin').value = '';
  $('recoveryKeyInput').value = '';
  $('recoveryNewPin').value = '';
  $('recoverySubmitBtn').disabled = false;
  candidate = '';
  setTimeout(typewriterPlaceholder, 200);
  refreshClaimBtn();
  fetchCount();
}

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
    if (next) {
      const n = data.tasks.reduce((s, t) => s + (isDone(session.codename, t.id) ? 1 : 0), 0);
      if (n % 10 === 0 && typeof confetti === 'function') {
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
      }
    }
  } else {
    setLocalDone(session.codename, taskId, !next); // revert
    showToast(res.error || "Couldn't save — try again", 'err', { duration: 3200 });
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
let _taskTrigger = null;
function openTask(taskId) {
  const t = data.tasks.find((x) => x.id === taskId);
  if (!t) return;
  _taskTrigger = document.activeElement;
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
  if (_taskTrigger) { _taskTrigger.focus(); _taskTrigger = null; }
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
let _confirmTrigger = null;
function openConfirm(opts) {
  _confirmTrigger = document.activeElement;
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
  if (_confirmTrigger) { _confirmTrigger.focus(); _confirmTrigger = null; }
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
      `The Forge — Recovery Key\nUsername: ${codename}\nKey: ${key}\n\nKeep this somewhere safe. It cannot be retrieved from The Forge.`,
    ],
    { type: 'text/plain' }
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Knowing-God-Recovery-Key.txt';
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
  if (!opts.silent) btn.focus();
}
$('nextStepBtn').onclick = () => jumpToNextStep();

/* ---------------- clear my progress ---------------- */
$('clearBtn').onclick = () => {
  openConfirm({
    eyebrow: 'START OVER',
    title: 'Want to clear your progress?',
    message:
      "This unticks every step on your row. This cannot be undone.",
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
    $('gridWrap').scrollLeft = 0;
    showToast('Progress cleared', 'ok');
  } else {
    showToast(res.error || "Couldn't clear — try again", 'err', { duration: 3200 });
  }
}

/* ---------------- admin tick ---------------- */
async function toggleAdminCell(taskId) {
  if (!session || !session.isAdmin || pending.has('admin:' + taskId)) return;
  const task = data.tasks.find((t) => t.id === taskId);
  if (!task) return;
  const next = !task.adminDone;
  const pendingKey = 'admin:' + taskId;
  pending.add(pendingKey);
  task.adminDone = next;
  renderBoard();
  const saving = showToast('Saving…', '', { sticky: true, spinner: true });
  const res = await apiPost({ action: 'adminTick', pin: session.pin, taskId, done: next });
  pending.delete(pendingKey);
  dismissToast(saving);
  if (res.ok) {
    showToast(next ? 'Marked done ✓' : 'Marked not done', 'ok');
  } else {
    task.adminDone = !next;
    showToast(res.error || "Couldn't save — try again", 'err', { duration: 3200 });
  }
  renderBoard();
}

/* ---------------- admin panel ---------------- */
let editingTaskId = null; // null = adding, else = editing

function renderAdminPanel() {
  const panel = $('adminPanel');
  const sections = [...new Set(data.tasks.map((t) => (t.section || '').trim()).filter(Boolean))];

  const taskRows = data.tasks.map((t) => `
    <tr>
      <td class="ap-check-cell"><input type="checkbox" class="ap-row-check" data-id="${esc(t.id)}" /></td>
      <td class="ap-label">${esc(t.label)}${t.section ? `<span class="ap-label-section">${esc(t.section)}</span>` : ''}</td>
      <td class="ap-section ap-section-col">${esc(t.section || '—')}</td>
      <td class="ap-actions">
        <button class="btn sm" data-edit="${esc(t.id)}">Edit</button>
        <button class="btn sm danger" data-delete="${esc(t.id)}">Delete</button>
        <button class="btn sm" data-preview="${esc(t.id)}">Preview</button>
      </td>
    </tr>`).join('');

  panel.innerHTML = `
    <div class="ap-wrap">
      <button class="ap-toggle" id="apToggle" type="button" aria-expanded="true">
        <span>Manage Tasks</span><span class="ap-toggle-icon">▾</span>
      </button>
      <div class="ap-collapsible" id="apCollapsible">
      ${data.tasks.length ? `
        <div class="ap-search-wrap">
          <input type="text" id="apSearch" placeholder="Search by label or section…" autocomplete="off" />
        </div>
        <div class="ap-bulk-bar" id="apBulkBar">
          <span id="apBulkCount">0 selected</span>
          <button class="btn sm danger" id="apBulkDeleteBtn">Delete selected</button>
        </div>
        <div class="ap-table-wrap">
          <table class="ap-table">
            <thead><tr>
              <th class="ap-check-cell"><input type="checkbox" id="apSelectAll" title="Select all" /></th>
              <th>Label</th><th class="ap-section-col">Section</th><th></th>
            </tr></thead>
            <tbody>${taskRows}</tbody>
          </table>
        </div>` : `<p class="hint hint--mb">No tasks yet — add one below.</p>`}

      <div class="ap-form" id="apForm">
        <h4 class="ap-form-heading" id="apFormHeading">Add task</h4>
        <div class="field">
          <label for="apLabel">Label</label>
          <input type="text" id="apLabel" maxlength="80" placeholder="e.g. Read chapter 1" autocomplete="off" />
        </div>
        <div class="field">
          <label for="apDesc">Description</label>
          <textarea id="apDesc" rows="3" placeholder="Optional details, links, instructions…"></textarea>
        </div>
        <div class="field">
          <label for="apSection">Section</label>
          <input type="text" id="apSection" maxlength="60" placeholder="e.g. Week 1" list="apSectionList" autocomplete="off" />
          <datalist id="apSectionList">${sections.map((s) => `<option value="${esc(s)}">`).join('')}</datalist>
        </div>
        <div class="ap-form-actions">
          <button class="btn primary" id="apSubmitBtn">Add task</button>
          <button class="btn" id="apCancelEdit">Cancel</button>
          <button class="btn" id="apPreviewBtn" type="button">Preview</button>
        </div>
        <p class="msg" id="apMsg"></p>
      </div>
      </div>
    </div>`;

  // Multi-select logic
  function getCheckedIds() {
    return [...panel.querySelectorAll('.ap-row-check:checked')].map((c) => c.dataset.id);
  }
  function refreshBulkBar() {
    const ids = getCheckedIds();
    const bar = $('apBulkBar');
    if (!bar) return;
    bar.style.display = ids.length ? 'flex' : 'none';
    $('apBulkCount').textContent = `${ids.length} selected`;
  }
  if ($('apSelectAll')) {
    $('apSelectAll').onchange = (e) => {
      panel.querySelectorAll('.ap-row-check').forEach((c) => (c.checked = e.target.checked));
      refreshBulkBar();
    };
  }
  panel.querySelectorAll('.ap-row-check').forEach((c) => {
    c.onchange = () => {
      const all = panel.querySelectorAll('.ap-row-check');
      const checked = panel.querySelectorAll('.ap-row-check:checked');
      if ($('apSelectAll')) $('apSelectAll').indeterminate = checked.length > 0 && checked.length < all.length;
      if ($('apSelectAll')) $('apSelectAll').checked = checked.length === all.length && all.length > 0;
      refreshBulkBar();
    };
  });
  if ($('apBulkDeleteBtn')) {
    $('apBulkDeleteBtn').onclick = () => {
      const ids = getCheckedIds();
      if (!ids.length) return;
      const labels = ids.map((id) => data.tasks.find((t) => t.id === id)?.label).filter(Boolean);
      openConfirm({
        eyebrow: 'Delete tasks',
        title: `Delete ${ids.length} task${ids.length > 1 ? 's' : ''}?`,
        message: `This will remove: ${labels.join(', ')}. All member progress for these tasks will also be cleared.`,
        okText: 'Delete all',
        onConfirm: () => doBulkDelete(ids),
      });
    };
  }

  // Expand / collapse
  if ($('apToggle')) {
    $('apToggle').onclick = () => {
      const expanded = $('apToggle').getAttribute('aria-expanded') === 'true';
      $('apToggle').setAttribute('aria-expanded', String(!expanded));
      $('adminPanel').classList.toggle('ap-panel-collapsed', expanded);
      const col = $('apCollapsible');
      if (expanded) {
        // Collapsing: start transition then hide after it finishes.
        col.classList.add('ap-collapsed');
        col.addEventListener('transitionend', () => { col.style.display = 'none'; }, { once: true });
      } else {
        // Expanding: show first, then remove collapsed class to trigger transition.
        col.style.display = '';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => col.classList.remove('ap-collapsed'));
        });
      }
    };
  }

  // Search filter
  if ($('apSearch')) {
    $('apSearch').oninput = () => {
      const q = $('apSearch').value.trim().toLowerCase();
      panel.querySelectorAll('.ap-table tbody tr').forEach((row) => {
        const label = (row.querySelector('.ap-label')?.textContent || '').toLowerCase();
        const section = (row.querySelector('.ap-section')?.textContent || '').toLowerCase();
        row.style.display = !q || label.includes(q) || section.includes(q) ? '' : 'none';
      });
    };
  }

  // Task table action buttons
  panel.querySelectorAll('[data-edit]').forEach((b) => {
    b.onclick = () => startEditTask(b.dataset.edit);
  });
  panel.querySelectorAll('[data-delete]').forEach((b) => {
    b.onclick = () => confirmDeleteTask(b.dataset.delete);
  });
  panel.querySelectorAll('[data-preview]').forEach((b) => {
    b.onclick = () => previewTask(b.dataset.preview);
  });

  $('apPreviewBtn').onclick = () => {
    const label = $('apLabel').value.trim();
    const desc = $('apDesc').value.trim();
    if (!label) { setMsg($('apMsg'), 'Enter a label to preview.', 'err'); return; }
    $('dtLabel').textContent = label;
    $('dtBody').innerHTML = desc ? linkify(desc) : 'No description provided.';
    $('modal').hidden = false;
    animateModal($('modal'));
    document.documentElement.style.overflow = 'hidden';
  };

  $('apSubmitBtn').onclick = () => editingTaskId ? doEditTask() : doAddTask();

  $('apCancelEdit').onclick = () => {
    editingTaskId = null;
    $('apFormHeading').textContent = 'Add task';
    $('apSubmitBtn').textContent = 'Add task';
    $('apCancelEdit').style.display = 'none';
    $('apLabel').value = '';
    $('apDesc').value = '';
    $('apSection').value = '';
    setMsg($('apMsg'), '', '');
  };
}

function startEditTask(taskId) {
  const t = data.tasks.find((x) => x.id === taskId);
  if (!t) return;
  editingTaskId = taskId;
  $('apFormHeading').textContent = 'Edit task';
  $('apSubmitBtn').textContent = 'Save changes';
  $('apCancelEdit').style.display = 'inline-block';
  $('apLabel').value = t.label;
  $('apDesc').value = t.description || '';
  $('apSection').value = t.section || '';
  $('apLabel').focus();
  $('apForm').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function previewTask(taskId) {
  const t = data.tasks.find((x) => x.id === taskId);
  if (!t) return;
  $('dtLabel').textContent = t.label;
  $('dtBody').innerHTML = t.description ? linkify(t.description) : 'No description provided.';
  $('modal').hidden = false;
  animateModal($('modal'));
  document.documentElement.style.overflow = 'hidden';
}

async function doAddTask() {
  const label = $('apLabel').value.trim();
  const desc = $('apDesc').value.trim();
  const section = $('apSection').value.trim();
  if (!label) { setMsg($('apMsg'), 'Label is required.', 'err'); return; }
  $('apSubmitBtn').disabled = true;
  const res = await apiPost({ action: 'addTask', pin: session.pin, label, description: desc, section });
  $('apSubmitBtn').disabled = false;
  if (res.ok) {
    data.tasks.push({ id: res.taskId, label, description: desc, adminDone: false, section });
    $('apLabel').value = '';
    $('apDesc').value = '';
    $('apSection').value = '';
    setMsg($('apMsg'), 'Task added.', 'ok');
    renderBoard();
    renderAdminPanel();
  } else {
    setMsg($('apMsg'), res.error || 'Failed to add task.', 'err');
  }
}

async function doEditTask() {
  const label = $('apLabel').value.trim();
  const desc = $('apDesc').value.trim();
  const section = $('apSection').value.trim();
  if (!label) { setMsg($('apMsg'), 'Label is required.', 'err'); return; }
  $('apSubmitBtn').disabled = true;
  const res = await apiPost({ action: 'editTask', pin: session.pin, taskId: editingTaskId, label, description: desc, section });
  $('apSubmitBtn').disabled = false;
  if (res.ok) {
    const t = data.tasks.find((x) => x.id === editingTaskId);
    if (t) { t.label = label; t.description = desc; t.section = section; }
    editingTaskId = null;
    setMsg($('apMsg'), 'Task updated.', 'ok');
    renderBoard();
    renderAdminPanel();
  } else {
    setMsg($('apMsg'), res.error || 'Failed to update task.', 'err');
  }
}

function confirmDeleteTask(taskId) {
  const t = data.tasks.find((x) => x.id === taskId);
  if (!t) return;
  openConfirm({
    eyebrow: 'Delete task',
    title: `Delete "${t.label}"?`,
    message: 'This removes the task from the board and clears all member progress for it.',
    okText: 'Delete',
    onConfirm: () => doDeleteTask(taskId),
  });
}

async function doDeleteTask(taskId) {
  const saving = showToast('Deleting…', '', { sticky: true, spinner: true });
  const res = await apiPost({ action: 'deleteTask', pin: session.pin, taskId });
  dismissToast(saving);
  if (res.ok) {
    data.tasks = data.tasks.filter((t) => t.id !== taskId);
    data.board = data.board.filter((b) => b.taskId !== taskId);
    showToast('Task deleted.', 'ok');
    renderBoard();
    renderAdminPanel();
  } else {
    showToast(res.error || 'Failed to delete.', 'err', { duration: 3200 });
  }
}

async function doBulkDelete(ids) {
  const saving = showToast(`Deleting ${ids.length} tasks…`, '', { sticky: true, spinner: true });
  const results = await Promise.all(ids.map((id) => apiPost({ action: 'deleteTask', pin: session.pin, taskId: id })));
  dismissToast(saving);
  const failed = ids.filter((_, i) => !results[i].ok);
  const deleted = ids.filter((_, i) => results[i].ok);
  data.tasks = data.tasks.filter((t) => !deleted.includes(t.id));
  data.board = data.board.filter((b) => !deleted.includes(b.taskId));
  renderBoard();
  renderAdminPanel();
  if (failed.length) {
    showToast(`${deleted.length} deleted, ${failed.length} failed.`, 'err', { duration: 3500 });
  } else {
    showToast(`${deleted.length} task${deleted.length > 1 ? 's' : ''} deleted.`, 'ok');
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

  // Row order: logged-in user first, then others by tick count descending.
  const youName = (session && !session.isAdmin) ? session.codename : null;
  const tickCount = (c) => data.tasks.reduce((s, t) => s + (isDone(c, t.id) ? 1 : 0), 0);
  const others = data.codenames
    .filter((c) => !youName || norm(c) !== norm(youName))
    .sort((a, b) => tickCount(b) - tickCount(a));
  const rows = youName ? [youName, ...others] : others;

  const head = `
    <thead>
      <tr>
        <th class="corner"><div class="corner-label">username ╲ reading</div></th>
        ${cols
          .map((t) => {
            const col = sectionColor(t.section);
            const stripe = col ? ` style="border-top:3px solid ${col}"` : '';
            return `
          <th class="task-th"${stripe} data-task="${esc(t.id)}">
            <button type="button" title="Tap for description">
              <span>${esc(t.label)}</span>${INFO_ICON}
            </button>
          </th>`;
          })
          .join('')}
      </tr>
    </thead>`;

  const k = data.tasks.length;
  const chip = (n) => `<span class="steps-chip">${n} of ${k} steps</span>`;

  const adminDoneN = data.tasks.reduce((s, t) => s + (t.adminDone ? 1 : 0), 0);
  const isAdmin = session && session.isAdmin;
  const adminCells = cols
    .map((t) => {
      if (isAdmin) {
        const done = t.adminDone;
        const isPending = pending.has('admin:' + t.id);
        return `<td><button class="cell-btn admin-cell${isPending ? ' pending' : ''}" type="button" data-task="${esc(t.id)}"
          aria-pressed="${done}" aria-label="${done ? 'Done' : 'Mark done'}: ${esc(t.label)}">
          ${done ? "<span class='check'>✓</span>" : "<span class='box'>＋</span>"}
        </button></td>`;
      }
      return `<td>${t.adminDone ? "<span class='check'>✓</span>" : "<span class='blank'>·</span>"}</td>`;
    })
    .join('');
  const adminRow = `
    <tr class="admin-row">
      <th class="who"><div class="who-name">${esc(ADMIN_NAME).toLowerCase()}<span class="admin-tag">ADMIN</span></div>${chip(adminDoneN)}</th>
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
      "No one's joined yet — cast a username to take the first row.",
      'ok'
    );
  }

  wrap
    .querySelectorAll('.task-th button')
    .forEach(
      (b) => (b.onclick = () => openTask(b.closest('.task-th').dataset.task))
    );
  wrap
    .querySelectorAll('.cell-btn:not(.admin-cell)')
    .forEach((b) => (b.onclick = () => toggleCell(b.dataset.task)));
  wrap
    .querySelectorAll('.admin-cell')
    .forEach((b) => (b.onclick = () => toggleAdminCell(b.dataset.task)));
  updateProgress();
}

/* ---------------- signed-in progress bar ---------------- */
function updateProgress() {
  if (!session) return;
  const k = data.tasks.length;
  const n = session.isAdmin
    ? data.tasks.reduce((s, t) => s + (t.adminDone ? 1 : 0), 0)
    : data.tasks.reduce((s, t) => s + (isDone(session.codename, t.id) ? 1 : 0), 0);
  const pct = k ? Math.round((n / k) * 100) : 0;
  const fillPct = k && n > 0 ? Math.round(Math.pow(n / k, 0.6) * 100) : 0;
  $('progFill').style.width = fillPct + '%';
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
    apiGet(stored.isAdmin ? undefined : { codename: stored.codename })
      .then((res) => {
        if (!res || !res.ok) throw new Error(res.error || '');
        data = res;
        startSession(stored.codename, stored.pin, undefined, stored.isAdmin);
        if (!stored.isAdmin) jumpToNextStep({ silent: true });
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
    fetchCodenames();
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
