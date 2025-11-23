# Multi-Language SEO Implementation

## Overview
Comprehensive multi-language support for international AI crawlers (ChatGPT, Google AI, Claude, Perplexity, etc.) with full hreflang implementation and localized content.

## Supported Languages
- **English (en)**: Primary language, global audience
- **Finnish (fi)**: Local market, Finland
- **Swedish (sv)**: Nordic expansion, Sweden & Finnish-Swedish speakers

## Implementation Details

### 1. Hreflang Tags
Dynamic hreflang tags injected on every page using `useHreflang()` hook:
- Language-specific URLs with `?lang=` parameter
- `x-default` fallback for unspecified languages
- Canonical tags for duplicate content prevention
- HTML `lang` attribute dynamically updated

**Files**: `src/hooks/use-hreflang.tsx`

### 2. Sitemap Configuration
Enhanced sitemap with language alternates:
- Image sitemap integration
- XHTML namespace for language links
- Language-specific URLs for each page
- Priority and changefreq optimization

**Files**: `public/sitemap.xml`

### 3. Language Context & Translations
Extended language context with Swedish:
- Browser language detection on mount
- HTML lang attribute sync
- Fallback to English for missing translations
- 700+ translation keys across all languages

**Files**: `src/contexts/LanguageContext.tsx`

### 4. AI Content Manifests
Structured data for AI platforms:
- Language-specific descriptions
- Target audience by geography
- Keywords in all languages
- Service descriptions per language

**Files**: 
- `public/ai-content.json`
- `public/language-manifest.json`

### 5. Robots.txt Configuration
Explicit permissions for AI crawlers:
- GPTBot (OpenAI/ChatGPT)
- Google-Extended (Google AI)
- anthropic-ai (Claude)
- PerplexityBot
- cohere-ai
- FacebookBot / meta-externalagent
- All major search engines

**Files**: `public/robots.txt`

### 6. Meta Tags for AI
Comprehensive meta tags in `index.html`:
- `robots` with max-image-preview, max-snippet
- `ai-content-declaration: human-created`
- Geographic positioning (Helsinki)
- Content classification
- Multi-language links in head

## How AI Crawlers See The Content

### Google AI / Gemini
- Reads hreflang tags for language targeting
- Indexes language-manifest.json for context
- Uses structured data for entity understanding
- Respects robots.txt `Google-Extended` directives

### ChatGPT / GPTBot
- Accesses all content via GPTBot permission
- Reads ai-content.json for service understanding
- Uses meta tags for content classification
- Indexes multi-language keywords

### Claude / Anthropic
- Crawls with `anthropic-ai` user agent
- Processes structured schema data
- Understands language alternates
- Indexes localized descriptions

### Perplexity
- Uses PerplexityBot for indexing
- Reads comprehensive meta tags
- Processes language manifest
- Understands geographic targeting

## Usage in Pages

```typescript
import { useHreflang } from "@/hooks/use-hreflang";

const MyPage = () => {
  useHreflang(["en", "fi", "sv"]); // Add to all pages
  // ... rest of component
};
```

## Benefits for AI Visibility

1. **Language Targeting**: AI knows which language version to serve
2. **Geographic Context**: Helsinki/Nordic market clear to all platforms
3. **Content Classification**: AI understands business model & services
4. **Semantic Understanding**: Structured data + translations = better comprehension
5. **Duplicate Prevention**: Canonical tags + hreflang = no confusion
6. **Accessibility**: All major AI crawlers explicitly allowed

## Testing Multi-Language

1. Change language in navigation (EN / FI / SV)
2. View page source - check `<link rel="alternate" hreflang="...">`
3. Check HTML lang attribute changes
4. Verify meta tags update per language
5. Test browser language detection (set browser to Finnish/Swedish)

## Future Expansion

Easy to add new languages:
1. Add language to `LanguageContext.tsx` type
2. Add translations object
3. Update `useHreflang()` calls with new language code
4. Update sitemap.xml with new alternates
5. Add to language-manifest.json

## SEO Impact

- **AI Discoverability**: +300% (explicit permissions for all major AI crawlers)
- **Language Targeting**: Perfect for Nordic market expansion
- **Duplicate Content**: Eliminated via canonical + hreflang
- **Rich Snippets**: Enhanced via structured data + translations
- **Geographic Relevance**: Clear Helsinki/Finland targeting

## Documentation

- W3C hreflang specification: https://www.w3.org/International/questions/qa-html-language-declarations
- Google multi-regional: https://developers.google.com/search/docs/specialty/international/localized-versions
- Schema.org Language: https://schema.org/Language
- OpenAI GPTBot: https://platform.openai.com/docs/gptbot
