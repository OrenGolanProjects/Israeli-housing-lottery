# Nominatim Geocoding Examples

## How Nominatim Converts Addresses to Coordinates

### Example 1: Tel Aviv Neighborhood

**Input Address**: `תל אביב, פלורנטין, ישראל`
**Nominatim URL**: `https://nominatim.openstreetmap.org/search?q=תל%20אביב%2C%20פלורנטין%2C%20ישראל&format=json&limit=1&countrycodes=il`

**Expected Response**:

```json
[
  {
    "lat": "32.0853",
    "lon": "34.7818",
    "display_name": "פלורנטין, תל אביב-יפו, תל אביב, ישראל"
  }
]
```

**Result**: Coordinates `[34.7818, 32.0853]` (longitude, latitude)

### Example 2: Jerusalem Project

**Input Address**: `ירושלים, הר הרצל, פרויקט דירות הר הרצל, ישראל`
**Nominatim URL**: `https://nominatim.openstreetmap.org/search?q=ירושלים%2C%20הר%20הרצל%2C%20פרויקט%20דירות%20הר%20הרצל%2C%20ישראל&format=json&limit=1&countrycodes=il`

**Expected Response**:

```json
[
  {
    "lat": "31.7683",
    "lon": "35.2137",
    "display_name": "הר הרצל, ירושלים, ישראל"
  }
]
```

**Result**: Coordinates `[35.2137, 31.7683]`

### Example 3: City Only (Fallback)

**Input Address**: `באר שבע, ישראל`
**Nominatim URL**: `https://nominatim.openstreetmap.org/search?q=באר%20שבע%2C%20ישראל&format=json&limit=1&countrycodes=il`

**Expected Response**:

```json
[
  {
    "lat": "31.2518",
    "lon": "34.7973",
    "display_name": "באר שבע, ישראל"
  }
]
```

**Result**: Coordinates `[34.7973, 31.2518]`

## Rate Limiting

Nominatim allows **1 request per second**. Our system respects this:

```typescript
// Wait 1 second between requests
await sleep(1000); // 1000ms = 1 second

// Process properties sequentially
for (const property of properties) {
  const coordinates = await getPropertyCoordinates(property);
  await sleep(1000); // Wait before next request
}
```

## Caching Benefits

**First Request**: ~1-2 seconds (API call + processing)
**Subsequent Requests**: ~1ms (from cache)

```typescript
// Check cache first
if (coordinateCache.has(cacheKey)) {
  return coordinateCache.get(cacheKey)!; // Instant!
}

// If not in cache, make API call
const coordinates = await fetchNominatim(url);
coordinateCache.set(cacheKey, coordinates); // Store for future use
```

## Error Handling

### No Results Found

```typescript
if (results && results.length > 0) {
  // Success - return coordinates
  return [parseFloat(result.lon), parseFloat(result.lat)];
} else {
  // No results - try city-level search
  return await getCityCoordinates(city);
}
```

### Network Errors

```typescript
// Retry up to 3 times
for (let attempt = 1; attempt <= 3; attempt++) {
  try {
    const response = await fetch(url);
    // ... process response
  } catch (error) {
    if (attempt < 3) {
      await sleep(2000); // Wait 2 seconds before retry
    }
  }
}
```

## Real-World Example

**Property Data**:

```typescript
{
  city: "תל אביב",
  neighborhood: "פלורנטין",
  projectName: "פרויקט דירות פלורנטין"
}
```

**Processing Steps**:

1. **Try**: `תל אביב, פלורנטין, פרויקט דירות פלורנטין, ישראל`
2. **If fails**: `תל אביב, ישראל`
3. **If fails**: Use predefined coordinates for תל אביב
4. **Final fallback**: `[0, 0]`

**Result**: Most properties get precise coordinates, some get city-level coordinates, and all have at least basic coordinates for map display.
