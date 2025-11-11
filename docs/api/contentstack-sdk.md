# ContentStack SDK

Core SDK utilities for interacting with ContentStack.

## Stack Instance

The ContentStack stack instance is available through the plugin:

```vue
<script setup lang="ts">
const { $stack } = useNuxtApp();
// Use $stack to interact with ContentStack
</script>
```

## Query Functions

### fetchSingleEntry

Fetch a single entry from ContentStack.

```typescript
import { fetchSingleEntry } from "@/utils/fetchSingleEntry";

const entry = await fetchSingleEntry({
  contentTypeUid: "page",
  entryUid: "entry-uid",
  language: "en-us",
});
```

### fetchMultipleEntries

Fetch multiple entries from ContentStack.

```typescript
import { fetchMultipleEntries } from "@/utils/fetchMultipleEntries";

const entries = await fetchMultipleEntries({
  contentTypeUid: "page",
  language: "en-us",
  query: {
    limit: 10,
  },
});
```

### fetchAllEntries

Fetch all entries of a content type.

```typescript
import { fetchAllEntries } from "@/utils/fetchAllEntries";

const entries = await fetchAllEntries({
  contentTypeUid: "page",
  language: "en-us",
});
```

## Error Handling

All query functions include comprehensive error handling. Errors are automatically logged and can be caught:

```typescript
try {
  const entry = await fetchSingleEntry({...});
} catch (error) {
  // Handle error
}
```

