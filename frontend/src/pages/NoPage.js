import Header from "../components/Header";
import Footer from "../components/Footer";
import NoPageCom from "../components/NoPageCom";
import classes from "./NoPage.module.css";

const NoPage = () => {
  return (
    <>
      <Header className={classes.headerR} />
      <NoPageCom />
      <Footer />
    </>
  );
};

export default NoPage;
