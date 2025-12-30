🚀 Tech Stack

React 18

Vite

Material UI (MUI)

Emotion (CSS-in-JS)

Axios

ESLint

JavaScript (ES Modules)

📁 Project Structure
frontend/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md

📦 Installed Dependencies
Main Dependencies

react, react-dom – Core React libraries

@mui/material, @mui/icons-material – Material UI components & icons

@emotion/react, @emotion/styled – Styling engine for MUI

axios – HTTP client

@fontsource/inter – Inter font

web-vitals – Performance metrics

Dev Dependencies

vite – Fast build tool

@vitejs/plugin-react – React support for Vite

eslint – Linting

eslint-plugin-react-hooks

eslint-plugin-react-refresh

@types/react, @types/react-dom

🛠️ Available Scripts
Command	Description
npm run dev	Start development server
npm run build	Build for production
npm run preview	Preview production build
npm run lint	Run ESLint
▶️ Getting Started
1️⃣ Clone the Repository
git clone <your-repository-url>
cd frontend

2️⃣ Install Dependencies
npm install

3️⃣ Start Development Server
npm run dev


The app will run at:

http://localhost:5173

🎨 UI Framework

This project uses Material UI (MUI) with Emotion for styling.
You can customize the theme using ThemeProvider for a consistent and professional look.

🔗 API Integration

API calls are handled using Axios.
Recommended folder:

src/services/


Example:

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default api;

🧹 Linting

Run ESLint to maintain clean and consistent code:

npm run lint

📌 Notes

Project uses ES Modules

Optimized for modern browsers

Suitable for dashboards, admin panels, and professional web apps

👤 Author

Rakesh
Fullstack  Developer