import css from "./ErrorMessage.module.css";
import { FC } from "react";

type ErrorMessageProps = {
  errorMessage: string;
};

const ErrorMessage: FC<ErrorMessageProps> = ({ errorMessage }) => {
  return (
    <div className={css.errorMessage}>
      <p>{errorMessage}</p>
    </div>
  );
};

export default ErrorMessage;
