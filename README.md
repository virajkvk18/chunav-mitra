<div align="center">

<img src="https://chunav-mitra.vercel.app/images/logo.png" alt="Chunav Mitra Logo" width="80" height="80" />

# 🗳️ Bharat Chunav Mitra

### Your Election Best Friend — भारत चुनाव मित्र

**Making Indian democracy accessible to every citizen, in every language.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-chunav--mitra.vercel.app-orange?style=for-the-badge&logo=vercel)](https://chunav-mitra.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-virajkvk18%2Fchunav--mitra-181717?style=for-the-badge&logo=github)](https://github.com/virajkvk18/chunav-mitra)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Made with Love](https://img.shields.io/badge/Made%20with%20%E2%9D%A4%EF%B8%8F-for%20Indian%20Democracy-FF6B00?style=for-the-badge)](https://chunav-mitra.vercel.app/)

---

> *"An informed voter is the foundation of a healthy democracy."*
> Chunav Mitra bridges the gap between complex electoral processes and every Indian citizen — in simple language, multiple languages, and with zero cost to the user.

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Key Sections](#-key-sections)
- [AI Integration](#-ai-integration)
- [Multilingual Support](#-multilingual-support)
- [Accessibility](#-accessibility)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [Disclaimer](#-disclaimer)
- [Author](#-author)

---

## 🌟 Overview

**Bharat Chunav Mitra** is a civic-tech web application designed to educate Indian citizens — especially first-time voters — about the electoral process in a simple, engaging, and accessible way. Built as a single-page application with no frameworks or build tools required, it runs entirely in the browser and deploys instantly.

The project was built with a clear mission: **demystify Indian elections for 96 crore+ registered voters** who often lack accessible, multilingual resources on how democracy works.

### Why this exists

India has the world's largest democratic electorate, yet voter awareness and participation remain a challenge — particularly among young, first-time, and rural voters. Chunav Mitra addresses this with:

- Plain-language explanations of complex electoral concepts
- Step-by-step voter registration guidance
- Interactive quizzes and games for retention
- An AI assistant that answers questions in any Indian language
- Zero barriers: no login, no app install, no cost

---
## Chosen Vertical
Civic Tech & Voter Awareness — designed around the persona of a 
first-time Indian voter who needs simple, multilingual guidance 
on the electoral process.

## Approach & Logic
The assistant uses a context-aware approach:
- Detects user language via Google Translate integration
- AI responses via Gemini API are scoped strictly to Indian 
  election topics using a system prompt
- Logical decision tree: user lands → reads explainer → follows 
  timeline → registers → takes quiz → asks AI for doubts

## Assumptions Made
- Users have a modern browser (Chrome/Firefox/Safari/Edge)
- Gemini free tier is sufficient for normal usage
- Users are Indian citizens or those interested in Indian democracy
- Internet connectivity is available (no offline mode in v1)

## 🔗 Live Demo

**[https://chunav-mitra.vercel.app/](https://chunav-mitra.vercel.app/)**

Deployed on Vercel — loads in under 2 seconds, works on all devices.

---

## ✨ Features

### 🎓 Educational Content
- **What is an Election?** — Beginner-friendly explainer with relatable analogies (Class Monitor → Prime Minister)
- **Election Timeline** — Animated step-by-step walkthrough from announcement to results
- **Types of Elections** — Lok Sabha, Rajya Sabha, State Assembly, Local Body, and more
- **Why Vote?** — Compelling civic arguments for voter participation
- **How Voting Works** — EVM machines, VVPAT, polling booths, and the voting day process

### 📋 Voter Registration Wizard
- Interactive multi-step guide for registering on the National Voter Service Portal (NVSP)
- Document checklist with eligibility criteria
- Direct links to official ECI portals

### ⚖️ Rights & Duties
- Tabbed interface separating Voter Rights vs. Civic Duties
- Constitutional references (Articles 326, 19, 21)
- Know Your Rights under the Representation of People Act

### 🧠 Election Quiz
- Multiple-choice quiz with instant feedback
- Star-based scoring system with confetti celebration on completion
- Covers election law, ECI, EVMs, Model Code of Conduct, and more

### 🎮 Election Word Game
- Hidden word search game with election-themed vocabulary
- Timed challenge mode to keep engagement high
- Fully playable on desktop and mobile

### 🤖 AI Election Assistant — Ask Mitra!
- Powered by Google Gemini API (user provides their own free key)
- Answers questions in any Indian language
- Quick-prompt buttons for common queries
- Responds contextually about Indian elections, voter rights, ECI, and more

### 🌐 Multilingual Support
- Google Translate integration covering 11 Indian languages:
  Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Urdu, and English

### 🌙 Dark Mode
- System-aware theme toggle with smooth transitions
- Full dark mode support across all sections

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Structure** | HTML5 (Semantic) |
| **Styling** | Vanilla CSS3 (Custom Properties, Flexbox, Grid, Animations) |
| **Interactivity** | Vanilla JavaScript (ES6+) |
| **Fonts** | Plus Jakarta Sans, Outfit, Space Grotesk, JetBrains Mono (Google Fonts) |
| **AI** | Google Gemini API (`gemini-1.5-flash`) |
| **Translation** | Google Translate Element API |
| **Deployment** | Vercel (Static Hosting) |
| **Version Control** | Git + GitHub |

**No frameworks. No build step. No dependencies.** Pure HTML, CSS, and JavaScript — loads fast everywhere, even on slow connections.

---

## 📁 Project Structure

```
chunav-mitra/
│
├── index.html                  # Main application entry point
│
├── css/
│   ├── style.css               # Core design system & navbar
│   ├── redesign.css            # Tech palette & component overrides
│   ├── enhancements.css        # Accessibility, focus rings, skip links
│   ├── wizard-redesign.css     # Voter registration wizard styles
│   └── navbar-professional.css # Professional color refinements (loaded last)
│
├── js/
│   ├── app.js                  # Core app logic, theme toggle, scroll behaviour
│   ├── timeline.js             # Election timeline data & rendering
│   ├── quiz.js                 # Quiz engine, scoring, confetti
│   ├── wizard.js               # Voter registration step wizard
│   ├── chat.js                 # AI chat panel (Gemini API integration)
│   ├── game.js                 # Election word search game
│   ├── new-section.js          # Why Vote, How It Works, Awareness sections
│   └── timeline.js             # Election step-by-step data renderer
│
├── images/
│   └── logo.png                # Chunav Mitra brand logo
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No Node.js, npm, or build tools required

### Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/virajkvk18/chunav-mitra.git

# 2. Navigate into the project
cd chunav-mitra

# 3. Open in your browser
# Option A — Just open the file:
open index.html

# Option B — Serve with a simple local server (recommended):
npx serve .
# or
python3 -m http.server 8000
# then visit http://localhost:8000
```

### Setting Up the AI Chat (Ask Mitra!)

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey) and generate a **free** Gemini API key
2. Open the site and click **"Ask Mitra! 🤖"** in the bottom right
3. Paste your API key (starts with `AIza...`) into the input field and click **Save ✓**
4. Your key is stored only in your browser's `localStorage` — never sent to any external server

---

## 📚 Key Sections

| Section | What it covers |
|---------|---------------|
| **Timeline** | 8-step animated election process from Model Code announcement to result declaration |
| **Election Types** | Lok Sabha, Rajya Sabha, Vidhan Sabha, Vidhan Parishad, Panchayat, Municipal, Presidential, Vice-Presidential |
| **Register** | Step-by-step NVSP registration wizard with document checklist |
| **My Rights** | Voter rights, NOTA, secret ballot, right to information; Duties of a citizen |
| **Why Vote** | Data-driven arguments, impact of a single vote, historical close elections |
| **How It Works** | EVM + VVPAT explainer, polling booth process, counting day |
| **Awareness** | Myth vs. Fact cards, voter turnout statistics, important dates |
| **Quiz** | 10-question interactive quiz with star ratings |
| **Game** | Hidden word search with election vocabulary |

---

## 🤖 AI Integration

The **Ask Mitra!** chat assistant uses the [Google Gemini API](https://ai.google.dev/) with a user-supplied API key. This design choice means:

- **Zero server costs** — no backend needed
- **Complete privacy** — the API key never leaves the user's device
- **Free for users** — Gemini's free tier is sufficient for normal usage

The system prompt instructs Gemini to act as a knowledgeable, friendly Indian election guide that responds in the same language the user writes in.

---

## 🌐 Multilingual Support

Chunav Mitra supports 11 languages via Google Translate integration:

| Language | Script |
|----------|--------|
| Hindi | हिन्दी |
| Tamil | தமிழ் |
| Telugu | తెలుగు |
| Bengali | বাংলা |
| Marathi | मराठी |
| Gujarati | ગુજરાતી |
| Kannada | ಕನ್ನಡ |
| Malayalam | മലയാളം |
| Punjabi | ਪੰਜਾਬੀ |
| Urdu | اردو |
| English | English |

---

## ♿ Accessibility

Chunav Mitra is built with accessibility as a first-class concern:

- ✅ **Skip to main content** link for keyboard users
- ✅ **ARIA roles and labels** on all interactive elements (`role="tab"`, `aria-selected`, `aria-controls`, `aria-expanded`, `aria-live`)
- ✅ **Screen reader only text** (`.sr-only`) for icon-only buttons
- ✅ **Focus-visible rings** with high-contrast orange outline
- ✅ **Semantic HTML** throughout (`<nav>`, `<main>`, `<section>`, `<footer>`, `<button>`, `role="list"`)
- ✅ **Keyboard navigable** quiz, tabs, and wizard
- ✅ **Sufficient colour contrast** in both light and dark modes

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

```bash
# Fork the repo on GitHub, then:
git clone https://github.com/YOUR_USERNAME/chunav-mitra.git
cd chunav-mitra

# Create a feature branch
git checkout -b feature/your-feature-name

# Make your changes, then commit
git add .
git commit -m "feat: describe your change"

# Push and open a Pull Request
git push origin feature/your-feature-name
```

### Ideas for contributions
- Add more quiz questions
- Add more election word game vocabulary
- Improve AI system prompt for more accurate responses
- Add a candidate comparison tool
- Add offline support via Service Worker (PWA)
- Translate static content into more regional languages

---

## ⚠️ Disclaimer

> **Bharat Chunav Mitra is not an official government website.**
> This is an independent civic-tech project built for educational purposes only.
> All official voter registration must be done through [voters.eci.gov.in](https://voters.eci.gov.in) or [nvsp.in](https://www.nvsp.in).
> Information provided is for awareness and educational purposes and may not reflect the most current electoral rules.

---

## 👨‍💻 Author

**Viraj KVK**

[![GitHub](https://img.shields.io/badge/GitHub-virajkvk18-181717?style=flat-square&logo=github)](https://github.com/virajkvk18)

---

<div align="center">

Made with ❤️ for Indian Democracy 🇮🇳

*"Every vote is a voice. Make yours count."*

⭐ **Star this repo if you found it useful!** ⭐

</div>
