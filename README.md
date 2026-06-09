# Google Forms Clone

A simplified Google Forms clone for creating forms, filling them out, and viewing responses.

---

## Tech Stack

| Technology         | Purpose                   |
| ------------------ | ------------------------- |
| React + TypeScript | UI and type safety        |
| Redux Toolkit      | State management          |
| RTK Query          | Data fetching and caching |
| React Router       | Client-side routing       |
| Tailwind CSS       | Styling                   |
| Node.js + Express  | HTTP server               |
| Apollo Server      | GraphQL server            |
| GraphQL            | API query language        |
| npm workspaces     | Monorepo management       |

---

## Project Structure

```
google-forms-clone/
├── client/            # React application
├── server/            # GraphQL server
└── packages/
    └── shared/        # Shared TypeScript types
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 8+

### 1. Clone the repository

```bash
git clone https://github.com/твой-юзернейм/google-forms-clone.git
cd google-forms-clone
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

- Client: http://localhost:5173
- GraphQL Playground: http://localhost:4000/graphql

---

## Architecture Notes

**Why RTK Query endpoints are written manually instead of codegen**

During development a bug was found in `@graphql-codegen/typescript-rtk-query` — it generates usage of `TypedDocumentString` but never defines it, causing compilation errors. Additionally `typescript` and `typescript-operations` plugins generate duplicate types into the same file. Endpoints are written manually via `api.injectEndpoints` with the same result and full type safety.

**Why `FormResponse` instead of `Response`**

The name `Response` conflicts with the browser's built-in fetch API interface, so it was renamed to `FormResponse` in `@forms/shared`.

**Data persistence**

The server uses an in-memory store — data is lost on server restart.
