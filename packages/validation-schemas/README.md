# @alex-dispatch/contracts

Shared API contracts for backend and frontend.

## What is inside

- Zod schemas for runtime validation
- TypeScript types inferred from those schemas

## Usage

```ts
import {
  CreateDispatchInputSchema,
  type CreateDispatchInput
} from '@alex-dispatch/validation-schemas';

const payload: unknown = JSON.parse(requestBody);
const data: CreateDispatchInput = CreateDispatchInputSchema.parse(payload);
```

## Local linking example (without monorepo workspaces)

From backend/frontend package:

```json
{
  "dependencies": {
    "@alex-dispatch/contracts": "file:../packages/validation-schemas"
  }
}
```

Then install dependencies and build contracts package:

```bash
cd packages/validation-schemas && npm install && npm run build
```
