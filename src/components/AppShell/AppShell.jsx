import { useEffect, useCallback, useRef } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccordionBrandIcon from "./AccordionBrandIcon";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import "./AppShell.css";

export default function AppShell({
  sidebar,
  children,
  drawerOpen,
  onDrawerOpen,
  onDrawerClose,
  isDark,
  onToggleTheme,
}) {
  const drawerRef    = useRef(null);
  const hamburgerRef = useRef(null);

  const handleKeyDown = useCallback(
    (e) => { if (e.key === "Escape" && drawerOpen) onDrawerClose(); },
    [drawerOpen, onDrawerClose]
  );

  useEffect(() => {
    if (!drawerOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    const first = drawerRef.current?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    first?.focus();
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [drawerOpen, handleKeyDown]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const handleBackdropClick = useCallback(
    (e) => { if (e.target === e.currentTarget) onDrawerClose(); },
    [onDrawerClose]
  );

  /* Single reusable icon-only toggle button */
  const ThemeToggleIcon = () => (
    <button
      type="button"
      className="shell-theme-toggle"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      onClick={onToggleTheme}
    >
      {isDark
        ? <LightModeIcon className="shell-theme-toggle-icon" aria-hidden="true" />
        : <DarkModeIcon  className="shell-theme-toggle-icon" aria-hidden="true" />
      }
    </button>
  );

  return (
    <div className="shell">

      {/* ===== DESKTOP SIDEBAR ===== */}
      <aside className="shell-sidebar" aria-label="Options panel">
        {/* Sidebar logo bar — logo left, theme icon right */}
        <div className="shell-sidebar-logo">
          <AccordionBrandIcon className="shell-logo-icon" />
          <span className="shell-logo-text">Accordion</span>
          <ThemeToggleIcon />
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

        {/* Theme toggle — far right of mobile header */}
        <ThemeToggleIcon />
      </header>

      {/* ===== BACKDROP ===== */}
      <div
        className={`shell-backdrop${drawerOpen ? " shell-backdrop--open" : ""}`}
        aria-hidden="true"
        onClick={handleBackdropClick}
      />

      {/* ===== MOBILE DRAWER ===== */}
      <div
        id="shell-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Options panel"
        className={`shell-drawer${drawerOpen ? " shell-drawer--open" : ""}`}
      >
        <div className="shell-drawer-header">
          <div className="shell-sidebar-logo">
            <AccordionBrandIcon className="shell-logo-icon" />
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
