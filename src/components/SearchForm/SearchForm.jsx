import { useId } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import "./SearchForm.css";

export default function SearchForm({ query, onChange, count }) {
  const id = useId();
  return (
    <form role="search" className="search" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor={id}>Search questions</label>
      <div className="search-row">
        <SearchIcon className="search-icon" aria-hidden="true" />
        <input
          id={id}
          type="text"
          value={query}
          placeholder="search now "
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
          spellCheck={false}
        />
        {query && (
          <button
            type="button"
            className="icon-btn"
            aria-label="Clear search"
            onClick={() => onChange("")}
          >
            <CloseIcon fontSize="small" />
          </button>
        )}
      </div>
      <p
        className={`count${count > 0 && query ? " count-has-results" : ""}`}
        aria-live="polite"
        aria-atomic="true"
      >
        {count} {count === 1 ? "result" : "results"}
      </p>
    </form>
  );
}
