# Utilities

Helper functions for common tasks.

## getLinkUrl

Resolves ContentStack link references to URLs.

```typescript
import getLinkUrl from "@/utils/getLinkUrl";

const url = getLinkUrl([
  {
    _content_type_uid: "page",
    uid: "page-uid",
  },
]);
```

## localeMapper

Maps i18n locale codes to ContentStack locale codes.

```typescript
import localeMapper from "@/utils/localeMapper";

const contentstackLocale = localeMapper("en"); // Returns "en-us"
```

## Cache Key Utilities

Utilities for generating cache keys:

```typescript
import { generateCacheKey } from "@/utils/contentStackCacheKey";

const key = generateCacheKey("page", "en-us", "/about");
```

## Error Utilities

Error handling utilities:

```typescript
import { handleContentStackError } from "@/utils/contentStackError";

try {
  // ContentStack operation
} catch (error) {
  handleContentStackError(error);
}
```

