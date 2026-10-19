import TuneIcon from "@mui/icons-material/Tune";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Select from "../Select";
import Checkbox from "../Checkbox";
import {
  COUNT_OPTIONS,
  STYLE_OPTIONS,
  ICON_OPTIONS,
  SIZE_OPTIONS,
  POSITION_OPTIONS,
  LEVEL_OPTIONS,
} from "../../constants/options";
import "./OptionsPanel.css";

/**
 * OptionsPanel — rendered inside the AppShell sidebar (desktop) or drawer (mobile).
 * No longer manages its own expand/collapse state — the AppShell owns that on mobile.
 * Accepts an optional onInteract callback that the AppShell uses to auto-close
 * the mobile drawer after any control interaction.
 */
export default function OptionsPanel({ options: o, onChange, anyOpen, onCloseAll, onInteract }) {
  // Wrap onChange so mobile drawer closes after each selection
  const handle = (key, value) => {
    onChange(key, value);
    onInteract?.();
  };

  const handleCloseAll = () => {
    onCloseAll();
    onInteract?.();
  };

  return (
    <nav className="options-panel" aria-label="Accordion options">

      {/* ---- Section: Display ---- */}
      <div className="op-section">
        <div className="op-section-header">
          <TuneIcon className="op-section-icon" fontSize="inherit" aria-hidden="true" />
          <span>Display</span>
        </div>
        <div className="op-section-body">
          <Select
            label="Questions shown"
            value={o.count}
            options={COUNT_OPTIONS}
            numeric
            onChange={(v) => handle("count", v)}
          />
          <Select
            label="Style"
            value={o.style}
            options={STYLE_OPTIONS}
            onChange={(v) => handle("style", v)}
          />
          <Select
            label="Size"
            value={o.size}
            options={SIZE_OPTIONS}
            onChange={(v) => handle("size", v)}
          />
        </div>
      </div>

      {/* ---- Divider ---- */}
      <div className="op-divider" aria-hidden="true" />

      {/* ---- Section: Icons ---- */}
      <div className="op-section">
        <div className="op-section-header">
          <TuneIcon className="op-section-icon" fontSize="inherit" aria-hidden="true" />
          <span>Icons</span>
        </div>
        <div className="op-section-body">
          <Select
            label="Icon shape"
            value={o.icon}
            options={ICON_OPTIONS}
            onChange={(v) => handle("icon", v)}
          />
          <Select
            label="Icon position"
            value={o.pos}
            options={POSITION_OPTIONS}
            onChange={(v) => handle("pos", v)}
          />
          <Select
            label="Heading level"
            value={o.level}
            options={LEVEL_OPTIONS}
            numeric
            onChange={(v) => handle("level", v)}
          />
        </div>
      </div>

      {/* ---- Divider ---- */}
      <div className="op-divider" aria-hidden="true" />

      {/* ---- Section: Behaviour ---- */}
      <div className="op-section">
        <div className="op-section-header">
          <CheckBoxIcon className="op-section-icon" fontSize="inherit" aria-hidden="true" />
          <span>Behaviour</span>
        </div>
        <div className="op-section-body">
          <Checkbox
            label="Allow multiple open"
            checked={o.multiple}
            onChange={(v) => handle("multiple", v)}
          />
          <Checkbox
            label="Close all"
            checked={!anyOpen}
            onChange={(v) => v && handleCloseAll()}
          />
          <Checkbox
            label="Animated"
            checked={o.animated}
            onChange={(v) => handle("animated", v)}
          />
        </div>
      </div>

    </nav>
  );
}
