import classes from "./App.module.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ScrollToTop } from "./utils.js";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className={classes.App}>
      <ScrollToTop />
      <Header className={classes.headerR} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
