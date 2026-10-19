import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const ROTATING = { chevron: ExpandMoreIcon, arrow: ArrowDownwardIcon, caret: ArrowDropDownIcon };

/** Rotates (chevron/arrow/caret) or crossfades (plus/minus). Animates transform + opacity only. */
export default function StateIcon({ shape, open }) {
  if (shape === "plusminus") {
    return (
      <span className="icon icon-swap" data-open={open} aria-hidden="true">
        <AddIcon className="swap-a" fontSize="inherit" />
        <RemoveIcon className="swap-b" fontSize="inherit" />
      </span>
    );
  }
  const Glyph = ROTATING[shape];
  return (
    <span className="icon icon-rotate" data-open={open} aria-hidden="true">
      <Glyph fontSize="inherit" />
    </span>
  );
}
