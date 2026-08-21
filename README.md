# AI Assistant UI

This repository contains the Angular frontend for an AI-powered assistant. The app provides a prompt-driven search/RAG workflow and an admin screen for uploading documents, ingesting them into the data store, and refreshing the database.

## What this app does

- Root page: a prompt interface for submitting questions to the AI backend
- Admin page: file upload for PDF, DOC, DOCX, and TXT documents
- Document ingestion and database refresh actions
- Loading and error states for long-running backend operations
- Angular 22 single-page app with SSR support in the project setup

## Tech stack

- Angular 22
- TypeScript
- RxJS
- Angular SSR / Express support
- Prettier for formatting
- Vitest and Angular testing setup

## Project structure

```text
src/
  app/
    admin/              # Admin document upload and data refresh UI
    header/             # Top navigation header
    processing/         # Loading indicator and timer UI
    rag/                # Prompt / RAG interface
    services/           # HTTP clients for backend endpoints
    models/             # Shared response models
    app.constants.ts    # App title and backend endpoint constants
    app.routes.ts       # Route config
    app.ts              # Root app component
  main.ts
  styles.css
angular.json
package.json
```

## Prerequisites

- Node.js 18+
- npm 11+

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Start the Angular dev server:

```bash
npm run start
```

3. Open the app in a browser:

```text
http://localhost:4200
```

## Backend requirements

The UI expects a backend API to be running on localhost:8000. The current Angular client calls these endpoints:

- `GET http://localhost:8000/admin`
- `POST http://localhost:8000/admin/upload-files`
- `GET http://localhost:8000/admin/ingest/documents`
- `GET http://localhost:8000/admin/refresh/database`
- `GET http://localhost:8000/rag?prompt=...`

If the backend is not running, the UI may appear to load but the admin and RAG actions will fail.

## Available scripts

```bash
npm run start          # Angular dev server on port 4200
npm run build          # Production build
npm run watch          # Watch-mode development build
npm run test           # Run the Angular test suite
npm run serve:ssr:ai_app_ui   # Serve the SSR output bundle
```

## Development workflow

Use the Angular CLI for component and service generation:

```bash
npx ng generate component my-component
```

For formatting:

```bash
npx prettier --check "src/**/*.ts"
```

## Notes

- The default app route is the RAG prompt UI.
- The admin route is `/admin`.
- Uploaded file types are limited to PDF, DOC, DOCX, and TXT.
- The app is set up to support SSR, but the main local development flow is the Angular dev server, not the SSR server.

## License

This repository does not currently include a license file.