import { useState, useCallback, useMemo } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import CodeIcon from "@mui/icons-material/Code";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./CodePreview.css";

/* ============================================================
   Token types → CSS class names
   ============================================================ */
const CLS = {
  keyword:   "tok-keyword",
  component: "tok-component",
  prop:      "tok-prop",
  string:    "tok-string",
  comment:   "tok-comment",
  punct:     "tok-punct",
  fn:        "tok-fn",
  num:       "tok-number",
  bool:      "tok-bool",
  plain:     "",
};

/* ============================================================
   Token helpers — build a single token object
   ============================================================ */
const kw   = (t) => ({ text: t, type: "keyword"   });
const comp = (t) => ({ text: t, type: "component" });
const prop = (t) => ({ text: t, type: "prop"      });
const str  = (t) => ({ text: t, type: "string"    });
const fn   = (t) => ({ text: t, type: "fn"        });
const num  = (t) => ({ text: t, type: "num"       });
const bool = (t) => ({ text: t, type: "bool"      });
const p    = (t) => ({ text: t, type: "punct"     });
const pl   = (t) => ({ text: t, type: "plain"     });
const cmt  = (t) => ({ text: t, type: "comment"   });

/* ============================================================
   Core: derive token lines from current options
   Returns: Line[]  where Line = Token[]
   ============================================================ */
function buildLines(options, itemCount) {
  const { style, icon, size, pos, level, multiple, animated, count } = options;

  // Format a string prop line:  "  propName="value""
  const strProp  = (name, val) => [pl("  "), prop(name), p("="), str(`"${val}"`)];
  // Format a bool prop line:    "  propName={true}"
  const boolProp = (name, val) => [pl("  "), prop(name), p("={"), bool(String(val)), p("}")];
  // Format a number prop line:  "  propName={8}"
  const numProp  = (name, val) => [pl("  "), prop(name), p("={"), num(String(val)), p("}")];

  const lines = [
    // import line

    [],
    // items comment
    [cmt(`// ${itemCount} FAQ item${itemCount !== 1 ? "s" : ""} currently shown`)],
    [],
    // opening tag
    [p("<"), comp("Accordion")],
    // items prop
    [pl("  "), prop("items"), p("={"), pl("items"), p("}")],
    // style / variant
    strProp("style", style),
    // icon
    strProp("icon", icon),
    // size
    strProp("size", size),
    // icon position
    strProp("iconPosition", pos),
  ];

  // headingLevel — only show when not default (3)
  if (level !== 3) {
    lines.push(numProp("headingLevel", level));
  }

  // count — only show when not default (8)
  if (count !== 8) {
    lines.push(numProp("count", count));
  }

  // multiple
  lines.push(boolProp("multiple", multiple));

  // animated
  lines.push(boolProp("animated", animated));

  // closing tag
  lines.push([p("/>")] );

  return lines;
}

/* ============================================================
   Flatten tokenised lines → plain string (for clipboard)
   ============================================================ */
function toPlainText(lines) {
  return lines.map((toks) => toks.map((t) => t.text).join("")).join("\n");
}

/* ============================================================
   Component
   ============================================================ */
export default function CodePreview({ options, itemCount = 0 }) {
  const [copied,   setCopied]   = useState(false);
  const [expanded, setExpanded] = useState(true);

  // Recompute lines whenever options or itemCount change
  const lines = useMemo(
    () => buildLines(options, itemCount),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(options), itemCount]
  );

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(toPlainText(lines));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
  }, [lines]);

  const toggleExpand = useCallback(() => setExpanded((v) => !v), []);

  return (
    <section className="cp-root" aria-label="Live code preview">

      {/* ---- Header bar ---- */}
      <div className="cp-header">
        <div className="cp-header-left">
          <CodeIcon className="cp-header-icon" aria-hidden="true" />
          <span className="cp-filename">Accordion.jsx</span>
          <span className="cp-lang-badge">jsx</span>
          <span className="cp-live-dot" title="Updates live" aria-label="Live preview" />
        </div>

        <div className="cp-header-right">
          {/* Copy button */}
          <button
            type="button"
            className={`cp-copy-btn${copied ? " cp-copy-btn--done" : ""}`}
            aria-label={copied ? "Copied!" : "Copy code"}
            onClick={handleCopy}
          >
            {copied ? (
              <><CheckIcon className="cp-copy-icon" aria-hidden="true" /><span>Copied!</span></>
            ) : (
              <><ContentCopyIcon className="cp-copy-icon" aria-hidden="true" /><span>Copy</span></>
            )}
          </button>

          {/* Expand / collapse toggle */}
          <button
            type="button"
            className="cp-toggle-btn"
            aria-label={expanded ? "Collapse code preview" : "Expand code preview"}
            aria-expanded={expanded}
            onClick={toggleExpand}
          >
            <ExpandMoreIcon
              className="cp-toggle-icon"
              aria-hidden="true"
              style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </button>
        </div>
      </div>

      {/* ---- Collapsible code body ---- */}
      <div className={`cp-body-wrap${expanded ? " cp-body-wrap--open" : ""}`}>
        <div className="cp-body">
          <pre className="cp-pre" tabIndex={0} aria-label="Generated JSX code">
            <table className="cp-table" aria-hidden="true">
              <tbody>
                {lines.map((tokens, lineIdx) => (
                  <tr key={lineIdx} className="cp-line">
                    <td className="cp-ln">{lineIdx + 1}</td>
                    <td className="cp-code">
                      {tokens.length === 0 ? (
                        <span className="cp-empty-line">&nbsp;</span>
                      ) : (
                        tokens.map((tok, ti) => (
                          <span key={ti} className={CLS[tok.type] || ""}>
                            {tok.text}
                          </span>
                        ))
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </pre>
        </div>
      </div>

    </section>
  );
}
