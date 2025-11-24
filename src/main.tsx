import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { register as registerServiceWorker } from "./utils/serviceWorker";

// Register service worker for cache management
if (import.meta.env.PROD) {
  registerServiceWorker();
}

createRoot(document.getElementById("root")!).render(<App />);
