# OctoFit Tracker frontend

The React 19 presentation tier uses Vite and React Router. Start it from the workspace root with `npm run dev --prefix octofit-tracker/frontend`.

In Codespaces, API requests use `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api`. Define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local`, for example:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Restart Vite after changing `.env.local`. If the variable is unset, requests safely fall back to `http://localhost:8000/api` for local development.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
