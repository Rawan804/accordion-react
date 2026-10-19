import { useCallback, useMemo, useState } from "react";
import { FAQS } from "./data/faqs";
import { DEFAULT_OPTIONS } from "./constants/options";
import { useAccordionState } from "./hooks/useAccordionState";
import { useTheme } from "./hooks/useTheme";
import AppShell from "./components/AppShell";
import Accordion from "./components/Accordion";
import OptionsPanel from "./components/OptionsPanel";
import SearchForm from "./components/SearchForm";
import EmptyState from "./components/EmptyState";
import CodePreview from "./components/CodePreview";

export default function App() {
  const [options, setOptions]   = useState(DEFAULT_OPTIONS);
  const [query, setQuery]       = useState("");
  const [drawerOpen, setDrawer] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const { openIds, toggle, closeAll, keepFirstOpen } = useAccordionState(["q1"], options.multiple);

  const setOption = useCallback((key, value) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
    if (key === "multiple" && !value) keepFirstOpen(FAQS.map((f) => f.id));
  }, [keepFirstOpen]);

  const openDrawer  = useCallback(() => setDrawer(true),  []);
  const closeDrawer = useCallback(() => setDrawer(false), []);

  const term = query.trim();

  const visible = useMemo(() => {
    const q = term.toLowerCase();
    const pool = FAQS.slice(0, options.count);
    if (!q) return pool;
    return pool.filter((f) =>
      [f.q, f.a, f.code || ""].some((text) => text.toLowerCase().includes(q))
    );
  }, [term, options.count]);

  const sidebar = (
    <OptionsPanel
      options={options}
      onChange={setOption}
      anyOpen={openIds.size > 0}
      onCloseAll={closeAll}
      /* Auto-close the mobile drawer after any control interaction */
      onInteract={closeDrawer}
    />
  );

  return (
    <div className="page">
      <AppShell
        sidebar={sidebar}
        drawerOpen={drawerOpen}
        onDrawerOpen={openDrawer}
        onDrawerClose={closeDrawer}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      >
        <h1>Help center</h1>
        <SearchForm query={query} onChange={setQuery} count={visible.length} />
        {visible.length ? (
          <Accordion
            items={visible}
            openIds={openIds}
            onToggle={toggle}
            query={term}
            options={options}
          />
        ) : (
          <EmptyState query={term} onClear={() => setQuery("")} />
        )}

        {/* ---- Code preview panel ---- */}
        <CodePreview options={options} itemCount={visible.length} />
      </AppShell>
    </div>
  );
}
