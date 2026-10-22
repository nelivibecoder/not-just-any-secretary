/*
  APP FILE
  --------
  Runs both phones: lock screen, apps, notifications, typing animations and the parts.
  You don't need to edit this to write the story. Edit story.js and story-azura.js.
*/

const PHONES = window.PHONES;
const phoneEl = document.getElementById("phone");
const screen = document.getElementById("screen");
const statusbar = document.getElementById("statusbar");
const homeBar = document.getElementById("homeBar");
const sbTime = document.getElementById("sbTime");
const island = phoneEl.querySelector(".island");

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const clone = x => (x == null ? x : JSON.parse(JSON.stringify(x)));
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* not remembered, that's fine */ } }
};
const split = r => { const i = r.indexOf(":"); return i < 0 ? [r, ""] : [r.slice(0, i), r.slice(i + 1)]; };

/* ================= Time ================= */

const DAY_NAMES = { Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday", Fri: "Friday", Sat: "Saturday", Sun: "Sunday" };
const MONTH_NAMES = { Jan: "January", Feb: "February", Mar: "March", Apr: "April", May: "May", Jun: "June", Jul: "July", Aug: "August", Sep: "September", Oct: "October", Nov: "November", Dec: "December" };

// "Thu 14 Nov, 2:31 PM" -> pieces
function when(w) {
  const [day = "", clock = ""] = String(w || "").split(",").map(s => s.trim());
  const [dow = "", dd = "", mon = ""] = day.split(" ");
  return {
    day, clock, dow, dd, mon,
    short: clock.replace(/\s?(AM|PM)$/i, ""),
    long: DAY_NAMES[dow] && MONTH_NAMES[mon] ? `${DAY_NAMES[dow]}, ${dd} ${MONTH_NAMES[mon]}` : day,
    stamp: day && clock ? `${dow} ${dd} ${mon} at ${clock}` : (day || clock)
  };
}

/* ================= Themes & icons ================= */

const PASTEL = {
  pink:  ["linear-gradient(145deg,#fbd0e0,#e88fb1)", "#e88fb1"],
  lilac: ["linear-gradient(145deg,#e3d8f8,#a98ee0)", "#a98ee0"],
  blue:  ["linear-gradient(145deg,#cfe5fc,#7fb2ec)", "#7fb2ec"],
  peach: ["linear-gradient(145deg,#fde4d2,#f2a98a)", "#f2a98a"]
};
const NIK_TILES = {
  messages: "pink", notes: "lilac", photos: "pink", calendar: "blue", jodoh: "peach",
  clock: "blue", mail: "lilac", contacts: "pink", camera: "peach", settings: "lilac",
  phone: "blue", browser: "lilac", music: "peach"
};
function tileStyle(app) {
  if (S && S.theme === "nik") {
    const [bg, accent] = PASTEL[NIK_TILES[app] || "lilac"];
    return `background:${bg};color:#fff;--accent:${accent}`;
  }
  return `background:linear-gradient(160deg,#ffffff,#e5e5ea);color:#3a3a3c;--accent:#fff`;
}

const APP_LABEL = {
  messages: "Messages", notes: "Notes", photos: "Photos", calendar: "Calendar", jodoh: "Jodoh",
  clock: "Clock", mail: "Mail", contacts: "Contacts", camera: "Camera", settings: "Settings",
  phone: "Phone", browser: "Cari", music: "Music"
};

const C = "currentColor";
// Phone handset, drawn in a 24x24 box and centred so it looks straight when rotated
const HANDSET = `<path fill="FILL" d="M6.6 3.4c.7-.6 1.7-.5 2.2.2l2 2.8c.4.6.4 1.4-.1 2l-1.3 1.3c1 2 2.7 3.7 4.7 4.7l1.3-1.3c.6-.5 1.4-.5 2-.1l2.8 2c.7.5.8 1.5.2 2.2l-1.6 1.6c-1.1 1.1-2.8 1.3-4.2.6-4.4-2.3-8-5.9-10.3-10.3-.7-1.4-.5-3.1.6-4.2z"/>`;
const ACC = "stroke:var(--accent)";
const ICONS = {
  messages: `<path d="M30 14c-10 0-18 6.3-18 14.2 0 4.6 2.7 8.7 7 11.3l-1.6 6.5 7.3-4.2c1.7.4 3.5.6 5.3.6 10 0 18-6.3 18-14.2S40 14 30 14z" fill="${C}"/>`,
  notes: `<rect x="17" y="13" width="26" height="34" rx="4" fill="${C}"/>
          <path d="M22 23h16M22 29h16M22 35h10" style="${ACC}" stroke-width="2.5" stroke-linecap="round"/>`,
  photos: `<g fill="${C}" opacity=".85">${[0, 60, 120, 180, 240, 300].map(r =>
            `<ellipse cx="30" cy="20" rx="5" ry="8" transform="rotate(${r} 30 30)"/>`).join("")}</g>`,
  calendar: () => {
    const w = when(currentWhen());
    return `<text x="30" y="24" font-size="9" font-weight="700" fill="${C}" text-anchor="middle" font-family="Arial">${esc((w.dow || "THU").toUpperCase())}</text>
            <text x="30" y="45" font-size="22" fill="${C}" text-anchor="middle" font-family="Arial">${esc(w.dd || "14")}</text>`;
  },
  jodoh: `<path d="M30 45s-14-8.5-14-18a7 7 0 0 1 14-3 7 7 0 0 1 14 3c0 9.5-14 18-14 18z" fill="${C}"/>
          <circle cx="44" cy="16" r="2.5" fill="${C}"/><circle cx="16" cy="44" r="1.8" fill="${C}"/>`,
  clock: `<circle cx="30" cy="30" r="15" fill="none" stroke="${C}" stroke-width="3"/>
          <path d="M30 21v9l6 4" stroke="${C}" stroke-width="3" stroke-linecap="round" fill="none"/>`,
  mail: `<rect x="14" y="19" width="32" height="22" rx="3" fill="${C}"/>
         <path d="M15 21l15 11 15-11" style="${ACC}" stroke-width="2.5" fill="none" stroke-linejoin="round"/>`,
  contacts: `<circle cx="30" cy="24" r="7" fill="${C}"/><path d="M17 44c1.5-7 7-10 13-10s11.5 3 13 10z" fill="${C}"/>`,
  settings: `<circle cx="30" cy="30" r="13" fill="none" stroke="${C}" stroke-width="6" stroke-dasharray="5.1 5.1"/>
             <circle cx="30" cy="30" r="10" fill="none" stroke="${C}" stroke-width="4"/>`,
  camera: `<rect x="13" y="20" width="34" height="23" rx="5" fill="${C}"/><rect x="24" y="16" width="12" height="6" rx="2" fill="${C}"/>
           <circle cx="30" cy="31.5" r="7" fill="none" style="${ACC}" stroke-width="3"/>`,
  phone: `<g transform="translate(13 13) scale(1.42)">${HANDSET.replace(/FILL/g, C)}</g>`,
  browser: `<circle cx="27" cy="27" r="10" fill="none" stroke="${C}" stroke-width="4"/>
            <path d="M34.5 34.5l8 8" stroke="${C}" stroke-width="5" stroke-linecap="round"/>`,
  music: `<path d="M25 40V20l15-4v20" stroke="${C}" stroke-width="3" fill="none" stroke-linejoin="round"/>
          <circle cx="22" cy="40" r="4" fill="${C}"/><circle cx="37" cy="36" r="4" fill="${C}"/>`
};
const glyph = app => (typeof ICONS[app] === "function" ? ICONS[app]() : ICONS[app] || "");
const appIcon = (app, cls = "bn-icon") =>
  `<span class="${cls}" style="${tileStyle(app)}"><svg viewBox="0 0 60 60" aria-hidden="true">${glyph(app)}</svg></span>`;

const SVG = {
  search: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M15.5 15.5l5 5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>`,
  torch: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 2h8v4l-2 4v11a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V10L8 6z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  cam: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="13.5" r="3.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M9 7l1.5-3h3L15 7" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>`,
  handset: `<svg viewBox="0 0 24 24" aria-hidden="true">${HANDSET.replace(/FILL/g, "#fff")}</svg>`
};

/* ================= Sounds (generated in code, no audio files) ================= */

const SOUND_KEY = "njas-sound";
let soundOn = store.get(SOUND_KEY) !== "off";
let actx = null;

// Browsers only allow sound after the reader taps something, so the audio starts on the first tap
function audio() {
  if (!soundOn) return null;
  try {
    if (!actx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      actx = new AC();
    }
    if (actx.state === "suspended") actx.resume();
    return actx;
  } catch (e) { return null; }
}

function tone(freq, dur, type = "sine", vol = 0.05, delay = 0, slideTo = 0) {
  const a = audio();
  if (!a) return;
  const t = a.currentTime + delay;
  const o = a.createOscillator(), g = a.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(a.destination);
  o.start(t);
  o.stop(t + dur + 0.03);
}

function noise(dur, vol = 0.06, freq = 3000) {
  const a = audio();
  if (!a) return;
  const n = Math.floor(a.sampleRate * dur);
  const buf = a.createBuffer(1, n, a.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
  const src = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain();
  src.buffer = buf;
  f.type = "bandpass"; f.frequency.value = freq;
  g.gain.value = vol;
  src.connect(f).connect(g).connect(a.destination);
  src.start();
}

const SFX = {
  key: (() => {
    let last = 0;
    return () => {
      const now = performance.now();
      if (now - last < 120) return; // at most ~8 clicks a second
      last = now;
      noise(0.012, 0.025, 1100 + Math.random() * 300);
    };
  })(),
  send: () => tone(520, 0.18, "sine", 0.05, 0, 1500),
  receive: () => { tone(880, 0.1, "sine", 0.04); tone(1320, 0.14, "sine", 0.035, 0.06); },
  notify: () => { tone(1046, 0.18, "triangle", 0.05); tone(1568, 0.28, "triangle", 0.045, 0.13); },
  shutter: () => noise(0.09, 0.18, 1700),
  ring: () => { for (let i = 0; i < 2; i++) { tone(440, 0.35, "sine", 0.035, i * 0.45); tone(480, 0.35, "sine", 0.035, i * 0.45); } }
};

/* ================= Phone chrome (added once) ================= */

phoneEl.querySelector(".signal").insertAdjacentHTML("afterend",
  `<svg class="wifi" viewBox="0 0 18 13" aria-hidden="true"><path d="M1.5 4.6a11 11 0 0 1 15 0M4.2 7.4a7 7 0 0 1 9.6 0M6.9 10.1a3 3 0 0 1 4.2 0" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>`);
phoneEl.insertAdjacentHTML("beforeend", `
  <div class="banner" id="banner" data-go="open-pending" role="button" aria-label="Open notification"></div>
  <div class="finish-wrap" id="finishWrap"></div>
  <button class="skip" id="skipBtn" data-go="skip" hidden>Skip ›</button>
  <div class="kb" id="kb" aria-hidden="true"></div>
  <div class="edge edge-left" id="edgeL"></div>
  <div class="edge edge-bottom" id="edgeB" data-go="edge-home" aria-label="Home"></div>
  <div class="overlay" id="overlay"></div>`);
const banner = document.getElementById("banner");
const finishWrap = document.getElementById("finishWrap");
const skipBtn = document.getElementById("skipBtn");
const kb = document.getElementById("kb");
const overlay = document.getElementById("overlay");

const keyRow = keys => `<div class="kb-row">${[...keys].map(k => `<span class="key-k" data-kb="${k}">${k}</span>`).join("")}</div>`;
kb.innerHTML = keyRow("qwertyuiop") + keyRow("asdfghjkl") +
  `<div class="kb-row"><span class="key-k wide" data-kb="shift">⇧</span>${[..."zxcvbnm"].map(k => `<span class="key-k" data-kb="${k}">${k}</span>`).join("")}<span class="key-k wide" data-kb="back">⌫</span></div>
   <div class="kb-row"><span class="key-k wide" data-kb="num">123</span><span class="key-k space" data-kb=" ">space</span><span class="key-k wide" data-kb="return">return</span></div>`;

/* ================= Story order & progress ================= */

// Collect the parts from both phones and put them in number order
const ORDER = [];
Object.keys(PHONES).forEach(id => {
  let cur = null;
  (PHONES[id].beats || []).forEach(b => {
    if (b.part) { cur = { num: b.part, title: b.title || "", phone: id, beats: [] }; ORDER.push(cur); return; }
    if (!cur) return;
    b._id = `${id}-p${cur.num}-${cur.beats.length}`;
    cur.beats.push(b);
  });
});
ORDER.sort((a, b) => a.num - b.num);

const SAVE = "njas-progress-v2";
const HELP = "njas-help-seen";
let progress = { done: 0, cursor: 0 };
try {
  const p = JSON.parse(store.get(SAVE) || "{}");
  progress.done = Math.min(+p.done || 0, ORDER.length);
  progress.cursor = +p.cursor || 0;
} catch (e) { /* start fresh */ }
const save = () => store.set(SAVE, JSON.stringify(progress));

let S = null;            // phone data (story file)
let V = null;            // what the phone shows right now
let viewing = 0;         // part index being read, or "all"
let cursor = 0;          // beats finished in that part
let pending = null;      // next beat, waiting for the reader to open it
let play = null;         // beat currently animating
let route = "lock";
let unlocked = false;
let typed = "";
let nextTimer = null, bannerTimer = null;

const currentWhen = () => (pending ? pending.beat.when : (V && V.lastWhen) || "");
const curDay = () => when(currentWhen()).dow;

/* ---------- Build what the phone shows ---------- */

function buildView(id, upto, cur) {
  const P = PHONES[id];
  const keyed = (arr, pre) => (arr || []).map((x, i) => ({ ...clone(x), _k: pre + i }));
  const v = {
    threads: (P.threads || []).map((t, i) => ({ ...clone(t), messages: clone(t.history) || [], order: -i })),
    notes: keyed(P.notes, "bn"), photos: keyed(P.photos, "bp"), mail: keyed(P.mail, "bm"),
    searches: keyed(P.searches, "bs"), calls: keyed(P.calls, "bc"),
    alarms: clone(P.alarms) || [],
    contacts: clone(P.contacts) || [],
    installed: [],
    lastWhen: "", seq: 0
  };
  ORDER.forEach((part, pi) => {
    if (part.phone !== id) return;
    const n = pi < upto ? part.beats.length : pi === upto ? cur : 0;
    part.beats.slice(0, n).forEach(b => applyBeat(v, b, false));
  });
  return v;
}

function applyBeat(v, b, fresh) {
  const w = when(b.when);
  const nw = fresh ? { _new: true } : {};
  if (b.when) v.lastWhen = b.when;
  v.seq++;
  if (b.chat) {
    const t = v.threads.find(x => x.id === b.chat);
    if (!t) return;
    if (b.when) t.messages.push({ time: w.stamp, ...nw });
    (b.messages || []).forEach(m => t.messages.push({ ...clone(m), ...nw }));
    t.order = v.seq; t.lastClock = w.clock; t.lastDay = w.day; t.lastDate = `${w.dd} ${w.mon}`;
  }
  if (b.note) v.notes[b.note.revisit ? "push" : "unshift"]({ ...clone(b.note), _k: b._id, ...nw });
  if (b.mail) v.mail.unshift({ ...clone(b.mail), date: b.mail.date || `${w.dow} ${w.dd} ${w.mon}`, _k: b._id, ...nw });
  if (b.search) v.searches.unshift({ ...clone(b.search), time: w.stamp, _k: b._id, ...nw });
  if (b.photo) v.photos.push({ ...clone(b.photo), date: b.photo.date || w.stamp, _k: b._id, ...nw });
  if (b.photos) b.photos.forEach((p, i) => v.photos.push({ ...clone(p), date: p.date || w.stamp, _k: `${b._id}-${i}`, ...nw }));
  if (b.call) v.calls.unshift({ ...clone(b.call), time: `${w.dow} ${w.clock}`, _k: b._id, ...nw });
  if (b.install && !v.installed.includes(b.install)) v.installed.push(b.install);
  if (b.rename) {
    const t = v.threads.find(x => x.id === b.rename.thread);
    if (!t) return;
    const old = t.name;
    t.name = b.rename.name;
    v.contacts.forEach(c => { if (c.name === old) c.name = b.rename.name; });
  }
}

function clearNew() {
  if (!V) return;
  const strip = arr => arr.forEach(x => delete x._new);
  V.threads.forEach(t => strip(t.messages));
  [V.notes, V.photos, V.mail, V.searches, V.calls].forEach(strip);
}

/* ---------- Describe a beat: which app, what the notification says ---------- */

function describe(b) {
  const owner = S.ownerName || "She";
  const o = { beat: b, autoApp: false, incoming: false };
  if (b.chat) {
    const t = (V && V.threads.find(x => x.id === b.chat)) || (S.threads || []).find(x => x.id === b.chat) || { name: b.chat };
    const jod = t.app === "jodoh";
    const first = (b.messages || []).find(m => m.from || m.unsent);
    const incoming = !!(first && first.from && first.from !== "me");
    const who = t.group && incoming && first.from !== "them" ? first.from + ": " : "";
    // The messages that arrived before anyone replies (these are already delivered)
    const burst = [];
    for (const m of b.messages || []) {
      if (m.from === "me" || m.unsent) break;
      if (m.from) burst.push(m);
    }
    const lastB = burst[burst.length - 1];
    const lastWho = lastB && t.group && lastB.from !== "them" ? lastB.from + ": " : "";
    o.count = incoming ? burst.length : 0;
    o.lastText = lastB ? lastWho + (lastB.text || "🎤 Voice message") : "";
    Object.assign(o, {
      type: "chat", app: jod ? "jodoh" : "messages", route: (jod ? "match:" : "chat:") + b.chat, incoming,
      title: t.name, text: incoming ? who + (first.text || "🎤 Voice message") : `${owner} is typing…`
    });
  } else if (b.note) {
    Object.assign(o, { type: "note", app: "notes", route: "note:" + b._id, autoApp: true, title: b.note.title,
      text: b.note.revisit ? `${owner} scrolls back to an old note` : `${owner} is writing a note` });
  } else if (b.mail) {
    const f = b.mail.folder || "Inbox";
    Object.assign(o, { type: "mail", app: "mail", route: "mail:" + b._id, incoming: f === "Inbox", autoApp: f !== "Inbox",
      title: f === "Inbox" ? b.mail.from : b.mail.subject,
      text: f === "Inbox" ? b.mail.subject : f === "Drafts" ? `${owner} starts a reply` : `${owner} is writing to ${b.mail.to}` });
  } else if (b.search) {
    Object.assign(o, { type: "search", app: "browser", route: "search:" + b._id, autoApp: true, title: "Cari", text: `${owner} searches something` });
  } else if (b.photo) {
    const cam = !!b.photo.camera;
    Object.assign(o, { type: "photo", app: cam ? "camera" : "photos", route: "photo:" + b._id, autoApp: true, title: cam ? "Camera" : "Photos",
      text: cam ? `${owner} takes a photo` : `${owner} scrolls back to an old photo` });
  } else if (b.photos) {
    const hid = b.photos.some(p => p.hidden);
    Object.assign(o, { type: "album", app: "photos", route: hid ? "hidden" : "app:photos", autoApp: true, title: "Photos",
      text: hid ? `${owner} opens the Hidden album` : `${owner} opens Photos` });
  } else if (b.call) {
    Object.assign(o, { type: "call", app: "phone", route: "call:" + b._id, incoming: b.call.type !== "out", title: b.call.name,
      text: b.call.type === "out" ? `${owner} is calling` : "Incoming call" });
  } else if (b.install) {
    Object.assign(o, { type: "install", app: b.install, route: "app:" + b.install, autoApp: true,
      title: APP_LABEL[b.install] || b.install, text: `${owner} downloads ${APP_LABEL[b.install] || "an app"}` });
  } else if (b.rename) {
    const t = (V && V.threads.find(x => x.id === b.rename.thread)) || {};
    Object.assign(o, { type: "rename", app: "contacts", route: "rename:" + b._id, autoApp: true, title: t.name || "Contacts",
      oldName: t.name || "", text: `${owner} edits a contact` });
  }
  if (b.banner) Object.assign(o, b.banner);
  return o;
}

/* ================= Screen helpers ================= */

function show(html, cls, darkBar) {
  if (!play) hideKeyboard();
  screen.className = "screen fade-in " + cls;
  screen.innerHTML = html;
  screen.scrollTop = 0;
  statusbar.classList.toggle("dark", !!darkBar);
  homeBar.classList.toggle("dark", !!darkBar);
}

function page(title, body, back = "home", backLabel = "Home", extraCls = "") {
  show(`
    <div class="nav"><button class="back" data-go="${back}">‹ ${esc(backLabel)}</button></div>
    ${title ? `<div class="big-title">${esc(title)}</div>` : ""}
    <div class="scroll">${body}</div>
  `, "app " + extraCls, true);
}

// Shows a photo when one is given (photo: "avatars/name.jpg"), otherwise a coloured circle with a letter
const avatar = (initial, color, size = "", photo = "") => photo
  ? `<div class="avatar ${size}" style="background:${color || "#8e8e93"} url('${esc(photo)}') center/cover no-repeat"></div>`
  : `<div class="avatar ${size}" style="background:${color || "#8e8e93"}">${esc(initial)}</div>`;
const empty = text => `<div class="empty">${esc(text)}</div>`;
const fresh = arr => (arr || []).filter(x => !x._new);
const byKey = (arr, k) => (arr || []).find(x => x._k === k);

function setClock(w) { const s = when(w).short; if (s) sbTime.textContent = s; }

/* ================= Lock & passcode ================= */

function loadPhone(id) {
  S = PHONES[id];
  phoneEl.className = "phone theme-" + S.theme;
  unlocked = false;
  hideBanner();
  lockScreen();
}

function lockScreen() {
  route = "lock";
  const w = when(currentWhen());
  if (w.short) sbTime.textContent = w.short;
  const part = viewing === "all" ? null : ORDER[viewing];
  const label = part ? `Part ${part.num} · ${part.title}` : "Full story";
  const n = pending ? `
    <div class="lock-notif">${appIcon(pending.app)}
      <div class="ln-main"><div class="ln-top"><b>${esc(pending.title)}</b><span>now</span></div>
      <div class="ln-text">${esc(pending.text)}</div>
      ${pending.count > 1 ? `<div class="bn-more">+${pending.count - 1} more</div>` : ""}</div>
    </div>` : "";
  show(`
    <div class="lock-label">${esc(S.ownerLabel)} · ${esc(label)}</div>
    <div class="lock-date">${esc(w.long)}</div>
    <div class="lock-time">${esc(w.short)}</div>
    <div class="lock-notifs">${n}</div>
    <div class="lock-bottom">
      <span class="lock-round">${SVG.torch}</span>
      <span class="lock-swipe">Swipe up or tap to open</span>
      <span class="lock-round">${SVG.cam}</span>
    </div>`, "lock");
  if (!store.get(HELP)) showHelp();
}

function passcode() {
  route = "passcode";
  typed = "";
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", ""];
  show(`
    <div class="lock-prompt">Enter Passcode</div>
    <div class="lock-hint">${esc(S.ownerLabel)} · Passcode: ${esc(S.passcode)}${S.passcodeNote ? ` (${esc(S.passcodeNote)})` : ""}</div>
    <div class="dots" id="dots">${"<span></span>".repeat(S.passcode.length)}</div>
    <div class="keypad">
      ${keys.map(k => k ? `<button class="key" data-key="${k}">${k}</button>` : `<span class="key blank"></span>`).join("")}
    </div>
    <div class="lock-actions">
      <button data-go="parts">Parts</button>
      <button data-go="delete">Delete</button>
    </div>`, "lock passcode");
}

function updateDots() {
  document.querySelectorAll("#dots span").forEach((d, i) => d.classList.toggle("on", i < typed.length));
}

function pressKey(k) {
  if (typed.length >= S.passcode.length) return;
  typed += k;
  updateDots();
  if (typed.length < S.passcode.length) return;
  if (typed === S.passcode) {
    unlocked = true;
    setTimeout(() => {
      go("home");
      if (!pending) return;
      if (pending.type === "call") setTimeout(() => pending && pending.type === "call" && go(pending.route), 700);
      else setTimeout(showBanner, 500);
    }, 180);
  } else {
    document.getElementById("dots").classList.add("shake");
    setTimeout(passcode, 450);
  }
}

/* ================= Help card ================= */

function showHelp() {
  overlay.innerHTML = `
    <div class="help-card">
      <div class="help-title">How to read</div>
      <ul>
        <li>The story happens on their phones. Unlock with the passcode shown.</li>
        <li>Tap each notification to see what happens next.</li>
        <li>Tap <b>Skip</b> (top right) if you want to jump ahead.</li>
        <li>Swipe up from the bottom, or tap the bar, to go home.</li>
        <li>The <b>Parts</b> button on the passcode screen lets you re-read a part, or turn the sound off.</li>
      </ul>
      <button class="end-btn" data-go="help-ok">Got it</button>
    </div>`;
  overlay.classList.add("show");
}
function hideOverlay() { overlay.classList.remove("show"); overlay.innerHTML = ""; }

/* ================= Notifications ================= */

function announce() {
  if (viewing === "all") return;
  const part = ORDER[viewing];
  const b = part && part.beats[cursor];
  if (!b) return;
  pending = describe(b);
  setClock(b.when);
  if (!unlocked) { if (route === "lock") { lockScreen(); SFX.notify(); } return; }
  if (pending.type === "call") return go(pending.route);
  if (route === pending.route) return startBeat();
  if (["home", "app:messages", "app:jodoh", "app:mail"].includes(route)) renderRoute();
  showBanner();
}

function showBanner() {
  const p = pending;
  if (!p || !unlocked) return;
  banner.innerHTML = `${appIcon(p.app)}
    <div class="bn-main">
      <div class="bn-top"><span>${esc(APP_LABEL[p.app] || "")}</span><span>now</span></div>
      <div class="bn-title">${esc(p.title)}</div>
      <div class="bn-text">${esc(p.text)}</div>
      ${p.count > 1 ? `<div class="bn-more">+${p.count - 1} more</div>` : ""}
    </div>`;
  banner.className = "banner show" + (p.incoming ? "" : " self");
  SFX.notify();
  island.classList.remove("live"); island.innerHTML = ""; delete island.dataset.go;
  clearTimeout(bannerTimer);
  bannerTimer = setTimeout(() => {
    if (pending !== p) return;
    banner.className = "banner";
    island.innerHTML = `${appIcon(p.app, "il-icon")}<span class="il-text">${esc(p.title)}</span><span class="il-dot"></span>`;
    island.dataset.go = "open-pending";
    island.classList.add("live");
  }, 7000);
}

function hideBanner() {
  clearTimeout(bannerTimer);
  banner.className = "banner";
  island.classList.remove("live");
  island.innerHTML = "";
  delete island.dataset.go;
}

/* ================= Playing a beat ================= */

function wait(ms) {
  const p = play;
  return new Promise(res => {
    if (!p || p.fast || p.done) return res();
    p.timers.push(setTimeout(res, ms));
    p.waiters.push(res);
  });
}

function fastForward() {
  const p = play;
  if (!p) return;
  p.fast = true;
  p.timers.forEach(clearTimeout);
  p.waiters.forEach(r => r());
  p.timers = []; p.waiters = [];
}

function startBeat() {
  const p = pending;
  if (!p) return;
  pending = null;
  hideBanner();
  const b = p.beat;
  const ref = play = { beat: b, done: false, fast: false, timers: [], waiters: [] };
  setClock(b.when);
  applyBeat(V, b, true);
  // Incoming messages that triggered the notification are already in the chat; give time to read them
  ref.readWait = 0;
  if (p.type === "chat" && p.incoming) {
    const t = V.threads.find(x => x.id === b.chat);
    let chars = 0;
    for (const m of t ? t.messages : []) {
      if (!m._new) continue;
      if (m.from === "me" || m.unsent) break;
      delete m._new;
      chars += (m.text || "").length + (m.voice ? 20 : 0);
    }
    ref.readWait = Math.min(1200 + chars * 25, 6000);
  }
  route = p.route;
  skipBtn.hidden = false;
  PLAYERS[p.type](b, ref, p).then(() => finishPlay(ref), () => finishPlay(ref));
}

function finishPlay(ref = play) {
  if (!ref || ref.done) return;
  fastForward();
  ref.done = true;
  if (play === ref) play = null;
  skipBtn.hidden = true;
  clearNew();
  hideKeyboard();
  screen.querySelectorAll(".is-new").forEach(n => n.classList.remove("is-new"));
  screen.querySelectorAll(".typing-row").forEach(n => n.remove());
  clearInput();
  cursor++;
  if (viewing === progress.done) { progress.cursor = cursor; save(); }
  clearTimeout(nextTimer);
  const part = ORDER[viewing];
  if (!part) return;
  nextTimer = setTimeout(cursor < part.beats.length ? announce : showFinish, cursor < part.beats.length ? 2500 : 2000);
}

/* ---------- Keyboard & input ---------- */

function showKeyboard() {
  kb.classList.add("show");
  phoneEl.style.setProperty("--kbh", kb.offsetHeight + "px");
  screen.classList.add("kb-open");
}
function hideKeyboard() {
  kb.classList.remove("show");
  screen.classList.remove("kb-open");
}
function hitKey(ch) {
  const k = kb.querySelector(`[data-kb="${CSS.escape(String(ch).toLowerCase())}"]`);
  if (!k) return;
  SFX.key();
  k.classList.add("hit");
  setTimeout(() => k.classList.remove("hit"), 110);
}
function inputEl() { return screen.querySelector(".input-text"); }
function clearInput() {
  const el = inputEl();
  if (el) el.textContent = "";
  const bar = screen.querySelector(".input-bar");
  if (bar) bar.classList.remove("has-text");
}
async function typeInput(text, ref) {
  showKeyboard();
  const el = inputEl();
  const bar = screen.querySelector(".input-bar");
  if (!el) return;
  for (const ch of text) {
    if (ref.done) return;
    el.textContent += ch;
    bar.classList.add("has-text");
    hitKey(ch);
    await wait(55);
  }
}
async function eraseInput(ref) {
  const el = inputEl();
  if (!el) return;
  while (el.textContent.length) {
    if (ref.done) return;
    el.textContent = el.textContent.slice(0, -1);
    await wait(30);
  }
  clearInput();
}
function scrollThread() { const t = document.getElementById("thread"); if (t) t.scrollTop = t.scrollHeight; }

/* ---------- Players: one per kind of beat ---------- */

const PLAYERS = {
  async chat(b, ref) {
    renderRoute();
    await wait(ref.readWait || 900);
    for (const n of [...screen.querySelectorAll(".m.is-new")]) {
      if (ref.done) return;
      const k = n.dataset.kind;
      const text = n.dataset.text || "";
      if (k === "them" || k === "voice") {
        const dots = document.createElement("div");
        dots.className = "m them typing-row";
        dots.innerHTML = `<div class="bubble them typing"><i></i><i></i><i></i></div>`;
        n.before(dots);
        scrollThread();
        await wait(k === "voice" ? 2400 : Math.min(1100 + text.length * 35, 3200));
        dots.remove();
      } else if (k === "me" || k === "unsent") {
        await typeInput(text, ref);
        if (ref.done) return;
        if (k === "unsent") { await wait(1200); await eraseInput(ref); }
        else { await wait(400); clearInput(); }
      }
      if (ref.done) return;
      n.classList.remove("is-new");
      n.classList.add("pop");
      if (k === "me") SFX.send();
      if (k === "them" || k === "voice") SFX.receive();
      scrollThread();
      await wait(["time", "event", "status"].includes(k) ? 500 : 950);
    }
    hideKeyboard();
  },

  async note(b, ref) {
    renderRoute();
    if (b.note.revisit) { await wait(1800); return; }
    const box = screen.querySelector(".note-text");
    if (!box) return;
    const full = b.note.body;
    box.textContent = "";
    showKeyboard();
    for (let i = 0; i < full.length; i += 2) {
      if (ref.done) return;
      box.textContent = full.slice(0, i + 2);
      hitKey(full[i] || " ");
      await wait(35);
    }
    box.textContent = full;
    await wait(300);
    hideKeyboard();
  },

  async mail(b, ref) {
    renderRoute();
    const f = b.mail.folder || "Inbox";
    if (f === "Inbox") { await wait(1200); return; }
    const st = screen.querySelector(".mail-state");
    if (st) st.textContent = f === "Sent" ? "Sending…" : "Saving draft…";
    await wait(1800);
    if (ref.done) return;
    if (st) st.textContent = f === "Sent" ? "Sent ✓" : "Draft saved, not sent";
    await wait(900);
  },

  async search(b, ref) {
    cariHome(true);
    const bar = screen.querySelector(".cari-input");
    showKeyboard();
    for (const ch of b.search.query) {
      if (ref.done) return;
      bar.textContent += ch;
      hitKey(ch);
      await wait(85);
    }
    await wait(700);
    if (ref.done) return;
    hideKeyboard();
    const load = screen.querySelector(".cari-loading");
    if (load) load.classList.add("go");
    await wait(1100);
    if (ref.done) return;
    route = "search:" + b._id;
    renderRoute();
    await wait(300);
  },

  async photo(b, ref) {
    if (b.photo.camera) {
      camera();
      await wait(1500);
      if (ref.done) return;
      shutter();
      await wait(1000);
      if (ref.done) return;
    }
    route = "photo:" + b._id;
    renderRoute();
    await wait(1200);
  },

  async album(b, ref) {
    renderRoute();
    for (const n of [...screen.querySelectorAll(".photo.is-new")]) {
      await wait(900);
      if (ref.done) return;
      n.classList.remove("is-new");
      n.classList.add("pop");
    }
    await wait(400);
  },

  async rename(b, ref, p) {
    const t = V.threads.find(x => x.id === b.rename.thread) || {};
    show(`
      <div class="nav"><button class="back" data-go="app:contacts">Cancel</button><span class="edit-done">Done</span></div>
      <div class="contact-card">
        ${avatar(t.initial, t.color, "lg", t.photo)}
        <div class="edit-field"><span class="input-text">${esc(p.oldName)}</span><span class="caret"></span></div>
        <div class="muted">Edit contact name</div>
      </div>`, "app grouped contact-edit", true);
    await wait(1200);
    const el = screen.querySelector(".input-text");
    if (!el) return;
    showKeyboard();
    while (el.textContent.length) {
      if (ref.done) return;
      el.textContent = [...el.textContent].slice(0, -1).join("");
      await wait(70);
    }
    await wait(600);
    for (const ch of b.rename.name) {
      if (ref.done) return;
      el.textContent += ch;
      hitKey(ch);
      await wait(120);
    }
    await wait(700);
    hideKeyboard();
    screen.querySelector(".edit-done")?.classList.add("on");
    await wait(900);
    if (ref.done) return;
    route = "app:contacts";
    renderRoute();
    await wait(800);
  },

  async install(b, ref) {
    route = "home";
    home();
    const icon = screen.querySelector(`[data-go="app:${b.install}"] .tile`);
    if (icon) { icon.classList.add("installing"); }
    await wait(2200);
    if (ref.done) return;
    if (icon) icon.classList.remove("installing");
    await wait(800);
    if (ref.done) return;
    route = "app:" + b.install;
    renderRoute();
    await wait(1500);
  },

  async call(b, ref) {
    callScreen(b.call);
    for (let i = 0; i < 3; i++) {
      if (ref.done) return;
      SFX.ring();
      await wait(1500);
    }
    if (ref.done) return;
    const sub = screen.querySelector(".call-sub");
    if (sub) sub.textContent = b.call.type === "out" ? "No answer" : `Missed call${b.call.count > 1 ? ` (${b.call.count})` : ""}`;
    screen.querySelector(".call")?.classList.remove("ringing");
    await wait(1800);
    if (ref.done) return;
    route = "app:phone";
    renderRoute();
    await wait(400);
  }
};

/* ================= Parts ================= */

function openPart(i) {
  resetStory();
  viewing = i;
  const part = ORDER[i];
  cursor = i === progress.done ? Math.min(progress.cursor, part.beats.length) : 0;
  V = buildView(part.phone, i, cursor);
  loadPhone(part.phone);
  if (cursor < part.beats.length) announce();
  else nextTimer = setTimeout(showFinish, 400);
}

function openFull(id) {
  resetStory();
  viewing = "all";
  V = buildView(id, Infinity, 0);
  loadPhone(id);
}

function resetStory() {
  clearTimeout(nextTimer);
  if (play) { fastForward(); play.done = true; play = null; }
  skipBtn.hidden = true;
  pending = null;
  hideBanner(); hideFinish(); hideKeyboard();
}

function showFinish() {
  if (viewing === "all") return;
  finishWrap.innerHTML = `<button class="finish" data-go="finish">Finish Part ${ORDER[viewing].num} ›</button>`;
}
function hideFinish() { finishWrap.innerHTML = ""; }

function partsMenu() {
  route = "parts";
  const rows = ORDER.map((p, i) => {
    let status, link = "";
    if (i < progress.done) { status = "Read ✓"; link = `data-go="part:${i}"`; }
    else if (i === progress.done) { status = progress.cursor ? "Continue ›" : "Start ›"; link = `data-go="part:${i}"`; }
    else status = "🔒 Locked";
    return `<button class="part-row ${link ? "" : "locked"}" ${link}>
      <span><b>Part ${p.num}</b> · ${esc(p.title)}<br><small>${esc(PHONES[p.phone].ownerLabel)}</small></span>
      <span class="part-status">${status}</span></button>`;
  }).join("");
  const full = progress.done >= ORDER.length
    ? Object.keys(PHONES).map(id => `<button class="part-row" data-go="full:${id}">
        <span><b>Full story</b><br><small>${esc(PHONES[id].ownerLabel)}, everything</small></span><span class="part-status">Open ›</span></button>`).join("")
    : `<div class="part-row locked"><span><b>Full story</b><br><small>Both phones, every part</small></span><span class="part-status">🔒 Finish all parts</span></div>`;
  show(`
    <div class="parts-head">
      <button class="back light" data-go="lock">‹ Back</button>
      <div class="parts-title">Parts</div>
    </div>
    <div class="parts-list">${rows}${full}</div>
    <div class="parts-foot">
      <button class="link-btn" data-go="help">How to read</button>
      <button class="link-btn" data-go="sound">Sound: ${soundOn ? "On" : "Off"}</button>
      ${progress.done || progress.cursor ? `<button class="link-btn" data-go="reset">Start over</button>` : ""}
    </div>`, "parts");
}

function endCard() {
  hideFinish();
  route = "end";
  const next = ORDER[viewing + 1];
  show(`
    <div class="end-card">
      <div class="end-label">End of Part ${ORDER[viewing].num}</div>
      <div class="end-title">${esc(ORDER[viewing].title)}</div>
      ${next
        ? `<p>Next: <b>Part ${next.num}</b> · ${esc(next.title)}<br>on ${esc(PHONES[next.phone].ownerLabel)}</p>
           <button class="end-btn" data-go="nextpart">Continue</button>`
        : `<p>The end. Both phones are now fully open, so you can look through everything. Use <b>Parts</b> on the passcode screen to switch phones.</p>
           <button class="end-btn" data-go="nextpart">Open the full story</button>`}
    </div>`, "end");
}

function nextPart() {
  if (viewing === "all") return openFull(Object.keys(PHONES)[0]);
  if (viewing + 1 > progress.done) { progress.done = viewing + 1; progress.cursor = 0; save(); }
  if (viewing + 1 < ORDER.length) openPart(viewing + 1);
  else openFull(Object.keys(PHONES)[0]);
}

/* ================= Apps ================= */

function home() {
  const badge = app => (pending && pending.incoming && pending.app === app ? (pending.count || 1) : 0);
  const icon = app => `
    <button class="app-icon" data-go="app:${app}">
      <span class="tile" style="${tileStyle(app)}">
        <svg viewBox="0 0 60 60" aria-hidden="true">${glyph(app)}</svg>
        ${badge(app) ? `<span class="badge">${badge(app)}</span>` : ""}
      </span>
      <span class="label">${APP_LABEL[app]}</span>
    </button>`;
  show(`
    <div class="grid">${[...S.apps.grid, ...(V.installed || []).filter(a => !S.apps.grid.includes(a) && !S.apps.dock.includes(a))].map(icon).join("")}</div>
    <div class="dock">${S.apps.dock.map(icon).join("")}</div>
  `, "home");
}

/* ---------- Messages & Jodoh chats ---------- */

function threadList(jodoh) {
  const pend = pending && pending.type === "chat" && pending.incoming ? pending.beat.chat : null;
  return V.threads
    .filter(t => (t.app === "jodoh") === jodoh)
    .filter(t => t.messages.some(m => !m._new && (m.text || m.voice)) || t.id === pend)
    .sort((a, b) => (b.id === pend) - (a.id === pend) || b.order - a.order);
}

function previewOf(t) {
  if (pending && pending.type === "chat" && pending.incoming && pending.beat.chat === t.id)
    return { text: pending.lastText || pending.text, time: "now", unread: true };
  const last = [...t.messages].reverse().find(m => !m._new && (m.text || m.voice));
  let text = last ? (last.text || "🎤 Voice message") : "";
  if (last && t.group && last.from && !["me", "them"].includes(last.from)) text = `${last.from}: ${text}`;
  if (last && last.from === "me") text = `You: ${text}`;
  const time = t.lastDay && t.lastDay !== when(currentWhen()).day ? t.lastDate : (t.lastClock || "");
  return { text, time, unread: false };
}

function messages() {
  const list = threadList(false);
  page("Messages", list.length ? list.map(t => {
    const p = previewOf(t);
    return `
    <div class="row" data-go="chat:${t.id}">
      ${p.unread ? `<span class="unread-dot"></span>` : `<span class="unread-space"></span>`}
      ${avatar(t.initial, t.color, "", t.photo)}
      <div class="row-main">
        <div class="row-top"><span class="row-name">${esc(t.name)}</span><span class="row-time">${esc(p.time)}</span></div>
        <div class="row-preview">${esc(p.text)}</div>
      </div>
    </div>`;
  }).join("") : empty("No Messages"));
}

function msgHTML(m, prev, t) {
  const nw = m._new ? " is-new" : "";
  if (m.time) return `<div class="m center${nw}" data-kind="time"><div class="stamp">${esc(m.time)}</div></div>`;
  if (m.event) return `<div class="m center${nw}" data-kind="event"><div class="stamp">${esc(m.event)}</div></div>`;
  if (m.status) return `<div class="m me${nw}" data-kind="status"><div class="status">${esc(m.status)}</div></div>`;
  if (m.unsent) return `<div class="m me${nw}" data-kind="unsent" data-text="${esc(m.unsent)}">
      <div class="bubble me draft">${esc(m.unsent)}</div><div class="status">Typed, then deleted</div></div>`;
  const mine = m.from === "me";
  const named = !mine && m.from && m.from !== "them";
  const side = mine ? "me" : "them";
  const mem = (t.members || {})[m.from];
  const memColor = typeof mem === "object" ? mem.color : mem;
  const memPhoto = typeof mem === "object" ? mem.photo : "";
  const label = named && t.group && (!prev || prev.from !== m.from)
    ? `<div class="sender" style="color:${memColor || "#8e8e93"}">${avatar(m.from[0], memColor, "xs", memPhoto)}${esc(m.from)}</div>` : "";
  if (m.voice) return `<div class="m ${side}${nw}" data-kind="${mine ? "me" : "voice"}" data-text="">${label}
      <div class="bubble ${side} voice"><span class="play">▶</span><span class="wave"></span>${esc(m.voice)}</div></div>`;
  return `<div class="m ${side}${nw}" data-kind="${mine ? "me" : "them"}" data-text="${esc(m.text)}">${label}
      <div class="bubble ${side}">${esc(m.text)}</div></div>`;
}

function chatView(id, back) {
  const t = V.threads.find(x => x.id === id);
  if (!t) return go(back);
  let prev = null;
  const html = t.messages.map(m => {
    const h = msgHTML(m, prev, t);
    prev = m.from ? m : (m.time || m.event ? null : prev);
    return h;
  }).join("");
  const count = t.group ? ` · ${Object.keys(t.members || {}).length + 1} people` : "";
  show(`
    <div class="chat-head">
      <button class="back" data-go="${back}">‹</button>
      ${avatar(t.initial, t.color, "sm", t.photo)}
      <div class="who">${esc(t.name)}<span class="muted">${esc(count)}</span></div>
    </div>
    <div class="scroll" id="thread"><div class="thread">${html}</div></div>
    <div class="input-bar">
      <div class="input-field"><span class="input-text"></span><span class="input-ph">${back === "app:jodoh" ? "Message" : "iMessage"}</span></div>
      <span class="send">↑</span>
    </div>`, "app chat", true);
  scrollThread();
}

/* ---------- Notes ---------- */

function notes() {
  const list = fresh(V.notes);
  page("Notes", list.length ? `
    <div class="card-list">
      ${list.map(n => `
        <div class="card-row" data-go="note:${n._k}">
          <div class="row-name">${esc(n.title)}</div>
          <div class="row-preview">${esc(n.date)}  ${esc(n.body.split("\n")[0])}</div>
        </div>`).join("")}
    </div>` : empty("No Notes"), "home", "Home", "grouped");
}

function noteView(k) {
  const n = byKey(V.notes, k);
  if (!n) return go("app:notes");
  page("", `<div class="note-date">${esc(n.date)}</div>
    <div class="note-body"><h1>${esc(n.title)}</h1><div class="note-text">${esc(n.body)}</div></div>`,
    "app:notes", "Notes");
}

/* ---------- Photos ---------- */

const PHOTO_COLORS = ["#f4a7c3", "#c8b6ef", "#9fc9f5", "#f9d3b4", "#b8e0d2", "#e8c8e8"];
const photoBg = (p, i) => p.src ? `background-image:url('${esc(p.src)}')` : `background:${p.color || PHOTO_COLORS[i % PHOTO_COLORS.length]}`;
const photoTile = (p, i) =>
  `<button class="photo${p._new ? " is-new" : ""}" style="${photoBg(p, i)}" data-go="photo:${p._k}">${p.src ? "" : `<span>${esc(p.emoji || "")}</span>`}</button>`;

function photos() {
  const shown = fresh(V.photos).filter(p => !p.hidden);
  const hidden = fresh(V.photos).filter(p => p.hidden);
  page("Photos", `
    ${shown.length ? `<div class="photo-grid">${shown.map(photoTile).join("")}</div>` : empty("No Photos")}
    ${hidden.length ? `
      <div class="section-label">Albums</div>
      <div class="card-list"><div class="card-row flex" data-go="hidden">
        <span>🔒 Hidden</span><span class="muted">${hidden.length} ›</span>
      </div></div>` : ""}
  `, "home", "Home", "grouped");
}

function hiddenAlbum() {
  const hidden = V.photos.filter(p => p.hidden);
  page("Hidden", `<div class="photo-grid">${hidden.map(photoTile).join("")}</div>`, "app:photos", "Photos", "grouped");
}

function photoView(k) {
  const i = V.photos.findIndex(x => x._k === k);
  const p = V.photos[i];
  if (!p) return go("app:photos");
  show(`
    <div class="nav dark-nav"><button class="back" data-go="${p.hidden ? "hidden" : "app:photos"}">‹ ${p.hidden ? "Hidden" : "Photos"}</button></div>
    <div class="photo-view" style="${photoBg(p, i)}">${p.src ? "" : `<span>${esc(p.emoji || "")}</span>`}</div>
    <div class="photo-caption"><div>${esc(p.caption)}</div><div class="muted">${esc(p.date)}</div></div>
  `, "app photo-screen", false);
}

/* ---------- Calendar ---------- */

function calendar() {
  page("Calendar", (S.calendar || []).map(d => `
    <div class="section-label">${esc(d.day)}</div>
    <div class="card-list">
      ${d.events.length ? d.events.map(e => `
        <div class="card-row event">
          <div class="event-time">${esc(e.time)}</div>
          <div><div class="row-name">${esc(e.title)}</div>${e.note ? `<div class="row-preview wrap">${esc(e.note)}</div>` : ""}</div>
        </div>`).join("") : `<div class="card-row muted">No Events</div>`}
    </div>`).join(""), "home", "Home", "grouped");
}

/* ---------- Clock ---------- */

function clock() {
  page("Alarms", `<div class="card-list">${V.alarms.map((a, i) => `
    <div class="card-row flex alarm ${a.on ? "" : "off"}">
      <div><div class="alarm-time">${esc(a.time)}</div><div class="row-preview wrap">${esc(a.label)}</div></div>
      <button class="switch ${a.on ? "on" : ""}" data-go="alarm:${i}" aria-label="Toggle alarm"><span></span></button>
    </div>`).join("")}</div>`, "home", "Home", "grouped");
}

/* ---------- Mail ---------- */

function mail() {
  const list = fresh(V.mail);
  const pendMail = pending && pending.type === "mail" && pending.incoming ? pending : null;
  const folders = ["Inbox", "Sent", "Drafts"].filter(f => list.some(m => (m.folder || "Inbox") === f) || (f === "Inbox" && pendMail));
  page("Mail", folders.map(f => `
    <div class="section-label">${esc(f)}</div>
    <div class="card-list">
      ${f === "Inbox" && pendMail ? `
        <div class="card-row" data-go="${pendMail.route}">
          <div class="row-top"><span class="row-name"><span class="unread-dot inline"></span>${esc(pendMail.beat.mail.from)}</span><span class="row-time">now</span></div>
          <div class="mail-subject">${esc(pendMail.beat.mail.subject)}</div>
        </div>` : ""}
      ${list.filter(m => (m.folder || "Inbox") === f).map(m => `
        <div class="card-row" data-go="mail:${m._k}">
          <div class="row-top"><span class="row-name">${esc(f === "Inbox" ? m.from : "To: " + m.to)}</span><span class="row-time">${esc(m.date)}</span></div>
          <div class="mail-subject">${esc(m.subject)}</div>
          <div class="row-preview">${esc(m.body.split("\n")[0])}</div>
        </div>`).join("")}
    </div>`).join("") || empty("No Mail"), "home", "Home", "grouped");
}

function mailView(k) {
  const m = byKey(V.mail, k);
  if (!m) return go("app:mail");
  const f = m.folder || "Inbox";
  page("", `
    <div class="mail-view">
      <h2>${esc(m.subject)}</h2>
      <div class="mail-meta"><b>From:</b> ${esc(m.from)}<br><b>To:</b> ${esc(m.to)}<br>
        <span class="muted">${esc(m.date)}</span>
        ${f !== "Inbox" ? `<div class="mail-state">${f === "Sent" ? "Sent" : "Draft, not sent"}</div>` : ""}</div>
      <div class="mail-body">${esc(m.body)}</div>
    </div>`, "app:mail", "Mail");
}

/* ---------- Contacts ---------- */

function contacts() {
  page("Contacts", `<div class="card-list">${(V.contacts || []).map((c, i) => `
    <div class="card-row flex" data-go="contact:${i}">
      <span class="flex left">${avatar(c.initial || c.name[0], c.color, "xs", c.photo)}<span class="row-name">${esc(c.name)}</span></span><span class="muted">›</span>
    </div>`).join("")}</div>`, "home", "Home", "grouped");
}

function contactView(i) {
  const c = (V.contacts || [])[i];
  if (!c) return go("app:contacts");
  page("", `
    <div class="contact-card">
      ${avatar(c.initial || c.name[0], c.color, "lg", c.photo)}
      <div class="contact-name">${esc(c.name)}</div>
      ${c.subtitle ? `<div class="muted">${esc(c.subtitle)}</div>` : ""}
    </div>
    ${c.notes ? `<div class="card-list"><div class="card-row"><div class="field-label">Notes</div><div class="wrap">${esc(c.notes)}</div></div></div>` : ""}
  `, "app:contacts", "Contacts", "grouped");
}

/* ---------- Phone ---------- */

function phone() {
  const list = V.calls;
  page("Recents", list.length ? `<div class="card-list">${list.map(c => `
    <div class="card-row flex">
      <div>
        <div class="row-name ${c.type === "missed" ? "missed" : ""}">${esc(c.name)}${c.count > 1 ? ` (${c.count})` : ""}</div>
        <div class="row-preview">${c.type === "out" ? "↗ " : c.type === "in" ? "↙ " : ""}${esc(c.detail || (c.type === "missed" ? "Missed call" : c.type === "out" ? "Outgoing" : "Incoming"))}</div>
      </div>
      <span class="muted">${esc(c.time)}</span>
    </div>`).join("")}</div>` : empty("No Recents"), "home", "Home", "grouped");
}

function callScreen(c) {
  const out = c.type === "out";
  const t = (S.threads || []).find(x => x.name === c.name) || {};
  show(`
    <div class="call ringing">
      ${avatar(t.initial || c.name[0], t.color, "lg", t.photo)}
      <div class="call-name">${esc(c.name)}</div>
      <div class="call-sub">${out ? "calling…" : "mobile · incoming call"}</div>
      ${c.note ? `<div class="call-note">${esc(c.note)}</div>` : ""}
      <div class="call-btns">
        <span class="cbtn decline">${SVG.handset}</span>
        ${out ? "" : `<span class="cbtn accept">${SVG.handset}</span>`}
      </div>
    </div>`, "call-screen", false);
}

/* ---------- Cari (search) ---------- */

function cariHome(typing) {
  const recent = fresh(V.searches);
  show(`
    <div class="nav"><button class="back" data-go="home">‹ Home</button></div>
    <div class="cari">
      <div class="cari-logo" aria-label="Cari">cari<span>.</span></div>
      <div class="cari-bar">${SVG.search}<span class="cari-input"></span>${typing ? `<span class="caret"></span>` : ""}</div>
      <div class="cari-loading"></div>
      ${recent.length ? `<div class="section-label flush">Recent searches</div>
        <div class="card-list flush">${recent.map(s => `
          <div class="card-row flex" data-go="search:${s._k}">
            <div><div class="row-name">${esc(s.query)}</div><div class="row-preview">${esc(s.time)}</div></div>
            <span class="muted">›</span>
          </div>`).join("")}</div>` : ""}
    </div>`, "app cari-screen", true);
}

function searchView(k) {
  const s = byKey(V.searches, k);
  if (!s) return go("app:browser");
  const res = (s.results || []).map(r => `
    <div class="result">
      <div class="result-site"><span class="favicon">${esc((r.site || "?")[0])}</span>
        <div><div>${esc(r.site)}</div><div class="muted">${esc(r.path || "")}</div></div></div>
      <div class="result-title">${esc(r.title)}</div>
      <div class="snippet">${esc(r.snippet)}</div>
    </div>`).join("");
  const paa = (s.people || []).length ? `
    <div class="paa"><div class="paa-title">People also ask</div>
      ${s.people.map(p => `<details><summary>${esc(p.q)}</summary><p>${esc(p.a)}</p></details>`).join("")}
    </div>` : "";
  show(`
    <div class="cari-head">
      <button class="back" data-go="app:browser">‹</button>
      <div class="cari-bar small">${SVG.search}<span>${esc(s.query)}</span></div>
    </div>
    <div class="cari-tabs">
      <button class="tab on" data-go="tab:all">All</button>
      <button class="tab" data-go="tab:images">Images</button>
      <button class="tab" data-go="tab:news">News</button>
    </div>
    <div class="scroll">
      <div class="tab-panel" data-panel="all">${res}${paa}</div>
      <div class="tab-panel" data-panel="images" hidden>
        <div class="img-grid">${PHOTO_COLORS.map(c => `<div style="background:${c}"></div>`).join("")}</div>
      </div>
      <div class="tab-panel" data-panel="news" hidden>${empty("No news for this search")}</div>
    </div>`, "app cari-screen", true);
}

function switchTab(name) {
  screen.querySelectorAll(".tab").forEach(t => t.classList.toggle("on", t.dataset.go === "tab:" + name));
  screen.querySelectorAll(".tab-panel").forEach(p => { p.hidden = p.dataset.panel !== name; });
}

/* ---------- Music ---------- */

function music() {
  show(`
    <div class="nav"><button class="back light" data-go="home">‹ Home</button></div>
    <div class="mu">
      <div class="mu-title">Your playlists</div>
      ${(S.music || []).map((p, i) => {
        const [c1, c2] = ART[(i * 3) % ART.length];
        return `<button class="mu-row" data-go="playlist:${i}">
          <span class="mu-art" style="background:linear-gradient(145deg, ${c1}, ${c2})">♪</span>
          <span class="mu-text"><b>${esc(p.name)}</b><small>${esc(p.note || "Playlist · " + p.tracks.length + " songs")}</small></span>
        </button>`;
      }).join("")}
    </div>`, "app mu-screen", false);
}

// A track can be "Title by Artist" or { title, artist, preview, spotify }
function trackInfo(t) {
  if (typeof t === "object") return t;
  const i = String(t).lastIndexOf(" by ");
  return i > 0 ? { title: t.slice(0, i), artist: t.slice(i + 4) } : { title: t, artist: "" };
}

function playlist(i) {
  const p = (S.music || [])[i];
  if (!p) return go("app:music");
  const [c1, c2] = ART[(i * 3) % ART.length];
  show(`
    <div class="mu" style="--c1:${c1}">
      <div class="mu-head">
        <button class="back light" data-go="app:music">‹</button>
        <span class="mu-big-art" style="background:linear-gradient(145deg, ${c1}, ${c2})">♪</span>
        <div class="mu-pl-name">${esc(p.name)}</div>
        <div class="mu-pl-sub">${esc(p.note || S.ownerName + " · " + p.tracks.length + " songs")}</div>
        <button class="mu-play" data-go="track:${i}.0" aria-label="Play">▶</button>
      </div>
      ${p.spotify && spotifyEmbed(p.spotify) ? `<div class="mu-embed">${spotifyEmbed(p.spotify, 352)}</div>` : ""}
      ${p.ytmusic ? `<div class="mu-links"><a class="np-listen" href="${esc(p.ytmusic)}" target="_blank" rel="noopener">Open in YouTube Music ↗</a></div>` : ""}
      ${p.tracks.map((t, n) => {
        const tr = trackInfo(t);
        return `<button class="mu-track" data-go="track:${i}.${n}">
          <span class="mu-num">${n + 1}</span>
          <span class="mu-text"><b>${esc(tr.title)}</b><small>${esc(tr.artist)}${tr.preview ? " · preview" : ""}</small></span>
          <span class="mu-more">⋯</span>
        </button>`;
      }).join("")}
    </div>`, "app mu-screen", false);
}

/* ---------- Now Playing ---------- */

const ART = [
  ["#f4a7c3", "#c8b6ef"], ["#9fc9f5", "#c8b6ef"], ["#f9d3b4", "#f4a7c3"],
  ["#b8e0d2", "#9fc9f5"], ["#3a3a3c", "#8e8e93"], ["#c8b6ef", "#f9d3b4"]
];

function nowPlaying(arg) {
  const [pi, ti] = arg.split(".").map(Number);
  const p = (S.music || [])[pi];
  const t = p && p.tracks[ti];
  if (!t) return go("app:music");
  const tr = trackInfo(t);
  const [c1, c2] = ART[(pi * 3 + ti) % ART.length];
  const yt = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${tr.title} ${tr.artist}`.trim())}`;
  const prev = ti > 0 ? `track:${pi}.${ti - 1}` : "";
  const next = ti < p.tracks.length - 1 ? `track:${pi}.${ti + 1}` : "";
  const hasPrev = tr.preview && PREVIEWS[tr.preview];
  const len = hasPrev ? PREVIEWS[tr.preview].length() : 0;
  const playBtn = hasPrev
    ? `<button class="np-play" data-go="np-toggle:${tr.preview}" id="npPlay" aria-label="Play">▶</button>`
    : `<a class="np-play" href="${yt}" target="_blank" rel="noopener" aria-label="Play on YouTube">▶</a>`;
  show(`
    <div class="np" style="--c1:${c1}">
      <div class="np-top">
        <button class="back light" data-go="playlist:${pi}" aria-label="Back">⌄</button>
        <div class="np-from"><small>PLAYING FROM PLAYLIST</small><b>${esc(p.name)}</b></div>
        <span class="np-dots">⋯</span>
      </div>
      <div class="np-art" style="background:linear-gradient(145deg, ${c1}, ${c2})"><span>♪</span></div>
      <div class="np-info">
        <div><div class="np-title">${esc(tr.title)}</div><div class="np-artist">${esc(tr.artist)}</div></div>
        <span class="np-heart">♡</span>
      </div>
      <div class="np-bar"><span id="npFill"></span></div>
      <div class="np-times"><span id="npNow">0:00</span><span>${hasPrev ? fmtTime(len) : "-:--"}</span></div>
      <div class="np-controls">
        <span class="np-dim">⇄</span>
        <button class="np-btn" ${prev ? `data-go="${prev}"` : "disabled"} aria-label="Previous">⏮</button>
        ${playBtn}
        <button class="np-btn" ${next ? `data-go="${next}"` : "disabled"} aria-label="Next">⏭</button>
        <span class="np-dim">↻</span>
      </div>
      <div class="np-note">${hasPrev
        ? (soundOn ? "Preview: the opening bars, as a simple synth version." : "Sound is off. Turn it on in the Parts menu.")
        : "Play opens the real song on YouTube in a new tab."}</div>
      ${spotifyEmbed(tr.spotify)}
      <a class="np-listen" href="${yt}" target="_blank" rel="noopener">Listen on YouTube ↗</a>
    </div>`, "app np-screen", false);
}

// Spotify players only load on your own hosting (GitHub Pages, or opening index.html on your computer).
// The claude.ai page blocks embedded players, so there it falls back to the Listen button.
const EMBEDS_OK = location.protocol === "file:" || /(^|\.)github\.io$/.test(location.hostname) ||
  ["localhost", "127.0.0.1"].includes(location.hostname);

function spotifyEmbed(url, height = 152) {
  const m = /open\.spotify\.com\/(?:intl-[a-z]+\/)?(track|album|playlist)\/([A-Za-z0-9]+)/.exec(url || "");
  if (!m || !EMBEDS_OK) return "";
  return `<iframe class="np-spotify" title="Spotify player" src="https://open.spotify.com/embed/${m[1]}/${m[2]}?utm_source=generator"
    height="${height}" frameborder="0" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
}

const fmtTime = s => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;

/* ---------- Synth previews (public-domain pieces only, opening bars) ---------- */

// Note names to frequency, e.g. "C#4"
function freq(n) {
  const m = /^([A-G])(#|b)?(\d)$/.exec(n);
  const base = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[m[1]] + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0);
  return 440 * Math.pow(2, (base + (Number(m[3]) + 1) * 12 - 69) / 12);
}

// Each preview returns a list of [startSeconds, note, lengthSeconds, voice]
const PREVIEWS = {
  // Beethoven, Piano Sonata No. 14, 1st movement, bars 1 to 3
  moonlight: {
    notes() {
      const out = [], step = 0.36;
      const bars = [
        { bass: ["C#2", "C#3"], groups: [["G#3", "C#4", "E4"], ["G#3", "C#4", "E4"], ["G#3", "C#4", "E4"], ["G#3", "C#4", "E4"]] },
        { bass: ["B1", "B2"], groups: [["G#3", "C#4", "E4"], ["G#3", "C#4", "E4"], ["G#3", "C#4", "E4"], ["G#3", "C#4", "E4"]] },
        { bass: ["A1", "A2"], groups: [["A3", "C#4", "E4"], ["A3", "C#4", "E4"]], bass2: ["F#1", "F#2"], groups2: [["A3", "D4", "F#4"], ["A3", "D4", "F#4"]] }
      ];
      let t = 0;
      bars.forEach(b => {
        const half = b.bass2 ? 6 : 12;
        b.bass.forEach(n => out.push([t, n, step * half, "piano"]));
        b.groups.forEach(g => g.forEach(n => { out.push([t, n, step * 1.6, "piano"]); t += step; }));
        if (b.bass2) {
          b.bass2.forEach(n => out.push([t, n, step * 6, "piano"]));
          b.groups2.forEach(g => g.forEach(n => { out.push([t, n, step * 1.6, "piano"]); t += step; }));
        }
      });
      return out;
    },
    length() { return 36 * 0.36 + 1.5; }
  },
  // Bach, Cello Suite No. 1, Prelude, bars 1 to 3
  cello: {
    notes() {
      const out = [], step = 0.16;
      const bars = [
        ["G2", "D3", "B3", "A3", "B3", "D3", "B3", "D3"],
        ["G2", "E3", "C4", "B3", "C4", "E3", "C4", "E3"],
        ["G2", "F#3", "C4", "B3", "C4", "F#3", "C4", "F#3"]
      ];
      let t = 0;
      bars.forEach(bar => { for (let r = 0; r < 2; r++) bar.forEach(n => { out.push([t, n, step * 1.4, "cello"]); t += step; }); });
      return out;
    },
    length() { return 48 * 0.16 + 1.2; }
  },
  // Satie, Gymnopédie No. 1, the four-bar introduction
  gymnopedie: {
    notes() {
      const out = [], beat = 0.62;
      const bars = [["G2", ["B3", "D4", "F#4"]], ["D2", ["A3", "C#4", "F#4"]], ["G2", ["B3", "D4", "F#4"]], ["D2", ["A3", "C#4", "F#4"]]];
      let t = 0;
      bars.forEach(([bass, chord]) => {
        out.push([t, bass, beat * 3, "piano"]);
        chord.forEach(n => out.push([t + beat, n, beat * 2.2, "piano"]));
        t += beat * 3;
      });
      return out;
    },
    length() { return 4 * 3 * 0.62 + 1.5; }
  }
};

let npPlay = null; // { master, start, len, raf }

function stopPreview() {
  if (!npPlay) return;
  try {
    const a = actx, g = npPlay.master;
    g.gain.cancelScheduledValues(a.currentTime);
    g.gain.setTargetAtTime(0, a.currentTime, 0.05);
    setTimeout(() => { try { g.disconnect(); } catch (e) { /* already gone */ } }, 300);
  } catch (e) { /* audio unavailable */ }
  cancelAnimationFrame(npPlay.raf);
  npPlay = null;
  const b = document.getElementById("npPlay");
  if (b) b.textContent = "▶";
}

function voice(a, dest, t, f, len, kind) {
  const o = a.createOscillator(), g = a.createGain();
  if (kind === "cello") {
    const lp = a.createBiquadFilter();
    lp.type = "lowpass"; lp.frequency.value = 1400;
    o.type = "sawtooth";
    o.frequency.setValueAtTime(f, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.06, t + 0.04);
    g.gain.exponentialRampToValueAtTime(0.0001, t + len);
    o.connect(lp).connect(g).connect(dest);
  } else {
    o.type = "triangle";
    o.frequency.setValueAtTime(f, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.09, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + len);
    o.connect(g).connect(dest);
  }
  o.start(t);
  o.stop(t + len + 0.05);
}

function togglePreview(id) {
  if (npPlay) return stopPreview();
  const a = audio();
  const P = PREVIEWS[id];
  if (!a || !P) return;
  const master = a.createGain();
  master.gain.value = 1;
  master.connect(a.destination);
  const start = a.currentTime + 0.1;
  P.notes().forEach(([t, n, len, kind]) => voice(a, master, start + t, freq(n), len, kind));
  const len = P.length();
  npPlay = { master, start, len, raf: 0 };
  const b = document.getElementById("npPlay");
  if (b) b.textContent = "⏸";
  const tick = () => {
    if (!npPlay) return;
    const el = Math.max(0, a.currentTime - npPlay.start);
    const f = document.getElementById("npFill"), now = document.getElementById("npNow");
    if (f) f.style.width = Math.min(100, (el / npPlay.len) * 100) + "%";
    if (now) now.textContent = fmtTime(Math.min(el, npPlay.len));
    if (el >= npPlay.len) { npPlay = null; const bb = document.getElementById("npPlay"); if (bb) bb.textContent = "▶"; return; }
    npPlay.raf = requestAnimationFrame(tick);
  };
  npPlay.raf = requestAnimationFrame(tick);
}

/* ---------- Settings ---------- */

function settings() {
  const st = S.settings;
  const max = Math.max(...st.screenTime.map(s => s.minutes));
  page("Settings", `
    <div class="card-list"><div class="card-row flex profile">
      ${avatar(st.initial, st.color, "md", st.photo)}
      <div><div class="row-name">${esc(st.name)}</div><div class="row-preview">Account, Passwords & more</div></div>
    </div></div>
    <div class="card-list">
      <div class="card-row flex"><span>Wallpaper</span><span class="muted">${esc(st.wallpaper)}</span></div>
      <div class="card-row flex"><span>Passcode</span><span class="muted">On</span></div>
    </div>
    <div class="section-label">Screen Time · Today</div>
    <div class="card-list">
      ${st.screenTime.map(s => `
        <div class="card-row">
          <div class="flex"><span>${esc(s.app)}</span><span class="muted">${esc(s.label)}</span></div>
          <div class="bar"><span style="width:${(s.minutes / max) * 100}%"></span></div>
          ${s.note ? `<div class="row-preview wrap">${esc(s.note)}</div>` : ""}
        </div>`).join("")}
    </div>`, "home", "Home", "grouped");
}

/* ---------- Camera ---------- */

function camera() {
  show(`
    <div class="camera">
      <div class="viewfinder${S.cameraVideo ? " has-video" : ""}">${S.cameraVideo
        ? `<video autoplay muted loop playsinline preload="auto"><source src="${esc(S.cameraVideo)}" type="video/mp4"><source src="${esc(S.cameraVideo.replace(/\.mp4$/, ".webm"))}" type="video/webm"></video><span class="cam-zoom">1x</span>`
        : `<span>${esc(S.cameraText || "")}</span>`}</div>
      <div class="cam-modes"><span>VIDEO</span><span class="on">PHOTO</span><span>PORTRAIT</span></div>
      <div class="camera-bar">
        <button class="cam-back" data-go="home">Done</button>
        <button class="shutter" data-go="shutter" aria-label="Take photo"></button>
        <span></span>
      </div>
    </div>`, "camera-screen", false);
}

function shutter() {
  const v = document.querySelector(".viewfinder");
  if (!v) return;
  v.classList.remove("flash");
  SFX.shutter();
  void v.offsetWidth;
  v.classList.add("flash");
}

/* ---------- Jodoh (fictional dating app) ---------- */

function jodoh() {
  const j = S.jodoh;
  if (!j) return go("home");
  const list = threadList(true);
  show(`
    <div class="nav jodoh-nav"><button class="back" data-go="home">‹ Home</button><span class="jodoh-logo">♥ Jodoh</span></div>
    <div class="scroll jodoh">
      <div class="jodoh-card">
        ${avatar(j.initial, j.color, "lg", j.photo)}
        <div class="contact-name">${esc(j.name)}</div>
        <div class="muted">${esc(j.job)}</div>
        <div class="jodoh-bio">${esc(j.bio)}</div>
        <div class="jodoh-tag">Interested in: ${esc(j.interestedIn)}</div>
      </div>
      <div class="section-label">Matches</div>
      <div class="card-list">
        ${list.length ? list.map(t => {
          const p = previewOf(t);
          return `<div class="card-row flex" data-go="match:${t.id}">
            <div class="flex left">${avatar(t.initial, t.color, "sm", t.photo)}
              <div><div class="row-name">${esc(t.name)}</div><div class="row-preview">${esc(p.text)}</div></div></div>
            ${p.unread ? `<span class="unread-dot"></span>` : ""}
          </div>`;
        }).join("") : `<div class="card-row muted">No matches yet</div>`}
      </div>
    </div>`, "app grouped jodoh-screen", true);
}

/* ================= Routing ================= */

const APPS = { messages, notes, photos, calendar, clock, mail, contacts, phone, browser: () => cariHome(false), music, settings, camera, jodoh };

function renderRoute() {
  const [what, arg] = split(route);
  switch (what) {
    case "home": return home();
    case "app": return (APPS[arg] || home)();
    case "chat": return chatView(arg, "app:messages");
    case "match": return chatView(arg, "app:jodoh");
    case "note": return noteView(arg);
    case "photo": return photoView(arg);
    case "hidden": return hiddenAlbum();
    case "mail": return mailView(arg);
    case "contact": return contactView(+arg);
    case "search": return searchView(arg);
    case "playlist": return playlist(+arg);
    case "track": return nowPlaying(arg);
    case "lock": return lockScreen();
    case "passcode": return passcode();
    case "parts": return partsMenu();
    default: return home();
  }
}

function go(r) {
  const [what, arg] = split(r);

  // Small actions that keep the current screen
  switch (what) {
    case "delete": typed = typed.slice(0, -1); return updateDots();
    case "shutter": return shutter();
    case "skip": return fastForward();
    case "tab": return switchTab(arg);
    case "np-toggle": return togglePreview(arg);
    case "alarm": V.alarms[+arg].on = !V.alarms[+arg].on; return renderRoute();
    case "help-ok": store.set(HELP, "1"); return hideOverlay();
    case "help": return showHelp();
    case "sound":
      soundOn = !soundOn;
      store.set(SOUND_KEY, soundOn ? "on" : "off");
      if (soundOn) SFX.notify();
      return route === "parts" ? partsMenu() : undefined;
    case "open-pending": return pending ? go(pending.route) : undefined;
    case "edge-home":
      if (route === "lock") return go("passcode");
      if (unlocked && !["parts", "end"].includes(route)) return go("home");
      return;
  }

  // Leaving a screen stops any music preview
  stopPreview();
  // Leaving mid-animation finishes the beat
  if (play) finishPlay();
  hideKeyboard();

  switch (what) {
    case "part": return openPart(+arg);
    case "full": return openFull(arg);
    case "reset": progress = { done: 0, cursor: 0 }; save(); return openPart(0);
    case "finish": return endCard();
    case "nextpart": return nextPart();
  }

  route = r;
  if (pending && (r === pending.route || (pending.autoApp && r === "app:" + pending.app))) return startBeat();
  renderRoute();
}

/* ================= Taps & swipes ================= */

phoneEl.addEventListener("click", e => {
  if (e.target.closest(".edge-left")) return;
  const key = e.target.closest("[data-key]");
  if (key) return pressKey(key.dataset.key);
  const k = e.target.closest("[data-kb]");
  if (k) return kbPress(k.dataset.kb);
  const el = e.target.closest("[data-go]");
  if (el) return go(el.dataset.go);
  if (e.target.closest(".overlay")) return;
  if (play) return;
  if (route === "lock") return go("passcode");
  if (e.target.closest(".input-bar")) return showKeyboard();
  if (kb.classList.contains("show") && !e.target.closest(".kb")) hideKeyboard();
});

// Keys the reader taps on the keyboard type into the message box (nothing is sent)
function kbPress(k) {
  if (play) return;
  const el = inputEl();
  if (!el) return;
  if (k === "back") el.textContent = el.textContent.slice(0, -1);
  else if (k.length === 1) el.textContent += k;
  screen.querySelector(".input-bar")?.classList.toggle("has-text", !!el.textContent);
}

// Swipe right from the left edge = back
(() => {
  const edge = document.getElementById("edgeL");
  let s = null;
  edge.addEventListener("pointerdown", e => { s = { x: e.clientX, y: e.clientY }; edge.setPointerCapture(e.pointerId); });
  edge.addEventListener("pointerup", e => {
    if (!s) return;
    const dx = e.clientX - s.x, dy = Math.abs(e.clientY - s.y);
    s = null;
    if (dx > 40 && dy < 80) {
      const b = screen.querySelector(".back[data-go], .cam-back[data-go]");
      if (b) go(b.dataset.go);
    }
  });
  edge.addEventListener("pointercancel", () => { s = null; });
})();

homeBar.addEventListener("click", () => go("edge-home"));
phoneEl.addEventListener("pointerdown", () => { audio(); }, { passive: true });

/* ================= Start ================= */

if (!ORDER.length) {
  screen.innerHTML = `<div class="empty">No story found. Check story.js.</div>`;
} else if (progress.done >= ORDER.length) {
  openFull(Object.keys(PHONES)[0]);
} else {
  openPart(progress.done);
}
