import { useId } from "react";
import Highlight from "../Highlight";
import StateIcon from "./StateIcon";

export default function AccordionItem({
  item,
  open,
  onToggle,
  query,
  Heading,
  iconShape,
  index = 0,
}) {
  const uid = useId();
  const headerId = `${uid}-header`;
  const panelId  = `${uid}-panel`;

  // Stagger entrance: each item enters 40ms later than the previous
  const entranceDelay = `${index * 40}ms`;

  return (
    <div
      className="item"
      data-open={open}
      style={{ "--item-delay": entranceDelay }}
    >
      <Heading className="item-heading">
        <button
          type="button"
          id={headerId}
          className="item-trigger"
          data-accordion-header
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => onToggle(item.id)}
        >
          <span className="item-title">
            <Highlight text={item.q} query={query} />
          </span>
          <StateIcon shape={iconShape} open={open} />
        </button>
      </Heading>

      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className="panel"
        data-open={open}
      >
        <div className="panel-clip">
          <div className="panel-body">
            <p>
              <Highlight text={item.a} query={query} />
            </p>
            {item.code && (
              <pre>
                <code>{item.code}</code>
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
