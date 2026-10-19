const toOptions = (pairs) => pairs.map(([value, label]) => ({ value, label }));

export const COUNT_OPTIONS = [3, 5, 8, 10].map((n) => ({ value: n, label: String(n) }));
export const STYLE_OPTIONS = toOptions([["bordered", "Bordered"], ["filled", "Filled"], ["minimal", "Minimal"], ["separated", "Separated"]]);
export const ICON_OPTIONS = toOptions([["chevron", "Chevron"], ["plusminus", "Plus/Minus"], ["arrow", "Arrow"], ["caret", "Caret"]]);
export const SIZE_OPTIONS = toOptions([["sm", "Small (sm)"], ["md", "Medium (md)"], ["lg", "Large (lg)"]]);
export const POSITION_OPTIONS = toOptions([["start", "Start"], ["center", "Center"], ["end", "End"]]);
export const LEVEL_OPTIONS = [2, 3, 4, 5, 6].map((n) => ({ value: n, label: `H${n}` }));

export const DEFAULT_OPTIONS = {
  count: 8,
  style: "bordered",
  icon: "chevron",
  size: "md",
  pos: "end",
  level: 3,
  multiple: false,
  animated: true,
};
