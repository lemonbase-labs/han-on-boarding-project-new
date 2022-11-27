import { createRoot } from "react-dom/client";
import { App } from "./App";
import { serviceWorker } from "./server/browser";

import "antd/dist/antd.css";
import "./index.css";

serviceWorker.start({ onUnhandledRequest: "bypass" });

const container = document.getElementById("root");
const root = createRoot(container as Element);

root.render(<App />);
