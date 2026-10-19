import { useCallback, useState } from "react";

/** Tracks which items are open. `multiple` decides if opening one closes the rest. */
export function useAccordionState(initialOpen = [], multiple = false) {
  const [openIds, setOpenIds] = useState(() => new Set(initialOpen));

  const toggle = useCallback((id) => {
    setOpenIds((prev) => {
      const next = new Set(multiple ? prev : []);
      if (prev.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, [multiple]);

  const closeAll = useCallback(() => setOpenIds(new Set()), []);

  /** Keep only the first open item, following the given display order. */
  const keepFirstOpen = useCallback((orderedIds) => {
    setOpenIds((prev) => {
      const first = orderedIds.find((id) => prev.has(id));
      return new Set(first ? [first] : []);
    });
  }, []);

  return { openIds, toggle, closeAll, keepFirstOpen };
}
