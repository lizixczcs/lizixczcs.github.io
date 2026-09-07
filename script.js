/* ============================================================
   Purple Profile — static site logic
   All content comes from /config/*.json so you can edit
   your details without touching this file.
   ============================================================ */

// Inline SVG icons (no icon library needed → keeps the site light).
const ICONS = {
  github:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.7.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.6 18 4.9 18 4.9c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/></svg>',
  telegram:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.9 4.3 18.5 20c-.3 1.1-.9 1.4-1.9.9l-5.2-3.8-2.5 2.4c-.3.3-.5.5-1 .5l.4-5.2 9.5-8.6c.4-.4-.1-.6-.6-.2L5.9 13.1.9 11.5c-1.1-.3-1.1-1 .2-1.5L20.5 2.5c.9-.3 1.7.2 1.4 1.8z"/></svg>',
  discord:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.3.5a18 18 0 0 1 4.4 1.4 15.6 15.6 0 0 0-13 0A18 18 0 0 1 10.9 3.5L10.6 3a19.8 19.8 0 0 0-4.9 1.4C2.4 9.3 1.5 14.1 2 18.8a19.9 19.9 0 0 0 6 3l.4-.7c-.7-.2-1.3-.5-1.9-.9l.5-.3a14.2 14.2 0 0 0 12.2 0l.5.3c-.6.4-1.2.7-1.9.9l.4.7a19.9 19.9 0 0 0 6-3c.6-5.4-.9-10.1-3.9-14.4zM8.9 15.6c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm6.2 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z"/></svg>',
  demo:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
};

const SOCIAL_LABELS = { github: "GitHub", telegram: "Telegram", discord: "Discord" };

async function loadJSON(path) {
  try {
    const res = await fetch(path, { cache: "no-cache" });
    if (!res.ok) throw new Error(res.status);
    return await res.json();
  } catch (err) {
    console.log("[v0] Could not load " + path + ":", err.message);
    return null;
  }
}

/* -------------------- Profile -------------------- */
async function initProfile() {
  const data = await loadJSON("config/profile.json");
  if (!data) return;

  document.title = data.username || "Profile";

  const avatar = document.getElementById("avatar");
  if (data.avatar) avatar.src = data.avatar;
  avatar.alt = (data.username || "User") + " avatar";

  const at = data.username ? "@" + data.username.replace(/^@/, "") : "";
  document.getElementById("username").textContent = at;
  document.getElementById("nav-name").textContent = data.username || "profile";
  document.getElementById("tagline").textContent = data.description || "";
  document.getElementById("bio").textContent = data.bio || "";

  // Status
  const isOnline = (data.status || "").toLowerCase() === "online";
  document.getElementById("status-text").textContent = data.status || "Offline";
  if (!isOnline) {
    document.querySelector(".status-pill").classList.add("offline");
    document.getElementById("status-dot").style.background = "#94a3b8";
    document.getElementById("status-dot").style.boxShadow = "none";
    document.getElementById("status-dot").title = data.status || "Offline";
  }

  // Social links (hero)
  const wrap = document.getElementById("social-links");
  const footWrap = document.getElementById("footer-social");
  const links = data.links || {};
  const order = ["github", "telegram", "discord"];
  let first = true;
  order.forEach((key) => {
    const url = links[key];
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.className = "social-btn" + (first ? " primary" : "");
    a.setAttribute("role", "listitem");
    a.innerHTML = (ICONS[key] || "") + "<span>" + (SOCIAL_LABELS[key] || key) + "</span>";
    wrap.appendChild(a);

    const fa = document.createElement("a");
    fa.href = url;
    fa.target = "_blank";
    fa.rel = "noopener noreferrer";
    fa.setAttribute("role", "listitem");
    fa.setAttribute("aria-label", SOCIAL_LABELS[key] || key);
    fa.innerHTML = ICONS[key] || "";
    footWrap.appendChild(fa);
    first = false;
  });

  document.getElementById("footer-copy").textContent =
    "© " + new Date().getFullYear() + " " + (data.username || "");
}

/* -------------------- Projects -------------------- */
async function initProjects() {
  const data = await loadJSON("config/projects.json");
  const grid = document.getElementById("projects-grid");
  if (!data || !Array.isArray(data)) return;

  data.forEach((p) => {
    const card = document.createElement("article");
    card.className = "project-card glass reveal";

    const icon = document.createElement("div");
    icon.className = "project-icon";
    if (p.icon && /\.(png|jpe?g|svg|webp|gif)$/i.test(p.icon)) {
      const img = document.createElement("img");
      img.src = p.icon;
      img.alt = "";
      icon.appendChild(img);
    } else {
      icon.textContent = p.icon || "📦";
    }
    card.appendChild(icon);

    const name = document.createElement("h3");
    name.className = "project-name";
    name.textContent = p.name || "Untitled";
    card.appendChild(name);

    const desc = document.createElement("p");
    desc.className = "project-desc";
    desc.textContent = p.description || "";
    card.appendChild(desc);

    if (Array.isArray(p.technologies) && p.technologies.length) {
      const tags = document.createElement("div");
      tags.className = "tags";
      p.technologies.forEach((t) => {
        const tag = document.createElement("span");
        tag.className = "tag";
        tag.textContent = t;
        tags.appendChild(tag);
      });
      card.appendChild(tags);
    }

    const linksWrap = document.createElement("div");
    linksWrap.className = "project-links";
    if (p.github) {
      const g = document.createElement("a");
      g.href = p.github;
      g.target = "_blank";
      g.rel = "noopener noreferrer";
      g.className = "mini-btn primary";
      g.innerHTML = ICONS.github + "<span>Code</span>";
      linksWrap.appendChild(g);
    }
    if (p.demo) {
      const d = document.createElement("a");
      d.href = p.demo;
      d.target = "_blank";
      d.rel = "noopener noreferrer";
      d.className = "mini-btn";
      d.innerHTML = ICONS.demo + "<span>Demo</span>";
      linksWrap.appendChild(d);
    }
    card.appendChild(linksWrap);

    grid.appendChild(card);
  });

  observeReveals();
}

/* -------------------- About -------------------- */
async function initAbout() {
  const data = await loadJSON("config/about.json");
  if (!data) return;

  if (data.heading) document.getElementById("about-heading").textContent = data.heading;
  document.getElementById("about-text").textContent = data.text || "";

  const groups = document.getElementById("about-groups");
  const sections = [
    { key: "languages", label: "Languages" },
    { key: "tools", label: "Tools" },
    { key: "interests", label: "Interests" },
  ];
  sections.forEach((s) => {
    const items = data[s.key];
    if (!Array.isArray(items) || !items.length) return;
    const group = document.createElement("div");
    group.className = "about-group";
    const h = document.createElement("h3");
    h.textContent = s.label;
    group.appendChild(h);
    const chips = document.createElement("div");
    chips.className = "chips";
    items.forEach((i) => {
      const c = document.createElement("span");
      c.className = "chip";
      c.textContent = i;
      chips.appendChild(c);
    });
    group.appendChild(chips);
    groups.appendChild(group);
  });
}

/* -------------------- Music player -------------------- */
function initPlayer() {
  const audio = document.getElementById("audio");
  const playBtn = document.getElementById("play");
  const playIcon = document.getElementById("play-icon");
  const pauseIcon = document.getElementById("pause-icon");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const shuffleBtn = document.getElementById("shuffle");
  const repeatBtn = document.getElementById("repeat");
  const seek = document.getElementById("seek");
  const currentTimeEl = document.getElementById("current-time");
  const durationEl = document.getElementById("duration");
  const volume = document.getElementById("volume");
  const muteBtn = document.getElementById("mute");
  const volIcon = document.getElementById("vol-icon");
  const muteIcon = document.getElementById("mute-icon");
  const titleEl = document.getElementById("track-title");
  const artistEl = document.getElementById("track-artist");
  const playlistEl = document.getElementById("playlist");
  const player = document.querySelector(".player");

  let playlist = [];
  let current = 0;
  let shuffle = false;
  let repeat = false;
  let seeking = false;

  const fmt = (s) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return m + ":" + (sec < 10 ? "0" : "") + sec;
  };

  // Restore saved volume
  const savedVol = parseFloat(localStorage.getItem("pp_volume"));
  audio.volume = isNaN(savedVol) ? 0.7 : savedVol;
  volume.value = audio.volume;
  updateVolIcon();

  function renderPlaylist() {
    playlistEl.innerHTML = "";
    playlist.forEach((t, i) => {
      const li = document.createElement("li");
      li.className = "track" + (i === current ? " active" : "");
      li.setAttribute("role", "button");
      li.setAttribute("tabindex", "0");
      li.setAttribute("aria-label", "Play " + (t.title || "track"));
      li.innerHTML =
        '<span class="track-index">' + (i + 1) + "</span>" +
        '<div class="track-info"><span class="track-title">' +
        (t.title || "Untitled") +
        '</span><span class="track-artist">' +
        (t.artist || "") +
        "</span></div>" +
        '<div class="track-eq"><span></span><span></span><span></span></div>';
      const activate = () => selectTrack(i, true);
      li.addEventListener("click", activate);
      li.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate();
        }
      });
      playlistEl.appendChild(li);
    });
  }

  function highlight() {
    [...playlistEl.children].forEach((el, i) => {
      el.classList.toggle("active", i === current);
      el.classList.toggle("playing-track", i === current && !audio.paused);
    });
  }

  function loadTrack(i) {
    current = i;
    const t = playlist[i];
    if (!t) return;
    audio.src = t.file;
    titleEl.textContent = t.title || "Untitled";
    artistEl.textContent = t.artist || "";
    highlight();
  }

  function selectTrack(i, play) {
    loadTrack(i);
    if (play) startPlay();
  }

  function startPlay() {
    audio.play().then(() => {
      setPlayingUI(true);
    }).catch((err) => {
      console.log("[v0] Playback blocked or file missing:", err.message);
      setPlayingUI(false);
    });
  }

  function setPlayingUI(playing) {
    playIcon.classList.toggle("hidden", playing);
    pauseIcon.classList.toggle("hidden", !playing);
    playBtn.setAttribute("aria-label", playing ? "Pause" : "Play");
    player.classList.toggle("playing", playing);
    highlight();
  }

  function togglePlay() {
    if (!playlist.length) return;
    if (audio.paused) startPlay();
    else {
      audio.pause();
      setPlayingUI(false);
    }
  }

  function next(auto) {
    if (!playlist.length) return;
    if (shuffle) {
      let n = current;
      if (playlist.length > 1) while (n === current) n = Math.floor(Math.random() * playlist.length);
      current = n;
    } else {
      current = (current + 1) % playlist.length;
    }
    loadTrack(current);
    startPlay();
  }

  function prev() {
    if (!playlist.length) return;
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    current = (current - 1 + playlist.length) % playlist.length;
    loadTrack(current);
    startPlay();
  }

  function updateVolIcon() {
    const muted = audio.volume === 0;
    volIcon.classList.toggle("hidden", muted);
    muteIcon.classList.toggle("hidden", !muted);
    muteBtn.setAttribute("aria-label", muted ? "Unmute" : "Mute");
  }

  // Events
  playBtn.addEventListener("click", togglePlay);
  nextBtn.addEventListener("click", () => next(false));
  prevBtn.addEventListener("click", prev);

  shuffleBtn.addEventListener("click", () => {
    shuffle = !shuffle;
    shuffleBtn.classList.toggle("active", shuffle);
    shuffleBtn.setAttribute("aria-pressed", String(shuffle));
  });
  repeatBtn.addEventListener("click", () => {
    repeat = !repeat;
    repeatBtn.classList.toggle("active", repeat);
    repeatBtn.setAttribute("aria-pressed", String(repeat));
  });

  audio.addEventListener("loadedmetadata", () => {
    durationEl.textContent = fmt(audio.duration);
    seek.max = audio.duration || 100;
  });
  audio.addEventListener("timeupdate", () => {
    if (seeking) return;
    seek.value = audio.currentTime;
    currentTimeEl.textContent = fmt(audio.currentTime);
    if (audio.duration) {
      const pct = (audio.currentTime / audio.duration) * 100;
      seek.style.background =
        "linear-gradient(90deg, var(--primary-2) " + pct + "%, rgba(168,85,247,0.15) " + pct + "%)";
    }
  });
  audio.addEventListener("ended", () => {
    if (repeat) {
      audio.currentTime = 0;
      startPlay();
    } else {
      next(true);
    }
  });
  audio.addEventListener("play", () => setPlayingUI(true));
  audio.addEventListener("pause", () => setPlayingUI(false));

  seek.addEventListener("input", () => {
    seeking = true;
    currentTimeEl.textContent = fmt(seek.value);
  });
  seek.addEventListener("change", () => {
    audio.currentTime = seek.value;
    seeking = false;
  });

  volume.addEventListener("input", () => {
    audio.volume = parseFloat(volume.value);
    localStorage.setItem("pp_volume", audio.volume);
    updateVolIcon();
  });

  let lastVol = audio.volume || 0.7;
  muteBtn.addEventListener("click", () => {
    if (audio.volume > 0) {
      lastVol = audio.volume;
      audio.volume = 0;
      volume.value = 0;
    } else {
      audio.volume = lastVol || 0.7;
      volume.value = audio.volume;
    }
    localStorage.setItem("pp_volume", audio.volume);
    updateVolIcon();
  });

  // Keyboard shortcut: space toggles play when not focused on a control
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && !["INPUT", "BUTTON", "TEXTAREA", "A"].includes(document.activeElement.tagName)) {
      e.preventDefault();
      togglePlay();
    }
  });

  loadJSON("config/music.json").then((data) => {
    playlist = (data && Array.isArray(data.playlist)) ? data.playlist : [];
    if (!playlist.length) {
      titleEl.textContent = "No tracks";
      artistEl.textContent = "Add music in config/music.json";
      return;
    }
    renderPlaylist();
    loadTrack(0);
  });
}

/* -------------------- Navigation -------------------- */
function initNav() {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");

  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

/* -------------------- Reveal on scroll -------------------- */
let revealObserver;
function observeReveals() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
  }
  document.querySelectorAll(".reveal:not(.visible)").forEach((el) => revealObserver.observe(el));
}

/* -------------------- Boot -------------------- */
document.addEventListener("DOMContentLoaded", async () => {
  initNav();
  initPlayer();
  await Promise.all([initProfile(), initProjects(), initAbout()]);
  observeReveals();
});
