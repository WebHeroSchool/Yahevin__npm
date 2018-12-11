# Workflow for building web application

- Handelbars
- PostCSS
	- Assets
    - Nested
     - Sorting
     - Short
     - StyleLint
     - Reporter
     - Autoprefixer
 - ESLint
 - Gulp
 - Browser-sync

## Global dependencies
You must have installed: `node`, `npm`, `gulp`.
<hr>

## Project structure
- `src`
    - `assets`
    - `fonts`
    - `scripts`
    - `styles`
    - `templates`
        - `footer`
        - `header`
        - `side`
    - `StyleRules` /  stylilint rules
    - `ESRULES` / eslint rules
    - `env.json` / NODE_ENV file
    - `data.json` / Handlebar context
    - `index.hbs` / entry point
- `build`
 