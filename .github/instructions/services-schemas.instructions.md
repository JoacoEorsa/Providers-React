---
applyTo: "**/services/**/schemas.ts"
---

# Schemas Files Instructions

Zod validation schemas. Use getter functions for schemas with i18n.

## Key Conventions

- [ ] Use `z` from `zod` for all schemas
- [ ] Base schemas without i18n can be constants
- [ ] Schemas with i18n MUST be getter functions (e.g., `getUserFormSchema()`)
- [ ] Import `i18n` from `@/i18n` for translations
- [ ] Don't manually define types here (use types.ts with `z.infer`)
- [ ] For enums: Both object and tuple array formats work with `z.enum()` - don't convert between them

## ✅ DO

```typescript
import { z } from "zod";

import i18n from "@/i18n";

// Base schema without i18n - can be a constant
export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.email(),
});

// Schema with i18n - MUST be a getter function
export const getUserFormSchema = () => {
  return userSchema.omit({ id: true }).extend({
    email: z.email({
      message: i18n.t("form.errors.invalidField", { field: i18n.t("form.email") }),
    }),
  });
};

// Filter schemas (usually no i18n)
export const usersFilterSchema = z.object({
  searchText: z.string().optional(),
  status: z.enum(["active", "inactive"]).optional(),
});
```

## ❌ DON'T

```typescript
// ❌ Don't use i18n in constant schemas - translations may not be loaded
export const userFormSchema = z.object({
  email: z.email({
    message: i18n.t("form.errors.invalidField"), // ❌ i18n not ready at module load
  }),
});

// ❌ Don't manually type when you can use Zod
export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
});
type User = { id: number; name: string }; // ❌ Redundant, use z.infer in types.ts
```

## Enums in Zod v4

**⚠️ IMPORTANT:** Zod v4 supports `z.enum()` with BOTH formats. Don't suggest converting between them.

✅ **Both formats work:**

```typescript
// Object format
export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
} as const;

const schema1 = z.object({
  role: z.enum(USER_ROLES), // ✅ Works directly
});

// Tuple array format
export const STATUS = ["active", "inactive"] as const;

const schema2 = z.object({
  status: z.enum(STATUS), // ✅ Also works
});
```