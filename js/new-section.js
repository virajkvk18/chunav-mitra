/**
 * @fileoverview Chunav Mitra — Why Vote, How It Works, Awareness Sections
 * @description Renders the Why Vote arguments, How Voting Works explainer,
 *   and Voter Awareness myth-vs-fact cards.
 * @author Viraj KVK
 * @version 1.0.0
 */
/* ════════════════════════════════════════════════════════════
   CHUNAV MITRA — new-sections.js
   Injects: Why Vote, How Voting Works, Voter Awareness sections
   Also updates nav links for the new sections.
   ════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ─────────────────────────────────────────
     1. INJECT NAV LINKS
  ───────────────────────────────────────── */
  function injectNavLinks() {
    const navLinks = document.getElementById("navLinks");
    if (!navLinks) return;
    const extras = [
      { href: "#why-vote",   label: "Why Vote" },
      { href: "#how-vote",   label: "How It Works" },
      { href: "#awareness",  label: "Awareness" },
    ];
    extras.forEach(({ href, label }) => {
      const li = document.createElement("li");
      const a  = document.createElement("a");
      a.href      = href;
      a.className = "nav-link";
      a.textContent = label;
      li.appendChild(a);
      // insert before last item (Game)
      const last = navLinks.querySelector("li:last-child");
      navLinks.insertBefore(li, last);
    });
  }

  /* ─────────────────────────────────────────
     2. WHY VOTE SECTION HTML
  ───────────────────────────────────────── */
  const whyVoteHTML = /* html */`
<section class="why-vote-section" id="why-vote" aria-labelledby="why-vote-heading">
  <div class="container">

    <div class="section-header">
      <span class="section-tag">Your Voice Matters</span>
      <h2 id="why-vote-heading">🗳️ Why Voting is Important</h2>
      <p>Every vote shapes the future of 1.4 billion people. Here's why yours matters more than you think.</p>
    </div>

    <!-- Impact Numbers -->
    <div class="impact-row reveal">
      <div class="impact-cell">
        <span class="impact-num">96Cr+</span>
        <span class="impact-label">Registered voters in India</span>
      </div>
      <div class="impact-cell">
        <span class="impact-num">67.4%</span>
        <span class="impact-label">Voter turnout in 2024 Lok Sabha</span>
      </div>
      <div class="impact-cell">
        <span class="impact-num">10Lakh+</span>
        <span class="impact-label">Polling stations across the country</span>
      </div>
      <div class="impact-cell">
        <span class="impact-num">48 Hrs</span>
        <span class="impact-label">Silence period before each vote</span>
      </div>
    </div>

    <!-- Reason Cards -->
    <div class="why-grid">
      <div class="why-card reveal" style="--why-color:#F7610A; --why-bg:rgba(247,97,10,0.08);">
        <div class="why-icon-wrap">🏛️</div>
        <h3>You Choose the Government</h3>
        <p>Every Member of Parliament you elect will make laws that affect your taxes, roads, schools, and hospitals. Not voting means others decide for you — including people whose interests may differ from yours.</p>
      </div>
      <div class="why-card reveal" style="--why-color:#0D9656; --why-bg:rgba(13,150,86,0.08); animation-delay:0.08s;">
        <div class="why-icon-wrap">⚖️</div>
        <h3>One Vote Can Change History</h3>
        <p>In the 1999 general election, several constituencies were won by fewer than 100 votes. In Mandi (HP) in 1998, the margin was just 1 vote per booth. Your single vote is genuinely powerful.</p>
      </div>
      <div class="why-card reveal" style="--why-color:#2B6EFF; --why-bg:rgba(43,110,255,0.08); animation-delay:0.16s;">
        <div class="why-icon-wrap">📜</div>
        <h3>A Constitutional Right</h3>
        <p>Article 326 of the Indian Constitution guarantees universal adult suffrage. Millions fought for this right — from the freedom movement to B. R. Ambedkar's drafting of a Constitution that gave every adult an equal voice.</p>
      </div>
      <div class="why-card reveal" style="--why-color:#7C3AED; --why-bg:rgba(124,58,237,0.08);">
        <div class="why-icon-wrap">🌱</div>
        <h3>Shapes the Next Generation</h3>
        <p>Education policy, climate action, and youth employment schemes are all decided by elected representatives. By voting you invest in a better future for children who cannot vote yet.</p>
      </div>
      <div class="why-card reveal" style="--why-color:#F7610A; --why-bg:rgba(247,97,10,0.08); animation-delay:0.08s;">
        <div class="why-icon-wrap">🤝</div>
        <h3>Strengthens Democracy</h3>
        <p>Low voter turnout weakens democracy. When more citizens participate, elected leaders are forced to be genuinely representative. Abstaining is not neutral — it tilts power toward those who do show up.</p>
      </div>
      <div class="why-card reveal" style="--why-color:#0D9656; --why-bg:rgba(13,150,86,0.08); animation-delay:0.16s;">
        <div class="why-icon-wrap">💡</div>
        <h3>Holds Leaders Accountable</h3>
        <p>An elected representative who does poor work can be removed in the next election — but only if voters show up. Your vote is the most powerful accountability tool available to any citizen.</p>
      </div>
    </div>

    <!-- Quote Strip -->
    <div class="quote-strip reveal">
      <p class="quote-text">
        "The <em>ballot</em> is stronger than the bullet. In a democracy, one vote is worth more than a hundred bullets."
      </p>
      <div class="quote-attr">
        <strong>Abraham Lincoln</strong>
        16th U.S. President
      </div>
    </div>

  </div>
</section>
`;

  /* ─────────────────────────────────────────
     3. HOW VOTING WORKS SECTION HTML
  ───────────────────────────────────────── */
  const howVoteHTML = /* html */`
<section class="how-vote-section" id="how-vote" aria-labelledby="how-vote-heading">
  <div class="container">

    <div class="section-header">
      <span class="section-tag">Step by Step</span>
      <h2 id="how-vote-heading">🔍 How the Voting Process Works in India</h2>
      <p>From announcing the election to counting the last vote — the complete journey explained.</p>
    </div>

    <!-- Horizontal Process Track -->
    <div class="process-track">
      <div class="process-step reveal">
        <div class="ps-dot" data-step="1">📣</div>
        <div class="ps-title">Election Announced</div>
        <div class="ps-desc">The Election Commission of India (ECI) issues the Model Code of Conduct and announces election dates.</div>
      </div>
      <div class="process-step reveal" style="animation-delay:0.08s;">
        <div class="ps-dot" data-step="2">📋</div>
        <div class="ps-title">Nominations Filed</div>
        <div class="ps-desc">Candidates file nomination papers. These are scrutinized by a Returning Officer. Candidates can withdraw too.</div>
      </div>
      <div class="process-step reveal" style="animation-delay:0.16s;">
        <div class="ps-dot" data-step="3">📢</div>
        <div class="ps-title">Campaign Period</div>
        <div class="ps-desc">Parties and candidates campaign. ECI enforces the Model Code of Conduct to ensure a fair playing field.</div>
      </div>
      <div class="process-step reveal" style="animation-delay:0.24s;">
        <div class="ps-dot" data-step="4">🗳️</div>
        <div class="ps-title">Polling Day</div>
        <div class="ps-desc">Voters visit their assigned booth, verify identity, press the EVM button, and get an indelible ink mark on their finger.</div>
      </div>
      <div class="process-step reveal" style="animation-delay:0.32s;">
        <div class="ps-dot" data-step="5">📊</div>
        <div class="ps-title">Counting & Results</div>
        <div class="ps-desc">Votes are counted under strict supervision. The candidate with the most votes wins the constituency (First Past the Post).</div>
      </div>
    </div>

    <!-- Documents + EVM Info -->
    <div class="vote-info-grid">

      <div class="vote-info-card reveal">
        <div class="vic-header">
          <div class="vic-icon orange">🪪</div>
          <div>
            <h3>Valid ID Documents for Voting</h3>
            <p>Any one of the following is accepted at the polling booth</p>
          </div>
        </div>
        <div class="doc-list">
          <div class="doc-item"><div class="doc-item-check">✓</div> Voter ID Card (EPIC) — the most common</div>
          <div class="doc-item"><div class="doc-item-check">✓</div> Aadhaar Card</div>
          <div class="doc-item"><div class="doc-item-check">✓</div> PAN Card</div>
          <div class="doc-item"><div class="doc-item-check">✓</div> Driving Licence</div>
          <div class="doc-item"><div class="doc-item-check">✓</div> Passport</div>
          <div class="doc-item"><div class="doc-item-check">✓</div> MNREGA Job Card</div>
          <div class="doc-item"><div class="doc-item-check">✓</div> Bank / Post Office Passbook with photo</div>
          <div class="doc-item"><div class="doc-item-check">✓</div> Smart Card issued by RGI under NPR</div>
        </div>
      </div>

      <div class="vote-info-card reveal" style="animation-delay:0.1s;">
        <div class="vic-header">
          <div class="vic-icon green">💻</div>
          <div>
            <h3>How EVM + VVPAT Works</h3>
            <p>India's tamper-proof electronic voting system explained</p>
          </div>
        </div>
        <div class="evm-features">
          <div class="evm-feature">
            <span class="evm-badge">EVM</span>
            <span>Electronic Voting Machine consists of a Ballot Unit (voter-facing) and a Control Unit (operated by presiding officer). Votes are stored as encrypted electronic records.</span>
          </div>
          <div class="evm-feature">
            <span class="evm-badge">VVPAT</span>
            <span>Voter Verifiable Paper Audit Trail prints a paper slip showing the symbol you voted for, visible for 7 seconds before dropping into a sealed compartment — verifying your vote.</span>
          </div>
          <div class="evm-feature">
            <span class="evm-badge">SECURITY</span>
            <span>EVMs are not connected to the internet, cannot be hacked remotely, and are sealed with tamper-evident stickers. Parties can appoint agents to observe counting.</span>
          </div>
          <div class="evm-feature">
            <span class="evm-badge">RESULT</span>
            <span>On counting day, EVMs are opened under CCTV, with party observers present. VVPAT slips from 5 randomly selected booths per constituency are tallied manually.</span>
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ -->
    <div class="section-header" style="margin-bottom:36px;">
      <span class="section-tag">Quick Answers</span>
      <h2 style="font-size:clamp(1.5rem,3vw,2rem);">❓ Frequently Asked Questions</h2>
    </div>
    <div class="faq-grid" id="faqGrid">
      <div class="faq-item">
        <div class="faq-q" data-faq>
          <span>Can I vote if I forgot my Voter ID at home?</span>
          <span class="faq-chevron">▼</span>
        </div>
        <div class="faq-a">Yes! You can use any of the 11 alternative photo ID documents approved by the ECI — including Aadhaar, PAN, passport, driving licence, or bank passbook with photo. You still need to be on the Electoral Roll for that booth.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q" data-faq>
          <span>What is the minimum age to vote?</span>
          <span class="faq-chevron">▼</span>
        </div>
        <div class="faq-a">You must be at least 18 years old on the qualifying date (January 1 of the year of electoral roll revision) and an Indian citizen. NRIs who are registered voters in their constituency can also vote in person.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q" data-faq>
          <span>What is NOTA and when can I use it?</span>
          <span class="faq-chevron">▼</span>
        </div>
        <div class="faq-a">NOTA stands for "None of the Above." Introduced in 2013 after a Supreme Court ruling, it lets you express dissatisfaction with all candidates. However, NOTA is not treated as a winning option — the candidate with the most votes wins regardless of how many NOTA votes there are.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q" data-faq>
          <span>Can I vote if I moved to a new city?</span>
          <span class="faq-chevron">▼</span>
        </div>
        <div class="faq-a">You need to update your voter registration to your new address. Use the Voter Helpline app, the NVSP portal, or visit your local BLO (Booth Level Officer). Once updated, you can vote at your new constituency's assigned polling booth.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q" data-faq>
          <span>Is voting mandatory in India?</span>
          <span class="faq-chevron">▼</span>
        </div>
        <div class="faq-a">No — voting is a right, not a legal obligation at the national level in India. However, the state of Gujarat made voting compulsory for local body elections under the Gujarat Local Authorities Laws (Amendment) Act, 2009. Most democracies leave voting as a voluntary right.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q" data-faq>
          <span>What is the Model Code of Conduct?</span>
          <span class="faq-chevron">▼</span>
        </div>
        <div class="faq-a">The Model Code of Conduct (MCC) is a set of guidelines issued by the ECI from the announcement of elections until results are declared. It prohibits parties from announcing new policies, using government resources for campaigns, and making hate speech. Violations can result in notices, show-cause orders, or candidacy cancellation.</div>
      </div>
    </div>

  </div>
</section>
`;

  /* ─────────────────────────────────────────
     4. VOTER AWARENESS SECTION HTML
  ───────────────────────────────────────── */
  const awarenessHTML = /* html */`
<section class="awareness-section" id="awareness" aria-labelledby="awareness-heading">
  <div class="container">

    <div class="section-header">
      <span class="section-tag">Know the Truth</span>
      <h2 id="awareness-heading">🧠 Voter Awareness: Myths vs Facts</h2>
      <p>Common misconceptions about voting — debunked with facts from the Election Commission of India.</p>
    </div>

    <!-- Myth vs Fact Grid -->
    <div class="mvf-grid">
      <div class="mvf-card reveal">
        <div class="mvf-label myth">❌ MYTH</div>
        <h4>"My single vote doesn't make a difference."</h4>
        <p>India has had dozens of elections decided by razor-thin margins. The 1998 Mandi Lok Sabha seat was decided by just 1 vote per polling booth on average. Collectively, individual votes determine every outcome.</p>
      </div>
      <div class="mvf-card reveal" style="animation-delay:0.08s;">
        <div class="mvf-label fact">✅ FACT</div>
        <h4>Even a 1% shift in votes can flip a constituency.</h4>
        <p>Because India uses the First Past the Post system, small vote swings have outsized effects. Your vote directly contributes to percentages that determine winners in close races across all 543 Lok Sabha seats.</p>
      </div>
      <div class="mvf-card reveal">
        <div class="mvf-label myth">❌ MYTH</div>
        <h4>"EVMs are easily hacked or manipulated."</h4>
        <p>EVMs are standalone devices with no wireless interface, bluetooth, or internet connectivity. They have never been proven to have been successfully hacked in 20+ years of Indian elections.</p>
      </div>
      <div class="mvf-card reveal" style="animation-delay:0.08s;">
        <div class="mvf-label fact">✅ FACT</div>
        <h4>EVMs are among the most secure voting tech globally.</h4>
        <p>Each EVM has one-time programmable chips that cannot be altered post-manufacturing. VVPAT provides a paper trail for verification. Multiple international delegations have certified ECI's election process.</p>
      </div>
      <div class="mvf-card reveal">
        <div class="mvf-label myth">❌ MYTH</div>
        <h4>"Voting is only for educated or informed people."</h4>
        <p>The Indian Constitution grants universal adult suffrage — to every citizen 18+, regardless of education, income, caste, or literacy. India's EVMs use symbols precisely to ensure illiterate voters can participate.</p>
      </div>
      <div class="mvf-card reveal" style="animation-delay:0.08s;">
        <div class="mvf-label fact">✅ FACT</div>
        <h4>Literacy is not required to vote in India.</h4>
        <p>Every candidate on an EVM is displayed with a unique symbol (e.g., lotus, hand, bicycle). This symbol-based system was designed specifically to include voters of all literacy levels in democracy.</p>
      </div>
      <div class="mvf-card reveal">
        <div class="mvf-label myth">❌ MYTH</div>
        <h4>"Voting takes the whole day — I'm too busy."</h4>
        <p>Many people avoid voting assuming long queues and wasted time, especially on a working day. In practice, most voters are in and out in 15–30 minutes, and election day is typically declared a public holiday.</p>
      </div>
      <div class="mvf-card reveal" style="animation-delay:0.08s;">
        <div class="mvf-label fact">✅ FACT</div>
        <h4>Voting usually takes under 30 minutes.</h4>
        <p>Election day is a gazetted national holiday. Polling booths are designed to handle 1,500 voters each. You can also check live queue status on the Voter Helpline App (1950) before heading to your booth.</p>
      </div>
    </div>

    <!-- CTA Strip -->
    <div class="awareness-cta reveal">
      <h3>Ready to Make Your Vote Count? 🇮🇳</h3>
      <p>Check your voter registration, find your polling booth, and learn about candidates before you vote.</p>
      <div class="cta-btn-group">
        <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" class="btn-white">
          🔍 Check Voter Status
        </a>
        <a href="https://www.nvsp.in" target="_blank" rel="noopener noreferrer" class="btn-outline-white">
          📋 Register / Update Details
        </a>
        <a href="#register" class="btn-outline-white">
          🧭 Registration Guide ↑
        </a>
      </div>
    </div>

  </div>
</section>
`;

  /* ─────────────────────────────────────────
     5. INJECT SECTIONS INTO THE PAGE
  ───────────────────────────────────────── */
  function injectSections() {
    const gameSection = document.getElementById("game");
    if (!gameSection) return;

    // Insert sections BEFORE the Word Game section
    const wrapper = document.createElement("div");
    wrapper.innerHTML = whyVoteHTML + howVoteHTML + awarenessHTML;
    gameSection.parentNode.insertBefore(wrapper, gameSection);
  }

  /* ─────────────────────────────────────────
     6. FAQ TOGGLE INTERACTIVITY
  ───────────────────────────────────────── */
  function initFAQ() {
    document.addEventListener("click", function (e) {
      const faqQ = e.target.closest("[data-faq]");
      if (!faqQ) return;
      const item = faqQ.closest(".faq-item");
      if (!item) return;
      // close others
      document.querySelectorAll(".faq-item.open").forEach(el => {
        if (el !== item) el.classList.remove("open");
      });
      item.classList.toggle("open");
    });
  }

  /* ─────────────────────────────────────────
     7. INTERSECTION OBSERVER FOR NEW REVEALS
  ───────────────────────────────────────── */
  function initNewReveal() {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".why-vote-section .reveal, .how-vote-section .reveal, .awareness-section .reveal")
      .forEach(el => io.observe(el));
  }

  /* ─────────────────────────────────────────
     8. ACTIVE NAV HIGHLIGHT (extended)
  ───────────────────────────────────────── */
  function updateActiveNavLinks() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            navLinks.forEach(a => {
              a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`);
            });
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(s => observer.observe(s));
  }

  /* ─────────────────────────────────────────
     9. COUNTER ANIMATION FOR IMPACT NUMBERS
  ───────────────────────────────────────── */
  function animateCounters() {
    const cells = document.querySelectorAll(".impact-cell");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.transform = "translateY(-4px)";
          entry.target.style.transition = "transform 0.4s ease";
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    cells.forEach(c => io.observe(c));
  }

  /* ─────────────────────────────────────────
     INIT
  ───────────────────────────────────────── */
  function init() {
    injectNavLinks();
    injectSections();
    initFAQ();
    // slight delay so DOM is ready
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        initNewReveal();
        updateActiveNavLinks();
        animateCounters();
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
