# Accordion Demo

React + Vite accordion with MUI icons, a purple/white theme and a black/dark-purple dark mode.

## Run

```bash
npm install
npm run dev
```

## Structure

```
src/
├── main.jsx                  entry point, loads global styles and font
├── App.jsx                   page layout, wires state to components
├── data/faqs.js              FAQ content (10 items)
├── constants/options.js      select options and default settings
├── utils/escapeRegExp.js     regex helper for search highlighting
├── hooks/useAccordionState.js  open/close logic (single or multiple)
├── styles/
│   ├── tokens.css            all colors, easing, duration (light + dark)
│   └── base.css              reset, page, layout, focus ring, buttons
└── components/
    ├── Accordion/            Accordion, AccordionItem, StateIcon + css
    ├── OptionsPanel/         sidebar with all controls
    ├── SearchForm/           role="search" form
    ├── Select/  Checkbox/    form primitives
    ├── Highlight/            search-match <mark>
    └── EmptyState/           no-results message
```

Change the palette in `src/styles/tokens.css`.
