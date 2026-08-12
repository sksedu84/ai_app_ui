# AI App UI

A frontend user interface built with Angular. This repository contains the UI for the AI App, including an optional server-side rendering (SSR) entry point and an Express-based server for production SSR.

Key points
- Angular v22.x (CLI v22.1.2)
- TypeScript
- Vitest for unit testing (dev dependency)
- SSR support via Express (see `serve:ssr:ai_app_ui` script)

Tech stack
- Angular @22
- TypeScript
- Express (for SSR)
- Vitest (testing)

Prerequisites
- Node.js (>=18)
- npm (this project used npm@11.16.0; using a modern npm is recommended)

Quick start
1. Install dependencies:

```bash
npm install
```

2. Start development server (live-reload):

```bash
npm run start
# or
ng serve
```
Open http://localhost:4200 in a browser.

Development helpers
- Generate components, services, etc. with the Angular CLI, e.g.:

```bash
ng generate component my-component
```

Build
- Development build (watch):

```bash
npm run watch
```

- Production build:

```bash
npm run build
```

Server-side rendering (SSR)
- After building the app (ensure SSR/server bundle is produced), run the SSR server:

```bash
npm run build
npm run serve:ssr:ai_app_ui
```
This runs the Node server at the path configured in the dist folder (script: `node dist/ai_app_ui/server/server.mjs`). Adjust deployment steps if you use a custom server or platform.

Testing
- Run unit tests:

```bash
npm run test
```

Note: the project includes Vitest as a dev dependency; test configuration may be wired into Angular tooling.

Formatting & tools
- Prettier is included as a dev dependency. Run it via npx or your editor integration:

```bash
npx prettier --check "src/**/*.ts"
```

Repository scripts (from package.json)
- npm run start — ng serve (development)
- npm run build — ng build (production build)
- npm run watch — ng build --watch --configuration development
- npm run test — ng test
- npm run serve:ssr:ai_app_ui — node dist/ai_app_ui/server/server.mjs

Contributing
- Open issues or create pull requests. Follow typical GitHub workflows:
  1. Fork the repository
  2. Create a feature branch
  3. Run tests and ensure formatting
  4. Open a pull request with a clear description

License
- No license specified in this repository. Add a LICENSE file (for example, MIT) if you intend to make this project open source.

Troubleshooting
- If the dev server fails to start, ensure dependencies are installed and your Node/npm versions meet the prerequisites.
- If SSR fails to start after build, verify the server bundle exists at `dist/ai_app_ui/server/` and that `node` can run ESM modules (use a recent Node version).

Contact
- For questions about this repo, add an issue or contact the maintainer.

---

(Consider adding a LICENSE file and a short CONTRIBUTING.md for contributor guidance.)
