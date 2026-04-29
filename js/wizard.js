/**
 * @fileoverview Chunav Mitra — Voter Registration Wizard
 * @description Multi-step interactive guide for Indian voter registration
 *   via NVSP. Includes document checklist and eligibility validation.
 * @author Viraj KVK
 * @version 1.0.0
 */
// ═══════════════════════════════════════════════════
//  WIZARD.JS — Voter Registration Guide (Redesigned)
// ═══════════════════════════════════════════════════

let wizardStep = 0;

const WIZARD_STEPS = [
  { label: "Eligibility", icon: "✅", num: "01" },
  { label: "Documents",   icon: "📄", num: "02" },
  { label: "Apply",       icon: "🌐", num: "03" },
  { label: "Done!",       icon: "🎉", num: "04" }
];

function renderWizard() {
  const container = document.getElementById('wizardContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="wiz-shell">

      <!-- ── Step progress bar ── -->
      <div class="wiz-progress-bar" role="tablist" aria-label="Registration steps">
        ${WIZARD_STEPS.map((s, i) => `
          <button class="wiz-step-pill ${i === 0 ? 'active' : ''}"
            id="wizTab${i}" role="tab"
            aria-selected="${i === 0 ? 'true' : 'false'}"
            aria-controls="wizPanel${i}"
            onclick="goToWizStep(${i})">
            <span class="wiz-pill-num">${s.num}</span>
            <span class="wiz-pill-icon" aria-hidden="true">${s.icon}</span>
            <span class="wiz-pill-label">${s.label}</span>
          </button>
          ${i < WIZARD_STEPS.length - 1 ? '<div class="wiz-connector" id="wizConn'+i+'" aria-hidden="true"></div>' : ''}
        `).join('')}
      </div>

      <!-- ── Panels ── -->
      <div class="wiz-panels">

        <!-- STEP 0: Eligibility -->
        <div class="wiz-panel active" id="wizPanel0" role="tabpanel" aria-labelledby="wizTab0">
          <div class="wiz-panel-header">
            <div class="wiz-step-badge">Step 01</div>
            <h3>Am I Eligible to Vote?</h3>
            <p>Answer 3 quick questions to find out if you can register right now!</p>
          </div>

          <div class="elig-form">
            <div class="elig-field">
              <label for="ageInput">
                <span class="field-icon" aria-hidden="true">🎂</span>
                Your Age
              </label>
              <input type="number" id="ageInput"
                placeholder="e.g. 18"
                min="1" max="120"
                aria-required="true"
                aria-label="Enter your age" />
            </div>

            <div class="elig-field">
              <label for="citizenInput">
                <span class="field-icon" aria-hidden="true">🇮🇳</span>
                Are you an Indian Citizen?
              </label>
              <select id="citizenInput" aria-required="true" aria-label="Select citizenship status">
                <option value="">— Select —</option>
                <option value="yes">Yes, I am an Indian Citizen</option>
                <option value="no">No, I am not</option>
              </select>
            </div>

            <div class="elig-field">
              <label for="residenceInput">
                <span class="field-icon" aria-hidden="true">🏠</span>
                Permanent address in India?
              </label>
              <select id="residenceInput" aria-required="true" aria-label="Select address status">
                <option value="">— Select —</option>
                <option value="yes">Yes, I have a permanent address</option>
                <option value="no">No, I am staying temporarily</option>
              </select>
            </div>

            <button class="wiz-check-btn" onclick="checkEligibility()" aria-label="Check my voter eligibility">
              <span aria-hidden="true">🔍</span> Check My Eligibility
            </button>
          </div>

          <div class="elig-result" id="eligResult" role="alert" aria-live="polite" style="display:none"></div>

          <div class="wiz-nav">
            <span></span>
            <button class="wiz-next-btn" onclick="goToWizStep(1)" aria-label="Go to Documents step">
              Documents <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <!-- STEP 1: Documents -->
        <div class="wiz-panel" id="wizPanel1" role="tabpanel" aria-labelledby="wizTab1">
          <div class="wiz-panel-header">
            <div class="wiz-step-badge">Step 02</div>
            <h3>Documents You Need</h3>
            <p>You only need ONE document from each category. Tick them off as you collect!</p>
          </div>

          <div class="wiz-tip-banner" role="note">
            <span class="tip-icon" aria-hidden="true">💡</span>
            <div><strong>Good news!</strong> Just one document per category is enough — pick whichever is easiest for you.</div>
          </div>

          <div class="doc-category">
            <div class="doc-cat-header">
              <span class="doc-cat-icon" aria-hidden="true">📸</span>
              <span>Proof of Age</span>
              <span class="doc-cat-pill">Any 1</span>
            </div>
            <div class="checklist" id="ageDocList">
              ${renderCheckItems('age', [
                'Birth Certificate',
                'Class 10 Marksheet / School Certificate',
                'Passport',
                'Driving Licence (with Date of Birth)'
              ])}
            </div>
          </div>

          <div class="doc-category">
            <div class="doc-cat-header">
              <span class="doc-cat-icon" aria-hidden="true">🏠</span>
              <span>Proof of Address</span>
              <span class="doc-cat-pill">Any 1</span>
            </div>
            <div class="checklist" id="addrDocList">
              ${renderCheckItems('addr', [
                'Aadhaar Card',
                'Ration Card',
                'Utility Bill — Electricity / Water / Gas (not older than 3 months)',
                'Bank Passbook with address',
                'Passport'
              ])}
            </div>
          </div>

          <div class="doc-category">
            <div class="doc-cat-header">
              <span class="doc-cat-icon" aria-hidden="true">📷</span>
              <span>Passport Size Photo</span>
              <span class="doc-cat-pill">Required</span>
            </div>
            <div class="checklist" id="photoDocList">
              ${renderCheckItems('photo', [
                'Recent passport-size photo (white background preferred)',
                'Digital photo in JPG format (for online application)'
              ])}
            </div>
          </div>

          <div class="wiz-nav">
            <button class="wiz-back-btn" onclick="goToWizStep(0)" aria-label="Back to Eligibility step">
              <span aria-hidden="true">←</span> Back
            </button>
            <button class="wiz-next-btn" onclick="goToWizStep(2)" aria-label="Go to Apply Online step">
              Apply Online <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <!-- STEP 2: Apply Online -->
        <div class="wiz-panel" id="wizPanel2" role="tabpanel" aria-labelledby="wizTab2">
          <div class="wiz-panel-header">
            <div class="wiz-step-badge">Step 03</div>
            <h3>How to Apply Online</h3>
            <p>Follow these 5 simple steps on your phone or computer!</p>
          </div>

          <ol class="apply-steps" aria-label="Application steps">
            ${[
              ['Go to voters.eci.gov.in', 'Open the official ECI website on your phone or computer'],
              ['Click "Register as New Voter"', 'Look for this button on the homepage'],
              ['Fill Form 6', 'This is the new voter registration form — fill all details carefully'],
              ['Upload your documents', 'Upload age proof, address proof, and your photo'],
              ['Submit & note your Reference Number', 'Save this number to track your application!']
            ].map(([title, desc], i) => `
              <li class="apply-step-item">
                <div class="apply-step-num" aria-hidden="true">0${i+1}</div>
                <div class="apply-step-body">
                  <strong>${title}</strong>
                  <span>${desc}</span>
                </div>
              </li>
            `).join('')}
          </ol>

          <p class="official-links-label">🔗 Official Links</p>
          <div class="official-links" role="list">
            <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" class="link-card" role="listitem" aria-label="ECI Voter Registration Portal (opens in new tab)">
              <span class="link-card-icon" aria-hidden="true">🗳️</span>
              <div class="link-card-body">
                <strong>voters.eci.gov.in</strong>
                <span>Official ECI Portal — register, check status, download Voter ID</span>
              </div>
              <span class="link-card-arrow" aria-hidden="true">↗</span>
            </a>
            <a href="https://www.nvsp.in" target="_blank" rel="noopener noreferrer" class="link-card" role="listitem" aria-label="NVSP National Voter's Service Portal (opens in new tab)">
              <span class="link-card-icon" aria-hidden="true">📋</span>
              <div class="link-card-body">
                <strong>nvsp.in — National Voter's Service Portal</strong>
                <span>Fill Form 6 online, check your name, update details</span>
              </div>
              <span class="link-card-arrow" aria-hidden="true">↗</span>
            </a>
            <a href="https://play.google.com/store/apps/details?id=in.nic.eci.cdac" target="_blank" rel="noopener noreferrer" class="link-card" role="listitem" aria-label="Download Voter Helpline App (opens in new tab)">
              <span class="link-card-icon" aria-hidden="true">📱</span>
              <div class="link-card-body">
                <strong>Voter Helpline App</strong>
                <span>Register and manage your Voter ID on mobile!</span>
              </div>
              <span class="link-card-arrow" aria-hidden="true">↗</span>
            </a>
          </div>

          <div class="wiz-nav">
            <button class="wiz-back-btn" onclick="goToWizStep(1)" aria-label="Back to Documents step">
              <span aria-hidden="true">←</span> Back
            </button>
            <button class="wiz-next-btn" onclick="goToWizStep(3)" aria-label="Finish registration guide">
              All Done! 🎉
            </button>
          </div>
        </div>

        <!-- STEP 3: Done -->
        <div class="wiz-panel" id="wizPanel3" role="tabpanel" aria-labelledby="wizTab3">
          <div class="wiz-done-hero" aria-label="Congratulations! You are ready to vote.">
            <div class="done-confetti-ring" aria-hidden="true">🎉</div>
            <h3>You're Ready to Vote!</h3>
            <p>After submitting your Form 6, here's what happens next:</p>
          </div>

          <div class="done-timeline" role="list" aria-label="What happens after registration">
            <div class="done-step" role="listitem">
              <div class="done-step-icon" aria-hidden="true">📬</div>
              <div class="done-step-body">
                <strong>BLO Visit</strong>
                <span>A Booth Level Officer may visit your home within 7–30 days to verify your address</span>
              </div>
              <div class="done-step-tag">7–30 days</div>
            </div>
            <div class="done-step" role="listitem">
              <div class="done-step-icon" aria-hidden="true">✅</div>
              <div class="done-step-body">
                <strong>Name Added to Voter List</strong>
                <span>Your name gets added to the electoral roll for your constituency</span>
              </div>
              <div class="done-step-tag">After BLO</div>
            </div>
            <div class="done-step" role="listitem">
              <div class="done-step-icon" aria-hidden="true">🪪</div>
              <div class="done-step-body">
                <strong>Voter ID Card Issued</strong>
                <span>You'll receive your EPIC (Elector's Photo Identity Card)</span>
              </div>
              <div class="done-step-tag">Delivered</div>
            </div>
            <div class="done-step done-step--success" role="listitem">
              <div class="done-step-icon" aria-hidden="true">🗳️</div>
              <div class="done-step-body">
                <strong>You Can Now Vote!</strong>
                <span>Congratulations — you're officially a registered voter of India 🇮🇳</span>
              </div>
              <div class="done-step-tag done-tag--green">Official!</div>
            </div>
          </div>

          <div class="done-helpline" role="note" aria-label="Voter helpline information">
            <span aria-hidden="true">📞</span>
            <div>Call <strong>1950</strong> for voter registration help — Toll Free, available in all states!</div>
          </div>

          <div class="wiz-nav wiz-nav--center">
            <button class="wiz-back-btn" onclick="goToWizStep(0)" aria-label="Start over from Eligibility">
              <span aria-hidden="true">↩</span> Start Over
            </button>
            <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer"
              class="wiz-next-btn wiz-next-btn--green"
              aria-label="Go to official ECI voter registration portal (opens in new tab)">
              🗳️ Register Now!
            </a>
          </div>
        </div>

      </div><!-- /wiz-panels -->
    </div><!-- /wiz-shell -->
  `;

  restoreCheckedStates();
}

function renderCheckItems(prefix, items) {
  return items.map((item, i) => {
    const id = `chk_${prefix}_${i}`;
    return `
      <div class="check-item" id="checkWrap_${id}" onclick="toggleCheck('${id}')" role="checkbox" aria-checked="false" tabindex="0" aria-label="${item}" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();toggleCheck('${id}')}">
        <div class="check-box" aria-hidden="true">
          <input type="checkbox" id="${id}" tabindex="-1" aria-hidden="true" onclick="event.stopPropagation();toggleCheck('${id}')" />
          <svg class="check-tick" viewBox="0 0 12 10" fill="none" aria-hidden="true"><polyline points="1,5 4.5,9 11,1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <label for="${id}">${item}</label>
      </div>
    `;
  }).join('');
}

function toggleCheck(id) {
  const cb = document.getElementById(id);
  if (!cb) return;
  cb.checked = !cb.checked;
  const wrap = document.getElementById(`checkWrap_${id}`);
  if (wrap) {
    wrap.classList.toggle('checked', cb.checked);
    wrap.setAttribute('aria-checked', cb.checked ? 'true' : 'false');
  }
  saveCheckedStates();
}

function saveCheckedStates() {
  const state = {};
  document.querySelectorAll('.checklist input[type="checkbox"]').forEach(cb => { state[cb.id] = cb.checked; });
  try { localStorage.setItem('chunav_checklist', JSON.stringify(state)); } catch(e) {}
}

function restoreCheckedStates() {
  try {
    const state = JSON.parse(localStorage.getItem('chunav_checklist') || '{}');
    Object.entries(state).forEach(([id, checked]) => {
      if (!checked) return;
      const cb = document.getElementById(id);
      const wrap = document.getElementById(`checkWrap_${id}`);
      if (cb) cb.checked = true;
      if (wrap) { wrap.classList.add('checked'); wrap.setAttribute('aria-checked', 'true'); }
    });
  } catch(e) {}
}

function checkEligibility() {
  const age = parseInt(document.getElementById('ageInput')?.value || '0');
  const citizen = document.getElementById('citizenInput')?.value;
  const residence = document.getElementById('residenceInput')?.value;
  const result = document.getElementById('eligResult');
  if (!result) return;

  if (!age || !citizen || !residence) {
    result.className = 'elig-result elig-result--warn';
    result.innerHTML = '<span aria-hidden="true">⚠️</span> Please fill in all three fields above!';
  } else if (citizen !== 'yes') {
    result.className = 'elig-result elig-result--fail';
    result.innerHTML = '<span aria-hidden="true">❌</span> Only Indian citizens can vote in Indian elections.';
  } else if (age < 18) {
    result.className = 'elig-result elig-result--warn';
    result.innerHTML = `<span aria-hidden="true">😊</span> You're ${age} years old. You can register when you turn <strong>18</strong>! Come back then — we'll be here! 🎂`;
  } else if (residence !== 'yes') {
    result.className = 'elig-result elig-result--warn';
    result.innerHTML = '<span aria-hidden="true">⚠️</span> You need a permanent address to register. Talk to your local election office for options.';
  } else {
    result.className = 'elig-result elig-result--pass';
    result.innerHTML = `<span aria-hidden="true">🎉</span> <strong>Yes! You are eligible to vote!</strong><br/>You're ${age} years old, an Indian citizen with a permanent address. Proceed to collect your documents!`;
  }
  result.style.display = 'flex';
}

function goToWizStep(step) {
  document.querySelectorAll('.wiz-panel').forEach((p, i) => {
    p.classList.toggle('active', i === step);
  });
  document.querySelectorAll('.wiz-step-pill').forEach((btn, i) => {
    btn.classList.remove('active', 'done');
    btn.setAttribute('aria-selected', i === step ? 'true' : 'false');
    if (i < step) btn.classList.add('done');
    if (i === step) btn.classList.add('active');
  });
  // Animate connectors
  for (let i = 0; i < WIZARD_STEPS.length - 1; i++) {
    const conn = document.getElementById('wizConn' + i);
    if (conn) conn.classList.toggle('done', i < step);
  }
  wizardStep = step;
  // Scroll wizard into view smoothly
  document.getElementById('wizardContainer')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

document.addEventListener('DOMContentLoaded', renderWizard);
