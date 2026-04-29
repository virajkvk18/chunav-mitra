/**
 * @fileoverview Chunav Mitra — AI Chat Assistant (Ask Mitra!)
 * @description Integrates Google Gemini API for answering Indian election
 *   queries. Implements response caching, instant answers, exponential
 *   backoff on rate limits, and secure localStorage-only key storage.
 * @author Viraj KVK
 * @version 1.0.0
 * @security API key is NEVER hardcoded — stored only in browser localStorage.
 */
// ═══════════════════════════════════════════════════
//  CHAT.JS — Maximum free-tier efficiency
//  Model: gemini-2.5-flash-lite (15 RPM, 1000 RPD)
//  Extra: response cache so repeat questions = 0 API calls
// ═══════════════════════════════════════════════════

// ── API key: fetched from Vercel server env var, falls back to localStorage ──
// The key is stored in Vercel's environment variables (never in source code).
// See: /api/config.js — set GEMINI_API_KEY in Vercel Dashboard → Settings → Env Vars
const HARDCODED_KEY = '';

async function fetchServerKey() {
  try {
    const res = await fetch('/api/config');
    if (!res.ok) return '';
    const data = await res.json();
    return data.configured ? data.key : '';
  } catch {
    return ''; // Silently fail — user will see the API key input as fallback
  }
}

// gemini-2.5-flash-lite = 15 RPM + 1000 req/day (best free tier model)
const GEMINI_MODEL = 'gemini-2.5-flash-lite';
const GEMINI_URL   = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// Compact system prompt — fewer tokens = fewer rate limit hits
const SYSTEM_PROMPT = `You are Chunav Mitra, a friendly AI for Indian elections. Answer only election-related questions.
Key facts: ECI conducts elections. Voting age 18+ (Art.326). Lok Sabha 543 seats, Rajya Sabha 250. EVM+VVPAT used since 1998. NOTA available. Register via Form 6 at nvsp.in. Helpline: 1950. cVigil app for violations. Model Code of Conduct applies during elections. Form 6=register, 7=delete, 8=correct. Panchayat elections by State ECI.
Rules: Match user language (Hindi/Tamil/Telugu/Bengali etc). Keep answers under 100 words. Always encourage voting. Never discuss parties or candidates.`;

const MAX_HISTORY  = 4;   // Only 4 messages of history = fewer tokens per request
const CACHE_SIZE   = 30;  // Cache up to 30 answers — avoids repeat API calls

let chatHistory  = [];
let apiKey       = HARDCODED_KEY || '';
let isSending    = false;
let currentSection = 'home';

// ── Response cache — same question = instant answer, 0 API calls ──
const responseCache = new Map();

function getCacheKey(text) {
  return text.trim().toLowerCase().replace(/\s+/g, ' ');
}

function getCached(text) {
  return responseCache.get(getCacheKey(text)) || null;
}

function setCache(text, reply) {
  const key = getCacheKey(text);
  if (responseCache.size >= CACHE_SIZE) {
    // Remove oldest entry
    responseCache.delete(responseCache.keys().next().value);
  }
  responseCache.set(key, reply);
}

// ── Pre-built answers for the most common questions (zero API calls) ──
const INSTANT_ANSWERS = {
  'how to register': '📋 **Register to Vote (Form 6)**\n1. Go to **nvsp.in** or voters.eci.gov.in\n2. Fill Form 6 online\n3. Upload: age proof + address proof + photo\n4. Submit — you\'ll get SMS confirmation\n\nOr visit your nearest BLO (Booth Level Officer) for offline registration. You must be 18+ and an Indian citizen. 🗳️',
  'how do i register': '📋 **Register to Vote (Form 6)**\n1. Go to **nvsp.in** or voters.eci.gov.in\n2. Fill Form 6 online\n3. Upload: age proof + address proof + photo\n4. Submit — you\'ll get SMS confirmation\n\nOr visit your nearest BLO (Booth Level Officer) for offline registration. You must be 18+ and an Indian citizen. 🗳️',
  'what is evm': '💻 **EVM = Electronic Voting Machine**\nA tamper-proof machine used in all Indian elections since 1998. You press a button next to your candidate\'s symbol. It records your vote securely.\n\n**VVPAT** is attached to show you a 7-second paper slip confirming your vote was recorded correctly. 🗳️',
  'who is eci': '🏛️ **Election Commission of India (ECI)**\nAn independent constitutional body (Article 324) that conducts ALL elections in India — Lok Sabha, Rajya Sabha, and State Assemblies.\n\nHeaded by the **Chief Election Commissioner**, appointed by the President of India. It ensures free and fair elections! 🇮🇳',
  'what is model code of conduct': '📜 **Model Code of Conduct (MCC)**\nA set of rules that ALL political parties and candidates must follow once ECI announces election dates.\n\nIt prevents: misuse of government resources, communal speeches, vote bribing.\nViolations? Report via **cVigil app** with a geo-tagged photo! 🚨',
  'what is nota': '✅ **NOTA = None of the Above**\nIntroduced in 2013 by Supreme Court order. If you don\'t want to vote for any candidate, press the NOTA button on the EVM.\n\nNOTA votes are counted but the candidate with the most votes still wins. It\'s your way of saying "I vote, but I reject all options!" 🗳️',
  'voter helpline': '📞 **Voter Helpline: 1950**\nToll-free, available in all states!\n\nCall for: checking your name on voter list, polling booth location, reporting violations.\n\nAlso use the **Voter Helpline App** (Android/iOS) for the same services digitally! 📱',
  'what is vvpat': '🖨️ **VVPAT = Voter Verified Paper Audit Trail**\nAttached to the EVM, it prints a small paper slip for 7 seconds after you vote, showing:\n- Candidate\'s symbol\n- Candidate\'s name\n- Party name\n\nThis lets YOU verify your vote was recorded correctly before the slip drops into a sealed box. 🗳️',
};

function getInstantAnswer(text) {
  const lower = text.toLowerCase().trim();
  for (const [key, answer] of Object.entries(INSTANT_ANSWERS)) {
    if (lower.includes(key)) return answer;
  }
  return null;
}

// ── Detect current section ──
function detectCurrentSection() {
  const sections = document.querySelectorAll('section[id]');
  let closest = 'home', minDist = Infinity;
  sections.forEach(s => {
    const dist = Math.abs(s.getBoundingClientRect().top);
    if (dist < minDist) { minDist = dist; closest = s.id; }
  });
  return closest;
}

// ── Init ──
async function initChat() {
  // 1. Try server-side env var first (Vercel production — no key prompt needed)
  if (!apiKey) {
    apiKey = await fetchServerKey();
  }
  // 2. Fall back to localStorage (user-saved key from previous session)
  if (!apiKey || apiKey === 'PASTE_YOUR_API_KEY_HERE') {
    try { apiKey = localStorage.getItem('chunav_api_key') || ''; } catch(e) {}
  }
  const hasKey = apiKey && apiKey !== 'PASTE_YOUR_API_KEY_HERE';
  if (hasKey) document.getElementById('apiSetup')?.classList.add('hidden');

  document.getElementById('chatFab')?.addEventListener('click', toggleChat);
  document.getElementById('chatClose')?.addEventListener('click', closeChat);
  document.getElementById('saveApiKey')?.addEventListener('click', saveApiKey);
  document.getElementById('sendBtn')?.addEventListener('click', () => sendMessage());
  document.getElementById('apiKeyInput')?.addEventListener('keydown', e => { if (e.key === 'Enter') saveApiKey(); });
  document.getElementById('chatInput')?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });
  document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById('chatInput');
      if (input) { input.value = btn.dataset.prompt; sendMessage(); }
    });
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.getElementById('chatPanel')?.classList.contains('open')) {
      closeChat();
      document.getElementById('chatFab')?.focus();
    }
  });
  window.addEventListener('scroll', () => { currentSection = detectCurrentSection(); }, { passive: true });
}

function toggleChat() {
  document.getElementById('chatPanel')?.classList.contains('open') ? closeChat() : openChat();
}
function openChat() {
  const p = document.getElementById('chatPanel');
  if (!p) return;
  p.classList.add('open');
  p.setAttribute('aria-hidden', 'false');
  document.getElementById('chatFab')?.setAttribute('aria-expanded', 'true');
  currentSection = detectCurrentSection();
  setTimeout(() => document.getElementById('chatInput')?.focus(), 300);
}
function closeChat() {
  const p = document.getElementById('chatPanel');
  if (!p) return;
  p.classList.remove('open');
  p.setAttribute('aria-hidden', 'true');
  document.getElementById('chatFab')?.setAttribute('aria-expanded', 'false');
}

function saveApiKey() {
  const input = document.getElementById('apiKeyInput');
  const key = (input?.value || '').trim();
  if (!key || key.length < 10) {
    showBotMsg('⚠️ Please paste a valid API key (starts with "AIza...").\nGet one free at aistudio.google.com!');
    return;
  }
  apiKey = key;
  try { localStorage.setItem('chunav_api_key', key); } catch(e) {}
  input.value = '';
  document.getElementById('apiSetup')?.classList.add('hidden');
  showBotMsg('✅ Key saved! Ask me anything about Indian elections 🗳️');
}

// ── Main send function ──
async function sendMessage(retryCount = 0) {
  if (isSending) return;

  if (!apiKey || apiKey === 'PASTE_YOUR_API_KEY_HERE') {
    openChat();
    showBotMsg('🔑 Please enter your free Gemini API key!\nGet one at aistudio.google.com 🔗');
    return;
  }

  const input = document.getElementById('chatInput');
  const text = (input?.value || '').trim();
  if (!text) return;

  // ── Step 1: Check instant answers (zero API calls) ──
  const instant = getInstantAnswer(text);
  if (instant) {
    input.value = '';
    addMsgUI('user', text);
    addMsgUI('bot', instant);
    document.getElementById('quickPrompts')?.style.setProperty('display', 'none');
    return;
  }

  // ── Step 2: Check response cache ──
  const cached = getCached(text);
  if (cached) {
    input.value = '';
    addMsgUI('user', text);
    addMsgUI('bot', cached + '\n\n*(cached answer)*');
    document.getElementById('quickPrompts')?.style.setProperty('display', 'none');
    return;
  }

  // ── Step 3: Call Gemini API ──
  isSending = true;
  input.value = '';
  addMsgUI('user', text);

  if (chatHistory.length >= MAX_HISTORY) {
    chatHistory = chatHistory.slice(chatHistory.length - MAX_HISTORY);
  }
  chatHistory.push({ role: 'user', parts: [{ text }] });

  setStatus('🟡 Thinking...');
  const typingId = showTyping();

  try {
    const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: chatHistory,
        generationConfig: { maxOutputTokens: 300, temperature: 0.6 }
      })
    });

    removeTyping(typingId);
    isSending = false;

    // ── 429: exponential backoff auto-retry ──
    if (response.status === 429) {
      chatHistory.pop();
      if (retryCount < 2) {
        const wait = Math.pow(2, retryCount + 1); // 2s then 4s
        setStatus(`⏳ Retrying in ${wait}s...`);
        showBotMsg(`⏳ API busy — retrying in ${wait} seconds automatically...`);
        await new Promise(r => setTimeout(r, wait * 1000));
        input.value = text;
        setStatus('🟢 Ready to help!');
        isSending = false;
        return sendMessage(retryCount + 1);
      }
      setStatus('🟢 Ready to help!');
      showBotMsg('⚠️ **Rate limit reached.**\n\nThe free Gemini API allows ~15 requests/min and 1000/day.\n\n**Try asking one of these directly — they work without API calls:**\n• "How to register"\n• "What is EVM"\n• "Who is ECI"\n• "What is NOTA"\n• "Voter helpline"\n\nOr wait 1 minute and retry! 🙏');
      return;
    }

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      const msg = (err?.error?.message || '').toLowerCase();
      setStatus('🟢 Ready to help!');
      chatHistory.pop();

      if (response.status === 400 || msg.includes('api key') || msg.includes('invalid')) {
        showBotMsg('❌ Invalid API key. Please re-enter.\nGet a free one at aistudio.google.com');
        document.getElementById('apiSetup')?.classList.remove('hidden');
        apiKey = '';
        try { localStorage.removeItem('chunav_api_key'); } catch(e) {}
        return;
      }
      if (response.status === 404) {
        showBotMsg('⚠️ Model not found. Your API key may be from an older project.\nPlease get a new free key at aistudio.google.com');
        return;
      }
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    setStatus('🟢 Ready to help!');

    if (!reply) {
      chatHistory.pop();
      showBotMsg(data?.candidates?.[0]?.finishReason === 'SAFETY'
        ? '🛡️ Safety filter triggered. Please ask about Indian elections!'
        : '😔 Empty response. Please try again.');
      return;
    }

    chatHistory.push({ role: 'model', parts: [{ text: reply }] });
    setCache(text, reply); // Cache for future
    showBotMsg(reply);
    document.getElementById('quickPrompts')?.style.setProperty('display', 'none');

  } catch (err) {
    removeTyping(typingId);
    isSending = false;
    chatHistory.pop();
    setStatus('🟢 Ready to help!');
    console.error('Chat error:', err);
    showBotMsg('😔 Connection error. Check your internet and try again. 🔄');
  }
}

function setStatus(t) {
  const s = document.getElementById('chatStatus');
  if (s) s.textContent = t;
}
function addMsgUI(role, text) {
  const c = document.getElementById('chatMessages');
  if (!c) return;
  const d = document.createElement('div');
  d.className = `chat-msg ${role === 'user' ? 'user' : 'bot'}`;
  d.setAttribute('aria-label', role === 'user' ? 'You said' : 'Chunav Mitra replied');
  d.innerHTML = `<span class="msg-icon" aria-hidden="true">${role === 'user' ? '👤' : '🤖'}</span><div class="msg-bubble">${formatMsg(text)}</div>`;
  c.appendChild(d);
  c.scrollTop = c.scrollHeight;
}
function showBotMsg(t) { addMsgUI('bot', t); }
function showTyping() {
  const c = document.getElementById('chatMessages');
  if (!c) return null;
  const id = 'typing_' + Date.now();
  const d = document.createElement('div');
  d.id = id; d.className = 'chat-msg bot';
  d.setAttribute('aria-label', 'Chunav Mitra is typing');
  d.innerHTML = '<span class="msg-icon" aria-hidden="true">🤖</span><div class="msg-bubble"><div class="typing-bubble"><span></span><span></span><span></span></div></div>';
  c.appendChild(d); c.scrollTop = c.scrollHeight;
  return id;
}
function removeTyping(id) { if (id) document.getElementById(id)?.remove(); }
function formatMsg(text) {
  text = text.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>')
    .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" style="color:var(--saffron)">$1</a>');
}

document.addEventListener('DOMContentLoaded', initChat);
