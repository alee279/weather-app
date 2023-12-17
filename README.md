# Full-stack app template

This template provides boilerplate code for a full-stack TypeScript application using Vite with React and express.

It is configured as a monorepo using [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces), so packages can share dependencies in one big `node_modules` folder instead of having duplicates. It uses [turborepo](https://turbo.build/repo) for pipeline, so you can just run one `npm run dev` to run both a backend and frontend dev server.

# Development

To get started, first run `npm i` to install dependencies.

To start development servers in parallel, run:

```sh
npm run dev
```

To scan your codebase with our ESLint config, run:

```sh
npm run lint
```

# Communicating between ends

We've configured Vite's dev server to use a [proxy](https://vitejs.dev/config/server-options.html#server-proxy) at `/api`, which points at the default backend dev URL.

This means, in development, you can (for example) make a request to a route defined on the backend at `/user` (normally `http://localhost:8000/user`) by hitting `/api/user`, which would otherwise just be `http://localhost:3000/api/user`.

This mirrors what larger projects do in production, putting the backend at the same URL under some extra path or subdomain. It also eliminates a lot of extra URL manipulation work or [CORS problems](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors) you could otherwise encounter.

# Sharing types between ends

If you define types in `apps/backend` you want to use in your frontend – especially useful for building typesafe routes – you can add this line in your frontend `package.json`, in `devDependencies`:

```json
"backend": "*"
```

This allows you to easliy import types, i.e.:

```ts
import type { RouteBody } from 'backend/src/types';
```
