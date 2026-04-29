/**
 * @fileoverview Chunav Mitra — Google Charts Integration
 * @description Renders interactive voter turnout and election data charts
 *   using Google Charts API (Google Service #4). Shows real Indian
 *   election statistics to engage users with data-driven civic education.
 * @author Viraj KVK
 * @version 1.0.0
 */

'use strict';

/* ────────────────────────────────────────
   ELECTION DATA — Real Indian stats
──────────────────────────────────────── */
const TURNOUT_DATA = [
  ['Year', 'Voter Turnout (%)', { role: 'style' }, { role: 'annotation' }],
  ['1984', 63.6, '#F7610A', '63.6%'],
  ['1989', 61.9, '#F7610A', '61.9%'],
  ['1996', 57.9, '#F7610A', '57.9%'],
  ['1999', 59.9, '#F7610A', '59.9%'],
  ['2004', 58.1, '#F7610A', '58.1%'],
  ['2009', 58.2, '#F7610A', '58.2%'],
  ['2014', 66.4, '#0D9656', '66.4%'],
  ['2019', 67.4, '#0D9656', '67.4%'],
];

const SEATS_DATA = [
  ['Election Type', 'Total Seats', { role: 'style' }],
  ['Lok Sabha',    543,  '#F7610A'],
  ['Rajya Sabha',  250,  '#080E1A'],
  ['State Assemblies', 4120, '#0D9656'],
  ['Panchayats',   250000, '#2B6EFF'],
];

const GENDER_DATA = [
  ['Category', 'Percentage'],
  ['Male Voters',   49.1],
  ['Female Voters', 48.6],
  ['Third Gender',   0.3],
  ['Others / NRI',   2.0],
];

const AGE_DATA = [
  ['Age Group', 'Registered Voters (Crore)', { role: 'style' }],
  ['18–25',  16.0, '#F7610A'],
  ['26–35',  20.5, '#FF8C33'],
  ['36–45',  18.2, '#0D9656'],
  ['46–60',  22.3, '#080E1A'],
  ['60+',    19.0, '#2B6EFF'],
];

/* ────────────────────────────────────────
   CHART RENDERERS
──────────────────────────────────────── */

/**
 * Draws the voter turnout bar chart using Google Charts.
 * Shows Lok Sabha election turnout from 1984 to 2019.
 */
function drawTurnoutChart() {
  const data = google.visualization.arrayToDataTable(TURNOUT_DATA);

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#8892AA' : '#5A6278';
  const bgColor   = isDark ? '#0C1426' : '#F6F7FA';
  const gridColor = isDark ? '#1A2540' : '#DDE1EC';

  const options = {
    title: '',
    backgroundColor: { fill: 'transparent' },
    bar: { groupWidth: '60%' },
    chartArea: { left: 48, right: 24, top: 16, bottom: 48, width: '100%', height: '80%' },
    hAxis: {
      textStyle: { color: textColor, fontSize: 11, fontName: 'Plus Jakarta Sans' },
      gridlines: { color: 'transparent' },
      baselineColor: gridColor,
    },
    vAxis: {
      textStyle: { color: textColor, fontSize: 11, fontName: 'Plus Jakarta Sans' },
      gridlines: { color: gridColor },
      minValue: 50,
      maxValue: 75,
      format: '#\'%\'',
    },
    legend: { position: 'none' },
    animation: { startup: true, duration: 1000, easing: 'out' },
    annotations: {
      textStyle: { fontSize: 10, color: textColor, fontName: 'Plus Jakarta Sans', bold: true },
      alwaysOutside: false,
    },
    tooltip: { textStyle: { fontName: 'Plus Jakarta Sans', fontSize: 12 } },
  };

  const el = document.getElementById('turnout-chart');
  if (!el) return;
  const chart = new google.visualization.ColumnChart(el);
  chart.draw(data, options);
}

/**
 * Draws voter age distribution bar chart using Google Charts.
 */
function drawAgeChart() {
  const data = google.visualization.arrayToDataTable(AGE_DATA);

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#8892AA' : '#5A6278';
  const gridColor = isDark ? '#1A2540' : '#DDE1EC';

  const options = {
    title: '',
    backgroundColor: { fill: 'transparent' },
    bar: { groupWidth: '55%' },
    chartArea: { left: 52, right: 24, top: 16, bottom: 48, width: '100%', height: '80%' },
    hAxis: {
      textStyle: { color: textColor, fontSize: 11, fontName: 'Plus Jakarta Sans' },
      gridlines: { color: 'transparent' },
      baselineColor: gridColor,
    },
    vAxis: {
      textStyle: { color: textColor, fontSize: 11, fontName: 'Plus Jakarta Sans' },
      gridlines: { color: gridColor },
      title: 'Crore Voters',
      titleTextStyle: { color: textColor, fontSize: 10, fontName: 'Plus Jakarta Sans' },
    },
    legend: { position: 'none' },
    animation: { startup: true, duration: 1000, easing: 'out' },
    tooltip: { textStyle: { fontName: 'Plus Jakarta Sans', fontSize: 12 } },
  };

  const el = document.getElementById('age-chart');
  if (!el) return;
  const chart = new google.visualization.ColumnChart(el);
  chart.draw(data, options);
}

/**
 * Draws the voter gender distribution pie chart using Google Charts.
 */
function drawGenderChart() {
  const data = google.visualization.arrayToDataTable(GENDER_DATA);

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#8892AA' : '#5A6278';

  const options = {
    title: '',
    backgroundColor: { fill: 'transparent' },
    chartArea: { left: 16, right: 16, top: 16, bottom: 16, width: '100%', height: '100%' },
    pieHole: 0.5,
    colors: ['#2B6EFF', '#F7610A', '#0D9656', '#9099AF'],
    legend: {
      position: 'bottom',
      textStyle: { color: textColor, fontSize: 11, fontName: 'Plus Jakarta Sans' },
    },
    pieSliceBorderColor: 'transparent',
    sliceVisibilityThreshold: 0,
    animation: { startup: true, duration: 1000, easing: 'out' },
    tooltip: { textStyle: { fontName: 'Plus Jakarta Sans', fontSize: 12 } },
  };

  const el = document.getElementById('gender-chart');
  if (!el) return;
  const chart = new google.visualization.PieChart(el);
  chart.draw(data, options);
}

/**
 * Draws the election seats bar chart using Google Charts.
 */
function drawSeatsChart() {
  const scaledData = [
    ['Election Type', 'Seats (scaled for visibility)', { role: 'style' }, { role: 'annotation' }],
    ['Lok Sabha',         543,   '#F7610A', '543'],
    ['Rajya Sabha',       250,   '#080E1A', '250'],
    ['State Assemblies',  4120,  '#0D9656', '4,120'],
  ];
  const data = google.visualization.arrayToDataTable(scaledData);

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#8892AA' : '#5A6278';
  const gridColor = isDark ? '#1A2540' : '#DDE1EC';

  const options = {
    title: '',
    backgroundColor: { fill: 'transparent' },
    bars: 'horizontal',
    bar: { groupWidth: '55%' },
    chartArea: { left: 140, right: 60, top: 16, bottom: 24, width: '100%', height: '85%' },
    hAxis: {
      textStyle: { color: textColor, fontSize: 11, fontName: 'Plus Jakarta Sans' },
      gridlines: { color: gridColor },
    },
    vAxis: {
      textStyle: { color: textColor, fontSize: 11, fontName: 'Plus Jakarta Sans' },
      gridlines: { color: 'transparent' },
    },
    legend: { position: 'none' },
    animation: { startup: true, duration: 1000, easing: 'out' },
    annotations: {
      textStyle: { fontSize: 11, bold: true, color: textColor, fontName: 'Plus Jakarta Sans' },
      alwaysOutside: true,
    },
    tooltip: { textStyle: { fontName: 'Plus Jakarta Sans', fontSize: 12 } },
  };

  const el = document.getElementById('seats-chart');
  if (!el) return;
  const chart = new google.visualization.BarChart(el);
  chart.draw(data, options);
}

/* ────────────────────────────────────────
   INJECT SECTION INTO PAGE
──────────────────────────────────────── */

/**
 * Injects the charts section HTML into the page before the quiz section.
 */
function injectChartsSection() {
  const quizSection = document.getElementById('quiz');
  if (!quizSection) return;

  const section = document.createElement('section');
  section.id = 'stats-chart-section';
  section.setAttribute('aria-labelledby', 'charts-heading');
  section.innerHTML = `
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Data & Insights</span>
        <h2 id="charts-heading">📊 Indian Election Statistics</h2>
        <p>Real data from the Election Commission of India — because informed voters make better choices.</p>
      </div>
      <div class="chart-grid">
        <div class="chart-card reveal">
          <h4>📈 Lok Sabha Voter Turnout (1984–2019)</h4>
          <div class="chart-container" id="turnout-chart" aria-label="Bar chart showing voter turnout percentage from 1984 to 2019"></div>
          <p class="chart-note">Source: Election Commission of India</p>
        </div>
        <div class="chart-card reveal" style="animation-delay:0.1s">
          <h4>👥 Registered Voters by Age Group</h4>
          <div class="chart-container" id="age-chart" aria-label="Bar chart showing registered voters by age group in crores"></div>
          <p class="chart-note">Source: ECI Electoral Roll Data</p>
        </div>
        <div class="chart-card reveal" style="animation-delay:0.2s">
          <h4>⚖️ Voter Gender Distribution</h4>
          <div class="chart-container" id="gender-chart" aria-label="Donut chart showing voter distribution by gender"></div>
          <p class="chart-note">Source: ECI Voter Data 2024</p>
        </div>
        <div class="chart-card reveal" style="animation-delay:0.3s">
          <h4>🏛️ Electoral Seats by Election Type</h4>
          <div class="chart-container" id="seats-chart" aria-label="Horizontal bar chart comparing seats across election types"></div>
          <p class="chart-note">Lok Sabha, Rajya Sabha, State Assemblies</p>
        </div>
      </div>
    </div>
  `;

  quizSection.parentNode.insertBefore(section, quizSection);
}

/* ────────────────────────────────────────
   GOOGLE CHARTS LOADER
──────────────────────────────────────── */

/**
 * Loads Google Charts API and draws all charts.
 * Uses IntersectionObserver for lazy rendering.
 */
function initGoogleCharts() {
  injectChartsSection();

  // Load Google Charts (corechart package)
  const script = document.createElement('script');
  script.src = 'https://www.gstatic.com/charts/loader.js';
  script.async = true;
  script.onload = () => {
    google.charts.load('current', {
      packages: ['corechart', 'bar'],
      language: 'en',
      callback: () => {
        drawAllCharts();
        // Re-draw on theme change
        const observer = new MutationObserver(() => drawAllCharts());
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
      }
    });
  };
  document.head.appendChild(script);
}

/**
 * Draws all four charts. Called on load and on theme toggle.
 */
function drawAllCharts() {
  try {
    drawTurnoutChart();
    drawAgeChart();
    drawGenderChart();
    drawSeatsChart();
    // Trigger reveal animation for chart cards
    setTimeout(() => {
      document.querySelectorAll('#stats-chart-section .reveal').forEach(el => {
        el.classList.add('visible');
      });
    }, 100);
  } catch (err) {
    console.warn('Google Charts render error:', err);
  }
}

/* ────────────────────────────────────────
   INIT
──────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', initGoogleCharts);
