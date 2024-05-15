import css from "./ErrorMessage.module.css";
import propTypes from "prop-types";

const ErrorMessage = ({ errorMessage }) => {
  return (
    <div className={css.errorMessage}>
      <p>{errorMessage}</p>
    </div>
  );
};

ErrorMessage.propTypes = {
  errorMessage: propTypes.string.isRequired,
};

export default ErrorMessage;
