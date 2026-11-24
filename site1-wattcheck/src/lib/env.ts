/**
 * Sanitizes verification tokens so users can paste either a raw token
 * OR a full `<meta name="..." content="TOKEN" />` HTML tag.
 */
export function sanitizeMetaToken(raw?: string): string {
  if (!raw) return "";
  const trimmed = raw.trim();
  if (!trimmed) return "";
  const match = trimmed.match(/content\s*=\s*["']([^"']+)["']/i);
  if (match && match[1]) {
    return match[1].trim();
  }
  return trimmed.replace(/^["']|["']$/g, "").trim();
}

/**
 * Normalizes AdSense publisher ID to `ca-pub-XXXXXXXXXXXXXXXX` format
 * whether user entered `ca-pub-...`, `pub-...`, raw digits, or a `<meta>` tag.
 */
export function normalizeAdsenseClientId(raw?: string): string {
  const cleaned = sanitizeMetaToken(raw);
  if (!cleaned) return "";
  const pubMatch = cleaned.match(/(?:ca-)?pub-(\d{10,20})/i);
  if (pubMatch && pubMatch[1]) {
    return `ca-pub-${pubMatch[1]}`;
  }
  if (/^\d{10,20}$/.test(cleaned)) {
    return `ca-pub-${cleaned}`;
  }
  return cleaned;
}

/**
 * Extracts `src` URL if user pasted a full `<iframe src="..."></iframe>` snippet,
 * or returns the trimmed URL directly.
 */
export function sanitizeIframeUrl(raw?: string): string {
  if (!raw) return "";
  const trimmed = raw.trim();
  if (!trimmed) return "";
  const srcMatch = trimmed.match(/src\s*=\s*["']([^"']+)["']/i);
  if (srcMatch && srcMatch[1]) {
    return srcMatch[1].trim();
  }
  return trimmed.replace(/^["']|["']$/g, "").trim();
}
