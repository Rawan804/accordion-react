import { useEffect, useCallback, useRef } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import "./AppShell.css";

/**
 * AppShell — single shared layout for the entire app.
 *
 * Desktop (≥ 860px): fixed sidebar on the left, scrollable main content on the right.
 * Mobile  (< 860px): fixed top header with hamburger, slide-in drawer with backdrop.
 *
 * Props:
 *   sidebar  — ReactNode rendered inside the sidebar / drawer
 *   children — ReactNode rendered as the main scrollable content
 *   drawerOpen    — boolean controlled by parent
 *   onDrawerOpen  — () => void
 *   onDrawerClose — () => void
 */
export default function AppShell({
  sidebar,
  children,
  drawerOpen,
  onDrawerOpen,
  onDrawerClose,
}) {
  const drawerRef = useRef(null);
  const hamburgerRef = useRef(null);

  /* ---------- Close on Escape ---------- */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape" && drawerOpen) onDrawerClose();
    },
    [drawerOpen, onDrawerClose]
  );

  /* ---------- Trap focus inside drawer when open ---------- */
  useEffect(() => {
    if (!drawerOpen) return;

    document.addEventListener("keydown", handleKeyDown);

    // Move focus into the drawer so keyboard users can navigate it
    const firstFocusable = drawerRef.current?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [drawerOpen, handleKeyDown]);

  /* ---------- Lock body scroll when drawer open ---------- */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  /* ---------- Backdrop click ---------- */
  const handleBackdropClick = useCallback(
    (e) => {
      // Only close if the click landed directly on the backdrop, not the drawer
      if (e.target === e.currentTarget) onDrawerClose();
    },
    [onDrawerClose]
  );

  return (
    <div className="shell">
      {/* ===== DESKTOP SIDEBAR ===== */}
      <aside className="shell-sidebar" aria-label="Options panel">
        <div className="shell-sidebar-logo">
          <AutoAwesomeIcon className="shell-logo-icon" aria-hidden="true" />
          <span className="shell-logo-text">Accordion</span>
        </div>
        <div className="shell-sidebar-body">
          {sidebar}
        </div>
      </aside>

      {/* ===== MOBILE HEADER ===== */}
      <header className="shell-mobile-header" aria-label="Mobile navigation">
        <button
          ref={hamburgerRef}
          type="button"
          className="shell-hamburger"
          aria-label="Open options menu"
          aria-expanded={drawerOpen}
          aria-controls="shell-drawer"
          onClick={onDrawerOpen}
        >
          <MenuIcon fontSize="inherit" />
        </button>

        <div className="shell-mobile-logo">
          <AutoAwesomeIcon className="shell-logo-icon" aria-hidden="true" />
          <span className="shell-logo-text">Accordion</span>
        </div>
      </header>

      {/* ===== MOBILE DRAWER + BACKDROP ===== */}
      {/* Backdrop */}
      <div
        className={`shell-backdrop${drawerOpen ? " shell-backdrop--open" : ""}`}
        aria-hidden="true"
        onClick={handleBackdropClick}
      />

      {/* Drawer */}
      <div
        id="shell-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Options panel"
        className={`shell-drawer${drawerOpen ? " shell-drawer--open" : ""}`}
      >
        {/* Drawer header */}
        <div className="shell-drawer-header">
          <div className="shell-sidebar-logo">
            <AutoAwesomeIcon className="shell-logo-icon" aria-hidden="true" />
            <span className="shell-logo-text">Accordion</span>
          </div>
          <button
            type="button"
            className="shell-drawer-close"
            aria-label="Close options menu"
            onClick={onDrawerClose}
          >
            <CloseIcon fontSize="inherit" />
          </button>
        </div>

        {/* Drawer body — same sidebar content */}
        <div className="shell-drawer-body">
          {sidebar}
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <main className="shell-main" id="main-content">
        <div className="shell-main-inner">
          {children}
        </div>
      </main>
    </div>
  );
}
