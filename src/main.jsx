import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import GlobalProvider from "./components/Context/GlobalContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </StrictMode>
);