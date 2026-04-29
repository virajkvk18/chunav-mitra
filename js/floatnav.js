/**
 * @fileoverview Chunav Mitra — Floating Pill Navbar Logic
 * @description Handles open/close of the dropdown panel, active link
 *   highlighting on scroll, backdrop click-to-close, and Escape key support.
 * @author Viraj KVK
 * @version 1.0.0
 */

'use strict';

(function () {
  let isOpen = false;

  const menuBtn   = document.getElementById('navMenuBtn');
  const dropdown  = document.getElementById('navDropdown');
  const backdrop  = document.getElementById('navBackdrop');
  const themeBtn  = document.getElementById('themeToggle');
  const allItems  = document.querySelectorAll('.floatnav-item');

  /* ── Open / Close ── */
  function openMenu() {
    isOpen = true;
    dropdown.classList.add('open');
    backdrop.classList.add('open');
    dropdown.setAttribute('aria-hidden', 'false');
    menuBtn.setAttribute('aria-expanded', 'true');
    // Focus first item for keyboard users
    const first = dropdown.querySelector('.floatnav-item');
    if (first) setTimeout(() => first.focus(), 50);
  }

  function closeMenu() {
    isOpen = false;
    dropdown.classList.remove('open');
    backdrop.classList.remove('open');
    dropdown.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.focus();
  }

  function toggleMenu() {
    isOpen ? closeMenu() : openMenu();
  }

  /* ── Event listeners ── */
  if (menuBtn)  menuBtn.addEventListener('click', toggleMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  // Close on nav item click
  allItems.forEach(item => {
    item.addEventListener('click', closeMenu);
  });

  // Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) closeMenu();
  });

  /* ── Active link on scroll ── */
  const sections = document.querySelectorAll('section[id], div[id]');

  function updateActive() {
    const scrollY = window.scrollY + 120;
    let current = '';
    sections.forEach(sec => {
      if (sec.offsetTop <= scrollY) current = sec.id;
    });
    allItems.forEach(item => {
      const href = item.getAttribute('href');
      item.classList.toggle('active', href === '#' + current);
    });
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();

  /* ── Theme toggle (re-use existing logic) ── */
  if (themeBtn) {
    const icon = themeBtn.querySelector('.theme-icon');
    let dark = false;
    try { dark = localStorage.getItem('chunav_theme') === 'dark'; } catch(e) {}
    if (dark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (icon) icon.textContent = '☀️';
    }
    themeBtn.addEventListener('click', () => {
      dark = !dark;
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
      if (icon) icon.textContent = dark ? '☀️' : '🌙';
      try { localStorage.setItem('chunav_theme', dark ? 'dark' : 'light'); } catch(e) {}
    });
  }

})();
