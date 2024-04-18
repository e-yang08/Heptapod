import classes from "./App.module.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ReloadHome from "./reloadHome";
import { ScrollToTop } from "./utils.js";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <ReloadHome className={classes.App}>
      <ScrollToTop />
      <Header className={classes.headerR} />
      <Outlet />
      <Footer />
    </ReloadHome>
  );
};

export default App;
