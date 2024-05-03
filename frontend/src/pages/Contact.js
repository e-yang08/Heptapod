import classes from "./Contact.module.css";

const Contact = () => {
  return (
    <div className={classes.helpPageRoot}>
      <div className={classes.header}>
        <div className={classes.titleWrapper}>
          <i className={`bi bi-envelope-paper fs-4 ${classes.iconImg}`}></i>
          <div className={classes.titleLetter}>
            Contact <span className={classes.highlightLetter}>us</span>
          </div>
        </div>
        <div className={classes.secondLine}>
          Share your thoughts/concerns with us by filling out this form below.
        </div>
      </div>
      <div className={ classes.formContainer }>
        {/* use contact form from the elfsight form */}
        <div
          class="elfsight-app-8d04d3ca-83b2-4ee1-b95e-59fa9724df2e"
          data-elfsight-app-lazy
        ></div>
      </div>
    </div>
  );
};

export default Contact;
