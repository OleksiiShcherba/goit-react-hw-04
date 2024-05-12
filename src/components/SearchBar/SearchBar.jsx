import propTypes from "prop-types";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";
import searchIcon from "../../assets/searchIcon.svg";

const SearchBar = ({ onSubmit }) => {
  const handelSubmit = (e) => {
    e.preventDefault();
    if (e.target.search.value.length > 0) {
      onSubmit(e.target.search.value);
    } else {
      toast.error("Please enter a search query");
    }
  };

  return (
    <header className={css.header}>
      <form className={css.headerForm} onSubmit={(e) => handelSubmit(e)}>
        <button className={css.headerButton} type="submit">
          <img className={css.headerButtonIcon} src={searchIcon} />
        </button>
        <input
          className={css.headerInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};

export default SearchBar;
