import toast from "react-hot-toast";
import css from "./SearchBar.module.css";
import SearchIcon from "../../assets/SearchIcon";
import { FC, FormEvent } from "react";

type SearchBarProps = {
  onSubmit: (searchQuery: string) => void;
};

const SearchBar: FC<SearchBarProps> = ({ onSubmit }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchQuery = (e.target as HTMLFormElement).search.value;
    if (searchQuery.length > 0) {
      onSubmit(searchQuery);
    } else {
      toast.error("Please enter a search query");
    }
  };

  return (
    <header className={css.header}>
      <form className={css.headerForm} onSubmit={handleSubmit}>
        <button className={css.headerButton} type="submit">
          <SearchIcon className={css.headerButtonIcon} />
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

export default SearchBar;
