# FAQ Schema Markup Implementation

## Overview
Dynamic JSON-LD FAQPage schema injection that updates based on the current language (EN, FI, SV) for improved Google Search visibility and rich results.

## How It Works

### 1. Schema Hook (`src/hooks/use-faq-schema.tsx`)
The `useFAQSchema` hook dynamically injects FAQPage schema into the document `<head>`:

```typescript
useFAQSchema(faqData, "main-faq-schema", {
  language: "en",
  url: "https://bargn.app/"
});
```

**Parameters:**
- `faqData`: Array of Q&A objects from translations
- `schemaId`: Unique ID for the schema script tag
- `options.language`: Current language code (en/fi/sv)
- `options.url`: Current page URL

### 2. Language-Specific Content
The FAQ component pulls questions and answers from the translation context:

```typescript
const { t, language } = useLanguage();

const faqData = [
  {
    question: t("faq.q1"),  // Dynamically translated
    answer: t("faq.a1")      // Based on current language
  },
  // ... 8 total questions
];
```

### 3. Schema Structure
The injected JSON-LD schema follows Google's FAQPage specification:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "inLanguage": "en",
  "url": "https://bargn.app/",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does this 50% off magic actually work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Simple AF. Our AI learns what you're into..."
      }
    }
    // ... 7 more questions
  ]
}
```

## Language Switching Behavior

### When User Changes Language:
1. Language context updates (EN → FI or FI → SV)
2. FAQ component re-renders with new translations
3. `useFAQSchema` hook detects `faqData` change
4. Old schema script removed from `<head>`
5. New language-specific schema injected
6. Google sees updated FAQPage schema

### Example Flow:
```
User clicks FI button
  ↓
language = "fi"
  ↓
faqData updates to Finnish Q&As
  ↓
<script id="main-faq-schema"> removed
  ↓
New Finnish FAQPage schema injected
  ↓
Google indexes Finnish schema
```

## SEO Benefits

### Rich Results Eligibility
- **FAQ Rich Snippets**: Questions appear directly in Google Search
- **Expanded Results**: Click to expand answers without visiting site
- **Enhanced Visibility**: Stand out with structured Q&A in SERPs
- **Multi-Language Support**: Separate schemas for EN, FI, SV markets

### Google Search Console
Monitor performance:
1. Go to Google Search Console
2. Navigate to "Enhancements" → "FAQ"
3. Check valid/invalid FAQ pages
4. See impression/click data for rich results

## Implementation Details

### FAQ Questions (All 8):
1. How does this 50% off magic actually work?
2. Is this actually legit or some sketchy pyramid scheme?
3. What if I'm too broke for the membership fee?
4. Can I cancel anytime or are you gonna hold my money hostage?
5. How many partners do you actually have?
6. What's this AI thing everyone keeps talking about?
7. Do I have to show some embarrassing coupon at checkout?
8. What if a partner doesn't honor the discount?

### Translations Available:
- **English (EN)**: Full sassy tone, 8 Q&As
- **Finnish (FI)**: Full sassy tone, 8 Q&As
- **Swedish (SV)**: Full sassy tone, 8 Q&As

### Schema Validation
Test your schema:
1. Visit: https://validator.schema.org/
2. Input: https://bargn.app/
3. Check for FAQPage validation
4. Ensure no errors/warnings

Or use Google Rich Results Test:
- https://search.google.com/test/rich-results

## Technical Implementation

### Hook Dependencies
```typescript
useEffect(() => {
  // ... schema injection logic
}, [faqItems, schemaId, options?.language, options?.url]);
```

Schema updates when:
- FAQ items change (language switch)
- Schema ID changes
- Language code changes
- URL changes (navigation)

### Cleanup
The hook includes proper cleanup to prevent duplicate schemas:

```typescript
return () => {
  const existingScript = document.getElementById(schemaId);
  if (existingScript) {
    document.head.removeChild(existingScript);
  }
};
```

## Testing

### Manual Testing:
1. Open browser DevTools
2. Navigate to Elements → `<head>`
3. Find `<script id="main-faq-schema" type="application/ld+json">`
4. Verify JSON structure
5. Switch language (EN ↔ FI ↔ SV)
6. Watch schema update in real-time

### Expected Behavior:
- ✅ Schema appears in `<head>` on page load
- ✅ Schema contains 8 questions in current language
- ✅ Schema updates when language switches
- ✅ No duplicate schemas (old removed before new added)
- ✅ Valid JSON-LD structure

## Performance

### Impact:
- **Size**: ~2-3KB per schema (minified JSON)
- **Load Time**: Negligible (<1ms injection)
- **Re-renders**: Only on language change
- **Memory**: Single script tag, cleaned up on unmount

### Optimization:
- Schema only injected once per language
- Removed before new injection (no accumulation)
- Memoized in React component lifecycle
- No external API calls

## Future Enhancements

Potential improvements:
- Add aggregateRating to FAQPage
- Include datePublished/dateModified
- Add author/publisher information
- Implement FAQPage + BreadcrumbList combo
- Track FAQ click-through rates via Google Analytics

## Documentation Links

- [Schema.org FAQPage](https://schema.org/FAQPage)
- [Google FAQ Rich Results](https://developers.google.com/search/docs/appearance/structured-data/faqpage)
- [JSON-LD Specification](https://json-ld.org/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)

## Summary

✅ Dynamic language-specific FAQPage schema  
✅ 8 questions with full answers in EN, FI, SV  
✅ Automatic updates on language switch  
✅ Google Search rich results ready  
✅ Proper cleanup and performance optimization  
✅ Valid JSON-LD structure per Schema.org spec
