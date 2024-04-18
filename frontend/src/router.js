import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import HomeEmoji from "./pages/HomeEmoji";
import Help from "./pages/Help";
import NoPage from "./pages/NoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NoPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: ":translationId",
        element: <HomeEmoji />,
      },
      {
        path: "help",
        element: <Help />,
      },
    ],
  },
]);

export default router;
