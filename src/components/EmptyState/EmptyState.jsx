import SearchOffIcon from "@mui/icons-material/SearchOff";
import "./EmptyState.css";

export default function EmptyState({ query, onClear }) {
  return (
    <div className="empty">
      <div className="empty-icon" aria-hidden="true">
        <SearchOffIcon fontSize="inherit" />
      </div>
      <p>No questions match &ldquo;{query}&rdquo;.</p>
      <p>Check the spelling or try a shorter keyword.</p>
      <button type="button" className="btn" onClick={onClear}>
        Clear search
      </button>
    </div>
  );
}
