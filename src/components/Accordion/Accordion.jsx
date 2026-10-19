import { useCallback, useRef } from "react";
import AccordionItem from "./AccordionItem";
import "./Accordion.css";

export default function Accordion({ items, openIds, onToggle, query, options }) {
  const ref = useRef(null);
  const Heading = `h${options.level}`;

  // Arrow Up/Down move focus between headers; Home/End jump to first/last
  const onKeyDown = useCallback((e) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) return;
    const heads = [...ref.current.querySelectorAll("[data-accordion-header]")];
    const i = heads.indexOf(document.activeElement);
    if (i === -1) return;
    e.preventDefault();
    const target = {
      ArrowDown: (i + 1) % heads.length,
      ArrowUp: (i - 1 + heads.length) % heads.length,
      Home: 0,
      End: heads.length - 1,
    }[e.key];
    heads[target].focus();
  }, []);

  return (
    <div className="acc-wrap" data-style={options.style} data-size={options.size} data-pos={options.pos} data-animated={options.animated}>
      <div className="accordion" ref={ref} onKeyDown={onKeyDown}>
        {items.map((item, index) => (
          <AccordionItem
            key={item.id}
            item={item}
            open={openIds.has(item.id)}
            onToggle={onToggle}
            query={query}
            Heading={Heading}
            iconShape={options.icon}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
