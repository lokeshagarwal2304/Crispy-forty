
## 🧩 **Project Title: Crispy-Forty – The 40-Level Mind-Bending Puzzle Game**
[Tap ME - Get Blind in Adventure](https://crispy-forty-game.vercel.app/)
---

### 🚀 **Overview**
**Crispy-Forty** is a browser-based interactive puzzle adventure game where users must solve **40 crisp and uniquely styled levels**. Each level offers a challenge in the form of a riddle, logic puzzle, timed maze, or hidden clue scenario. Designed using **HTML, CSS, JS (or React)** with **GSAP / Framer Motion animations**, the game focuses on clean visuals, smooth transitions, and brain-teasing interactivity.

---

### 🎯 **Key Features**

| Feature                        | Description                                                                 |
|-------------------------------|-----------------------------------------------------------------------------|
| 🧠 40 Logic Levels             | Levels range from math puzzles, riddles, pattern recognition to mazes.     |
| 🕹️ React-based UI              | Built with React for state management and smooth routing.                  |
| 🎨 Crispy UI/UX                | Minimalist, animated transitions, progress indicators, sound effects.      |
| ⏱️ Timer & Score System        | Some levels are timed. Leaderboard for scores (local storage or Firebase). |
| 🧩 Hint System                 | Limited hints available per level or after retrying.                       |
| 🔒 Unlock-as-you-go Flow       | Cannot skip levels. Solving one unlocks the next.                         |
| 📱 Responsive Design           | Mobile-friendly gameplay.                                                  |
| 🖼️ Level Themes                | Each level has a unique visual theme (e.g., neon, paper, dark mode).       |
| 🧠 AI-Generated Riddles (Optional) | Use GPT to generate new riddles dynamically.                          |

---
### **Demo**
Home Page ![image](https://github.com/user-attachments/assets/171b256b-2997-49bf-842b-3dba7e6a9c1b)
Random LEVELup ![image](https://github.com/user-attachments/assets/51996553-7033-4f13-a0ae-fd1c74d86585)
Kudoos ![image](https://github.com/user-attachments/assets/3e0f3a63-2d90-4419-b128-966bb43f4606)

---


### ⚙️ **Tech Stack**

| Stack Part       | Technology                         |
|------------------|-------------------------------------|
| Frontend         | React (or HTML/CSS/JS for simpler version) |
| Animation        | GSAP or Framer Motion               |
| State Management | React Context / Redux (optional)    |
| Storage          | Local Storage or Firebase Realtime DB |
| Routing          | React Router                        |
| Build Tool       | Vite / CRA                          |
| Hosting          | Netlify / Vercel                    |


[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/lokeshagarwal2304s-projects/v0-crispy-forty-ui-design)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/Uetcnm3ZkaP)
GROW TOGETHER

---

### 🧪 **Sample Level Ideas**

| Level | Type                 | Description                                                                 |
|-------|----------------------|-----------------------------------------------------------------------------|
| 1     | Pattern Logic        | "What comes next: 2, 4, 8, 16, ?"                                           |
| 5     | Timed Maze           | Navigate a maze using keyboard arrows within 20 seconds.                    |
| 10    | Image Puzzle         | Rearrange tiles to form a crisp logo or phrase.                            |
| 15    | Code Riddle          | Solve a riddle by inspecting browser console or elements.                  |
| 20    | Light Control        | Toggle switches in correct sequence to unlock.                             |
| 25    | Cipher Decode        | Crack a Caesar cipher message.                                             |
| 30    | Drag & Drop Puzzle   | Arrange draggable elements to match a pattern.                             |
| 35    | Audio Clue           | Solve based on a sound clue.                                               |
| 40    | Final Boss Level     | Mix of all types. Includes hints, a countdown, and a dynamic background.   |

---

### 💡 **Game Flow**

1. **Landing Page**  
   - Game title + Start Button + About Game + High Score Board.

2. **Level Page**  
   - Puzzle UI + Timer + Input box/button + Hint button.

3. **Correct Answer Popup**  
   - “You did it!” animation and auto-redirect to next level.

4. **Wrong Answer**  
   - Shake effect or red glow with retry message.

5. **Level Completion Screen (Every 10 levels)**  
   - Motivational quote + Progress bar + Share option.

6. **Leaderboard**  
   - Best times / scores (optional if using Firebase).

---

### ✨ **Unique Selling Points (USP)**

- Combines logic, design, and interactivity.
- Great for resumes or portfolios (especially frontend devs).
- Scalable – you can add more levels or turn it into a multiplayer challenge later.
- Can be turned into a mobile app using React Native or PWA.

---

### 📁 **Folder Structure (React Version)**

```
crispy-forty/
├── public/
│   └── assets/ (images, sound)
├── src/
│   ├── components/
│   │   └── PuzzleCard, Timer, HintBox, etc.
│   ├── levels/
│   │   └── Level1.js to Level40.js
│   ├── routes/
│   │   └── LevelRouter.js
│   ├── utils/
│   │   └── riddles.js, checkAnswer.js
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

---

### 🌟 **Enhancement Ideas**
- 🌐 Add multilingual riddle support.
- 🎙️ Voice-command based puzzles (Web Speech API).
- 🧠 GPT-4-powered riddle generation.
- 🏆 Weekly challenges or live tournaments.
