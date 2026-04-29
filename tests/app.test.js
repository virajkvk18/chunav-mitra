/**
 * @fileoverview Chunav Mitra — Test Suite
 * @description Functional tests covering DOM structure, accessibility,
 *   security attributes, Google Services integration, and core features.
 *   Run in browser via: open index.html, then call runTests() in console.
 *   Run in Node via: node tests/app.test.js (with jsdom if available)
 * @author Viraj KVK
 * @version 1.0.0
 */

'use strict';

/* ─────────────────────────────────────────
   TEST RUNNER
───────────────────────────────────────── */
function runTests() {
  const results = { passed: 0, failed: 0, errors: [] };

  function test(name, fn) {
    try {
      fn();
      console.log(`✅ PASS: ${name}`);
      results.passed++;
    } catch (e) {
      console.error(`❌ FAIL: ${name} — ${e.message}`);
      results.failed++;
      results.errors.push({ name, error: e.message });
    }
  }

  function assert(condition, message) {
    if (!condition) throw new Error(message || 'Assertion failed');
  }

  function assertExists(selector, label) {
    const el = document.querySelector(selector);
    assert(el !== null, `${label || selector} should exist in DOM`);
    return el;
  }

  /* ── 1. PAGE STRUCTURE ── */
  test('Document has correct lang attribute', () => {
    assert(document.documentElement.lang === 'en', 'html[lang] should be "en"');
  });

  test('Page title contains Chunav Mitra', () => {
    assert(document.title.includes('Chunav Mitra'), `Title "${document.title}" should contain "Chunav Mitra"`);
  });

  test('Meta description is present and non-empty', () => {
    const meta = document.querySelector('meta[name="description"]');
    assert(meta !== null, 'meta[name="description"] should exist');
    assert(meta.content.length > 20, 'Meta description should be meaningful');
  });

  test('Viewport meta tag is present', () => {
    const vp = document.querySelector('meta[name="viewport"]');
    assert(vp !== null, 'Viewport meta should exist');
    assert(vp.content.includes('width=device-width'), 'Viewport should be responsive');
  });

  test('PWA manifest is linked', () => {
    const manifest = document.querySelector('link[rel="manifest"]');
    assert(manifest !== null, 'Web app manifest should be linked');
  });

  test('Theme color meta is present', () => {
    const tc = document.querySelector('meta[name="theme-color"]');
    assert(tc !== null, 'theme-color meta should exist for PWA');
  });

  test('Open Graph tags are present', () => {
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc  = document.querySelector('meta[property="og:description"]');
    assert(ogTitle !== null, 'og:title should exist');
    assert(ogDesc  !== null, 'og:description should exist');
  });

  /* ── 2. SECURITY ── */
  test('X-Content-Type-Options meta is set', () => {
    const meta = document.querySelector('meta[http-equiv="X-Content-Type-Options"]');
    assert(meta !== null, 'X-Content-Type-Options should be set');
    assert(meta.content === 'nosniff', 'Value should be nosniff');
  });

  test('X-Frame-Options meta is set', () => {
    const meta = document.querySelector('meta[http-equiv="X-Frame-Options"]');
    assert(meta !== null, 'X-Frame-Options should be set');
  });

  test('All external links have rel="noopener noreferrer"', () => {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    assert(externalLinks.length > 0, 'Should have at least one external link');
    externalLinks.forEach(link => {
      assert(
        link.rel.includes('noopener') && link.rel.includes('noreferrer'),
        `Link to "${link.href}" is missing noopener noreferrer`
      );
    });
  });

  test('No hardcoded API keys in DOM', () => {
    const bodyText = document.body.innerHTML;
    assert(!bodyText.includes('AIzaSy'), 'No API key should be exposed in the DOM');
  });

  /* ── 3. ACCESSIBILITY ── */
  test('Skip link is present for keyboard users', () => {
    assertExists('.skip-link', 'Skip to main content link');
  });

  test('Main content landmark exists', () => {
    assertExists('main#main-content', '<main id="main-content">');
  });

  test('Navbar has correct ARIA role and label', () => {
    const nav = assertExists('nav.navbar', 'Navbar');
    assert(nav.getAttribute('role') === 'navigation', 'Nav should have role="navigation"');
    assert(nav.hasAttribute('aria-label'), 'Nav should have aria-label');
  });

  test('All 9 navigation links are present', () => {
    const links = document.querySelectorAll('.nav-link');
    assert(links.length >= 9, `Expected 9+ nav links, found ${links.length}`);
  });

  test('Hamburger button has aria-expanded', () => {
    const hamburger = assertExists('#hamburger', 'Hamburger button');
    assert(hamburger.hasAttribute('aria-expanded'), 'Hamburger should have aria-expanded');
  });

  test('Theme toggle button has aria-label', () => {
    const toggle = assertExists('#themeToggle', 'Theme toggle');
    assert(toggle.hasAttribute('aria-label'), 'Theme toggle should have aria-label');
  });

  test('All images have alt attributes', () => {
    const images = document.querySelectorAll('img');
    assert(images.length > 0, 'Page should have at least one image');
    images.forEach(img => {
      assert(img.hasAttribute('alt'), `Image "${img.src}" is missing alt attribute`);
    });
  });

  test('Chat FAB has aria-label and aria-expanded', () => {
    const fab = assertExists('.chat-fab', 'Chat FAB button');
    assert(fab.hasAttribute('aria-label'), 'Chat FAB needs aria-label');
    assert(fab.hasAttribute('aria-expanded'), 'Chat FAB needs aria-expanded');
  });

  test('Chat panel has dialog role and aria-modal', () => {
    const panel = assertExists('.chat-panel', 'Chat panel');
    assert(panel.getAttribute('role') === 'dialog', 'Chat panel should have role="dialog"');
    assert(panel.getAttribute('aria-modal') === 'true', 'Chat panel should be aria-modal');
  });

  test('Quiz container exists', () => {
    assertExists('#quizContainer', 'Quiz container');
  });

  test('Rights tabs have correct tablist role', () => {
    const tablist = assertExists('.rights-tabs[role="tablist"]', 'Rights tablist');
    const tabs = tablist.querySelectorAll('[role="tab"]');
    assert(tabs.length >= 2, 'Should have at least 2 tabs');
  });

  test('Footer has contentinfo role', () => {
    const footer = assertExists('footer', 'Footer');
    assert(footer.getAttribute('role') === 'contentinfo', 'Footer should have role="contentinfo"');
  });

  test('Sections have aria-labelledby', () => {
    const sections = document.querySelectorAll('section[aria-labelledby]');
    assert(sections.length >= 5, `Expected 5+ sections with aria-labelledby, found ${sections.length}`);
  });

  /* ── 4. GOOGLE SERVICES INTEGRATION ── */
  test('Google Translate element exists', () => {
    assertExists('#google_translate_element', 'Google Translate widget');
  });

  test('Google Translate script is loaded', () => {
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const hasTranslate = scripts.some(s => s.src.includes('translate.google.com'));
    assert(hasTranslate, 'Google Translate script should be included');
  });

  test('Google Fonts are linked', () => {
    const links = Array.from(document.querySelectorAll('link[href]'));
    const hasFonts = links.some(l => l.href.includes('fonts.googleapis.com'));
    assert(hasFonts, 'Google Fonts should be linked');
  });

  test('Gemini API integration is present in chat', () => {
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const hasChat = scripts.some(s => s.src.includes('chat.js'));
    assert(hasChat, 'chat.js (Gemini integration) should be loaded');
  });

  /* ── 5. CORE FEATURES ── */
  test('Hero section is present with correct id', () => {
    assertExists('section#home', 'Hero section #home');
  });

  test('Hero stat pills are present', () => {
    const stats = document.querySelectorAll('.stat-pill');
    assert(stats.length === 3, `Expected 3 stat pills, found ${stats.length}`);
  });

  test('Timeline section exists', () => {
    assertExists('#timeline', 'Timeline section');
    assertExists('#timelineContainer', 'Timeline container');
  });

  test('Election types section exists', () => {
    assertExists('#types', 'Types section');
    assertExists('#typesGrid', 'Types grid');
  });

  test('Registration wizard exists', () => {
    assertExists('#register', 'Register section');
    assertExists('#wizardContainer', 'Wizard container');
  });

  test('Game section exists', () => {
    assertExists('#game', 'Game section');
    assertExists('#wordGameContainer', 'Word game container');
  });

  test('Confetti canvas exists', () => {
    assertExists('#confettiCanvas', 'Confetti canvas');
  });

  test('Footer has official government links', () => {
    const links = Array.from(document.querySelectorAll('footer a'));
    const hasECI = links.some(l => l.href.includes('eci.gov.in') || l.href.includes('voters.eci'));
    assert(hasECI, 'Footer should link to official ECI portal');
  });

  test('data-theme attribute is set on html element', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    assert(theme === 'light' || theme === 'dark', `data-theme should be "light" or "dark", got "${theme}"`);
  });

  /* ── 6. EFFICIENCY ── */
  test('DNS prefetch hints are present', () => {
    const prefetches = document.querySelectorAll('link[rel="dns-prefetch"]');
    assert(prefetches.length >= 2, `Expected 2+ dns-prefetch hints, found ${prefetches.length}`);
  });

  test('Scripts are loaded at end of body', () => {
    const bodyScripts = document.querySelectorAll('body script[src]');
    assert(bodyScripts.length >= 5, `Expected 5+ scripts at end of body, found ${bodyScripts.length}`);
  });

  /* ── SUMMARY ── */
  console.log('\n' + '═'.repeat(50));
  console.log(`📊 TEST RESULTS: ${results.passed} passed, ${results.failed} failed`);
  if (results.errors.length > 0) {
    console.log('\n❌ Failed tests:');
    results.errors.forEach(e => console.log(`  • ${e.name}: ${e.error}`));
  } else {
    console.log('🎉 All tests passed!');
  }
  console.log('═'.repeat(50));
  return results;
}

/* Run automatically when DOM is ready (browser) */
if (typeof document !== 'undefined' && typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runTests);
  } else {
    runTests();
  }
}

/* Export for Node/jsdom environments */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { runTests };
}
