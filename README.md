# 🏛️ Institutional Crypto Market Terminal

A premium, high-fidelity cryptocurrency portfolio dashboard built with **React.js** and **Tailwind CSS**. This terminal moves away from standard cookie-cutter layouts to deliver an institutional "Midnight Gold" glassmorphism interface, streaming real-time digital asset intelligence.

🚀 **Live Demo:** [View Live Application](https://ayushtriescode.github.io/Crypto-Stock-Tracker/)

---

## 🎨 Design Philosophy & Features

* **Premium Glassmorphism Aesthetic:** Utilizes precise alpha-blended backgrounds (`bg-white/[0.02]`), micro-borders, and radial gradients to create depth without sacrificing performance.
* **True Mobile Responsiveness:** Replaces standard, awkward horizontal table scrolling with a custom **vertical grid-stacking layout** on mobile devices. Data preserves absolute readability across all form factors.
* **Live Handshake Syncing:** Fetches real-time price, 24h trend metrics, and market capitalization valuations directly from the **CoinGecko API**.
* **Timestamp Verification:** Implements conditional state rendering to display a "Last Sync" tracker, providing definitive visual confirmation of data updates.

---

## 🛠️ Technical Architecture

This project was built to master the lifecycle of asynchronous API requests in React, focusing heavily on defensive state management.

### Key Engineering Patterns Implemented:
1. **Defensive Async Lifecycles:** Leverages `try...catch...finally` structures to guarantee the loading spinner state cleanly terminates whether the network request succeeds or hits an API rate limit.
2. **Infinite Render Protection:** Properly isolates the fetch triggers inside a dependency-locked `useEffect` hook to explicitly prevent runtime infinite looping.
3. **Optimized Typography Data Scaling:** Implements tabular monospace font adjustments (`font-mono`) to prevent visual layout shifting or "number-jumping" during pricing updates.

---

## 💻 Tech Stack

* **Frontend Library:** React (Functional Components & Hooks)
* **Styling Engine:** Tailwind CSS 
* **Data Provider:** CoinGecko REST API v3
* **Build Tool/Bundler:** Vite

---

## 📦 Local Installation & Setup

Follow these steps to run the terminal locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/ayushtriescode/Crypto-Stock-Tracker.git](https://github.com/ayushtriescode/Crypto-Stock-Tracker.git)
   cd Crypto-Stock-Tracker