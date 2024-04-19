import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Help from "./pages/Help";
import Contact from "./pages/Contact";
import OurStory from "./pages/OurStory";
import NoPage from "./pages/NoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NoPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "translation",
        children: [
          {
            path: ":translationId",
            element: <Home />,
          },
        ],
      },
      {
        path: "help",
        element: <Help />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "our-story",
        element: <OurStory />,
      },
    ],
  },
]);

export default router;
