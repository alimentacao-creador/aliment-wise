import React from 'react';
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./lib/i18n";

// Initialize language from localStorage
const savedLanguage = localStorage.getItem('language');
if (savedLanguage) {
  import('./lib/i18n').then((i18n) => {
    i18n.default.changeLanguage(savedLanguage);
  });
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
